import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { navigate } = useNavigation();
  const portfolio = StorageService.getPortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Websites', 'E-commerce', 'SaaS', 'Web Apps', 'UI/UX'];

  const filteredItems =
    activeCategory === 'All'
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Selected Work</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Crafted for Performance & Measurable Return
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Explore case studies across financial technology, modern architectural retail, clinical healthcare, and B2B
          logistics.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1"
          >
            {/* Image banner */}
            <div
              className="relative aspect-16/10 overflow-hidden cursor-pointer"
              onClick={() => navigate('/case-study', { id: item.id })}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 shadow-2xs">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                  <span className="font-semibold text-indigo-600">{item.client}</span>
                  <span>·</span>
                  <span>{item.industry}</span>
                </div>

                <h2
                  onClick={() => navigate('/case-study', { id: item.id })}
                  className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer font-display"
                >
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 my-5">
                  {item.metrics.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="text-base font-extrabold text-slate-900 font-mono">{m.value}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Technology chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {item.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate('/case-study', { id: item.id })}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Visit Live Application"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
