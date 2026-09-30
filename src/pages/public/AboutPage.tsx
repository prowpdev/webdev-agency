import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { ShieldCheck, Code, Zap, Award, Users, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();
  const settings = StorageService.getSettings();

  const team = [
    {
      name: 'Marcus Vance',
      role: 'Founder & Lead Technical Architect',
      bio: 'Ex-Silicon Valley senior engineer with 11+ years architecting high-scale distributed systems and enterprise React flagships.',
      avatar: 'MV',
    },
    {
      name: 'Liam S. O’Connor',
      role: 'Lead Full-Stack Engineer',
      bio: 'Specialist in modern TypeScript, Node.js microservices, PostgreSQL query optimization, and sub-50ms WebSocket streaming.',
      avatar: 'LO',
    },
    {
      name: 'Sophia Zhang',
      role: 'Head of Product & Design Systems',
      bio: 'Figma design system lead focused on conversion typography, accessible WCAG AA standards, and high-converting checkout UX.',
      avatar: 'SZ',
    },
  ];

  const standards = [
    {
      icon: Code,
      title: 'Zero Bloat Architecture',
      desc: 'We never use generic page builders (Elementor, Divi) that produce slow, unmaintainable markup. Every line is handwritten, type-safe, and modular.',
    },
    {
      icon: Zap,
      title: 'Sub-Second Speed Guarantee',
      desc: 'We architect for Google Core Web Vitals from day one. High performance reduces bounce rates and drives direct commercial conversion.',
    },
    {
      icon: Award,
      title: '100% Code & IP Ownership',
      desc: 'No vendor lock-in. You receive clean GitHub repository access, deployment scripts, and complete copyright upon final milestone payment.',
    },
    {
      icon: HeartHandshake,
      title: 'Fixed-Price Transparency',
      desc: 'No open-ended billing or surprise line items. The price agreed in your milestone specification is the exact price you pay.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Our Agency</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Crafting Digital Flagships with Engineering Rigor
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          ApexFlow Studio was founded on a simple principle: high-growth businesses deserve modern digital engineering,
          not sluggish WordPress templates or opaque enterprise agency bureaucracy.
        </p>
      </div>

      {/* Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {standards.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:shadow-md hover:border-slate-300 transition-all">
              <div className="p-3 bg-indigo-50 w-fit rounded-xl text-indigo-600">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Leadership Team */}
      <div className="space-y-8 pt-8 border-t border-slate-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">The Builders</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
            Senior Talent Working Directly on Your Code
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            You work directly with lead engineers and designers—never junior account managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center font-mono font-bold text-indigo-700 text-sm">
                {member.avatar}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                <div className="text-xs text-indigo-600 font-medium">{member.role}</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Ready to partner with an engineering-first team?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Tell us about your project vision and get an architectural proposal in under 24 hours.
          </p>
        </div>
        <button
          onClick={() => navigate('/contact')}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 shadow-xs"
        >
          <span>Start Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
