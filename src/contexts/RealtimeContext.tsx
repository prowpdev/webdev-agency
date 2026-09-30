import React, { createContext, useContext, useEffect, useState } from 'react';
import { StorageService } from '../services/storageService';

export interface LiveActivityEvent {
  id: string;
  type: 'inquiry' | 'payment' | 'booking' | 'message' | 'milestone';
  title: string;
  detail: string;
  timestamp: string;
}

interface RealtimeContextType {
  isConnected: boolean;
  toggleConnection: () => void;
  recentEvents: LiveActivityEvent[];
  simulateIncomingEvent: (type?: LiveActivityEvent['type']) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [recentEvents, setRecentEvents] = useState<LiveActivityEvent[]>([
    {
      id: 'live-1',
      type: 'payment',
      title: 'Payment Received',
      detail: '$3,200 deposited by Maison Kvadrat (INV-2026-1003)',
      timestamp: '2 mins ago',
    },
    {
      id: 'live-2',
      type: 'inquiry',
      title: 'New Lead Inbound',
      detail: 'Chloe Dubois requested UI/UX Design quote',
      timestamp: '14 mins ago',
    },
    {
      id: 'live-3',
      type: 'milestone',
      title: 'Milestone Completed',
      detail: 'OmniLedger: Interactive Wireframes approved',
      timestamp: '1 hour ago',
    },
  ]);

  const simulateIncomingEvent = (forcedType?: LiveActivityEvent['type']) => {
    const types: LiveActivityEvent['type'][] = ['inquiry', 'payment', 'booking', 'message', 'milestone'];
    const selectedType = forcedType || types[Math.floor(Math.random() * types.length)];

    let event: LiveActivityEvent;
    const now = 'Just now';

    switch (selectedType) {
      case 'inquiry':
        event = {
          id: `evt-${Date.now()}`,
          type: 'inquiry',
          title: 'New Inbound Lead',
          detail: 'Torvalds Dynamics requested an Enterprise SaaS Architecture quote ($15,000+).',
          timestamp: now,
        };
        StorageService.addNotification({
          category: 'inquiry',
          title: 'Live Lead Received',
          message: 'Torvalds Dynamics submitted a project scope via the public inquiry funnel.',
          link: '/admin/leads',
        });
        break;
      case 'payment':
        event = {
          id: `evt-${Date.now()}`,
          type: 'payment',
          title: 'Stripe Settlement Confirmed',
          detail: 'Invoice deposit of $2,500 cleared for Project NexFreight.',
          timestamp: now,
        };
        StorageService.addNotification({
          category: 'payment',
          title: 'Funds Received',
          message: 'Wire transfer of $2,500 verified for milestone delivery.',
          link: '/admin/payments',
        });
        break;
      case 'booking':
        event = {
          id: `evt-${Date.now()}`,
          type: 'booking',
          title: 'Strategy Consultation Booked',
          detail: 'Dr. Evelyn Vance scheduled a 30-min Technical Discovery Call.',
          timestamp: now,
        };
        StorageService.addNotification({
          category: 'booking',
          title: 'Calendar Booking',
          message: 'Dr. Evelyn Vance booked an architectural discovery session.',
          link: '/admin/bookings',
        });
        break;
      case 'message':
        event = {
          id: `evt-${Date.now()}`,
          type: 'message',
          title: 'Client Message',
          detail: 'Elena Rostova: "Staging build looks crisp, ready for review!"',
          timestamp: now,
        };
        break;
      default:
        event = {
          id: `evt-${Date.now()}`,
          type: 'milestone',
          title: 'Milestone Progress',
          detail: 'Database indexing completed on OmniLedger backend.',
          timestamp: now,
        };
    }

    setRecentEvents((prev) => [event, ...prev.slice(0, 7)]);
  };

  // Optional background simulator tick
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      // 10% chance every 40 seconds to trigger organic background activity
      if (Math.random() < 0.25) {
        simulateIncomingEvent();
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <RealtimeContext.Provider
      value={{
        isConnected,
        toggleConnection: () => setIsConnected((c) => !c),
        recentEvents,
        simulateIncomingEvent,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};
