import React from 'react';
import { Bell, CheckCircle2, Clock, MessageSquare, ThumbsUp, AlertTriangle, ChevronRight, Search, Settings, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'status' | 'alert' | 'support';
  user?: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  targetId?: string;
  urgency?: 'Urgent' | 'High' | 'Medium' | 'Low';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'status',
    content: 'Your report "Potholes on Main St" is now In Progress.',
    timestamp: '10m ago',
    isRead: false,
    targetId: 'p1'
  },
  {
    id: '2',
    type: 'support',
    user: { name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/100/100' },
    content: 'supported your report on "Broken Streetlight".',
    timestamp: '1h ago',
    isRead: false,
    targetId: 'p2'
  },
  {
    id: '3',
    type: 'alert',
    content: 'Urgent: Heavy flooding reported in Sector 7. Avoid the area.',
    timestamp: '3h ago',
    isRead: false,
    urgency: 'Urgent'
  },
  {
    id: '4',
    type: 'comment',
    user: { name: 'Mike Ross', avatar: 'https://picsum.photos/seed/mike/100/100' },
    content: 'commented: "I saw this too, it\'s been like this for weeks!"',
    timestamp: '5h ago',
    isRead: true,
    targetId: 'p1'
  },
  {
    id: '5',
    type: 'status',
    content: 'Great news! Your report on "Illegal Dumping" has been marked as Resolved.',
    timestamp: '8h ago',
    isRead: true,
    targetId: 'p3'
  },
  {
    id: '6',
    type: 'like',
    user: { name: 'Emma Wilson', avatar: 'https://picsum.photos/seed/emma/100/100' },
    content: 'liked your report on "Garbage Dumping".',
    timestamp: '1d ago',
    isRead: true,
    targetId: 'p3'
  }
];

export function Activity() {
  const [activeTab, setActiveTab] = React.useState('All');

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Stay updated on your reports</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-slate-100 rounded-xl text-slate-600 active:scale-95 transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 bg-slate-100 rounded-xl text-slate-600 active:scale-95 transition-all">
            <Check className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Summary Card */}
      <div className="px-6 py-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-5 text-white shadow-xl shadow-green-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-1">Daily Summary</h3>
            <p className="text-xs opacity-90 mb-4">You have 3 new updates today</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <p className="text-[10px] font-bold uppercase opacity-70">Urgent Alerts</p>
                <p className="text-xl font-black">2</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <p className="text-[10px] font-bold uppercase opacity-70">Supports</p>
                <p className="text-xl font-black">15</p>
              </div>
            </div>
          </div>
          <Bell className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-6 py-2 gap-3 overflow-x-auto no-scrollbar bg-slate-50">
        {['All', 'My Reports', 'Nearby', 'Activity', 'Urgent'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab 
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
              : 'bg-white text-slate-500 border border-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="mt-4 space-y-1 px-4">
        <h4 className="px-2 mb-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Today</h4>
        
        {MOCK_NOTIFICATIONS.map((notif, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={notif.id}
            className={`p-4 rounded-[28px] flex gap-4 items-start transition-all active:scale-[0.98] cursor-pointer mb-2 border ${
              notif.isRead ? 'bg-white border-slate-100' : 'bg-green-50/50 border-green-100'
            } ${notif.urgency === 'Urgent' ? 'border-red-100 bg-red-50/30' : ''}`}
          >
            {/* Icon/Avatar */}
            <div className="relative flex-shrink-0">
              {notif.user ? (
                <img 
                  src={notif.user.avatar} 
                  alt={notif.user.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                  notif.type === 'status' ? 'bg-blue-100 text-blue-600' : 
                  notif.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {notif.type === 'status' && <Clock className="w-6 h-6" />}
                  {notif.type === 'alert' && <AlertTriangle className="w-6 h-6" />}
                </div>
              )}
              
              {/* Type Badge */}
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                notif.type === 'like' ? 'bg-pink-500' :
                notif.type === 'comment' ? 'bg-blue-500' :
                notif.type === 'status' ? 'bg-blue-600' :
                notif.type === 'support' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {notif.type === 'like' && <ThumbsUp className="w-3 h-3 text-white" />}
                {notif.type === 'comment' && <MessageSquare className="w-3 h-3 text-white" />}
                {notif.type === 'status' && <CheckCircle2 className="w-3 h-3 text-white" />}
                {notif.type === 'support' && <ThumbsUp className="w-3 h-3 text-white" />}
                {notif.type === 'alert' && <AlertTriangle className="w-3 h-3 text-white" />}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  {notif.type}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-sm text-slate-800 leading-snug">
                {notif.user && <span className="font-bold mr-1">{notif.user.name}</span>}
                {notif.content}
              </p>
              
              {notif.urgency === 'Urgent' && (
                <div className="mt-2 flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-red-600 text-white text-[10px] font-black rounded-lg uppercase tracking-wider active:scale-95 transition-all">
                    View Alert
                  </button>
                </div>
              )}

              {notif.type === 'status' && (
                <div className="mt-3 p-2 bg-white/50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/status${notif.id}/100/100`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-blue-500 rounded-full ${notif.content.includes('Resolved') ? 'w-full bg-green-500' : 'w-2/3'}`} />
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Status: {notif.content.includes('Resolved') ? 'Resolved' : 'In Progress'}</p>
                  </div>
                </div>
              )}
            </div>

            {!notif.isRead && (
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Earlier Section */}
      <div className="mt-6 px-4">
        <h4 className="px-2 mb-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Yesterday</h4>
        <div className="p-4 bg-white rounded-[28px] border border-slate-100 flex gap-4 items-center opacity-70">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-800">No activity for this day.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
