import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Lead, LeadStatus } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { useNavigation } from '../../contexts/NavigationContext';
import {
  Users2,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  X,
  Phone,
  Mail,
  Building,
  Globe,
  Plus,
  Layers,
  Sparkles,
  Archive,
} from 'lucide-react';

export const AdminLeadsPage: React.FC = () => {
  const { success, error } = useToast();
  const { navigate } = useNavigation();
  const [leads, setLeads] = useState<Lead[]>(() => StorageService.getLeads());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');

  const leadStatuses: LeadStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal Sent',
    'Negotiation',
    'Won',
    'Lost',
    'Archived',
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    lead.status = newStatus;
    StorageService.updateLead(lead);
    setLeads([...StorageService.getLeads()]);
    if (selectedLead?.id === leadId) {
      setSelectedLead({ ...lead });
    }
    success('Lead Updated', `Status changed to ${newStatus}`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;

    const notes = selectedLead.notes || [];
    const updatedNotes = [`[${new Date().toLocaleDateString()}] ${newNote.trim()}`, ...notes];
    const updatedLead = { ...selectedLead, notes: updatedNotes };

    StorageService.updateLead(updatedLead);
    setSelectedLead(updatedLead);
    setLeads([...StorageService.getLeads()]);
    setNewNote('');
    success('Note Added', 'Internal CRM note saved.');
  };

  const handleConvertToProject = (lead: Lead) => {
    const newProj = StorageService.addProject({
      name: `${lead.company} - ${lead.serviceRequired}`,
      clientName: lead.name,
      clientEmail: lead.email,
      service: lead.serviceRequired,
      category: 'Websites',
      budget: lead.value || 3500,
      startDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Planning',
      progress: 5,
      assignedDeveloper: 'Marcus Vance',
      description: lead.description,
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: 'Project Kickoff & Technical Architecture',
          status: 'in_progress',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          id: `m-${Date.now()}-2`,
          title: 'Figma Tokenized UI/UX Design System',
          status: 'pending',
          dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      ],
    });

    lead.status = 'Won';
    StorageService.updateLead(lead);
    setLeads([...StorageService.getLeads()]);
    success('Converted to Project', `Created sprint workspace: ${newProj.name}`);
    navigate('/admin/projects');
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {['All', ...leadStatuses].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3.5 px-4 font-semibold">Lead Contact</th>
                <th className="py-3.5 px-4 font-semibold">Company / Brand</th>
                <th className="py-3.5 px-4 font-semibold">Service Scope</th>
                <th className="py-3.5 px-4 font-semibold">Budget</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Date Logged</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No leads matching your current criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      <div>{lead.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{lead.email}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-700">{lead.company}</td>
                    <td className="py-4 px-4 text-slate-700">{lead.serviceRequired}</td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">
                      {lead.budget}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === 'New'
                            ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                            : lead.status === 'Won'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : lead.status === 'Lost'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">
                      {lead.createdAt}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Lead Modal Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">{selectedLead.name}</h3>
                <p className="text-xs text-slate-500">{selectedLead.company} · Inbound CRM Record</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {/* Status Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">
                  Change CRM Pipeline Stage
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                >
                  {leadStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact information */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${selectedLead.email}`} className="text-indigo-600 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{selectedLead.phone}</span>
                  </div>
                )}
                {selectedLead.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <a
                      href={selectedLead.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline truncate"
                    >
                      {selectedLead.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Project Scope Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Project Brief & Specification
                </span>
                <p className="text-xs sm:text-sm text-slate-700 p-4 rounded-2xl bg-slate-50 border border-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.description}
                </p>
              </div>

              {/* Conversion CTA */}
              {selectedLead.status !== 'Won' && (
                <button
                  onClick={() => handleConvertToProject(selectedLead)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Convert Lead to Active Sprint Project</span>
                </button>
              )}

              {/* Internal Notes History */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Internal Engineering Notes
                </span>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add team note (e.g. Sent Loom architecture demo)..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
                  >
                    Add
                  </button>
                </form>

                <div className="space-y-2">
                  {selectedLead.notes?.map((note, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
