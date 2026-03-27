import { 
  Home, 
  Search, 
  Plus, 
  Bell, 
  User, 
  Map as MapIcon,
  Filter,
  Leaf,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Users,
  ChevronRight,
  ArrowRight,
  Zap,
  Award,
  MessageSquare
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { PostCard, PostSkeleton } from './PostCard';
import { Post } from '../types';
import { motion } from 'motion/react';

const CATEGORIES = ['All', 'Roads', 'Pollution', 'Water', 'Garbage', 'Streetlights', 'Drainage', 'Public Safety'];

const HIGHLIGHTS = [
  { id: 'add', label: 'Add Report', icon: <Plus className="w-6 h-6" />, color: 'bg-green-500 text-white shadow-green-500/20' },
  { id: 'nearby', label: 'Nearby', icon: <MapIcon className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600' },
  { id: 'urgent', label: 'Urgent', icon: <AlertTriangle className="w-6 h-6" />, color: 'bg-red-50 text-red-600' },
  { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-50 text-orange-600' },
  { id: 'resolved', label: 'Resolved', icon: <CheckCircle className="w-6 h-6" />, color: 'bg-green-50 text-green-600' },
  { id: 'cleanup', label: 'Clean-up', icon: <Users className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600' },
];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: { name: 'Alex Rivers', avatar: 'https://picsum.photos/seed/alex/100/100', isVerified: true },
    location: 'Downtown, Sector 4',
    timestamp: '2h ago',
    title: 'Major Potholes on Main Street',
    description: 'Several deep potholes have appeared near the primary school entrance. It\'s becoming dangerous for cyclists and school buses. Needs immediate attention!',
    category: 'Roads',
    media: { type: 'image', url: ['https://picsum.photos/seed/road/800/600'] },
    urgency: 'Urgent',
    likes: 124,
    comments: 45,
    shares: 12,
    status: 'Pending'
  },
  {
    id: '2',
    user: { name: 'Sarah Green', avatar: 'https://picsum.photos/seed/sarah/100/100' },
    location: 'Blue Lake Park',
    timestamp: '5h ago',
    title: 'Suspicious Water Discoloration',
    description: 'The north side of Blue Lake has turned dark gray and there\'s a strong chemical smell. Noticed some dead fish near the shore. Local authorities notified.',
    category: 'Pollution',
    media: { type: 'video', url: ['https://picsum.photos/seed/water/800/600'] },
    urgency: 'High',
    likes: 342,
    comments: 89,
    shares: 156,
    status: 'In Progress'
  },
  {
    id: '3',
    user: { name: 'Civic Watch', avatar: 'https://picsum.photos/seed/watch/100/100', isVerified: true },
    location: 'Market Square',
    timestamp: '1d ago',
    title: 'Garbage Collection Delay',
    description: 'Waste hasn\'t been collected for 3 days in the Market Square area. Overflowing bins are attracting pests and creating unhygienic conditions.',
    category: 'Garbage',
    media: { type: 'carousel', url: ['https://picsum.photos/seed/trash1/800/600', 'https://picsum.photos/seed/trash2/800/600'] },
    urgency: 'Medium',
    likes: 88,
    comments: 23,
    shares: 5,
    status: 'Pending'
  }
];

export const HomeFeed = ({ 
  onCreatePost, 
  onSelectPost, 
  onOpenComments, 
  onOpenSearch,
  onOpenStatus,
  onOpenMessages
}: { 
  onCreatePost: () => void, 
  onSelectPost: (post: Post) => void, 
  onOpenComments: (post: Post) => void, 
  onOpenSearch: () => void,
  onOpenStatus: (post: Post) => void,
  onOpenMessages?: () => void
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/20">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">CivicPulse</h1>
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-0.5">Community First</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenMessages}
            className="p-2.5 bg-slate-100 text-slate-600 rounded-xl relative active:scale-95 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2.5 bg-slate-100 text-slate-600 rounded-xl relative active:scale-95 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button 
            onClick={onOpenSearch}
            className="p-2.5 bg-slate-100 text-slate-600 rounded-xl active:scale-95 transition-all"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Community Impact Banner */}
      <div className="px-6 py-4">
        <div className="bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Community Impact</span>
            </div>
            <h2 className="text-2xl font-black leading-tight mb-4">
              1,240 Issues <br />
              <span className="text-green-400">Resolved</span> This Week
            </h2>
            <button className="px-5 py-2.5 bg-green-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-green-500/30 active:scale-95 transition-all flex items-center gap-2">
              View Report <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
            <CheckCircle className="w-32 h-32 text-white" />
          </div>
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 py-2">
        {HIGHLIGHTS.map(item => (
          <button 
            key={item.id} 
            onClick={item.id === 'add' ? onCreatePost : undefined}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-sm transition-transform group-active:scale-95 ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="px-6 py-4 space-y-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search issues near you..." 
            className="w-full pl-12 pr-12 py-4 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-green-50 text-green-600 rounded-lg">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
                : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <section className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Trending Issues</h3>
          <button className="text-green-600 font-bold text-xs flex items-center gap-1">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {[
            { tag: '#RoadSafety', count: '42 Reports', color: 'bg-orange-500' },
            { tag: '#CleanWater', count: '28 Reports', color: 'bg-blue-500' },
            { tag: '#WasteFree', count: '15 Reports', color: 'bg-green-500' },
            { tag: '#SafeParks', count: '12 Reports', color: 'bg-purple-500' },
          ].map((trend, i) => (
            <div key={i} className="flex-shrink-0 bg-white rounded-3xl p-4 border border-slate-100 shadow-sm min-w-[140px]">
              <div className={`w-8 h-8 ${trend.color} rounded-xl mb-3 flex items-center justify-center`}>
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-black text-slate-900 mb-1">{trend.tag}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{trend.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Challenges */}
      <section className="px-6 py-4">
        <div className="bg-green-600 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-green-600/20">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-green-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-200">Active Challenge</span>
            </div>
            <h3 className="text-xl font-black mb-1">Clean Neighborhood Drive</h3>
            <p className="text-xs opacity-80 mb-4">Report 3 waste issues to earn the "Eco Warrior" badge.</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-2/3" />
              </div>
              <span className="text-[10px] font-bold">2/3 Done</span>
            </div>
          </div>
          <Award className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 -rotate-12" />
        </div>
      </section>

      {/* Feed */}
      <div className="px-6 space-y-6">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => <PostSkeleton key={i} />)
        ) : (
          MOCK_POSTS
            .filter(p => activeCategory === 'All' || p.category === activeCategory)
            .map((post, idx) => (
              <React.Fragment key={post.id}>
                <PostCard 
                  post={post} 
                  onClick={() => onSelectPost(post)} 
                  onCommentsClick={() => onOpenComments(post)}
                  onStatusClick={() => onOpenStatus(post)}
                />
              </React.Fragment>
            ))
        )}

        {/* Empty State */}
        {!isLoading && MOCK_POSTS.filter(p => activeCategory === 'All' || p.category === activeCategory).length === 0 && (
          <div className="py-20 flex flex-col items-center text-center px-8">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <Leaf className="w-12 h-12 text-green-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No issues reported yet</h3>
            <p className="text-slate-500 text-sm mb-8">Be the first to help your area by reporting public problems you notice.</p>
            <button 
              onClick={onCreatePost}
              className="px-8 py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all"
            >
              Add First Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
