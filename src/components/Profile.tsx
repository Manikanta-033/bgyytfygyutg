import React from 'react';
import { Settings, Edit3, Award, MapPin, Calendar, ChevronRight, Grid, List, Bookmark, ShieldCheck, TrendingUp, Users, Heart, Share2, MoreHorizontal, CheckCircle2, AlertCircle, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { Post } from '../types';

export function Profile({ 
  onOpenSaved, 
  onOpenSettings, 
  onLogout,
  onOpenAdmin,
  onOpenUIKit
}: { 
  onOpenSaved: () => void, 
  onOpenSettings: () => void, 
  onLogout: () => void,
  onOpenAdmin?: () => void,
  onOpenUIKit?: () => void
}) {
  const [activeTab, setActiveTab] = React.useState('Posts');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const stats = [
    { label: 'Reports', value: '12', icon: <Grid className="w-4 h-4" /> },
    { label: 'Resolved', value: '8', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Impact', value: '450', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Followers', value: '2.4k', icon: <Users className="w-4 h-4" /> }
  ];

  const recentReports: Post[] = [
    { 
      id: '1', 
      title: 'Potholes on Main St', 
      status: 'In Progress', 
      timestamp: '2d ago', 
      media: { type: 'image', url: ['https://picsum.photos/seed/road/400/400'] },
      user: { name: 'Alex Rivers', avatar: '', isVerified: true },
      location: 'Downtown, Sector 4',
      description: 'Major potholes on Main St.',
      category: 'Roads',
      urgency: 'Urgent',
      likes: 12,
      comments: 5,
      shares: 2
    },
    { 
      id: '2', 
      title: 'Broken Streetlight', 
      status: 'Resolved', 
      timestamp: '1w ago', 
      media: { type: 'image', url: ['https://picsum.photos/seed/light/400/400'] },
      user: { name: 'Alex Rivers', avatar: '', isVerified: true },
      location: 'Oak Avenue',
      description: 'Streetlight broken for a week.',
      category: 'Streetlights',
      urgency: 'Medium',
      likes: 45,
      comments: 12,
      shares: 8
    },
    { 
      id: '3', 
      title: 'Garbage Dumping', 
      status: 'Pending', 
      timestamp: '2w ago', 
      media: { type: 'image', url: ['https://picsum.photos/seed/trash/400/400'] },
      user: { name: 'Alex Rivers', avatar: '', isVerified: true },
      location: 'Market Square',
      description: 'Illegal garbage dumping.',
      category: 'Garbage',
      urgency: 'High',
      likes: 8,
      comments: 2,
      shares: 1
    }
  ];

  const badges = [
    { id: '1', name: 'First Report', icon: <Award className="w-6 h-6" />, color: 'bg-blue-500' },
    { id: '2', name: 'Local Watcher', icon: <ShieldCheck className="w-6 h-6" />, color: 'bg-green-500' },
    { id: '3', name: 'Verified', icon: <CheckCircle2 className="w-6 h-6" />, color: 'bg-purple-500' },
    { id: '4', name: 'Top Contributor', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-500' },
  ];

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Profile</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-slate-100 rounded-xl active:scale-95 transition-all">
            <Share2 className="w-5 h-5 text-slate-600" />
          </button>
          <button 
            onClick={onOpenSettings}
            className="p-2 bg-slate-100 rounded-xl active:scale-95 transition-all"
          >
            <Settings className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Profile Hero */}
      <div className="bg-white px-6 pt-8 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/user/200/200" 
              alt="User" 
              className="w-24 h-24 rounded-[32px] object-cover border-4 border-white shadow-xl shadow-slate-200"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Alex Rivers</h2>
              <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/10" />
            </div>
            <p className="text-sm font-bold text-slate-400 mb-3">@alex_civic_pulse</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-green-600 text-white text-[10px] font-bold py-2.5 rounded-xl shadow-lg shadow-green-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5">
                <Edit3 className="w-3 h-3" />
                Edit
              </button>
              <button 
                onClick={onLogout}
                className="flex-1 bg-red-50 text-red-600 text-[10px] font-bold py-2.5 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                Log Out
              </button>
              <button 
                onClick={onOpenSaved}
                className="px-3 bg-slate-100 text-slate-600 rounded-xl active:scale-95 transition-all"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Civic advocate & community builder. Focused on urban infrastructure and sustainable living in Sector 4. 🌿
        </p>

        <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Downtown, Sector 4
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Joined Mar 2024
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2 px-4 -mt-4 relative z-10">
        {stats.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label}
            className="bg-white p-3 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-50 flex flex-col items-center text-center"
          >
            <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center mb-2 text-slate-400">
              {stat.icon}
            </div>
            <span className="text-lg font-black text-slate-900 leading-none">{stat.value}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Impact Card */}
      <div className="px-6 mt-8">
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-5 flex items-center gap-4 shadow-xl shadow-green-600/20 relative overflow-hidden">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center relative z-10">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="text-white font-black text-sm tracking-tight">Community Leader</h3>
            <p className="text-white/80 text-[11px] font-medium leading-snug mt-0.5">
              You've helped resolve 8 issues this month. You're in the top 5% of contributors!
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/50 relative z-10" />
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Badges Carousel */}
      <div className="mt-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Achievements</h3>
          <button className="text-xs font-bold text-green-600">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
          {badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-16 h-16 ${badge.color} rounded-[20px] flex items-center justify-center shadow-lg shadow-slate-200 border-4 border-white`}>
                <div className="text-white">{badge.icon}</div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Privileged Actions (Admin/Moderator) */}
      <div className="mt-8 px-6">
        <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-sm">
          <button 
            onClick={onOpenAdmin}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-slate-900">Moderator Panel</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage reports & activity</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
          </button>
          
          <div className="h-px bg-slate-50 mx-4" />
          
          <button 
            onClick={onOpenUIKit}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-slate-900">UI Kit</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Design Foundation</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
          </button>
        </div>
      </div>

      {/* Tabs & View Toggle */}
      <div className="mt-8 px-6 flex items-center justify-between border-b border-slate-100 bg-white">
        <div className="flex gap-6">
          {['Posts', 'Saved', 'Drafts'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-bold relative transition-all ${activeTab === tab ? 'text-slate-900' : 'text-slate-400'}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white min-h-[300px]">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-0.5">
            {recentReports.map(report => (
              <div key={report.id} className="aspect-square relative group active:scale-95 transition-all">
                <img 
                  src={report.media.url[0]} 
                  alt={report.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2">
                  <div className={`w-2 h-2 rounded-full ${
                    report.status === 'Resolved' ? 'bg-green-500' :
                    report.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'
                  }`} />
                </div>
                {report.urgency === 'Urgent' && (
                  <div className="absolute bottom-2 left-2">
                    <AlertCircle className="w-4 h-4 text-white drop-shadow-md" />
                  </div>
                )}
              </div>
            ))}
            {/* Fillers for grid */}
            {[4,5,6,7,8,9].map(i => (
              <div key={i} className="aspect-square bg-slate-50 flex items-center justify-center">
                <Grid className="w-6 h-6 text-slate-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recentReports.map((report, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={report.id}
                className="px-6 py-4 flex items-center gap-4 active:bg-slate-50 transition-all cursor-pointer"
              >
                <img 
                  src={report.media.url[0]} 
                  alt={report.title} 
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{report.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      report.status === 'Resolved' ? 'bg-green-100 text-green-600' :
                      report.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {report.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {report.timestamp}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Trust Card */}
      <div className="px-6 py-8">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-black text-slate-900 tracking-tight">Trusted Reporter</h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-1">
              Your contribution score is <span className="text-green-600 font-bold">82%</span>. You are active in 4 neighborhoods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
