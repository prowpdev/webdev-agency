import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { CheckCircle2, Clock, CircleDot, Sparkles, ArrowRight } from 'lucide-react';

export const ClientTimelinePage: React.FC = () => {
  const { currentUser } = useAuth();
  const allProjects = StorageService.getProjects();
  const project =
    allProjects.find(
      (p) =>
        p.clientId === currentUser?.id ||
        p.clientEmail.toLowerCase() === currentUser?.email.toLowerCase()
    ) || allProjects[0];

  const standardStages = [
    { name: 'Inquiry & Scoping', desc: 'Requirements verification & proposal agreement' },
    { name: 'Planning & Architecture', desc: 'ERD schema, wireframes & milestone mapping' },
    { name: 'Bespoke UI/UX Design', desc: 'Design system, Figma prototyping & WCAG AA review' },
    { name: 'Full-Stack Development', desc: 'Type-safe React engineering & API integration' },
    { name: 'Testing & Hardening', desc: 'Core Web Vitals 95+ audit & cross-device checks' },
    { name: 'Client Review & Staging', desc: 'Private sandbox verification & final sign-off' },
    { name: 'Production Deployment', desc: 'DNS cutover, SSL provisioning & search indexing' },
    { name: 'Completed & Warranty', desc: 'Source code handover & 60-day warranty care' },
  ];

  const stageIndexMap: Record<string, number> = {
    Inquiry: 0,
    Planning: 1,
    Design: 2,
    Development: 3,
    Testing: 4,
    'Client Review': 5,
    Deployment: 6,
    Completed: 7,
  };

  const currentStageIdx = stageIndexMap[project?.status] ?? 3;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Interactive Project Timeline</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time delivery progress for{' '}
            <span className="text-indigo-600 font-semibold">{project?.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Target Deadline:</span>
          <span className="text-slate-900 font-mono font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            {project?.deadline}
          </span>
        </div>
      </div>

      {/* Visual Timeline Cards */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
          {standardStages.map((stage, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            const isUpcoming = idx > currentStageIdx;

            return (
              <div key={stage.name} className="relative flex items-start gap-6 group">
                {/* Node icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border transition-all ${
                    isCompleted
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                      : isCurrent
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-4 ring-indigo-100'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <CircleDot className="w-5 h-5" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-indigo-50/40 border-indigo-300 shadow-xs'
                      : isCompleted
                      ? 'bg-white border-slate-200 shadow-2xs'
                      : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">STAGE 0{idx + 1}</span>
                      <h4 className={`text-base font-bold ${isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                        {stage.name}
                      </h4>
                    </div>

                    {isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
                        In Progress Now
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-emerald-700 text-xs font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
