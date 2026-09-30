import React from 'react';
import { StorageService } from '../../services/storageService';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const settings = StorageService.getSettings();
  const leads = StorageService.getLeads();
  const invoices = StorageService.getInvoices();

  const leadsBySource = [
    { name: 'Google Organic / SEO', count: 18, color: '#4f46e5' },
    { name: 'Client Referral', count: 12, color: '#10b981' },
    { name: 'LinkedIn B2B', count: 8, color: '#0284c7' },
    { name: 'Direct Public Site', count: 7, color: '#f59e0b' },
  ];

  const durationData = [
    { category: 'Websites', avgDays: 14 },
    { category: 'E-commerce', avgDays: 22 },
    { category: 'Web Apps', avgDays: 34 },
    { category: 'SaaS Platforms', avgDays: 48 },
  ];

  const quarterlyComparison = [
    { quarter: 'Q1 2026', revenue: 48000, leads: 24 },
    { quarter: 'Q2 2026', revenue: 64000, leads: 32 },
    { quarter: 'Q3 2026', revenue: 89000, leads: 45 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Financial & Lead Analytics</h2>
        <p className="text-xs text-slate-500 mt-1">
          Quantitative telemetry covering client acquisition funnels, delivery velocity, and revenue distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quarterly Growth */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Quarterly Revenue Expansion ($ USD)</h3>
              <p className="text-[11px] text-slate-500">Audited pipeline delivery</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +39% QoQ Growth
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyComparison}>
                <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={11} tickLine={false} />
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
                <Bar dataKey="revenue" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">Inbound Lead Attribution</h3>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadsBySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {leadsBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            {leadsBySource.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-700 font-medium">{s.name}</span>
                </div>
                <span className="font-mono text-slate-500 font-bold">{s.count} leads</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Average Project Velocity */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display">Average Delivery Duration by Category (Calendar Days)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {durationData.map((d) => (
            <div key={d.category} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">{d.category}</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{d.avgDays} Days</div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">SLA Compliant</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
