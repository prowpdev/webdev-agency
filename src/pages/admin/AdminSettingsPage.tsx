import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { AgencySettings } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { Settings, Save, RotateCcw, Building, Globe, Mail, Phone, ShieldAlert } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { success } = useToast();
  const [settings, setSettings] = useState<AgencySettings>(() => StorageService.getSettings());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateSettings(settings);
    success('Settings Updated', 'Agency profile and public counters saved.');
  };

  const handleFactoryReset = () => {
    if (window.confirm('Reset all demo data and reload initial factory state?')) {
      StorageService.resetAll();
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Agency Settings & Configurations</h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure agency brand properties, public KPI counter statistics, and operational parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Core Profile */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold uppercase tracking-wider text-slate-500 text-xs">
            Agency Identity & Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Agency Name</label>
              <input
                type="text"
                value={settings.agencyName}
                onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Inbound Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Direct Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Physical / Legal Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Public KPI Counters */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-slate-500 text-xs">
              Public Homepage Statistics Counters
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              These values dynamically render on the public homepage hero proof banner.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Projects Completed</label>
              <input
                type="number"
                value={settings.stats.projectsCompleted}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, projectsCompleted: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Businesses Served</label>
              <input
                type="number"
                value={settings.stats.businessesServed}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, businessesServed: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Countries Reached</label>
              <input
                type="number"
                value={settings.stats.countriesServed}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, countriesServed: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Years Experience</label>
              <input
                type="number"
                value={settings.stats.yearsExperience}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    stats: { ...settings.stats, yearsExperience: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Currency & Tax */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold uppercase tracking-wider text-slate-500 text-xs">
            Financial & Tax Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Currency Code</label>
              <input
                type="text"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Symbol</label>
              <input
                type="text"
                value={settings.currencySymbol}
                onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tax / VAT Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>

          <button
            type="button"
            onClick={handleFactoryReset}
            className="px-4 py-2 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </form>
    </div>
  );
};
