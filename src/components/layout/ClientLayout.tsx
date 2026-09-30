import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useAuth } from '../../contexts/AuthContext';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { StorageService } from '../../services/storageService';
import {
  LayoutDashboard,
  FolderKanban,
  GitCommit,
  FolderOpen,
  MessageSquare,
  CreditCard,
  UserCheck,
  Bell,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface ClientLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children, title, subtitle, actions }) => {
  const { route, navigate } = useNavigation();
  const { currentUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = StorageService.getNotifications();
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navItems = [
    { label: 'Overview', path: '/portal', icon: LayoutDashboard },
    { label: 'Active Projects', path: '/portal/projects', icon: FolderKanban },
    { label: 'Timeline & Milestones', path: '/portal/timeline', icon: GitCommit },
    { label: 'Files & Assets', path: '/portal/files', icon: FolderOpen },
    { label: 'Messages & Support', path: '/portal/messages', icon: MessageSquare },
    { label: 'Invoices & Billing', path: '/portal/invoices', icon: CreditCard },
    { label: 'Company Profile', path: '/portal/profile', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-slate-200 bg-white transition-all duration-200 shrink-0 ${
          collapsed ? 'w-18' : 'w-64'
        }`}
      >
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-4">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight font-display text-slate-900">
                ApexFlow<span className="text-indigo-600">.</span>
              </span>
              <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded">
                Client Hub
              </span>
            </div>
          ) : (
            <span className="font-bold text-lg text-emerald-600 font-display">C.</span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Client Workspace Info */}
        {!collapsed && (
          <div className="p-3 border-b border-slate-100 bg-slate-50/70">
            <div className="text-[11px] text-slate-400 font-medium">Workspace</div>
            <div className="text-xs font-semibold text-slate-800 truncate">
              {currentUser?.company || 'My Organization'}
            </div>
            <div className="text-[10px] text-slate-500 truncate">{currentUser?.email}</div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = route === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom link */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            {!collapsed && <span>View Agency Website</span>}
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
                {title}
              </h1>
              {subtitle && <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {actions}

            <button
              onClick={() => setNotifOpen(true)}
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>

            <RoleSwitcher />
          </div>
        </header>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
            <div className="relative w-64 bg-white border-r border-slate-200 h-full flex flex-col p-4 z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-base font-display text-slate-900">
                  ApexFlow<span className="text-indigo-600">.</span> Client Hub
                </span>
                <button onClick={() => setMobileOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = route === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                        isActive ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    navigate('/');
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Agency Website</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>

      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
};
