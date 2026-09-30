import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { useNavigation } from '../../contexts/NavigationContext';
import { CheckCircle2, Clock, Calendar, User, ArrowRight, Layers } from 'lucide-react';

export const ClientProjectsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { navigate } = useNavigation();
  const allProjects = StorageService.getProjects();

  const clientProjects =
    allProjects.filter(
      (p) =>
        p.clientId === currentUser?.id ||
        p.clientEmail.toLowerCase() === currentUser?.email.toLowerCase()
    ) || allProjects;

  const displayProjects = clientProjects.length > 0 ? clientProjects : allProjects;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Your Active Projects</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track milestones, code deliverables, staging URLs, and developer assignments.
          </p>
        </div>
        <button
          onClick={() => navigate('/services')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold self-start sm:self-auto cursor-pointer shadow-xs"
        >
          Commission New Project
        </button>
      </div>

      <div className="space-y-6">
        {displayProjects.map((project) => (
          <div
            key={project.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {project.status}
                  </span>
                  <span className="text-xs text-slate-500">Category: {project.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{project.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="text-left sm:text-right text-xs shrink-0">
                <span className="text-slate-400 block text-[11px]">Investment</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  ${project.budget.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Assigned: <span className="text-slate-800 font-medium">{project.assignedDeveloper}</span>
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Milestone Progress</span>
                <span className="font-mono font-bold text-indigo-600">{project.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Milestones list */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Project Milestones ({project.milestones.filter((m) => m.status === 'completed' || m.completed).length}/
                {project.milestones.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.milestones.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 transition-colors ${
                      m.status === 'completed' || m.completed
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                        : m.status === 'in_progress'
                        ? 'bg-indigo-50/60 border-indigo-200 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        m.status === 'completed' || m.completed
                          ? 'text-emerald-600'
                          : m.status === 'in_progress'
                          ? 'text-indigo-600'
                          : 'text-slate-300'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{m.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{m.dueDate}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigate('/portal/timeline')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
              >
                <span>Interactive Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/portal/messages')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900"
              >
                Message Lead Architect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
