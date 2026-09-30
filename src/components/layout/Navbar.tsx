import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { route, navigate } = useNavigation();
  const { currentUser, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Process', path: '/process' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
        <button
          onClick={() => navigate('/')}
          className="text-xl font-bold tracking-tight text-slate-900 font-display hover:text-indigo-600 transition-colors cursor-pointer text-left focus-visible:outline-none"
        >
          ApexFlow<span className="text-indigo-600">.</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`hover:text-slate-900 transition-colors cursor-pointer py-1 relative ${
                route === link.path ? 'text-slate-950 font-semibold' : ''
              }`}
            >
              {link.label}
              {route === link.path && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          {isAdmin ? (
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Admin Portal
            </button>
          ) : (
            <button
              onClick={() => navigate('/portal')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
              Client Portal
            </button>
          )}

          <button
            onClick={() => navigate('/contact')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-xs hover:shadow-indigo-500/20 active:scale-[0.98]"
          >
            Start Your Project
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => navigate('/contact')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md cursor-pointer shadow-xs"
          >
            Start
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  route === link.path ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                navigate('/portal');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              Client Portal
            </button>
            <button
              onClick={() => {
                navigate('/admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
