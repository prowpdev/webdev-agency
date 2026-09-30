import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { ServiceItem } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { Layers, Plus, Edit2, Save, X, Check, Trash2 } from 'lucide-react';

export const AdminServicesPage: React.FC = () => {
  const { success } = useToast();
  const [services, setServices] = useState<ServiceItem[]>(() => StorageService.getServices());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ServiceItem>>({});

  const handleStartEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setEditForm({ ...service });
  };

  const handleSaveEdit = () => {
    if (!editingId || !editForm) return;
    const original = services.find((s) => s.id === editingId);
    if (!original) return;

    const updated: ServiceItem = {
      ...original,
      ...editForm,
      startingPrice: Number(editForm.startingPrice || original.startingPrice),
    };

    StorageService.updateService(updated);
    setServices([...StorageService.getServices()]);
    setEditingId(null);
    success('Service Updated', `Changes to "${updated.title}" saved.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Services Catalog Manager</h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure public agency capabilities, base pricing, features, and delivery timelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const isEditing = editingId === service.id;

          return (
            <div
              key={service.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                isEditing
                  ? 'bg-white border-indigo-600 shadow-xl ring-1 ring-indigo-600/20'
                  : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {isEditing ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Service Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Starting Price ($)</label>
                    <input
                      type="number"
                      value={editForm.startingPrice || 0}
                      onChange={(e) => setEditForm({ ...editForm, startingPrice: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Delivery Timeline</label>
                    <input
                      type="text"
                      value={editForm.deliveryTime || ''}
                      onChange={(e) => setEditForm({ ...editForm, deliveryTime: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Short Description</label>
                    <textarea
                      rows={2}
                      value={editForm.shortDesc || ''}
                      onChange={(e) => setEditForm({ ...editForm, shortDesc: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1 shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {service.category}
                    </span>
                    <button
                      onClick={() => handleStartEdit(service)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Starting at</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        ${service.startingPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Est. Time</span>
                      <span className="text-slate-700 font-mono font-medium">{service.deliveryTime}</span>
                    </div>
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
