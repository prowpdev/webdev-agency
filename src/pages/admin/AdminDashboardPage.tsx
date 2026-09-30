import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { useRealtime } from '../../contexts/RealtimeContext';
import {
  DollarSign,
  FolderGit2,
  Users2,
  TrendingUp,
  FileQuestion,
  CreditCard,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const { navigate } = useNavigation();
  const { isConnected, recentEvents, simulateIncomingEvent } = useRealtime();

  const projects = StorageService.getProjects();
  const leads = StorageService.getLeads();
  const invoices = StorageService.getInvoices();
  const bookings = StorageService.getBookings();

  const totalRevenue = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const outstandingRevenue = invoices
    .filter((i) => i.status === 'Pending')
    .reduce((sum, i) => sum + i.amount, 0);

  const activeProjectsCount = projects.filter((p) => p.status !== 'Completed').length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  // Chart data
  const revenueMonthlyData = [
    { month: 'Apr', revenue: 12400 },
    { month: 'May', revenue: 18200 },
    { month: 'Jun', revenue: 15600 },
    { month: 'Jul', revenue: 24800 },
    { month: 'Aug', revenue: 29500 },
    { month: 'Sep', revenue: 34800 },
  ];

  const serviceRevenueData = [
    { name: 'SaaS Platforms', value: 16500, color: '#4f46e5' },
    { name: 'Web Apps', value: 9200, color: '#0284c7' },
    { name: 'E-commerce', value: 7400, color: '#ec4899' },
    { name: 'Websites', value: 4800, color: '#10b981' },
  ];

  const leadFunnelData = [
    { stage: 'New', count: leads.filter((l) => l.status === 'New').length },
    { stage: 'Contacted', count: leads.filter((l) => l.status === 'Contacted').length || 2 },
    { stage: 'Qualified', count: leads.filter((l) => l.status === 'Qualified').length || 1 },
    { stage: 'Proposal', count: leads.filter((l) => l.status === 'Proposal Sent').length || 1 },
    { stage: 'Won', count: leads.filter((l) => l.status === 'Won').length || 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Executive Agency Overview</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time commercial KPIs, ongoing sprint pipelines, and inbound lead funnels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => simulateIncomingEvent()}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-indigo-600 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Live Event</span>
          </button>

          <button
            onClick={() => navigate('/admin/leads')}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <span>Review Inbound Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-slate-500 text-xs flex items-center justify-between font-medium">
            <span>Total Revenue</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          </span>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              ${(totalRevenue || 34800).toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">+22.4% vs last month</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-slate-500 text-xs flex items-center justify-between font-medium">
            <span>Active Projects</span>
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
          </span>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {activeProjectsCount}
            </div>
            <span className="text-[10px] text-indigo-600 font-semibold">100% On-Track SLA</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-slate-500 text-xs flex items-center justify-between font-medium">
            <span>New Leads</span>
            <Users2 className="w-3.5 h-3.5 text-cyan-600" />
          </span>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {leads.length}
            </div>
            <span className="text-[10px] text-cyan-700 font-semibold">{newLeadsCount} Pending Review</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-slate-500 text-xs flex items-center justify-between font-medium">
            <span>Conversion Rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-pink-600" />
          </span>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              28.4%
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">+4.2% Funnel Lift</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-slate-500 text-xs flex items-center justify-between font-medium">
            <span>Consultations</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </span>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {bookings.length}
            </div>
            <span className="text-[10px] text-amber-700 font-semibold">Discovery Calls</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-slate-500 text-xs flex items-center justify-between font-medium">
            <span>Outstanding</span>
            <CreditCard className="w-3.5 h-3.5 text-rose-600" />
          </span>
          <div className="my-2">
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              ${outstandingRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500">Milestone Invoices</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Velocity Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue Growth & Velocity (USD)</h3>
              <p className="text-[11px] text-slate-500">Monthly contract billings across all service tiers</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              $34,800 Current Run Rate
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueMonthlyData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Service Domain */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Revenue by Service Domain</h3>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {serviceRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            {serviceRevenueData.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-slate-600 truncate">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two columns: Recent Leads & Active Sprints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Inbound Leads */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">Inbound Lead Pipeline</h3>
            <button
              onClick={() => navigate('/admin/leads')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              View CRM
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map((l) => (
              <div
                key={l.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    <span>{l.name}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({l.company})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {l.serviceRequired} · Budget: <span className="font-mono text-slate-800">{l.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      l.status === 'New'
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                        : l.status === 'Won'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {l.status}
                  </span>

                  <button
                    onClick={() => navigate('/admin/leads')}
                    className="p-1 text-slate-400 hover:text-slate-900"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Telemetry */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">Live Realtime Events</h3>
            <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Connected
            </span>
          </div>

          <div className="space-y-3">
            {recentEvents.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Listening for live system webhooks...</p>
            ) : (
              recentEvents.slice(0, 5).map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-900">{ev.title}</span>
                    <span className="text-slate-400 font-mono">
                      {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{ev.detail}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
