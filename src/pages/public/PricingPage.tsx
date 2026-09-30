import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import {
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Rocket,
  ShoppingBag,
  Layers,
  Crown,
  Zap,
  TrendingUp,
  Cpu,
  Clock,
  Gauge,
  Search,
  Palette,
  CreditCard,
  Database,
  Users,
} from 'lucide-react';
import { PricingSparkleSvg, VerifiedShieldSvg } from '../../components/common/CustomSvgIcons';

export const PricingPage: React.FC = () => {
  const { navigate } = useNavigation();
  const pricingPackages = StorageService.getPricing();
  const [billingCycle, setBillingCycle] = useState<'project' | 'care'>('project');

  const getPackageIcon = (pkgName: string) => {
    if (pkgName.toLowerCase().includes('starter')) return <Sparkles className="w-5 h-5 text-indigo-600" />;
    if (pkgName.toLowerCase().includes('business')) return <Rocket className="w-5 h-5 text-indigo-600" />;
    if (pkgName.toLowerCase().includes('commerce')) return <ShoppingBag className="w-5 h-5 text-indigo-600" />;
    if (pkgName.toLowerCase().includes('app')) return <Layers className="w-5 h-5 text-indigo-600" />;
    if (pkgName.toLowerCase().includes('saas')) return <Crown className="w-5 h-5 text-amber-500" />;
    return <Zap className="w-5 h-5 text-indigo-600" />;
  };

  const comparisonFeatures = [
    { name: 'Custom Visual UI/UX Design', icon: <Palette className="w-4 h-4 text-indigo-500" />, starter: 'Standard (1-5 pages)', biz: 'Bespoke (10 pages)', ecom: 'Storefront UX', app: 'Full System', saas: 'Enterprise UI' },
    { name: 'Core Web Vitals 95+ Guarantee', icon: <Gauge className="w-4 h-4 text-emerald-500" />, starter: true, biz: true, ecom: true, app: true, saas: true },
    { name: 'Technical On-Page SEO & Schema', icon: <Search className="w-4 h-4 text-blue-500" />, starter: 'Basic', biz: 'Advanced', ecom: 'Product Schema', app: 'Full Suite', saas: 'Full Suite' },
    { name: 'Interactive Contact Funnels', icon: <Zap className="w-4 h-4 text-amber-500" />, starter: true, biz: true, ecom: true, app: true, saas: true },
    { name: 'E-commerce Cart & Stripe Gateway', icon: <CreditCard className="w-4 h-4 text-indigo-500" />, starter: false, biz: false, ecom: true, app: 'Add-on', saas: 'Subscription' },
    { name: 'Custom Relational Database & API', icon: <Database className="w-4 h-4 text-cyan-500" />, starter: false, biz: false, ecom: 'Catalog DB', app: true, saas: true },
    { name: 'Multi-Tenant Authentication & Roles', icon: <ShieldCheck className="w-4 h-4 text-teal-500" />, starter: false, biz: false, ecom: 'Customer Auth', app: true, saas: true },
    { name: 'Client Portal Project Access', icon: <Users className="w-4 h-4 text-purple-500" />, starter: true, biz: true, ecom: true, app: true, saas: true },
    { name: 'Post-Launch Bug Fix Warranty', icon: <Clock className="w-4 h-4 text-slate-500" />, starter: '30 Days', biz: '60 Days', ecom: '60 Days', app: '90 Days', saas: '90 Days' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Transparent Investment</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Fixed-Price Packages. No Hidden Hourly Creep.
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Predictable milestones with zero surprise invoices. Every engagement includes full code ownership,
          performance guarantees, and dedicated engineering support.
        </p>

        {/* Toggle */}
        <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl mt-6 shadow-2xs">
          <button
            onClick={() => setBillingCycle('project')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              billingCycle === 'project' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fixed-Scope Projects
          </button>
          <button
            onClick={() => setBillingCycle('care')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              billingCycle === 'care' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Care & Retainers
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      {billingCycle === 'project' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-500/10 scale-102 ring-1 ring-indigo-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full shadow-xs">
                  Recommended
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-2xl border ${
                    pkg.popular
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    {getPackageIcon(pkg.name)}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono font-medium">
                    {pkg.popular ? 'High Demand' : 'Standard'}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{pkg.tagline}</p>
                </div>

                <div className="py-4 border-y border-slate-100 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono">
                      ${pkg.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ project</span>
                  </div>
                  <span className="text-[11px] text-indigo-600 font-mono font-medium mt-1 block">
                    {pkg.deliveryTime}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    What's included:
                  </span>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => navigate('/checkout', { package: pkg.id })}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    pkg.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('/contact', { package: pkg.name })}
                  className="w-full py-2 px-3 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Custom Scope
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Monthly Care Packages */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-slate-400 font-mono">SLA 24h</span>
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Essential Security</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Foundational Care</h3>
              <div className="py-4 border-y border-slate-100 my-4">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">$199</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Automated Daily Cloud Backups</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>WordPress / Node dependency patches</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Uptime monitoring with SMS alert</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>1 hour priority bug fix per month</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/contact', { service: 'Foundational Care' })}
              className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Select Plan
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-600/10 flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full">
              Growth Partner
            </span>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-indigo-600 font-mono font-bold">Priority SLA 4h</span>
              </div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Continuous Dev</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Growth Retainer</h3>
              <div className="py-4 border-y border-slate-100 my-4">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">$599</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Everything in Foundational Care</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>5 dedicated development hours/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>A/B testing & Core Web Vitals tune-ups</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Priority 4-hour response SLA</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/contact', { service: 'Growth Retainer' })}
              className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              Select Plan
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Dedicated Pod</span>
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Enterprise SLA</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Dedicated Pod</h3>
              <div className="py-4 border-y border-slate-100 my-4">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">$1,499</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>15 dedicated engineering hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Direct Slack/Teams channel with architects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Architectural reviews & security hardening</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>1-hour critical emergency SLA</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/contact', { service: 'Dedicated Pod' })}
              className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Select Plan
            </button>
          </div>
        </div>
      )}

      {/* Feature Comparison Matrix */}
      <div className="space-y-6 pt-12 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Comprehensive Tier Comparison
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluate exact architectural inclusions across all fixed-scope project tiers.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="p-4 font-semibold">Capability</th>
                <th className="p-4 font-semibold">Starter</th>
                <th className="p-4 font-semibold">Business</th>
                <th className="p-4 font-semibold">E-commerce</th>
                <th className="p-4 font-semibold">Web App</th>
                <th className="p-4 font-semibold">SaaS Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonFeatures.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 rounded-lg bg-slate-100/80">{row.icon}</span>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  {['starter', 'biz', 'ecom', 'app', 'saas'].map((key) => {
                    const val = (row as any)[key];
                    return (
                      <td key={key} className="p-4 text-slate-600">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300" />
                          )
                        ) : (
                          <span className="font-medium text-slate-800">{val}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
