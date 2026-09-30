import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  ArrowRight,
  CreditCard,
  MessageSquare,
  UploadCloud,
  FileText,
  Sparkles,
} from 'lucide-react';

export const ClientDashboardPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { currentUser } = useAuth();
  const { success } = useToast();

  const allProjects = StorageService.getProjects();
  // Filter for client's projects or show relevant active ones
  const clientProjects =
    allProjects.filter(
      (p) =>
        p.clientId === currentUser?.id ||
        p.clientEmail.toLowerCase() === currentUser?.email.toLowerCase()
    ) || allProjects.slice(0, 1);

  const activeProject = clientProjects[0] || allProjects[0];

  const invoices = StorageService.getInvoices().filter(
    (i) => i.clientEmail.toLowerCase() === currentUser?.email.toLowerCase() || i.projectId === activeProject?.id
  );

  const pendingInvoice = invoices.find((i) => i.status === 'Pending');

  const [payingInvoice, setPayingInvoice] = useState<string | null>(null);

  const handlePayNow = (id: string) => {
    setPayingInvoice(id);
    setTimeout(() => {
      StorageService.markInvoicePaid(id);
      setPayingInvoice(null);
      success('Payment Verified', 'Invoice marked paid. Receipt emailed to you.');
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Client Portal</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
            Welcome back, {currentUser?.name || 'Partner'}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Active workspace: <span className="text-slate-800 font-semibold">{currentUser?.company || 'Organization'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/portal/messages')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span>Message Team</span>
          </button>
          <button
            onClick={() => navigate('/book')}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Book Meeting</span>
          </button>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-500 text-xs font-medium">Active Projects</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {clientProjects.length || 1}
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block font-medium">In Active Production</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-500 text-xs font-medium">Overall Progress</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {activeProject ? `${activeProject.progress}%` : '0%'}
          </div>
          <span className="text-[11px] text-indigo-600 mt-1 block font-medium">On-Track for Deadline</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-500 text-xs font-medium">Milestones Completed</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {activeProject
              ? `${activeProject.milestones.filter((m) => m.status === 'completed' || m.completed).length} / ${activeProject.milestones.length}`
              : '0 / 0'}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Sprint Stages Passed</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-500 text-xs font-medium">Outstanding Balance</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            ${pendingInvoice ? pendingInvoice.amount.toLocaleString() : '0'}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {pendingInvoice ? 'Payment Due' : 'All Accounts Settled'}
          </span>
        </div>
      </div>

      {/* Active Project Card */}
      {activeProject && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                {activeProject.category} · {activeProject.status}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-0.5">
                {activeProject.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Assigned Lead: <strong className="text-slate-800">{activeProject.assignedDeveloper}</strong> · Target
                Delivery: <span className="font-mono text-slate-800">{activeProject.deadline}</span>
              </p>
            </div>

            <button
              onClick={() => navigate('/portal/projects')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>Full Project Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Sprint Completion</span>
              <span className="font-mono font-bold text-indigo-600">{activeProject.progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${activeProject.progress}%` }}
              />
            </div>
          </div>

          {/* Milestone timeline checklist */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Sprint Deliverables & Quality Gates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeProject.milestones.map((m) => {
                const isCompleted = m.status === 'completed' || !!m.completed;
                return (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs transition-colors ${
                      isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isCompleted ? 'text-emerald-600' : 'text-slate-300'
                      }`}
                    />
                    <div>
                      <span className="font-semibold block text-slate-900">{m.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{m.dueDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Two columns: Outstanding Invoices + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Invoices */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">Invoices & Billing</h3>
            <button
              onClick={() => navigate('/portal/invoices')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {invoices.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No invoices issued for this workspace yet.</p>
            ) : (
              invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{inv.invoiceNumber}</div>
                    <div className="text-[11px] text-slate-500">
                      Due: {inv.dueDate} · {inv.projectName}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      ${inv.amount.toLocaleString()}
                    </span>

                    {inv.status === 'Paid' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayNow(inv.id)}
                        disabled={payingInvoice === inv.id}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        {payingInvoice === inv.id ? 'Processing...' : 'Pay Now'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions & Workspace info */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">Workspace Shortcuts</h3>

          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/portal/files')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <UploadCloud className="w-4 h-4 text-indigo-600" />
                <span>Upload Assets & Brand Guidelines</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => navigate('/portal/timeline')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>View Full Interactive Gantt Timeline</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => navigate('/portal/messages')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Chat with Marcus Vance & Liam</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
