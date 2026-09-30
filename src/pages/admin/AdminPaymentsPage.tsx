import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Invoice, InvoiceStatus } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { CreditCard, Plus, CheckCircle2, Clock, X, Download } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const { success } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>(() => StorageService.getInvoices());
  const projects = StorageService.getProjects();
  const [isCreating, setIsCreating] = useState(false);

  const [newInvoice, setNewInvoice] = useState({
    projectId: projects[0]?.id || '',
    amount: 1500,
    description: 'Milestone 2 Delivery & Code Review',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const handleMarkPaid = (invId: string) => {
    StorageService.markInvoicePaid(invId);
    setInvoices([...StorageService.getInvoices()]);
    success('Invoice Settled', 'Marked as paid and receipt generated.');
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find((p) => p.id === newInvoice.projectId) || projects[0];

    const created = StorageService.addInvoice({
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      projectId: proj.id,
      projectName: proj.name,
      clientName: proj.clientName,
      clientEmail: proj.clientEmail,
      amount: Number(newInvoice.amount),
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate,
      status: 'Pending',
      items: [
        {
          description: newInvoice.description,
          quantity: 1,
          unitPrice: Number(newInvoice.amount),
          total: Number(newInvoice.amount),
        },
      ],
    });

    setInvoices([...StorageService.getInvoices()]);
    setIsCreating(false);
    success('Invoice Issued', `Invoice ${created.invoiceNumber} created for ${proj.clientName}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Invoices & Payment Operations</h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate milestone billings, track Stripe deposits, and verify client settlements.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold self-start sm:self-auto cursor-pointer shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Issue New Invoice</span>
        </button>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-semibold">Invoice #</th>
                <th className="py-3 px-4 font-semibold">Client Organization</th>
                <th className="py-3 px-4 font-semibold">Milestone / Scope</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Due Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-900 block">{inv.clientName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{inv.clientEmail}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 max-w-xs truncate">{inv.projectName}</td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900 text-sm">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">{inv.dueDate}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status === 'Pending' && (
                        <button
                          onClick={() => handleMarkPaid(inv.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[11px] transition-colors cursor-pointer border border-emerald-200"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => success('Export Sent', `Receipt for ${inv.invoiceNumber} downloaded.`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Download PDF Receipt"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs">
          <form
            onSubmit={handleCreateInvoice}
            className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">Generate Milestone Invoice</h3>
              <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Project</label>
              <select
                value={newInvoice.projectId}
                onChange={(e) => setNewInvoice({ ...newInvoice, projectId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.clientName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Milestone Line Item Description</label>
              <input
                type="text"
                required
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Amount ($ USD)</label>
                <input
                  type="number"
                  required
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Settlement Due Date</label>
                <input
                  type="date"
                  required
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs"
              >
                Issue Invoice
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
