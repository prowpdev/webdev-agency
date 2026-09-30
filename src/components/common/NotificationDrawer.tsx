import React, { useEffect, useState } from 'react';
import { StorageService } from '../../services/storageService';
import { NotificationItem } from '../../types';
import { useNavigation } from '../../contexts/NavigationContext';
import { Bell, Check, ExternalLink, Inbox, X } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    StorageService.getNotifications()
  );
  const { navigate } = useNavigation();

  useEffect(() => {
    const handleStorageChange = () => {
      setNotifications(StorageService.getNotifications());
    };
    window.addEventListener('apexflow-storage-change', handleStorageChange);
    return () => window.removeEventListener('apexflow-storage-change', handleStorageChange);
  }, []);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    StorageService.markAllNotificationsRead();
    setNotifications(StorageService.getNotifications());
  };

  const handleClickItem = (item: NotificationItem) => {
    StorageService.markNotificationRead(item.id);
    setNotifications(StorageService.getNotifications());
    if (item.link) {
      navigate(item.link);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-sm text-slate-900">Notifications</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Inbox className="w-10 h-10 mb-2 stroke-1 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">No notifications yet</p>
              <p className="text-xs text-slate-400 mt-1">Updates and inquiries will appear here.</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleClickItem(item)}
                className={`p-3.5 rounded-xl transition-colors cursor-pointer flex gap-3 ${
                  !item.read ? 'bg-indigo-50/60 hover:bg-indigo-50/90' : 'hover:bg-slate-50'
                }`}
              >
                <div className="pt-0.5">
                  <span
                    className={`block w-2 h-2 rounded-full ${
                      !item.read ? 'bg-indigo-600' : 'bg-transparent'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-slate-900 truncate">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">{item.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
