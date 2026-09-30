import React, { useState } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  Paperclip,
  Clock,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  Globe,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { params, navigate } = useNavigation();
  const { success, error } = useToast();

  const servicesList = [
    'Business Websites',
    'E-commerce Development',
    'Custom Web Applications',
    'SaaS Development',
    'UI/UX Design',
    'Website Redesign',
    'WordPress Development',
    'Shopify Development',
    'Maintenance & Support',
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $20,000',
    '$20,000+',
  ];

  const timelines = [
    'Immediate (within 2 weeks)',
    '1 Month',
    '2 - 3 Months',
    'Flexible / Planning Phase',
  ];

  const contactMethods = ['Email', 'Phone Call', 'WhatsApp', 'Video Call (Google Meet)'];

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    serviceRequired: params.service || 'Business Websites',
    budget: '$2,500 - $5,000',
    timeline: '1 Month',
    description: params.projectInspiration ? `Inquired about project similar to: ${params.projectInspiration}` : '',
    preferredMethod: 'Email',
    additionalRequirements: '',
  });

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      error('Missing Information', 'Please provide your name, email, and project description.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Create lead in CRM with status "New"
      const newLead = StorageService.addLead({
        name: formData.name,
        company: formData.company || 'Independent',
        email: formData.email,
        phone: formData.phone || 'N/A',
        website: formData.website || undefined,
        serviceRequired: formData.serviceRequired,
        budget: formData.budget,
        timeline: formData.timeline,
        description: formData.description + (formData.additionalRequirements ? `\n\nNotes: ${formData.additionalRequirements}` : ''),
        status: 'New',
        source: 'Website Contact Page',
        value: formData.budget.includes('20,000') ? 20000 : formData.budget.includes('10,000') ? 12000 : 3500,
        notes: [
          `Lead generated via inbound contact funnel on ${new Date().toLocaleDateString()}. Preferred contact: ${formData.preferredMethod}.`,
          uploadedFile ? `Attached client asset file: ${uploadedFile}` : 'No files attached.',
        ],
      });

      // 2. Also register in Inquiries
      StorageService.addInquiry({
        name: formData.name,
        company: formData.company || 'N/A',
        email: formData.email,
        phone: formData.phone || undefined,
        service: formData.serviceRequired,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.description,
      });

      // 3. Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsSubmitting(false);
      setSubmittedLeadId(newLead.id);
      success(
        'Project Inquiry Dispatched',
        'Thank you! We have sent a confirmation email and will respond within 24 hours.'
      );
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      success('File Attached', `${file.name} ready for submission.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Start Your Project</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          Let's Architect Your Next Digital Advantage
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Provide your specifications below. We review every brief thoroughly and reply with a fixed-scope assessment,
          milestone timeline, and transparent pricing in under 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Container */}
        <div className="lg:col-span-8">
          {submittedLeadId ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-md text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                  Inquiry Received & Logged
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. A technical architect has
                  been notified, and a confirmation receipt has been sent to{' '}
                  <span className="text-indigo-600 font-medium">{formData.email}</span>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tracking Reference:</span>
                  <span className="font-mono font-bold text-slate-900">REF-{submittedLeadId.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service Track:</span>
                  <span className="font-medium text-slate-900">{formData.serviceRequired}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Budget:</span>
                  <span className="font-mono text-slate-900">{formData.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Response SLA:</span>
                  <span className="font-semibold text-emerald-700">&lt; 24 Hours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => navigate('/portal')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
                >
                  Access Client Portal Preview
                </button>
                <button
                  onClick={() => {
                    setSubmittedLeadId(null);
                    setFormData({
                      ...formData,
                      name: '',
                      company: '',
                      email: '',
                      phone: '',
                      description: '',
                    });
                  }}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-semibold text-xs rounded-xl transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
              {/* Personal / Company info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  01. Client & Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Katherine Pierce"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Company or Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Omnikin Technologies"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="katherine@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Website (if applicable)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourbrand.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Scope */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  02. Project Scope & Investment
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service Required</label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    >
                      {servicesList.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    >
                      {timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Preferred Contact Method
                    </label>
                    <select
                      value={formData.preferredMethod}
                      onChange={(e) => setFormData({ ...formData, preferredMethod: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                    >
                      {contactMethods.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Vision & Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your goals, required features, target users, or any benchmark websites you admire..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Attach Brand Asset / Specification Document (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer transition-colors shadow-2xs">
                      <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                      <span>{uploadedFile ? 'Change File' : 'Upload Brief / Wireframe / PDF'}</span>
                      <input type="file" onChange={handleFileUpload} className="hidden" />
                    </label>
                    {uploadedFile && (
                      <span className="text-xs text-emerald-700 font-mono flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {uploadedFile}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500">
                  Zero spam. Your project information is held strictly confidential under NDA.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Send Project Brief</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Direct Agency Contact</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>contact@apexflow.agency</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>+1 (415) 890-3421</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                <span>San Francisco, California</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>What Happens Next?</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-indigo-600">1.</span>
                <span>An architect audits your specifications and tech constraints.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-indigo-600">2.</span>
                <span>We generate an itemized fixed-price milestone estimate.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-indigo-600">3.</span>
                <span>We invite you to a 30-min discovery call to refine details.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 space-y-3">
            <h4 className="text-sm font-bold text-indigo-950 font-display">Prefer an immediate video chat?</h4>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Book a live 30-minute discovery call directly on our engineering calendar.
            </p>
            <button
              onClick={() => navigate('/book')}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Schedule Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
