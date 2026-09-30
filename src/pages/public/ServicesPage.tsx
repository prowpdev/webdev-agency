import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { ProjectCategory } from '../../types';
import {
  Globe,
  ShoppingBag,
  Layers,
  Server,
  Palette,
  RefreshCw,
  Code,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigate } = useNavigation();
  const services = StorageService.getServices();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Websites', 'E-commerce', 'SaaS', 'Web Apps', 'UI/UX'];

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-indigo-600" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-pink-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-emerald-600" />;
      case 'Server':
        return <Server className="w-6 h-6 text-cyan-600" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-amber-600" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-rose-600" />;
      case 'Code':
        return <Code className="w-6 h-6 text-blue-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Our Capabilities</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Full-Stack Web Engineering & Digital Product Architecture
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          We don't build cookie-cutter templates. Every system is constructed from clean, scalable, type-safe code
          designed for sub-second performance and measurable commercial impact.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 group-hover:bg-indigo-50/50 transition-colors">
                  {getIcon(service.iconName)}
                </div>
                {service.popular && (
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
                    Most Popular
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {service.shortDesc || service.description}
                </p>
              </div>

              {/* Pricing & Delivery badge */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Starting at</div>
                  <div className="text-lg font-extrabold text-slate-900 font-mono">
                    ${service.startingPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Est. Delivery</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 font-mono mt-0.5">
                    {service.deliveryTime}
                  </div>
                </div>
              </div>

              {/* Deliverables checklist */}
              <div className="mt-6 space-y-2.5">
                <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Key Deliverables</div>
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => navigate('/checkout', { service: service.id })}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate('/contact', { service: service.title })}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Quote</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
