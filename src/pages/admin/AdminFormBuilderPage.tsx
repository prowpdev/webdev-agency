import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { CustomForm, FormField, FormFieldType } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { useNavigation } from '../../contexts/NavigationContext';
import {
  FileCode2,
  Plus,
  Trash2,
  Eye,
  Check,
  X,
  ExternalLink,
  Copy,
  ChevronUp,
  ChevronDown,
  Layers,
} from 'lucide-react';

export const AdminFormBuilderPage: React.FC = () => {
  const { success, error } = useToast();
  const { navigate } = useNavigation();
  const [forms, setForms] = useState<CustomForm[]>(() => StorageService.getForms());
  const [selectedForm, setSelectedForm] = useState<CustomForm>(forms[0]);
  const [activeTab, setActiveTab] = useState<'builder' | 'submissions'>('builder');

  const submissions = StorageService.getSubmissions(selectedForm?.id);

  const availableFieldTypes: { type: FormFieldType; label: string }[] = [
    { type: 'text', label: 'Single-line Text' },
    { type: 'textarea', label: 'Multi-line Paragraph' },
    { type: 'email', label: 'Email Address' },
    { type: 'phone', label: 'Phone Number' },
    { type: 'number', label: 'Numeric Value' },
    { type: 'dropdown', label: 'Select Dropdown' },
    { type: 'budget-range', label: 'Budget Range Matrix' },
    { type: 'checkbox', label: 'Checkbox Confirm' },
    { type: 'date', label: 'Date Picker' },
  ];

  const handleAddField = (type: FormFieldType) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type.toUpperCase()} Field`,
      placeholder: `Enter ${type}...`,
      required: true,
      options: type === 'dropdown' || type === 'budget-range' ? ['Option A', 'Option B', 'Option C'] : undefined,
    };

    const updated = {
      ...selectedForm,
      fields: [...selectedForm.fields, newField],
    };

    StorageService.updateForm(updated);
    setSelectedForm(updated);
    setForms([...StorageService.getForms()]);
    success('Field Added', `Added ${newField.label} to form.`);
  };

  const handleRemoveField = (fieldId: string) => {
    const updated = {
      ...selectedForm,
      fields: selectedForm.fields.filter((f) => f.id !== fieldId),
    };
    StorageService.updateForm(updated);
    setSelectedForm(updated);
    setForms([...StorageService.getForms()]);
  };

  const handleUpdateFieldLabel = (fieldId: string, label: string) => {
    const updated = {
      ...selectedForm,
      fields: selectedForm.fields.map((f) => (f.id === fieldId ? { ...f, label } : f)),
    };
    StorageService.updateForm(updated);
    setSelectedForm(updated);
  };

  const handleToggleRequired = (fieldId: string) => {
    const updated = {
      ...selectedForm,
      fields: selectedForm.fields.map((f) =>
        f.id === fieldId ? { ...f, required: !f.required } : f
      ),
    };
    StorageService.updateForm(updated);
    setSelectedForm(updated);
  };

  const handleCreateNewForm = () => {
    const newForm: CustomForm = {
      id: `form-${Date.now()}`,
      title: 'New Service Questionnaire',
      slug: `custom-questionnaire-${Date.now().toString().slice(-4)}`,
      description: 'Custom intake form created by agency administrator.',
      published: true,
      successMessage: 'Thank you! Your information has been registered with our team.',
      createdAt: new Date().toISOString().split('T')[0],
      submissionsCount: 0,
      fields: [
        { id: `f1-${Date.now()}`, type: 'text', label: 'Full Name', required: true },
        { id: `f2-${Date.now()}`, type: 'email', label: 'Email Address', required: true },
        { id: `f3-${Date.now()}`, type: 'textarea', label: 'Project Requirements', required: true },
      ],
    };

    StorageService.updateForm(newForm);
    setForms([...StorageService.getForms()]);
    setSelectedForm(newForm);
    success('Form Created', 'New form template ready for editing.');
  };

  const copyPublicLink = (slug: string) => {
    const url = `${window.location.origin}/#form-view?id=${selectedForm.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      success('Link Copied', 'Public URL copied to clipboard.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Dynamic Intake Form Builder</h2>
          <p className="text-xs text-slate-500 mt-1">
            Construct bespoke client intake surveys, RFPs, and audit funnels with instant public links and CRM sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateNewForm}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Form</span>
          </button>
        </div>
      </div>

      {/* Form Selector & Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Active Form:</span>
          <select
            value={selectedForm.id}
            onChange={(e) => {
              const f = forms.find((item) => item.id === e.target.value);
              if (f) setSelectedForm(f);
            }}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
          >
            {forms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.title} ({f.submissionsCount || 0} submissions)
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'builder' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fields Editor
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'submissions' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Submissions ({submissions.length})
            </button>
          </div>

          <button
            onClick={() => copyPublicLink(selectedForm.slug)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            title="Copy shareable link"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Share URL</span>
          </button>

          <button
            onClick={() => navigate('/form-view', { id: selectedForm.id })}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Public View</span>
          </button>
        </div>
      </div>

      {activeTab === 'builder' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Fields list */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Form Fields Hierarchy ({selectedForm.fields.length})
              </h3>

              <div className="space-y-3">
                {selectedForm.fields.map((field, idx) => (
                  <div
                    key={field.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="font-mono text-slate-400 font-bold text-[11px]">
                        0{idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => handleUpdateFieldLabel(field.id, e.target.value)}
                          className="w-full bg-transparent font-semibold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-indigo-600 focus:outline-none py-0.5"
                        />
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-0.5">
                          Type: {field.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={() => handleToggleRequired(field.id)}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-[11px] text-slate-600">Required</span>
                      </label>

                      <button
                        onClick={() => handleRemoveField(field.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                        title="Delete Field"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Field Palette */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Add Field Component
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {availableFieldTypes.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddField(item.type)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 text-slate-700 hover:text-indigo-900 border border-slate-200 transition-colors text-xs font-semibold text-left cursor-pointer"
                >
                  <span>+ {item.label}</span>
                  <span className="text-[10px] font-mono text-slate-400">{item.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Submissions tab */
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recorded Responses ({submissions.length})
          </h3>

          {submissions.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No submissions recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-500">
                    <span className="font-mono text-indigo-600 font-semibold">{sub.id}</span>
                    <span className="text-[11px]">{new Date(sub.submittedAt).toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(sub.data).map(([key, val]) => (
                      <div key={key} className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-500 block capitalize">
                          {key.replace(/^f_/, '').replace(/_/g, ' ')}
                        </span>
                        <span className="text-slate-900 font-medium">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
