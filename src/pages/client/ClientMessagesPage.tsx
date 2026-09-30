import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StorageService } from '../../services/storageService';
import { Send, Paperclip, CheckCheck, Clock, UserCheck } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export const ClientMessagesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { success } = useToast();

  const conversations = StorageService.getConversations();
  const clientConv =
    conversations.find((c) => c.clientId === currentUser?.id || c.clientEmail === currentUser?.email) ||
    conversations[0];

  const [activeConvId, setActiveConvId] = useState(clientConv?.id || 'conv-1');
  const [messages, setMessages] = useState(() => StorageService.getMessages(activeConvId));
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = StorageService.sendMessage(activeConvId, {
      senderId: currentUser?.id || 'client-anon',
      senderName: currentUser?.name || 'Client',
      senderRole: 'client',
      content: inputText.trim(),
    });

    setMessages([...messages, newMsg]);
    setInputText('');

    // Simulate auto-reply from Marcus after 1.5 seconds if testing
    setTimeout(() => {
      const autoReply = StorageService.sendMessage(activeConvId, {
        senderId: 'user_admin_1',
        senderName: 'Marcus Vance (Lead Architect)',
        senderRole: 'agency',
        content: `Got your message! We are looking into this directly and will deploy an update to your staging server.`,
      });
      setMessages((prev) => [...prev, autoReply]);
      success('New Agency Message', 'Marcus Vance replied to your message.');
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* Top chat banner */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-center text-xs">
            AF
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">ApexFlow Technical Team</h3>
            <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Marcus Vance & Liam S. O'Connor active
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-500 hidden sm:block">
          <span>Project: {clientConv?.projectName || 'Active Engineering Sprint'}</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isMe = msg.senderRole === 'client';
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-700">{msg.senderName}</span>
                <span>·</span>
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div
                className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80'
                }`}
              >
                {msg.content}
              </div>

              {isMe && (
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                  <span>Delivered</span>
                  <CheckCheck className="w-3 h-3 text-indigo-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
        <input
          type="text"
          placeholder="Message Marcus & Liam regarding your sprint..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
        />

        <button
          type="submit"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
