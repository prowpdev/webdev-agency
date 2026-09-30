import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { User, Building, Mail, Phone, Bell, Save } from 'lucide-react';

export const ClientProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { success } = useToast();

  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Client Contact',
    company: currentUser?.company || 'Company Inc.',
    email: currentUser?.email || 'contact@client.com',
    phone: currentUser?.phone || '+1 (555) 321-7890',
  });

  const [notifPreferences, setNotifPreferences] = useState({
    emailNotifications: true,
    projectMilestones: true,
    chatMessages: true,
    billingAlerts: true,
    marketingSummaries: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Updated', 'Your profile and notification preferences have been saved.');
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Client Profile & Preferences</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage your organization details and granular notification delivery channels.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Company & Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Entity</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Notification Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">Email Project Milestones</span>
                <span className="text-[11px] text-slate-500 block">
                  Notify when a sprint stage or code review build is ready
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifPreferences.projectMilestones}
                onChange={(e) =>
                  setNotifPreferences({ ...notifPreferences, projectMilestones: e.target.checked })
                }
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">Direct Team Chat Notifications</span>
                <span className="text-[11px] text-slate-500 block">
                  Instant updates when Marcus or Liam send messages
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifPreferences.chatMessages}
                onChange={(e) =>
                  setNotifPreferences({ ...notifPreferences, chatMessages: e.target.checked })
                }
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800 block">Invoices & Billing Alerts</span>
                <span className="text-[11px] text-slate-500 block">
                  Automated receipts and milestone payment reminders
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifPreferences.billingAlerts}
                onChange={(e) =>
                  setNotifPreferences({ ...notifPreferences, billingAlerts: e.target.checked })
                }
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Workspace Preferences</span>
        </button>
      </form>
    </div>
  );
};
