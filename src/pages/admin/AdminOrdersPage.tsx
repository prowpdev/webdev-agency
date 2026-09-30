import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { ShoppingBag, CheckCircle2, Clock, Download, ExternalLink } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { success } = useToast();
  const invoices = StorageService.getInvoices();
  const projects = StorageService.getProjects();

  const orders = invoices.map((inv) => {
    const proj = projects.find((p) => p.id === inv.projectId);
    return {
      id: `ORD-${inv.invoiceNumber.replace('INV-', '')}`,
      invoiceId: inv.id,
      clientName: inv.clientName,
      clientEmail: inv.clientEmail,
      projectName: inv.projectName,
      amount: inv.amount,
      date: inv.issueDate,
      status: inv.status,
      items: inv.items,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Client Service Orders</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review orders processed through the public service checkout and service configurator.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-semibold">Order Ref</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Service Package & Add-ons</th>
                <th className="py-3 px-4 font-semibold">Order Total</th>
                <th className="py-3 px-4 font-semibold">Payment Status</th>
                <th className="py-3 px-4 font-semibold">Order Date</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-900">{ord.id}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-900 block">{ord.clientName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{ord.clientEmail}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 max-w-xs truncate">
                    {ord.items.map((i) => i.description).join(' + ')}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900 text-sm">
                    ${ord.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ord.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">{ord.date}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => success('Order Exported', `Generated invoice receipt for ${ord.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer text-xs font-semibold"
                    >
                      Export
                    </button>
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
