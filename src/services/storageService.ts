import {
  AgencySettings,
  BlogArticle,
  Booking,
  ChatMessage,
  Conversation,
  CustomForm,
  FAQItem,
  FormSubmission,
  Invoice,
  Lead,
  NotificationItem,
  PortfolioItem,
  PricingPackage,
  Project,
  ServiceItem,
  Testimonial,
  User,
} from '../types';
import {
  INITIAL_AGENCY_SETTINGS,
  INITIAL_BLOG,
  INITIAL_BOOKINGS,
  INITIAL_CONVERSATIONS,
  INITIAL_FAQS,
  INITIAL_FORMS,
  INITIAL_INVOICES,
  INITIAL_LEADS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PORTFOLIO,
  INITIAL_PRICING,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_USERS,
} from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'apexflow_users',
  SETTINGS: 'apexflow_settings',
  SERVICES: 'apexflow_services',
  PRICING: 'apexflow_pricing',
  PORTFOLIO: 'apexflow_portfolio',
  LEADS: 'apexflow_leads',
  PROJECTS: 'apexflow_projects',
  INVOICES: 'apexflow_invoices',
  BOOKINGS: 'apexflow_bookings',
  CONVERSATIONS: 'apexflow_conversations',
  MESSAGES: 'apexflow_messages',
  NOTIFICATIONS: 'apexflow_notifications',
  FORMS: 'apexflow_forms',
  SUBMISSIONS: 'apexflow_submissions',
  TESTIMONIALS: 'apexflow_testimonials',
  FAQS: 'apexflow_faqs',
  BLOG: 'apexflow_blog',
};

function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to read ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStoredItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('apexflow-storage-change', { detail: { key } }));
  } catch (err) {
    console.error(`Failed to write ${key} to localStorage:`, err);
  }
}

