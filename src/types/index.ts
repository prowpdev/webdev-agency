export type ProjectCategory = 'Websites' | 'E-commerce' | 'SaaS' | 'Web Apps' | 'UI/UX';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Won'
  | 'Lost'
  | 'Archived';

export type ProjectStatus =
  | 'Inquiry'
  | 'Planning'
  | 'Design'
  | 'Development'
  | 'Testing'
  | 'Client Review'
  | 'Deployment'
  | 'Completed';

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Rescheduled' | 'Completed' | 'Cancelled';

export type UserRole = 'Client' | 'Admin' | 'Manager' | 'Developer' | 'Sales' | 'Support';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatar?: string;
  phone?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  shortDesc: string;
  fullDesc: string;
  description?: string;
  iconName: string;
  startingPrice: number;
  deliveryTime: string;
  features: string[];
  popular?: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  billingPeriod?: 'one-time' | 'monthly';
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
  deliveryTime: string;
  recommendedFor: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  category: ProjectCategory;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  featured?: boolean;
  completedDate: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  serviceRequired: string;
  budget: string;
  timeline: string;
  description: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
  notes?: string[];
  value?: number;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  completed?: boolean;
  dueDate: string;
  description?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  category: 'Asset' | 'Design' | 'Contract' | 'Deliverable';
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  clientEmail: string;
  clientId?: string;
  service: string;
  category: ProjectCategory;
  budget: number;
  startDate: string;
  deadline: string;
  status: ProjectStatus;
  progress: number; // 0 to 100
  assignedDeveloper: string;
  description: string;
  milestones: ProjectMilestone[];
  tasks: ProjectTask[];
  files: ProjectFile[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  projectName: string;
  clientName: string;
  clientEmail: string;
  clientId?: string;
  clientCompany?: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: { description: string; quantity: number; unitPrice: number; total: number }[];
  paidAt?: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  serviceType: string;
  meetingType: 'Discovery Call' | 'Project Kickoff' | 'Design Review' | 'Development Review';
  date: string;
  time: string;
  timezone: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface MessageAttachment {
  name: string;
  size: string;
  type: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'agency';
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: MessageAttachment[];
}

export interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  projectId?: string;
  projectName?: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'phone'
  | 'number'
  | 'dropdown'
  | 'multi-select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'file'
  | 'budget-range';

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  defaultValue?: string;
  helpText?: string;
}

export interface CustomForm {
  id: string;
  title: string;
  slug: string;
  description: string;
  fields: FormField[];
  assignedService?: string;
  published: boolean;
  successMessage: string;
  createdAt: string;
  submissionsCount: number;
}

export interface FormSubmission {
  id: string;
  formId: string;
  formTitle: string;
  submittedAt: string;
  data: Record<string, any>;
  ipAddress?: string;
}

export interface NotificationItem {
  id: string;
  category: 'inquiry' | 'project' | 'payment' | 'booking' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Testimonial {
  id: string;
  client: string;
  company: string;
  position: string;
  photoUrl?: string;
  testimonial: string;
  rating: number;
  featured: boolean;
  serviceProvided: string;
  projectResult: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'Pricing' | 'Technology' | 'Support';
  displayOrder: number;
  published: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  author: { name: string; role: string; avatar: string };
  coverImage?: string;
}

export interface CheckoutAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export interface AgencyStats {
  projectsCompleted: number;
  businessesServed: number;
  countriesServed: number;
  yearsExperience: number;
  satisfactionRate: number;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  address: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  stats: AgencyStats;
  socials: {
    github: string;
    linkedin: string;
    x: string;
    dribbble: string;
  };
}
