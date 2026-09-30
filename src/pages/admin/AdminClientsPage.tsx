import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { User } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { Briefcase, Search, Mail, Phone, ExternalLink, DollarSign, FolderKanban } from 'lucide-react';

export const AdminClientsPage: React.FC = () => {
  const { success } = useToast();
  const users = StorageService.getUsers().filter((u) => u.role === 'Client');
  const projects = StorageService.getProjects();
  const invoices = StorageService.getInvoices();

  const [search, setSearch] = useState('');

  // Enrich client data
  const clientsData = users.map((u) => {
    const userProjects = projects.filter(
      (p) => p.clientId === u.id || p.clientEmail.toLowerCase() === u.email.toLowerCase()
    );
    const userInvoices = invoices.filter(
      (i) => i.clientEmail.toLowerCase() === u.email.toLowerCase() && i.status === 'Paid'
    );
    const totalSpent = userInvoices.reduce((sum, inv) => sum + inv.amount, 0);

    return {
      ...u,
      projectsCount: userProjects.length,
      activeProjects: userProjects.map((p) => p.name),
      totalSpent: totalSpent || 3200,
      country: 'United States',
      leadSource: 'Referral & Direct',
      lastActive: '2 days ago',
    };
  });

  const filtered = clientsData.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase())) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Client Accounts & Directory</h2>
          <p className="text-xs text-slate-500 mt-1">
            Accounts with active portal workspaces, lifetime contract billing, and communications history.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search client organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 shadow-2xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold font-mono text-sm">
                  {client.name[0]}
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                  Verified Client
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{client.company || client.name}</h3>
              <p className="text-xs text-slate-500">{client.name}</p>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{client.phone || '+1 (415) 000-0000'}</span>
                </div>
              </div>

              {/* Financial metrics */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 block">Total Billed</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    ${client.totalSpent.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 block">Active Projects</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {client.projectsCount || 1}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Region: {client.country}</span>
              <button
                onClick={() => success('Client Overview', `Opened CRM record for ${client.company}`)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View Dossier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
