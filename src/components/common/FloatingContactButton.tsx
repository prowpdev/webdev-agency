import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { MessageSquare, Calendar, Calculator, X, Sparkles, ArrowRight } from 'lucide-react';

export const FloatingContactButton: React.FC = () => {
  const { navigate, route } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  // Hide inside admin/portal to avoid cluttering operational screens
  if (route.startsWith('/admin') || route.startsWith('/portal')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-76 sm:w-80 p-4 bg-white border border-slate-200 rounded-2xl shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-slate-900">Project Consultation</span>
              <p className="text-[11px] text-slate-500">Response guaranteed in &lt; 24h</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <button
              onClick={() => {
                navigate('/contact');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 text-left text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Request Custom Quote</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => {
                navigate('/book');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 text-left text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Book Discovery Call</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => {
                navigate('/pricing');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 text-left text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-amber-600" />
                <span>Explore Packages & Pricing</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer font-medium text-xs sm:text-sm"
        aria-label="Quick Contact and Bookings"
      >
        <Sparkles className="w-4 h-4 text-indigo-200" />
        <span className="font-semibold">Start Project</span>
      </button>
    </div>
  );
};
