import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { ArrowUpRight, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              ApexFlow<span className="text-indigo-600">.</span>
            </span>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
              We design and develop high-performing websites, e-commerce storefronts, SaaS platforms, and bespoke web
              applications for ambitious companies globally.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>548 Market St, Suite 7892, San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>contact@apexflow.agency</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+1 (415) 890-3421</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  Business Websites
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  E-commerce Stores
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  Custom Web Apps
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  SaaS Platforms
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  UI/UX Design Systems
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  Care & Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/portfolio')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  Portfolio & Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  Pricing & Packages
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/process')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  6-Stage Process
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/book')} className="hover:text-indigo-600 transition-colors cursor-pointer text-slate-600">
                  Book Discovery Call
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/portal')} className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1 text-slate-600">
                  Client Portal
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1 text-slate-600">
                  Admin Dashboard
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Newsletter / Estimation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">Newsletter & Insights</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Quarterly engineering notes, Web Vitals benchmarks, and digital conversion case studies.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-2">
              <input
                type="email"
                placeholder="your.email@company.com"
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
              <button
                type="button"
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ApexFlow Studio LLC. All rights reserved. Zero-bloat code guarantee.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">Security Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
