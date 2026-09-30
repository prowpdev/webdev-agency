import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { CreditCard, CheckCircle2, Clock, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ClientInvoicesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { success } = useToast();
  const [invoices, setInvoices] = useState(() => StorageService.getInvoices());
  const [payingId, setPayingId] = useState<string | null>(null);

  const clientInvoices = invoices.filter(
    (i) =>
      i.clientEmail.toLowerCase() === currentUser?.email.toLowerCase() ||
      i.clientName.toLowerCase() === currentUser?.name.toLowerCase()
  );

  const displayInvoices = clientInvoices.length > 0 ? clientInvoices : invoices;

  const handlePayNow = (id: string) => {
    setPayingId(id);
    setTimeout(() => {
      StorageService.markInvoicePaid(id);
      setInvoices(StorageService.getInvoices());
      setPayingId(null);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      success('Payment Successful', 'Invoice marked as paid. Formal receipt sent to your email.');
    }, 700);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Invoices & Billing History</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review transparent milestone invoices, tax receipts, and payment settlements.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-semibold">Invoice #</th>
                <th className="py-3 px-4 font-semibold">Project Scope</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Issued</th>
                <th className="py-3 px-4 font-semibold">Due Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="py-4 px-4 font-medium text-slate-800 max-w-xs truncate">
                    {inv.projectName}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-slate-500">{inv.issueDate}</td>
                  <td className="py-4 px-4 text-slate-500">{inv.dueDate}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {inv.status === 'Paid' ? (
                      <button
                        onClick={() => success('Receipt Downloaded', `Saved ${inv.invoiceNumber}.pdf`)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>Receipt</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePayNow(inv.id)}
                        disabled={payingId === inv.id}
                        className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        {payingId === inv.id ? 'Processing...' : 'Pay Now'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
