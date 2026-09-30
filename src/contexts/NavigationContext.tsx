import React, { createContext, useContext, useEffect, useState } from 'react';

export type AppRoute =
  // Public
  | '/'
  | '/services'
  | '/pricing'
  | '/portfolio'
  | '/case-study'
  | '/about'
  | '/process'
  | '/blog'
  | '/blog-post'
  | '/contact'
  | '/checkout'
  | '/book'
  | '/form-view'
  // Client Portal
  | '/portal'
  | '/portal/projects'
  | '/portal/timeline'
  | '/portal/files'
  | '/portal/messages'
  | '/portal/invoices'
  | '/portal/profile'
  // Admin Dashboard
  | '/admin'
  | '/admin/leads'
  | '/admin/inquiries'
  | '/admin/projects'
  | '/admin/clients'
  | '/admin/services'
  | '/admin/pricing'
  | '/admin/portfolio'
  | '/admin/orders'
  | '/admin/payments'
  | '/admin/bookings'
  | '/admin/messages'
  | '/admin/forms'
  | '/admin/analytics'
  | '/admin/settings';

interface NavigationContextType {
  route: AppRoute;
  params: Record<string, string>;
  navigate: (to: AppRoute | string, params?: Record<string, string>) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialState = (): { route: AppRoute; params: Record<string, string> } => {
    try {
      const hash = window.location.hash.replace('#', '') || '/';
      const [path, queryString] = hash.split('?');
      const params: Record<string, string> = {};
      if (queryString) {
        new URLSearchParams(queryString).forEach((val, key) => {
          params[key] = val;
        });
      }
      return { route: (path as AppRoute) || '/', params };
    } catch {
      return { route: '/', params: {} };
    }
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => getInitialState().route);
  const [params, setParams] = useState<Record<string, string>>(() => getInitialState().params);

  useEffect(() => {
    const handleHashChange = () => {
      const { route, params } = getInitialState();
      setCurrentRoute(route);
      setParams(params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to: AppRoute | string, newParams?: Record<string, string>) => {
    const targetRoute = to.split('?')[0] as AppRoute;
    const search = new URLSearchParams(newParams || {}).toString();
    const hash = search ? `${targetRoute}?${search}` : targetRoute;
    window.location.hash = hash;
    setCurrentRoute(targetRoute);
    setParams(newParams || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <NavigationContext.Provider value={{ route: currentRoute, params, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
