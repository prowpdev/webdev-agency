import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const CaseStudyPage: React.FC = () => {
  const { params, navigate } = useNavigation();
  const portfolio = StorageService.getPortfolio();

  const item =
    portfolio.find((p) => p.id === params.id || p.slug === params.id) ||
    portfolio[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Back button */}
      <button
        onClick={() => navigate('/portfolio')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Work</span>
      </button>

      {/* Hero Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
          <span className="font-semibold text-indigo-600">{item.client}</span>
          <span>·</span>
          <span>{item.industry}</span>
          <span>·</span>
          <span>Completed {item.completedDate}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
          {item.title}
        </h1>

        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">{item.description}</p>

        {/* Hero image showcase */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 relative shadow-xl">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full aspect-16/9 object-cover"
          />
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6">
        {item.metrics.map((m, i) => (
          <div key={i} className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">{m.value}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Case Study Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
        {/* Left column: Challenge & Solution */}
        <div className="lg:col-span-8 space-y-12">
          {/* Challenge */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-display">The Challenge</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{item.challenge}</p>
          </div>

          {/* Solution */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-display">Engineering Solution</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{item.solution}</p>
          </div>

          {/* Business Impact */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 font-display">Business Results & ROI</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{item.results}</p>
          </div>
        </div>

        {/* Right column: Sidebar Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 text-xs">
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-1 font-semibold">
                Client Entity
              </span>
              <span className="font-semibold text-slate-900">{item.client}</span>
            </div>

            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-1 font-semibold">
                Category
              </span>
              <span className="font-semibold text-indigo-600">{item.category}</span>
            </div>

            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-1 font-semibold">
                Core Stack
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {item.technologies.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {item.liveUrl && (
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* CTA Box */}
          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-3">
            <h4 className="text-sm font-bold text-indigo-950 font-display">Need similar commercial results?</h4>
            <p className="text-xs text-indigo-800 leading-relaxed">
              We specialize in custom web applications and conversion platforms built for high-growth firms.
            </p>
            <button
              onClick={() => navigate('/contact', { project: item.title })}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Start Similar Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
