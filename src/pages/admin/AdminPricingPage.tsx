import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { PricingPackage } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { Tag, Edit2, Save, Check } from 'lucide-react';

export const AdminPricingPage: React.FC = () => {
  const { success } = useToast();
  const [packages, setPackages] = useState<PricingPackage[]>(() => StorageService.getPricing());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<PricingPackage>>({});

  const handleStartEdit = (pkg: PricingPackage) => {
    setEditingId(pkg.id);
    setForm({ ...pkg });
  };

  const handleSave = () => {
    if (!editingId) return;
    const original = packages.find((p) => p.id === editingId);
    if (!original) return;

    const updated: PricingPackage = {
      ...original,
      ...form,
      price: Number(form.price || original.price),
    };

    StorageService.updatePricing(updated);
    setPackages([...StorageService.getPricing()]);
    setEditingId(null);
    success('Pricing Updated', `Tier "${updated.name}" updated to $${updated.price}.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Fixed-Price Package Manager</h2>
        <p className="text-xs text-slate-500 mt-1">
          Dynamically adjust starting packages. Changes immediately update the public pricing page and checkout calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isEditing = editingId === pkg.id;

          return (
            <div
              key={pkg.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                isEditing
                  ? 'bg-white border-indigo-600 shadow-xl ring-1 ring-indigo-600/20'
                  : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {isEditing ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Tier Name</label>
                    <input
                      type="text"
                      value={form.name || ''}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Base Price ($)</label>
                    <input
                      type="number"
                      value={form.price || 0}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Delivery Timeline</label>
                    <input
                      type="text"
                      value={form.deliveryTime || ''}
                      onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Tagline</label>
                    <textarea
                      rows={2}
                      value={form.tagline || ''}
                      onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-1 shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                    <button
                      onClick={() => handleStartEdit(pkg)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Price & Scopes"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="my-3 py-3 border-y border-slate-100">
                    <div className="text-2xl font-extrabold text-slate-900 font-mono">
                      ${pkg.price.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-indigo-600 font-mono font-medium block mt-0.5">
                      {pkg.deliveryTime}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{pkg.tagline}</p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    {pkg.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
