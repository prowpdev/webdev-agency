import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useRealtime } from '../../contexts/RealtimeContext';
import { useAuth } from '../../contexts/AuthContext';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { StorageService } from '../../services/storageService';
import {
  LayoutDashboard,
  Users2,
  FolderGit2,
  Briefcase,
  Layers,
  Tag,
  Image as ImageIcon,
  ShoppingBag,
  CreditCard,
  Calendar,
  MessageSquare,
  FileCode2,
  BarChart3,
  Settings,
  Bell,
  Radio,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  FileQuestion,
  Sparkles,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle, actions }) => {
  const { route, navigate } = useNavigation();
  const { isConnected, simulateIncomingEvent } = useRealtime();
  const { currentUser, isAdmin } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = StorageService.getNotifications();
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Leads & CRM', path: '/admin/leads', icon: Users2 },
    { label: 'Inquiries', path: '/admin/inquiries', icon: FileQuestion },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Clients', path: '/admin/clients', icon: Briefcase },
    { label: 'Services', path: '/admin/services', icon: Layers },
    { label: 'Pricing Plans', path: '/admin/pricing', icon: Tag },
    { label: 'Portfolio', path: '/admin/portfolio', icon: ImageIcon },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Payments', path: '/admin/payments', icon: CreditCard },
    { label: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { label: 'Form Builder', path: '/admin/forms', icon: FileCode2 },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Agency Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-slate-200 bg-white transition-all duration-200 shrink-0 ${
          collapsed ? 'w-18' : 'w-64'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-4">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight font-display text-slate-900">
                ApexFlow<span className="text-indigo-600">.</span>
              </span>
              <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded font-medium">
                Admin
              </span>
            </div>
          ) : (
            <span className="font-bold text-lg text-indigo-600 font-display">A.</span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors cursor-pointer"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Real-time status */}
        <div className="p-3 border-b border-slate-100">
          <div
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              {!collapsed && (
                <span className="text-[11px] font-medium text-slate-600">
                  {isConnected ? 'Live WebSocket Active' : 'Polling'}
                </span>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={() => simulateIncomingEvent()}
                className="text-[10px] text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 cursor-pointer"
                title="Simulate random live incoming lead/event"
              >
                <Sparkles className="w-3 h-3" />
                Simulate
              </button>
            )}
          </div>
        </div>

        {/* Navigation links */}
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
                    ? 'bg-indigo-600 text-white shadow-xs'
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

        {/* Bottom shortcuts */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            {!collapsed && <span>View Public Agency Site</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
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

            {/* Notification bell */}
            <button
              onClick={() => setNotifOpen(true)}
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600" />
              )}
            </button>

            {/* Role switcher widget */}
            <RoleSwitcher />
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
            <div className="relative w-64 bg-white border-r border-slate-200 h-full flex flex-col p-4 z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-base font-display text-slate-900">
                  ApexFlow<span className="text-indigo-600">.</span> Admin
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
                        isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
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
                  <span>Public Agency Site</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main page content container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
};