export const StorageService = {
  // Users
  getUsers: (): User[] => getStoredItem(STORAGE_KEYS.USERS, INITIAL_USERS),
  saveUsers: (users: User[]) => setStoredItem(STORAGE_KEYS.USERS, users),

  // Agency Settings
  getSettings: (): AgencySettings => getStoredItem(STORAGE_KEYS.SETTINGS, INITIAL_AGENCY_SETTINGS),
  updateSettings: (settings: AgencySettings) => setStoredItem(STORAGE_KEYS.SETTINGS, settings),

  // Services
  getServices: (): ServiceItem[] => getStoredItem(STORAGE_KEYS.SERVICES, INITIAL_SERVICES),
  saveServices: (services: ServiceItem[]) => setStoredItem(STORAGE_KEYS.SERVICES, services),
  updateService: (updated: ServiceItem) => {
    const list = StorageService.getServices();
    const idx = list.findIndex((s) => s.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.push(updated);
    }
    StorageService.saveServices(list);
  },

  // Pricing
  getPricing: (): PricingPackage[] => getStoredItem(STORAGE_KEYS.PRICING, INITIAL_PRICING),
  savePricing: (pricing: PricingPackage[]) => setStoredItem(STORAGE_KEYS.PRICING, pricing),
  updatePricing: (pkg: PricingPackage) => {
    const list = StorageService.getPricing();
    const idx = list.findIndex((p) => p.id === pkg.id);
    if (idx >= 0) {
      list[idx] = pkg;
    } else {
      list.push(pkg);
    }
    StorageService.savePricing(list);
  },

  // Portfolio
  getPortfolio: (): PortfolioItem[] => getStoredItem(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO),
  savePortfolio: (portfolio: PortfolioItem[]) => setStoredItem(STORAGE_KEYS.PORTFOLIO, portfolio),
  updatePortfolioItem: (item: PortfolioItem) => {
    const list = StorageService.getPortfolio();
    const idx = list.findIndex((p) => p.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    StorageService.savePortfolio(list);
  },
  deletePortfolioItem: (id: string) => {
    const list = StorageService.getPortfolio().filter((p) => p.id !== id);
    StorageService.savePortfolio(list);
  },

  // Leads
  getLeads: (): Lead[] => getStoredItem(STORAGE_KEYS.LEADS, INITIAL_LEADS),
  saveLeads: (leads: Lead[]) => setStoredItem(STORAGE_KEYS.LEADS, leads),
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>): Lead => {
    const leads = StorageService.getLeads();
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: lead.status || 'New',
    };
    leads.unshift(newLead);
    StorageService.saveLeads(leads);

    // Also trigger in-app notification
    StorageService.addNotification({
      category: 'inquiry',
      title: 'New Lead Inbound',
      message: `${newLead.name} (${newLead.company || 'Private'}) requested a quote for ${newLead.serviceRequired}.`,
      link: '/admin/leads',
    });

    return newLead;
  },
  updateLead: (updated: Lead) => {
    const list = StorageService.getLeads();
    const idx = list.findIndex((l) => l.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
      StorageService.saveLeads(list);
    }
  },

  // Projects
  getProjects: (): Project[] => getStoredItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS),
  saveProjects: (projects: Project[]) => setStoredItem(STORAGE_KEYS.PROJECTS, projects),
  updateProject: (project: Project) => {
    const list = StorageService.getProjects();
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      list[idx] = project;
    } else {
      list.unshift(project);
    }
    StorageService.saveProjects(list);
  },
  addProject: (
    project: Omit<Project, 'id' | 'milestones' | 'tasks' | 'files'> & {
      milestones?: Project['milestones'];
      tasks?: Project['tasks'];
      files?: Project['files'];
    }
  ): Project => {
    const list = StorageService.getProjects();
    const newProj: Project = {
      ...project,
      milestones: project.milestones || [],
      tasks: project.tasks || [],
      files: project.files || [],
      id: `proj-${Date.now()}`,
    };
    list.unshift(newProj);
    StorageService.saveProjects(list);

    StorageService.addNotification({
      category: 'project',
      title: 'Project Initiated',
      message: `Project "${newProj.name}" has been created for ${newProj.clientName}.`,
      link: `/admin/projects`,
    });

    return newProj;
  },

  // Inquiries helper
  addInquiry: (inquiryData: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
    service?: string;
    budget?: string;
    timeline?: string;
    message?: string;
  }) => {
    return StorageService.addLead({
      name: inquiryData.name,
      company: inquiryData.company || 'Direct Inquiry',
      email: inquiryData.email,
      phone: inquiryData.phone || '',
      serviceRequired: inquiryData.service || 'Web Development',
      budget: inquiryData.budget || '$3,000 - $5,000',
      timeline: inquiryData.timeline || '1 - 2 Months',
      description: inquiryData.message || '',
      status: 'New',
      source: 'Inbound Contact Form',
    });
  },

  // Orders helper
  addOrder: (orderData: any) => {
    StorageService.addNotification({
      category: 'payment',
      title: 'New Service Order Paid',
      message: `Order received from ${orderData.customerName} for ${orderData.serviceName} ($${orderData.total}).`,
      link: '/admin/orders',
    });
    return orderData;
  },

  // Invoices
  getInvoices: (): Invoice[] => getStoredItem(STORAGE_KEYS.INVOICES, INITIAL_INVOICES),
  saveInvoices: (invoices: Invoice[]) => setStoredItem(STORAGE_KEYS.INVOICES, invoices),
  markInvoicePaid: (invoiceId: string) => {
    const list = StorageService.getInvoices();
    const inv = list.find((i) => i.id === invoiceId);
    if (inv) {
      inv.status = 'Paid';
      inv.paidAt = new Date().toISOString();
      StorageService.saveInvoices(list);

      StorageService.addNotification({
        category: 'payment',
        title: 'Payment Received',
        message: `Invoice ${inv.invoiceNumber} ($${inv.amount.toLocaleString()}) was successfully paid.`,
        link: '/admin/payments',
      });
    }
  },
  addInvoice: (invoice: Omit<Invoice, 'id'>): Invoice => {
    const list = StorageService.getInvoices();
    const newInv: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`,
    };
    list.unshift(newInv);
    StorageService.saveInvoices(list);
    return newInv;
  },

  // Bookings
  getBookings: (): Booking[] => getStoredItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS),
  saveBookings: (bookings: Booking[]) => setStoredItem(STORAGE_KEYS.BOOKINGS, bookings),
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const list = StorageService.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newBooking);
    StorageService.saveBookings(list);

    StorageService.addNotification({
      category: 'booking',
      title: 'New Consultation Booked',
      message: `${newBooking.clientName} booked a ${newBooking.meetingType} on ${newBooking.date} at ${newBooking.time}.`,
      link: '/admin/bookings',
    });

    return newBooking;
  },
  updateBooking: (updated: Booking) => {
    const list = StorageService.getBookings();
    const idx = list.findIndex((b) => b.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
      StorageService.saveBookings(list);
    }
  },

  // Conversations & Messages
  getConversations: (): Conversation[] => getStoredItem(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS),
  saveConversations: (convs: Conversation[]) => setStoredItem(STORAGE_KEYS.CONVERSATIONS, convs),
  getMessages: (conversationId: string): ChatMessage[] => {
    const all = getStoredItem<Record<string, ChatMessage[]>>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    return all[conversationId] || [];
  },
  sendMessage: (
    conversationId: string,
    message: Omit<ChatMessage, 'id' | 'timestamp' | 'read' | 'conversationId'>
  ): ChatMessage => {
    const all = getStoredItem<Record<string, ChatMessage[]>>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    const convMessages = all[conversationId] || [];
    const newMsg: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      conversationId,
      timestamp: new Date().toISOString(),
      read: false,
    };
    convMessages.push(newMsg);
    all[conversationId] = convMessages;
    setStoredItem(STORAGE_KEYS.MESSAGES, all);

    // Update conversation last message
    const convs = StorageService.getConversations();
    const conv = convs.find((c) => c.id === conversationId);
    if (conv) {
      conv.lastMessage = newMsg.content;
      conv.lastMessageTime = newMsg.timestamp;
      StorageService.saveConversations(convs);
    }

    return newMsg;
  },

  // Notifications
  getNotifications: (): NotificationItem[] => getStoredItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS),
  saveNotifications: (notifs: NotificationItem[]) => setStoredItem(STORAGE_KEYS.NOTIFICATIONS, notifs),
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const list = StorageService.getNotifications();
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    list.unshift(newNotif);
    StorageService.saveNotifications(list);
  },
  markNotificationRead: (id: string) => {
    const list = StorageService.getNotifications();
    const notif = list.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      StorageService.saveNotifications(list);
    }
  },
  markAllNotificationsRead: () => {
    const list = StorageService.getNotifications().map((n) => ({ ...n, read: true }));
    StorageService.saveNotifications(list);
  },

  // Custom Forms
  getForms: (): CustomForm[] => getStoredItem(STORAGE_KEYS.FORMS, INITIAL_FORMS),
  saveForms: (forms: CustomForm[]) => setStoredItem(STORAGE_KEYS.FORMS, forms),
  updateForm: (form: CustomForm) => {
    const list = StorageService.getForms();
    const idx = list.findIndex((f) => f.id === form.id);
    if (idx >= 0) {
      list[idx] = form;
    } else {
      list.push(form);
    }
    StorageService.saveForms(list);
  },
  deleteForm: (id: string) => {
    const list = StorageService.getForms().filter((f) => f.id !== id);
    StorageService.saveForms(list);
  },
  getSubmissions: (formId?: string): FormSubmission[] => {
    const all = getStoredItem<FormSubmission[]>(STORAGE_KEYS.SUBMISSIONS, [
      {
        id: 'sub-1',
        formId: 'form-website-audit',
        formTitle: 'Free Website Performance & CRO Audit',
        submittedAt: '2026-09-26T14:12:00Z',
        data: {
          fa_url: 'https://vanguard-supply.eu',
          fa_email: 'markus@vanguard-supply.eu',
          fa_biggest_pain: 'Slow page load times on mobile',
        },
      },
    ]);
    if (formId) return all.filter((s) => s.formId === formId);
    return all;
  },
  addSubmission: (formId: string, formTitle: string, data: Record<string, any>) => {
    const all = StorageService.getSubmissions();
    const newSub: FormSubmission = {
      id: `sub-${Date.now()}`,
      formId,
      formTitle,
      submittedAt: new Date().toISOString(),
      data,
    };
    all.unshift(newSub);
    setStoredItem(STORAGE_KEYS.SUBMISSIONS, all);

    // Increment count on form
    const forms = StorageService.getForms();
    const form = forms.find((f) => f.id === formId);
    if (form) {
      form.submissionsCount = (form.submissionsCount || 0) + 1;
      StorageService.saveForms(forms);
    }

    StorageService.addNotification({
      category: 'inquiry',
      title: 'New Form Submission',
      message: `New entry received on "${formTitle}".`,
      link: '/admin/forms',
    });

    return newSub;
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => getStoredItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS),
  saveTestimonials: (items: Testimonial[]) => setStoredItem(STORAGE_KEYS.TESTIMONIALS, items),

  // FAQs
  getFAQs: (): FAQItem[] => getStoredItem(STORAGE_KEYS.FAQS, INITIAL_FAQS),
  saveFAQs: (items: FAQItem[]) => setStoredItem(STORAGE_KEYS.FAQS, items),

  // Blog
  getBlog: (): BlogArticle[] => getStoredItem(STORAGE_KEYS.BLOG, INITIAL_BLOG),
  saveBlog: (items: BlogArticle[]) => setStoredItem(STORAGE_KEYS.BLOG, items),

  // Reset to default factory state
  resetAll: () => {
    localStorage.clear();
    window.location.reload();
  },
};
