import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { PricingPackage } from '../../types';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Layers,
  ShoppingBag,
  Server,
  Globe,
  Palette,
  ShieldCheck,
  Star,
  ExternalLink,
  Code2,
  Zap,
  TrendingUp,
  Clock,
  Award,
  Check,
  Crown,
  DollarSign,
  Cpu,
  Shield,
  Activity,
} from 'lucide-react';
import {
  HeroGridSvg,
  VerifiedShieldSvg,
  PricingSparkleSvg,
  TechConnectorWire,
} from '../../components/common/CustomSvgIcons';

export const HomePage: React.FC = () => {
  const { navigate } = useNavigation();
  const settings = StorageService.getSettings();
  const services = StorageService.getServices().slice(0, 6);
  const packages: PricingPackage[] = StorageService.getPricing().slice(0, 4);
  const portfolio = StorageService.getPortfolio().slice(0, 3);
  const testimonials = StorageService.getTestimonials();
  const faqs = StorageService.getFAQs().slice(0, 5);

  const [activeFaq, setActiveFaq] = useState<string | null>(faqs[0]?.id || null);

  const getPackageIcon = (name: string) => {
    if (name.toLowerCase().includes('starter') || name.toLowerCase().includes('essential')) {
      return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
    if (name.toLowerCase().includes('business') || name.toLowerCase().includes('growth')) {
      return <Zap className="w-5 h-5 text-amber-600" />;
    }
    if (name.toLowerCase().includes('e-commerce') || name.toLowerCase().includes('store')) {
      return <ShoppingBag className="w-5 h-5 text-pink-600" />;
    }
    if (name.toLowerCase().includes('web app') || name.toLowerCase().includes('portal')) {
      return <Layers className="w-5 h-5 text-emerald-600" />;
    }
    return <Crown className="w-5 h-5 text-purple-600" />;
  };

  const getServiceCategoryIcon = (category: string) => {
    switch (category) {
      case 'Websites':
        return <Globe className="w-5 h-5 text-indigo-600" />;
      case 'E-commerce':
        return <ShoppingBag className="w-5 h-5 text-pink-600" />;
      case 'SaaS':
        return <Server className="w-5 h-5 text-cyan-600" />;
      case 'Web Apps':
        return <Layers className="w-5 h-5 text-emerald-600" />;
      case 'UI/UX':
        return <Palette className="w-5 h-5 text-amber-600" />;
      default:
        return <Code2 className="w-5 h-5 text-indigo-600" />;
    }
  };

  const techBadges = [
    { name: 'React 19', role: 'Frontend Core' },
    { name: 'TypeScript', role: 'Type Safety' },
    { name: 'Tailwind CSS', role: 'Fluid Layouts' },
    { name: 'Node.js & Express', role: 'Backend Services' },
    { name: 'PostgreSQL', role: 'Relational Data' },
    { name: 'Stripe Billing', role: 'FinTech Checkout' },
    { name: 'Shopify 2.0', role: 'E-commerce' },
    { name: 'Recharts', role: 'Data Visualization' },
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Discovery & Audit',
      desc: 'We map commercial objectives, dissect customer workflows, and audit your existing digital assets.',
    },
    {
      num: '02',
      title: 'Strategy & Scoping',
      desc: 'We define fixed-scope milestones, choose the optimal tech stack, and craft user journey blueprints.',
    },
    {
      num: '03',
      title: 'Bespoke UI/UX Design',
      desc: 'Tokenized Figma design systems, responsive wireframes, and interactive prototypes built for conversions.',
    },
    {
      num: '04',
      title: 'Full-Stack Engineering',
      desc: 'Clean, type-safe code adhering to WCAG AA, Core Web Vitals, and modular component architecture.',
    },
    {
      num: '05',
      title: 'Quality & Stress Testing',
      desc: 'Cross-browser verification, mobile viewport stress tests, Lighthouse optimization, and security audits.',
    },
    {
      num: '06',
      title: 'Launch & Continuous Care',
      desc: 'Zero-downtime DNS deployment, team CMS onboarding, and ongoing 24/7 care plan protection.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION WITH AMBIENT LIGHT GRADIENT & FLOATING CARDS */}
      <section className="relative pt-8 sm:pt-14 lg:pt-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient SVG and glow background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-70">
          <HeroGridSvg className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-200/35 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, CTAs, Stats */}
          <div className="lg:col-span-6 space-y-7">
            {/* Trust kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-2xs text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Q4 Enterprise Projects & Growth Builds</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display text-balance leading-[1.1]">
              Build a Better <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600">Digital Business</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed text-balance">
              We design and develop high-performing websites, e-commerce stores, SaaS platforms, and custom web
              applications with fixed milestones, transparent pricing, and sub-second speed.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/pricing')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>View Fixed Pricing</span>
              </button>
            </div>

            {/* Configurable Statistics Bar */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {settings.stats.projectsCompleted}+
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {settings.stats.businessesServed}+
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">Clients Served</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {settings.stats.countriesServed}+
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">Countries</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {settings.stats.yearsExperience}+
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">Years Active</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Interactive Floating Information Cards */}
          <div className="lg:col-span-6 relative pb-10 sm:pb-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Central Agency Workspace Card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-2xl group transition-all duration-300">
                <div className="h-64 sm:h-72 w-full relative overflow-hidden">
                  <img
                    src="/src/assets/images/hero_agency_studio_1790518239366.jpg"
                    alt="ApexFlow Digital Studio Workspace"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-transparent pointer-events-none" />

                  {/* Top image status pills */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/20 text-[11px] text-white font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Sprint Active</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-900 shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>5.0 Top Rated</span>
                    </div>
                  </div>

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-0.5 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>ApexFlow Agile Engineering</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold leading-tight drop-shadow-xs">
                      Full-Stack Architecture & Continuous Delivery
                    </h3>
                  </div>
                </div>

                {/* Performance stats bar underneath image */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Lighthouse</div>
                    <div className="text-sm font-extrabold text-emerald-600 font-mono">99+ Mobile</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Sprint Cycle</div>
                    <div className="text-sm font-extrabold text-indigo-600 font-mono">14 Days Avg</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Code Base</div>
                    <div className="text-sm font-extrabold text-slate-900 font-mono">100% Client</div>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 1: Pricing Snapshot (Top-Right / Offset) */}
              <div 
                onClick={() => navigate('/pricing')}
                className="sm:absolute -top-7 -right-2 sm:-right-6 w-full sm:w-68 bg-white/95 backdrop-blur-md border border-indigo-200/90 p-4 rounded-2xl shadow-xl shadow-indigo-500/10 cursor-pointer hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 animate-float z-20 group mt-4 sm:mt-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Fixed Pricing</span>
                      <h4 className="text-xs font-bold text-slate-900">Business Flagship</h4>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Popular
                  </span>
                </div>

                <div className="flex items-baseline justify-between py-1.5 border-y border-slate-100 my-1.5">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900 font-mono">$999</span>
                    <span className="text-[10px] text-slate-500 ml-1">one-time</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    14-18 Days
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">10 Bespoke Responsive Pages</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">Full CMS + Technical SEO Suite</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Compare 5 Packages</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* FLOATING CARD 2: Services Highlights (Bottom-Left / Offset) */}
              <div 
                onClick={() => navigate('/services')}
                className="sm:absolute -bottom-8 -left-2 sm:-left-8 w-full sm:w-72 bg-white/95 backdrop-blur-md border border-slate-200/90 p-4 rounded-2xl shadow-xl shadow-slate-900/10 cursor-pointer hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 animate-float-delayed z-20 group mt-4 sm:mt-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Core Services</span>
                      <h4 className="text-xs font-bold text-slate-900">Custom Engineering</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-600 flex items-center gap-0.5">
                    9 Tracks <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>

                {/* Micro Service Tags with Lucide Icons */}
                <div className="grid grid-cols-2 gap-1.5 py-1.5">
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-700">
                    <Globe className="w-3 h-3 text-indigo-600 shrink-0" />
                    <span className="truncate">Websites & SEO</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-700">
                    <ShoppingBag className="w-3 h-3 text-pink-600 shrink-0" />
                    <span className="truncate">E-commerce</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-700">
                    <Server className="w-3 h-3 text-cyan-600 shrink-0" />
                    <span className="truncate">SaaS Platforms</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-700">
                    <Palette className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="truncate">UI/UX Systems</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Ready to build
                  </span>
                  <span className="font-semibold text-slate-700">Starting from $899</span>
                </div>
              </div>

              {/* FLOATING CARD 3: SLA & Reliability Guarantee (Top-Left Micro Badge) */}
              <div className="hidden sm:flex absolute -top-5 -left-6 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 shadow-lg items-center gap-2.5 animate-float z-10">
                <div className="p-1.5 rounded-xl bg-indigo-50">
                  <VerifiedShieldSvg className="w-4 h-4" />
                </div>
                <div className="text-left pr-1">
                  <div className="text-xs font-bold text-slate-900">99.4% On-Time SLA</div>
                  <div className="text-[10px] text-slate-500">Money-back delivery clause</div>
                </div>
              </div>

              {/* FLOATING CARD 4: Velocity & Impact Badge (Bottom-Right Micro Badge) */}
              <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-2.5 shadow-lg items-center gap-2.5 animate-float-delayed z-10">
                <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-left pr-1">
                  <div className="text-xs font-bold text-slate-900">+140% Pipeline Velocity</div>
                  <div className="text-[10px] text-slate-500">Avg client conversion lift</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Technology Badges */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 text-center sm:text-left">
            Enterprise Architecture & Modern Stack
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {techBadges.map((badge) => (
              <div
                key={badge.name}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs flex items-center gap-2 shadow-2xs hover:border-indigo-300 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-semibold text-slate-800">{badge.name}</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">/ {badge.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SERVICES SNAPSHOT */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">What We Build</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
              Engineering Tailored for Scale
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              From high-converting brand flagships to multi-tenant SaaS platforms, every build is crafted from clean code
              without bloated page-builders.
            </p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>Explore All 9 Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {s.category === 'Websites' && <Globe className="w-5 h-5" />}
                    {s.category === 'E-commerce' && <ShoppingBag className="w-5 h-5" />}
                    {s.category === 'SaaS' && <Server className="w-5 h-5" />}
                    {s.category === 'Web Apps' && <Layers className="w-5 h-5" />}
                    {s.category === 'UI/UX' && <Palette className="w-5 h-5" />}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Starting at</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">
                      ${s.startingPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.shortDesc}</p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  {s.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {s.deliveryTime}
                </span>
                <button
                  onClick={() => navigate('/checkout', { service: s.id })}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRANSPARENT PRICING & SPRINT PACKAGES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Transparent Pricing</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
              Fixed Milestones. Zero Hourly Creep.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Predictable packages designed for swift market launch. Every engagement includes full source code ownership,
              Lighthouse 95+ guarantees, and post-launch bug warranty.
            </p>
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>Compare All 5 Tiers & Retainers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1 ${
                pkg.popular
                  ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full shadow-xs">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2.5 rounded-2xl border ${
                      pkg.popular
                        ? 'bg-indigo-50 border-indigo-200'
                        : 'bg-slate-50 border-slate-200 group-hover:bg-indigo-50/50'
                    }`}
                  >
                    {getPackageIcon(pkg.name)}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono font-medium">
                    {pkg.popular ? 'High Demand' : 'Sprint'}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{pkg.tagline}</p>
                </div>

                <div className="py-4 border-y border-slate-100 mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                      ${pkg.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ fixed</span>
                  </div>
                  <div className="text-[11px] text-indigo-600 font-mono font-medium mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span>{pkg.deliveryTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    What's included:
                  </span>
                  {pkg.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => navigate('/checkout', { package: pkg.id })}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    pkg.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Retainer & Custom Quote Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-900/50 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Need Monthly Continuous Engineering & Retainers?</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Our care plans start at $399/mo with dedicated hours, 24/7 uptime monitoring, and SLA bug turnarounds.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-slate-950 text-xs font-bold hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            View Monthly Plans
          </button>
        </div>
      </section>

      {/* 4. CASE STUDY SHOWCASE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Proof of Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
              Real Results for Real Businesses
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Every project is measured by bottom-line business outcomes: speed, conversion rates, and revenue impact.
            </p>
          </div>
          <button
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View Complete Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-10">
          {portfolio.map((item, idx) => (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div
                  className="rounded-2xl overflow-hidden border border-slate-200 relative group cursor-pointer"
                  onClick={() => navigate('/case-study', { id: item.id })}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-16/10 object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/0 transition-colors" />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="font-semibold text-indigo-600">{item.client}</span>
                  <span>·</span>
                  <span>{item.industry}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {item.metrics.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate('/case-study', { id: item.id })}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Read Deep Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white border border-slate-200 rounded-xl transition-colors"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 01-06 PROCESS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">How We Deliver</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
            Our 6-Stage Delivery Framework
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            No guessing, no scope creep. A predictable, milestone-driven engineering methodology designed to launch on
            schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-extrabold font-mono text-indigo-600 mb-3 block">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Client Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
            Endorsed by Technical Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.testimonial}"
                </p>
                <div className="mt-4 inline-block px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md text-[11px] font-semibold font-mono">
                  {t.projectResult}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900">{t.client}</div>
                  <div className="text-xs text-slate-500">
                    {t.position} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Questions & Clarity</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div key={faq.id} className="py-4">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between text-left py-2 text-sm sm:text-base font-semibold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed pr-8 animate-in fade-in duration-150">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. HIGH-CONVERSION BOTTOM CTA BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="px-3 py-1 bg-white/10 text-indigo-200 border border-white/20 rounded-full text-xs font-semibold backdrop-blur-xs">
              Ready to Upgrade Your Digital Presence?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              Let's engineer your next digital advantage.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Schedule a 30-minute discovery call or submit your project specification for a fixed-price proposal within
              24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <span>Request a Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/book')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer"
              >
                <span>Book 30-Min Discovery Call</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
