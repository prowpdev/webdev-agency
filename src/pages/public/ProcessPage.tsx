import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Terminal, Compass, Layers, Code, TestTube2, Rocket } from 'lucide-react';

export const ProcessPage: React.FC = () => {
  const { navigate } = useNavigation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Discovery & Requirement Analysis',
      subtitle: 'Understand the business, customer jobs-to-be-done, and commercial requirements.',
      icon: Compass,
      deliverables: [
        'Commercial objectives & KPI alignment',
        'Customer persona & user journey audit',
        'Technical constraint & legacy system analysis',
        'Competitive benchmark teardown',
      ],
      description:
        'We do not write a single line of code until we understand your exact revenue model and target customer expectations. We map requirements into unambiguous user stories and verifiable acceptance criteria.',
    },
    {
      num: '02',
      title: 'Strategy & Architecture',
      subtitle: 'Plan technology, UX wireframing, features, and strict project scope.',
      icon: Terminal,
      deliverables: [
        'System architecture blueprint & ERD database schema',
        'Interactive wireframe flowcharts',
        'Third-party API selection (Stripe, CMS, CRM, Auth)',
        'Fixed-price milestone agreement & delivery schedule',
      ],
      description:
        'We eliminate ambiguity by designing the data models and API interactions early. You receive a concrete technical specification document and milestone timeline before development begins.',
    },
    {
      num: '03',
      title: 'Interface & UX Design',
      subtitle: 'Create the responsive visual system and interactive prototypes.',
      icon: Layers,
      deliverables: [
        'Complete tokenized Figma design system',
        'High-fidelity responsive layouts (Desktop, Tablet, Mobile)',
        'Clickable prototype for customer validation',
        'WCAG AA accessible color and typography standards',
      ],
      description:
        'Every pixel is designed to build brand trust and remove friction. We test layout balance, tap targets, and micro-interactions so your product feels premium and intuitive.',
    },
    {
      num: '04',
      title: 'Full-Stack Development',
      subtitle: 'Build and integrate the application using clean, type-safe architecture.',
      icon: Code,
      deliverables: [
        'Modular, maintainable React & TypeScript codebase',
        'Secure API & backend microservices integration',
        'Database indexing and optimized query structures',
        'Weekly staging environment review deploys',
      ],
      description:
        'We build on modern stacks without bloated commercial page builders or unstable dependencies. Every milestone is deployed to a private staging URL where you can test live progress.',
    },
    {
      num: '05',
      title: 'Testing & Hardening',
      subtitle: 'Test functionality, responsiveness, performance, and security.',
      icon: TestTube2,
      deliverables: [
        'Core Web Vitals & Lighthouse 95+ speed benchmark',
        'Cross-browser matrix verification (Safari, Chrome, Firefox, Edge)',
        'Automated form validation & error-state audits',
        'Security hardening & rate-limiting configuration',
      ],
      description:
        'Before any release, we run rigorous quality checks across devices, network speeds, and viewport widths. We ensure zero broken links, sub-second response times, and resilient error recovery.',
    },
    {
      num: '06',
      title: 'Launch & Continuous Support',
      subtitle: 'Deploy the project to production and provide dedicated warranty support.',
      icon: Rocket,
      deliverables: [
        'Zero-downtime DNS cutover & SSL certificate provisioning',
        'Search engine indexing & XML sitemap submission',
        'Loom video CMS training for your internal team',
        '30 to 90-day comprehensive bug-fix warranty',
      ],
      description:
        'Launch day is orchestrated seamlessly. We monitor production server logs, verify live transactional webhooks, and hand over 100% of your source code and documentation.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Engineering Discipline</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          How We Build: The 6-Stage Delivery Framework
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Predictability is the ultimate engineering luxury. Our transparent process ensures your project launches on
          time, within agreed budget, and to institutional performance standards.
        </p>
      </div>

      {/* Interactive Stage Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step List Tabs */}
        <div className="lg:col-span-5 space-y-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`font-mono font-bold text-sm ${
                      isActive ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h3 className={`text-sm font-semibold ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate max-w-xs">{step.subtitle}</p>
                  </div>
                </div>
                <Icon
                  className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}
                />
              </div>
            );
          })}
        </div>

        {/* Active Stage Details Card */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600 block mb-1">
                STAGE {steps[activeStep].num} OF 06
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                {steps[activeStep].title}
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {steps[activeStep].description}
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Deliverables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps[activeStep].deliverables.map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Tracked in real-time via your Client Portal</span>
            <button
              onClick={() => navigate('/book')}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <span>Schedule Discovery Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
