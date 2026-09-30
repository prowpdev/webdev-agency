import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, ArrowLeft, FileText, Send } from 'lucide-react';

export const FormViewPage: React.FC = () => {
  const { params, navigate } = useNavigation();
  const { success, error } = useToast();
  const forms = StorageService.getForms();

  const form = forms.find((f) => f.id === params.id || f.slug === params.id) || forms[0];

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!form) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center text-slate-500">
        <p>Form not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 underline">
          Return home
        </button>
      </div>
    );
  }

  const handleChange = (fieldId: string, val: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check required fields
    for (const field of form.fields) {
      if (field.required && !formData[field.id]) {
        error('Missing Field', `Please complete the required field "${field.label}"`);
        return;
      }
    }

    StorageService.addSubmission(form.id, form.title, formData);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setSubmitted(true);
    success('Submission Received', 'Your form responses have been logged.');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to ApexFlow Home</span>
      </button>

      {submitted ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-300 shadow-md text-center space-y-5 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">Submission Received</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            {form.successMessage || 'Thank you! Your submission has been securely recorded.'}
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({});
              }}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
            >
              Submit Another Response
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold mb-2">
              <FileText className="w-4 h-4" />
              <span>ApexFlow Interactive Intake</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">{form.title}</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{form.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pt-4 border-t border-slate-100">
            {form.fields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>

                {field.type === 'text' && (
                  <input
                    type="text"
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    rows={4}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                )}

                {field.type === 'email' && (
                  <input
                    type="email"
                    required={field.required}
                    placeholder={field.placeholder || 'email@company.com'}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                )}

                {field.type === 'dropdown' && (
                  <select
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  >
                    <option value="">Select an option...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === 'radio' && (
                  <div className="space-y-2 pt-1">
                    {field.options?.map((opt) => (
                      <label key={opt} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name={field.id}
                          value={opt}
                          checked={formData[field.id] === opt}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.type === 'checkbox' && (
                  <div className="space-y-2 pt-1">
                    {field.options?.map((opt) => {
                      const currentVals = (formData[field.id] as string[]) || [];
                      const isChecked = currentVals.includes(opt);
                      return (
                        <label key={opt} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleChange(field.id, [...currentVals, opt]);
                              } else {
                                handleChange(
                                  field.id,
                                  currentVals.filter((v) => v !== opt)
                                );
                              }
                            }}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Response is recorded in agency CRM.</span>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Submit Intake Form</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
