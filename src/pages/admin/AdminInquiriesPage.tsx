import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { Mail, MessageSquare, CheckCircle2, Clock, Send, X } from 'lucide-react';

export const AdminInquiriesPage: React.FC = () => {
  const { success } = useToast();
  const leads = StorageService.getLeads();
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedInquiry) return;

    success('Reply Sent', `Email dispatched to ${selectedInquiry.email}`);
    setSelectedInquiry(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Inbound Web Inquiries & Submissions</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review incoming contact form submissions, review specifications, and dispatch proposals.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-semibold">Prospect</th>
                <th className="py-3 px-4 font-semibold">Service</th>
                <th className="py-3 px-4 font-semibold">Target Budget</th>
                <th className="py-3 px-4 font-semibold">Timeline</th>
                <th className="py-3 px-4 font-semibold">Received</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 block">{inq.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{inq.email}</span>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-800">{inq.serviceRequired}</td>
                  <td className="py-4 px-4 font-mono font-bold text-emerald-700">{inq.budget}</td>
                  <td className="py-4 px-4 text-slate-600">{inq.timeline}</td>
                  <td className="py-4 px-4 text-slate-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedInquiry(inq);
                        setReplyText(`Hi ${inq.name},\n\nThank you for reaching out to ApexFlow Studio regarding your ${inq.serviceRequired} project. We reviewed your initial specifications and would love to propose...`);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer shadow-xs"
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs">
          <form
            onSubmit={handleSendReply}
            className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Respond to {selectedInquiry.name}</h3>
                <p className="text-[11px] text-slate-500">{selectedInquiry.email}</p>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700">
              <span className="font-bold text-slate-500 block mb-1">Prospect Scope:</span>
              <p className="leading-relaxed">{selectedInquiry.description}</p>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Direct Email Response</label>
              <textarea
                rows={6}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">Sends formal proposal from studio domain.</span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Dispatch Response</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
