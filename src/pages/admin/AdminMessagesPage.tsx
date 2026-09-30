import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Send, Paperclip, Search, User, Briefcase, DollarSign, Clock } from 'lucide-react';

export const AdminMessagesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { success } = useToast();
  const conversations = StorageService.getConversations();

  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const [messages, setMessages] = useState(() => StorageService.getMessages(activeConvId));
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSelectConv = (id: string) => {
    setActiveConvId(id);
    setMessages(StorageService.getMessages(id));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = StorageService.sendMessage(activeConvId, {
      senderId: currentUser?.id || 'admin-1',
      senderName: `${currentUser?.name || 'Marcus Vance'} (Agency)`,
      senderRole: 'agency',
      content: inputText.trim(),
    });

    setMessages([...messages, newMsg]);
    setInputText('');
    success('Message Sent', `Dispatched to ${activeConv?.clientName}`);
  };

  const filteredConvs = conversations.filter(
    (c) =>
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.clientCompany.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-12rem)] grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* Left Column: Conversations List */}
      <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredConvs.map((conv) => {
            const isSelected = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => handleSelectConv(conv.id)}
                className={`w-full p-4 text-left transition-colors flex items-start gap-3 cursor-pointer ${
                  isSelected ? 'bg-indigo-50/60 border-l-4 border-indigo-600' : 'hover:bg-slate-100/60'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                  {conv.clientName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 truncate">{conv.clientName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {conv.lastMessageAt || conv.lastMessageTime}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{conv.clientCompany}</div>
                  <p className="text-xs text-slate-600 truncate mt-1">{conv.lastMessage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      <div className="lg:col-span-8 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-center text-xs">
              {activeConv?.clientName.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{activeConv?.clientName}</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {activeConv?.clientCompany} · {activeConv?.clientEmail}
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Sprint Lead Assigned
          </span>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30">
          {messages.map((msg) => {
            const isMe = msg.senderRole === 'agency';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-xl ${
                  isMe ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <span className="text-[10px] text-slate-400 mb-1 px-1">{msg.senderName}</span>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Composer */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder="Type your message to client..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
