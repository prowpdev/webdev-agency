import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { RealtimeProvider } from './contexts/RealtimeContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';

// Layouts
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingContactButton } from './components/common/FloatingContactButton';
import { AdminLayout } from './components/layout/AdminLayout';
import { ClientLayout } from './components/layout/ClientLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { PricingPage } from './pages/public/PricingPage';
import { PortfolioPage } from './pages/public/PortfolioPage';
import { CaseStudyPage } from './pages/public/CaseStudyPage';
import { ProcessPage } from './pages/public/ProcessPage';
import { AboutPage } from './pages/public/AboutPage';
import { BlogPage } from './pages/public/BlogPage';
import { BlogPostPage } from './pages/public/BlogPostPage';
import { ContactPage } from './pages/public/ContactPage';
import { CheckoutPage } from './pages/public/CheckoutPage';
import { BookingPage } from './pages/public/BookingPage';
import { FormViewPage } from './pages/public/FormViewPage';

// Client Portal Pages
import { ClientDashboardPage } from './pages/client/ClientDashboardPage';
import { ClientProjectsPage } from './pages/client/ClientProjectsPage';
import { ClientTimelinePage } from './pages/client/ClientTimelinePage';
import { ClientFilesPage } from './pages/client/ClientFilesPage';
import { ClientMessagesPage } from './pages/client/ClientMessagesPage';
import { ClientInvoicesPage } from './pages/client/ClientInvoicesPage';
import { ClientProfilePage } from './pages/client/ClientProfilePage';

// Admin Dashboard Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminPricingPage } from './pages/admin/AdminPricingPage';
import { AdminPortfolioPage } from './pages/admin/AdminPortfolioPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminFormBuilderPage } from './pages/admin/AdminFormBuilderPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

const AppContent: React.FC = () => {
  const { route } = useNavigation();

  // 1. Admin Dashboard Routes
  if (route.startsWith('/admin')) {
    let title = 'Admin Dashboard';
    let subtitle = 'Agency operations and business intelligence';
    let content = <AdminDashboardPage />;

    if (route === '/admin/leads') {
      title = 'Lead CRM & Inbound Pipeline';
      subtitle = 'Manage commercial inquiries and convert deals';
      content = <AdminLeadsPage />;
    } else if (route === '/admin/inquiries') {
      title = 'Web Submissions & Inquiries';
      subtitle = 'Direct quote requests and client communications';
      content = <AdminInquiriesPage />;
    } else if (route === '/admin/projects') {
      title = 'Active Projects & Sprints';
      subtitle = 'Milestone schedules and developer assignments';
      content = <AdminProjectsPage />;
    } else if (route === '/admin/clients') {
      title = 'Client Directory & Workspaces';
      subtitle = 'Client billing and project histories';
      content = <AdminClientsPage />;
    } else if (route === '/admin/services') {
      title = 'Services & Capabilities';
      subtitle = 'Configure agency catalog, pricing, and timelines';
      content = <AdminServicesPage />;
    } else if (route === '/admin/pricing') {
      title = 'Pricing Plans & Packages';
      subtitle = 'Manage fixed tiers and service scopes';
      content = <AdminPricingPage />;
    } else if (route === '/admin/portfolio') {
      title = 'Portfolio Case Studies';
      subtitle = 'Manage public client showcases and ROI metrics';
      content = <AdminPortfolioPage />;
    } else if (route === '/admin/orders') {
      title = 'Customer Orders';
      subtitle = 'Purchases from public service checkout';
      content = <AdminOrdersPage />;
    } else if (route === '/admin/payments') {
      title = 'Invoices & Settlements';
      subtitle = 'Issue milestone invoices and verify payments';
      content = <AdminPaymentsPage />;
    } else if (route === '/admin/bookings') {
      title = 'Consultation Calendar';
      subtitle = 'Discovery calls and technical meetings';
      content = <AdminBookingsPage />;
    } else if (route === '/admin/messages') {
      title = 'Client Inbox & Communication';
      subtitle = 'Direct messaging threads and internal notes';
      content = <AdminMessagesPage />;
    } else if (route === '/admin/forms') {
      title = 'Dynamic Form Builder';
      subtitle = 'Create and share custom client intake surveys';
      content = <AdminFormBuilderPage />;
    } else if (route === '/admin/analytics') {
      title = 'Performance & Revenue Telemetry';
      subtitle = 'Financial velocity and lead attribution';
      content = <AdminAnalyticsPage />;
    } else if (route === '/admin/settings') {
      title = 'Agency Configuration';
      subtitle = 'Brand parameters and public KPI statistics';
      content = <AdminSettingsPage />;
    }

    return (
      <AdminLayout title={title} subtitle={subtitle}>
        {content}
      </AdminLayout>
    );
  }

  // 2. Client Portal Routes
  if (route.startsWith('/portal')) {
    let title = 'Client Portal';
    let subtitle = 'Your project headquarters and live progress';
    let content = <ClientDashboardPage />;

    if (route === '/portal/projects') {
      title = 'Active Projects';
      subtitle = 'Milestone deliverables and developer assignments';
      content = <ClientProjectsPage />;
    } else if (route === '/portal/timeline') {
      title = 'Interactive Timeline';
      subtitle = 'Track sprint stages from planning to deployment';
      content = <ClientTimelinePage />;
    } else if (route === '/portal/files') {
      title = 'Files & Deliverables';
      subtitle = 'Upload brand assets and download production builds';
      content = <ClientFilesPage />;
    } else if (route === '/portal/messages') {
      title = 'Direct Engineering Chat';
      subtitle = 'Message Marcus Vance & our technical architects';
      content = <ClientMessagesPage />;
    } else if (route === '/portal/invoices') {
      title = 'Invoices & Billing';
      subtitle = 'Transparent milestone payments and tax receipts';
      content = <ClientInvoicesPage />;
    } else if (route === '/portal/profile') {
      title = 'Workspace Profile';
      subtitle = 'Organization details and notification settings';
      content = <ClientProfilePage />;
    }

    return (
      <ClientLayout title={title} subtitle={subtitle}>
        {content}
      </ClientLayout>
    );
  }

  // 3. Public Agency Website
  let publicContent = <HomePage />;
  if (route === '/services') publicContent = <ServicesPage />;
  else if (route === '/pricing') publicContent = <PricingPage />;
  else if (route === '/portfolio') publicContent = <PortfolioPage />;
  else if (route === '/case-study') publicContent = <CaseStudyPage />;
  else if (route === '/process') publicContent = <ProcessPage />;
  else if (route === '/about') publicContent = <AboutPage />;
  else if (route === '/blog') publicContent = <BlogPage />;
  else if (route === '/blog-post') publicContent = <BlogPostPage />;
  else if (route === '/contact') publicContent = <ContactPage />;
  else if (route === '/checkout') publicContent = <CheckoutPage />;
  else if (route === '/book') publicContent = <BookingPage />;
  else if (route === '/form-view') publicContent = <FormViewPage />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <Navbar />
      <main className="flex-1">{publicContent}</main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RealtimeProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </RealtimeProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
