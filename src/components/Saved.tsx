import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Bookmark, 
  LayoutGrid, 
  List, 
  MapPin, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  MoreVertical,
  Share2,
  Bell,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Post, Urgency } from '../types';
import { UrgencyBadge } from './PostCard';

interface SavedProps {
  onBack: () => void;
  onSelectPost: (post: Post) => void;
}

const COLLECTIONS = [
  { id: '1', title: 'Urgent to Track', count: 5, icon: '🚨', color: 'bg-red-50 text-red-600' },
  { id: '2', title: 'Nearby Problems', count: 8, icon: '📍', color: 'bg-blue-50 text-blue-600' },
  { id: '3', title: 'Water Issues', count: 4, icon: '💧', color: 'bg-cyan-50 text-cyan-600' },
  { id: '4', title: 'Road Damage', count: 7, icon: '🛣️', color: 'bg-amber-50 text-amber-600' }
];

const SAVED_POSTS: Post[] = [
  {
    id: 's1',
    user: { name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', isVerified: true },
    location: 'Oakwood Avenue',
    timestamp: 'Saved 2 days ago',
    title: 'Large Pothole causing traffic',
    description: 'A massive pothole has opened up right in the middle of Oakwood Ave. Cars are swerving to avoid it.',
    category: 'Roads',
    media: { type: 'image', url: ['https://picsum.photos/seed/pothole/400/300'] },
    urgency: 'Urgent',
    likes: 45,
    comments: 12,
    shares: 5,
    status: 'Pending'
  },
  {
    id: 's2',
    user: { name: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=mike' },
    location: 'Riverfront Park',
    timestamp: 'Saved 5 days ago',
    title: 'Illegal Garbage Dumping',
    description: 'Someone has dumped a large amount of construction waste near the river entrance.',
    category: 'Garbage',
    media: { type: 'image', url: ['https://picsum.photos/seed/garbage/400/300'] },
    urgency: 'High',
    likes: 89,
    comments: 24,
    shares: 15,
    status: 'In Progress'
  },
  {
    id: 's3',
    user: { name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?u=emma', isVerified: true },
    location: 'Central Square',
    timestamp: 'Saved 1 week ago',
    title: 'Broken Streetlight',
    description: 'The main streetlight at the intersection is flickering and goes out completely at night.',
    category: 'Infrastructure',
    media: { type: 'image', url: ['https://picsum.photos/seed/light/400/300'] },
    urgency: 'Medium',
    likes: 32,
    comments: 8,
    shares: 2,
    status: 'Resolved'
  }
];

const TABS = ['All', 'Posts', 'Urgent', 'Resolved', 'Locations', 'Tracked', 'Collections'];
const FILTER_CHIPS = ['Roads', 'Water', 'Garbage', 'Drainage', 'Streetlights', 'Pollution', 'Nearby', 'Verified'];

export const Saved: React.FC<SavedProps> = ({ onBack, onSelectPost }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Saved Reports</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Revisit important updates</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search within Saved */}
        <div className="relative mb-4">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved reports..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar -mx-4 px-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === tab ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-6"
            >
              <div className="h-24 bg-slate-50 rounded-3xl animate-pulse" />
              <div className="flex gap-3 overflow-hidden">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-32 h-32 bg-slate-50 rounded-2xl shrink-0 animate-pulse" />
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-40 bg-slate-50 rounded-3xl animate-pulse" />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 space-y-6"
            >
              {/* Summary Overview Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-5 text-white shadow-lg shadow-green-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Bookmark className="w-24 h-24 rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Overview</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-black">24</p>
                      <p className="text-[10px] font-bold uppercase opacity-70">Saved Reports</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black">5</p>
                      <p className="text-[10px] font-bold uppercase opacity-70">Urgent Items</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black">8</p>
                      <p className="text-[10px] font-bold uppercase opacity-70">Tracked Areas</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black">3</p>
                      <p className="text-[10px] font-bold uppercase opacity-70">New Updates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recently Updated Banner */}
              <div className="bg-mint-50 border border-green-100 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-green-900">3 saved reports updated today</p>
                  <p className="text-[10px] text-green-700">Tap to see latest progress</p>
                </div>
                <ChevronRight className="w-4 h-4 text-green-400" />
              </div>

              {/* Quick Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
                {FILTER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-white border border-slate-200 text-slate-500 hover:border-green-200 hover:text-green-600 transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Saved Collections */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Collections</h2>
                  <button className="text-xs font-bold text-green-600">Create New</button>
                </div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
                  {COLLECTIONS.map((col) => (
                    <div 
                      key={col.id}
                      className="w-32 shrink-0 bg-white border border-slate-100 rounded-2xl p-3 shadow-sm active:scale-95 transition-all"
                    >
                      <div className={`w-10 h-10 ${col.color} rounded-xl flex items-center justify-center mb-3 text-xl`}>
                        {col.icon}
                      </div>
                      <h3 className="text-xs font-bold text-slate-800 mb-1 leading-tight">{col.title}</h3>
                      <p className="text-[10px] text-slate-400 font-medium">{col.count} items</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Grid/List Toggle & Sort */}
              <div className="flex items-center justify-between">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-green-600' : 'text-slate-400'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-green-600' : 'text-slate-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">
                  <span>Recently Saved</span>
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </button>
              </div>

              {/* Main Saved List */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-4'}>
                {SAVED_POSTS.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => onSelectPost(post)}
                    className={`bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm active:scale-[0.98] transition-all ${
                      viewMode === 'grid' ? 'flex flex-col' : 'flex gap-4 p-3'
                    }`}
                  >
                    <div className={`relative ${viewMode === 'grid' ? 'h-32' : 'w-24 h-24 shrink-0'}`}>
                      <img 
                        src={post.media.url[0]} 
                        alt={post.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <Bookmark className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <UrgencyBadge urgency={post.urgency} />
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">{post.category}</span>
                      </div>
                      <h3 className={`font-bold text-slate-900 mb-1 truncate ${viewMode === 'grid' ? 'px-3 text-sm' : 'text-sm'}`}>
                        {post.title}
                      </h3>
                      <div className={`flex items-center gap-1 text-[10px] text-slate-400 ${viewMode === 'grid' ? 'px-3 pb-3' : ''}`}>
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{post.location}</span>
                      </div>
                      {viewMode === 'list' && (
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] font-medium text-slate-400">{post.timestamp}</span>
                          <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                            post.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                            post.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {post.status}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tracked Issue Card Style */}
              <section>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Actively Tracking</h2>
                <div className="bg-white border-2 border-green-100 rounded-3xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">Road damage near school road</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Last updated: Today, 10:30 AM</p>
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-700 text-[8px] font-bold rounded-full uppercase tracking-widest">
                      In Progress
                    </div>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="relative h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-2/3 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-6 h-6 rounded-full border-2 border-white" />
                      ))}
                      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-400">
                        +12
                      </div>
                    </div>
                    <button className="px-4 py-1.5 bg-green-500 text-white text-[10px] font-bold rounded-xl shadow-md shadow-green-500/20 active:scale-95 transition-all">
                      View Status
                    </button>
                  </div>
                </div>
              </section>

              {/* Location-based Saved Section */}
              <section>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Saved Locations</h2>
                <div className="space-y-3">
                  {[
                    { name: 'Temple Street', count: 4, category: 'Infrastructure' },
                    { name: 'Market Road', count: 7, category: 'Garbage' }
                  ].map((loc, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-green-50 transition-colors">
                        <MapPin className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">{loc.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{loc.count} saved issues • {loc.category}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Smart Help Card */}
              <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex gap-3">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <Info className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-0.5">Organize your reports</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Create collections to group reports by area or urgency. You'll get notified whenever a saved report is updated.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty State (Hidden by default, shown if no posts) */}
      {SAVED_POSTS.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <Bookmark className="w-12 h-12 text-green-200" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No saved reports yet</h3>
          <p className="text-sm text-slate-500 mb-8">Bookmark useful civic posts to revisit them later and track their progress.</p>
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-500/20 active:scale-95 transition-all"
          >
            Explore Reports
          </button>
        </div>
      )}
    </div>
  );
};
