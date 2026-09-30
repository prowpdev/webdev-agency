import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { PortfolioItem, ProjectCategory } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { Image as ImageIcon, Plus, Edit2, Trash2, ExternalLink, X } from 'lucide-react';

export const AdminPortfolioPage: React.FC = () => {
  const { success } = useToast();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => StorageService.getPortfolio());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState<Partial<PortfolioItem>>({
    title: '',
    client: '',
    industry: '',
    category: 'Websites',
    description: '',
    challenge: '',
    solution: '',
    results: '',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/src/assets/images/hero_agency_studio_1790518239366.jpg',
  });

  const handleDelete = (id: string) => {
    StorageService.deletePortfolioItem(id);
    setPortfolio([...StorageService.getPortfolio()]);
    success('Case Study Removed', 'Portfolio item deleted.');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PortfolioItem = {
      id: form.id || `port-${Date.now()}`,
      slug: (form.title || 'project').toLowerCase().replace(/\s+/g, '-'),
      title: form.title || 'New Case Study',
      client: form.client || 'Client Entity',
      industry: form.industry || 'Technology',
      category: form.category || 'Websites',
      description: form.description || '',
      challenge: form.challenge || '',
      solution: form.solution || '',
      results: form.results || '',
      metrics: [
        { label: 'Conversion Lift', value: '+45%' },
        { label: 'Speed Score', value: '99/100' },
        { label: 'Latency Cut', value: '-60%' },
      ],
      technologies: form.technologies || ['React', 'TypeScript'],
      imageUrl: form.imageUrl || '/src/assets/images/hero_agency_studio_1790518239366.jpg',
      completedDate: '2026',
    };

    StorageService.updatePortfolioItem(newItem);
    setPortfolio([...StorageService.getPortfolio()]);
    setIsModalOpen(false);
    success('Case Study Saved', `Published "${newItem.title}".`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Portfolio & Case Studies Manager</h2>
          <p className="text-xs text-slate-500 mt-1">
            Curate showcased client achievements, architectural solutions, and quantified business metrics.
          </p>
        </div>

        <button
          onClick={() => {
            setForm({
              title: '',
              client: '',
              industry: '',
              category: 'Websites',
              description: '',
              challenge: '',
              solution: '',
              results: '',
              technologies: ['React', 'TypeScript', 'Tailwind CSS'],
              imageUrl: '/src/assets/images/hero_agency_studio_1790518239366.jpg',
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div>
              <div className="aspect-16/10 relative overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 shadow-2xs">
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-[11px] text-slate-400 font-medium">
                  {item.client} · {item.industry}
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
              <span className="text-[11px] text-slate-400 font-mono">Date: {item.completedDate}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setForm({ ...item });
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs">
          <form
            onSubmit={handleSave}
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-xs max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">Manage Case Study</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Client Entity</label>
                <input
                  type="text"
                  required
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Industry</label>
                <input
                  type="text"
                  required
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Overview Description</label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Commercial Challenge</label>
                <textarea
                  rows={2}
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Engineering Solution</label>
                <textarea
                  rows={2}
                  value={form.solution}
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Quantified Business Results</label>
                <textarea
                  rows={2}
                  value={form.results}
                  onChange={(e) => setForm({ ...form, results: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs"
              >
                Save Case Study
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
