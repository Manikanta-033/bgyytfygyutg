import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronLeft, 
  MoreVertical, 
  Pin, 
  Users, 
  MapPin, 
  AlertCircle, 
  CheckCheck,
  MessageSquare,
  Search as SearchIcon,
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MessagesProps {
  onBack: () => void;
  onOpenChat: (chat: any) => void;
}

const TABS = ['All', 'Direct', 'Groups', 'Nearby', 'Issue Chats', 'Unread'];

const MOCK_CHATS = [
  {
    id: '1',
    name: 'Temple Street Updates',
    type: 'Group',
    lastMessage: 'The garbage collection is scheduled for tomorrow morning.',
    timestamp: '10:24 AM',
    unreadCount: 3,
    avatar: 'https://picsum.photos/seed/temple/200/200',
    isPinned: true,
    category: 'Cleanliness',
    location: 'Temple Street Area'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    type: 'Direct',
    lastMessage: 'Thanks for reporting that pothole! I just upvoted it.',
    timestamp: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    isPinned: false,
    status: 'Online'
  },
  {
    id: '3',
    name: 'River Pollution Watch',
    type: 'Issue Chat',
    lastMessage: 'Alert: Unusual foam detected near the north bridge.',
    timestamp: '2 days ago',
    unreadCount: 12,
    avatar: 'https://picsum.photos/seed/river/200/200',
    isPinned: false,
    category: 'Water',
    isUrgent: true
  },
  {
    id: '4',
    name: 'School Zone Safety',
    type: 'Group',
    lastMessage: 'The new crossing guard started today. Much safer!',
    timestamp: 'Mon',
    unreadCount: 0,
    avatar: 'https://picsum.photos/seed/school/200/200',
    isPinned: false,
    category: 'Safety',
    location: 'Primary School East'
  },
  {
    id: '5',
    name: 'David Chen',
    type: 'Direct',
    lastMessage: 'Did you see the update on the streetlight repair?',
    timestamp: 'Last week',
    unreadCount: 0,
    avatar: 'https://i.pravatar.cc/150?u=david',
    isPinned: false,
    status: 'Offline'
  }
];

export const Messages: React.FC<MessagesProps> = ({ onBack, onOpenChat }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredChats = MOCK_CHATS.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === 'All') return true;
    if (activeTab === 'Direct') return chat.type === 'Direct';
    if (activeTab === 'Groups') return chat.type === 'Group';
    if (activeTab === 'Issue Chats') return chat.type === 'Issue Chat';
    if (activeTab === 'Unread') return chat.unreadCount > 0;
    return true;
  });

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="px-6 py-8 space-y-6">
          <div className="h-8 w-32 bg-slate-100 rounded-lg animate-pulse" />
          <div className="h-12 w-full bg-slate-100 rounded-2xl animate-pulse" />
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-20 bg-slate-100 rounded-full animate-pulse flex-shrink-0" />
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-none">Discussions</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Civic updates & community help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shadow-sm active:scale-95 transition-all">
              <Plus className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center active:scale-95 transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-green-500/20 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-slate-200 rounded-full text-slate-500"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeTab === tab 
                  ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-green-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24">
        {/* Pinned Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-100 rounded-[24px] p-4 mb-6 flex items-start gap-4"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Community Notice</span>
              <Pin className="w-3 h-3 text-green-400" />
            </div>
            <p className="text-xs text-green-800 font-medium leading-relaxed">Please keep updates useful and respectful. Helpful info helps the community grow!</p>
          </div>
        </motion.div>

        {/* Conversation List */}
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat, i) => (
                <motion.button
                  key={chat.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onOpenChat(chat)}
                  className="w-full flex items-center gap-4 p-4 rounded-[28px] hover:bg-slate-50 transition-all group active:scale-[0.98]"
                >
                  <div className="relative flex-shrink-0">
                    <img 
                      src={chat.avatar} 
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" 
                      alt={chat.name}
                      referrerPolicy="no-referrer"
                    />
                    {chat.status === 'Online' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                    {chat.unreadCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-black text-slate-900 truncate pr-2">{chat.name}</h4>
                      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate pr-4 ${chat.unreadCount > 0 ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>
                        {chat.lastMessage}
                      </p>
                      {chat.isPinned && <Pin className="w-3 h-3 text-slate-300 flex-shrink-0" />}
                      {chat.isUrgent && <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 animate-pulse" />}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {chat.type === 'Group' || chat.type === 'Issue Chat' ? (
                        <span className="text-[8px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-md">
                          {chat.category || chat.type}
                        </span>
                      ) : null}
                      {chat.location && (
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-2 h-2" /> {chat.location}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center text-center px-8"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="w-12 h-12 text-green-200" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">No conversations yet</h3>
                <p className="text-slate-400 text-sm mb-8">Helpful chats and local discussions will appear here once you start connecting.</p>
                <button 
                  onClick={() => setActiveTab('All')}
                  className="bg-green-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-green-600/20"
                >
                  Explore Community
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
