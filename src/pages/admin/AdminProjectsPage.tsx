import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Project, ProjectStatus } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import {
  FolderGit2,
  Plus,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  X,
  Edit,
  Save,
  Trash2,
} from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const { success } = useToast();
  const [projects, setProjects] = useState<Project[]>(() => StorageService.getProjects());
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newProject, setNewProject] = useState({
    name: '',
    clientName: '',
    clientEmail: '',
    service: 'Business Websites',
    budget: 1500,
    startDate: new Date().toISOString().split('T')[0],
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    assignedDeveloper: 'Marcus Vance',
    description: '',
  });

  const statuses: ProjectStatus[] = [
    'Inquiry',
    'Planning',
    'Design',
    'Development',
    'Testing',
    'Client Review',
    'Deployment',
    'Completed',
  ];

  const handleUpdateStatus = (proj: Project, newStatus: ProjectStatus) => {
    proj.status = newStatus;
    if (newStatus === 'Completed') proj.progress = 100;
    StorageService.updateProject(proj);
    setProjects([...StorageService.getProjects()]);
    success('Project Updated', `Status changed to ${newStatus}`);
  };

  const handleUpdateProgress = (proj: Project, progress: number) => {
    proj.progress = progress;
    if (progress === 100) proj.status = 'Completed';
    StorageService.updateProject(proj);
    setProjects([...StorageService.getProjects()]);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    StorageService.updateProject(editingProject);
    setProjects([...StorageService.getProjects()]);
    setEditingProject(null);
    success('Project Saved', 'Project specifications updated.');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const created = StorageService.addProject({
      name: newProject.name,
      clientName: newProject.clientName,
      clientEmail: newProject.clientEmail,
      service: newProject.service,
      category: 'Websites',
      budget: Number(newProject.budget),
      startDate: newProject.startDate,
      deadline: newProject.deadline,
      status: 'Planning',
      progress: 10,
      assignedDeveloper: newProject.assignedDeveloper,
      description: newProject.description,
      milestones: [
        { id: `m1-${Date.now()}`, title: 'Discovery & UX Architecture', status: 'in_progress', dueDate: newProject.startDate },
        { id: `m2-${Date.now()}`, title: 'Frontend Engineering & Staging', status: 'pending', dueDate: newProject.deadline },
      ],
      tasks: [],
      files: [],
    });

    setProjects([...StorageService.getProjects()]);
    setIsCreating(false);
    success('Project Initialized', `Project ${created.name} is now live.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Active Sprint Projects</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage timelines, progress percentages, milestone deliverable checklists, and staff assignments.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Client Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-indigo-600 uppercase">
                    {proj.category}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-medium">Client: {proj.clientName} ({proj.clientEmail})</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">{proj.name}</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">{proj.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Budget</span>
                  <span className="font-mono font-bold text-slate-900 text-base">
                    ${proj.budget.toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Timeline</span>
                  <span className="font-mono text-slate-700 font-medium">{proj.deadline}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Lead</span>
                  <span className="font-medium text-slate-800">{proj.assignedDeveloper}</span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={proj.status}
                    onChange={(e) => handleUpdateStatus(proj, e.target.value as ProjectStatus)}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-indigo-600"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setEditingProject({ ...proj })}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                    title="Edit details"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Progress Bar */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Sprint Completion</span>
                <span className="font-mono font-bold text-indigo-600">{proj.progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={proj.progress}
                onChange={(e) => handleUpdateProgress(proj, Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs">
          <form
            onSubmit={handleCreateProject}
            className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">Create New Client Project</h3>
              <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="Apex Luxury E-commerce Redesign"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={newProject.clientName}
                  onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Client Email</label>
                <input
                  type="email"
                  required
                  value={newProject.clientEmail}
                  onChange={(e) => setNewProject({ ...newProject, clientEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Budget ($)</label>
                <input
                  type="number"
                  required
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deadline</label>
                <input
                  type="date"
                  required
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEdit}
            className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">Edit Project Specifications</h3>
              <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Project Title</label>
              <input
                type="text"
                value={editingProject.name}
                onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Description</label>
              <textarea
                rows={3}
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
