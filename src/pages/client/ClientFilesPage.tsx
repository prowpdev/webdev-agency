import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { ProjectFile } from '../../types';
import {
  UploadCloud,
  FileText,
  Download,
  Trash2,
  Paperclip,
  CheckCircle2,
  FolderOpen,
} from 'lucide-react';

export const ClientFilesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { success, error } = useToast();
  const allProjects = StorageService.getProjects();

  const project =
    allProjects.find(
      (p) =>
        p.clientId === currentUser?.id ||
        p.clientEmail.toLowerCase() === currentUser?.email.toLowerCase()
    ) || allProjects[0];

  const [files, setFiles] = useState<ProjectFile[]>(() => project?.files || []);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [uploadCategory, setUploadCategory] = useState<ProjectFile['category']>('Asset');

  const categories = ['All', 'Asset', 'Design', 'Contract', 'Deliverable'];

  const filteredFiles =
    activeCategory === 'All'
      ? files
      : files.filter((f) => f.category === activeCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFile: ProjectFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedBy: currentUser?.name || 'Client',
      uploadedAt: new Date().toISOString().split('T')[0],
      category: uploadCategory,
    };

    const updatedFiles = [newFile, ...files];
    setFiles(updatedFiles);

    // Save to project
    if (project) {
      project.files = updatedFiles;
      StorageService.updateProject(project);
    }

    success('File Uploaded', `${file.name} added to ${project?.name} repository.`);
  };

  const handleDownload = (fileName: string) => {
    success('Download Initiated', `Downloading ${fileName}...`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Files & Deliverables</h2>
          <p className="text-xs text-slate-500 mt-1">
            Exchange high-resolution brand assets, Figma exports, contracts, and production builds.
          </p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors self-start sm:self-auto shadow-xs">
          <UploadCloud className="w-4 h-4" />
          <span>Upload Project Asset</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-indigo-600">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  {file.category}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 truncate" title={file.name}>
                {file.name}
              </h4>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <span>{file.size}</span>
                <span>{file.uploadedAt}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">By {file.uploadedBy}</span>
              <button
                onClick={() => handleDownload(file.name)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Download File"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
