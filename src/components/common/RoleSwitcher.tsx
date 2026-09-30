import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { Users, ChevronDown, Check, LogOut, ShieldAlert, Sparkles } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentUser, availableUsers, switchUser, logout } = useAuth();
  const { navigate, route } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
        title="Switch active user or view mode"
      >
        <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold text-[10px]">
          {currentUser ? currentUser.name[0] : '?'}
        </span>
        <div className="text-left hidden sm:block max-w-[120px] truncate">
          <div className="font-semibold text-slate-900 truncate text-[11px]">{currentUser?.name || 'Guest'}</div>
          <div className="text-[10px] text-slate-500 truncate">{currentUser?.role || 'Visitor'}</div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-68 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Switch Active Persona</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            </div>

            <div className="py-1 space-y-0.5 max-h-56 overflow-y-auto">
              {availableUsers.map((u) => {
                const isSelected = currentUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setIsOpen(false);
                      if (u.role === 'Client' && route.startsWith('/admin')) {
                        navigate('/portal');
                      } else if (u.role === 'Admin' && route.startsWith('/portal')) {
                        navigate('/admin');
                      }
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected ? 'bg-indigo-50 text-indigo-900' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {u.role} · {u.company}
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 mt-1 flex flex-col gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/admin');
                }}
                className="w-full text-left px-2 py-1.5 text-indigo-600 font-medium hover:bg-indigo-50 rounded-md transition-colors"
              >
                Go to Admin Dashboard
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/portal');
                }}
                className="w-full text-left px-2 py-1.5 text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
              >
                Go to Client Portal
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  navigate('/');
                }}
                className="w-full text-left px-2 py-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3 h-3" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
