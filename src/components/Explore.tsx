import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  MapPin, 
  ChevronRight, 
  Play, 
  Award, 
  Droplets, 
  Trash2, 
  Lightbulb, 
  Construction, 
  ShieldAlert, 
  Leaf, 
  Zap,
  Flame,
  Star,
  Mic,
  X,
  RefreshCw,
  ArrowRight,
  Info,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UrgencyBadge } from './PostCard';

const CATEGORIES = [
  { id: 'roads', label: 'Roads', icon: Construction, color: 'bg-orange-100 text-orange-600' },
  { id: 'water', label: 'Water', icon: Droplets, color: 'bg-blue-100 text-blue-600' },
  { id: 'garbage', label: 'Garbage', icon: Trash2, color: 'bg-green-100 text-green-600' },
  { id: 'drainage', label: 'Drainage', icon: Droplets, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'lights', label: 'Streetlights', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'infra', label: 'Infrastructure', icon: Construction, color: 'bg-purple-100 text-purple-600' },
  { id: 'safety', label: 'Unsafe Areas', icon: ShieldAlert, color: 'bg-red-100 text-red-600' },
  { id: 'env', label: 'Environment', icon: Leaf, color: 'bg-emerald-100 text-emerald-600' },
];

const FILTERS = ['All', 'Urgent', 'Resolved', 'Nearby', 'Trending', 'Environment'];

export const Explore: React.FC<{ 
  onOpenSearch: () => void, 
  onOpenLeaderboard?: () => void,
  onOpenCampaigns?: () => void
}> = ({ onOpenSearch, onOpenLeaderboard, onOpenCampaigns }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
      }, 1000);
    }
  };

  if (isLoading) {
    return <ExploreSkeleton />;
  }

  if (showResults && searchQuery === 'empty') {
    return <EmptyState onReset={() => { setShowResults(false); setSearchQuery(''); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Explore</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Find what's happening around you</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-slate-100 rounded-full text-slate-600">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className="px-6 py-4">
        <form onSubmit={handleSearch} className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search issues, locations, or categories"
            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium focus:outline-none focus:border-green-500 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onOpenSearch}
          />
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-slate-100 rounded-lg text-slate-400">
            <Mic className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* Quick Filters */}
      <section className="px-6 py-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeFilter === filter 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
                  : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Banner */}
      <section className="px-6 py-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-green-600/20"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-orange-300 fill-orange-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-100">Trending Now</span>
            </div>
            <h3 className="text-xl font-black mb-1 leading-tight">Road damage reports increasing this week</h3>
            <p className="text-xs text-green-100/80 mb-4">42 new reports in the last 24 hours across the city.</p>
            <button className="bg-white text-green-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
              View Trend
            </button>
          </div>
          <TrendingUp className="absolute -right-8 -bottom-8 w-40 h-40 text-white/10 -rotate-12" />
        </motion.div>
      </section>

      {/* Leaderboard Link */}
      <section className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onOpenLeaderboard}
            className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start gap-4 group active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-black text-slate-900 leading-tight">Civic Leaderboard</h4>
              <p className="text-[10px] text-slate-400 font-medium">Top contributors</p>
            </div>
          </button>

          <button 
            onClick={onOpenCampaigns}
            className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start gap-4 group active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shadow-inner">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-black text-slate-900 leading-tight">Civic Missions</h4>
              <p className="text-[10px] text-slate-400 font-medium">Join challenges</p>
            </div>
          </button>
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Categories</h3>
          <button className="text-green-600 font-bold text-xs flex items-center gap-1">
            See All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} className="flex flex-col items-center gap-2 group">
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center transition-all group-active:scale-95 shadow-sm group-hover:shadow-md`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Posts */}
      <section className="py-4">
        <div className="px-6 flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Trending Posts</h3>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
          <TrendingPostCard 
            image="https://picsum.photos/seed/pothole/400/300"
            title="Major pothole on highway"
            location="Highway 101, North"
            urgency="Urgent"
            supports={124}
          />
          <TrendingPostCard 
            image="https://picsum.photos/seed/garbage/400/300"
            title="Garbage dumping near market"
            location="Central Market Area"
            urgency="Medium"
            supports={89}
          />
          <TrendingPostCard 
            image="https://picsum.photos/seed/light/400/300"
            title="Broken streetlight since 3 days"
            location="Oak Street"
            urgency="Low"
            supports={45}
          />
        </div>
      </section>

      {/* Near You Section */}
      <section className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Near You</h3>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Within 2km</span>
        </div>
        <div className="space-y-4">
          {[
            { title: 'Drainage overflow', dist: '0.4 km', type: 'Drainage' },
            { title: 'Illegal parking', dist: '0.8 km', type: 'Safety' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden">
                <img src={`https://picsum.photos/seed/near${i}/100/100`} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{item.type} • {item.dist}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Popular This Week */}
      <section className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Popular This Week</h3>
          <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-orange-600" />
            <span className="text-[8px] font-black uppercase">Community Choice</span>
          </div>
        </div>
        <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Cleanest Zone Award</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Sector 4 Community</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Sector 4 has resolved 95% of reported issues this week. Great job community!
          </p>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-black text-green-600">
              +12
            </div>
          </div>
        </div>
      </section>

      {/* Video Highlight Strip */}
      <section className="py-4">
        <div className="px-6 flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Media Highlights</h3>
          <button className="text-green-600 font-bold text-xs">Watch All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative flex-shrink-0 w-32 aspect-[9/16] rounded-2xl overflow-hidden bg-slate-200 shadow-sm">
              <img src={`https://picsum.photos/seed/media${i}/200/400`} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-2 h-2 text-white" />
                  <span className="text-[8px] font-bold text-white truncate">Zone {i}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Insight Card */}
      <section className="px-6 py-4">
        <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
            <Zap className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-slate-900 mb-1">City Insight</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your city reported <span className="text-green-600 font-bold">45 issues</span> this week. Top issue: <span className="text-orange-600 font-bold">Road Damage</span>.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </div>
      </section>

      {/* Featured Report */}
      <section className="px-6 py-4">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Featured Report</h3>
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
          <div className="relative h-48">
            <img src="https://picsum.photos/seed/river/800/400" alt="" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <UrgencyBadge urgency="Urgent" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-bold text-slate-900 uppercase">Featured</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">Severe water pollution in North Lake</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Industrial waste dumping has caused significant damage to the local ecosystem. Immediate action required.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-200 rounded-full" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Reported by Environmental Watch</span>
              </div>
              <button className="text-green-600 font-black text-xs uppercase tracking-widest">View Details</button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Based Discovery */}
      <section className="py-4">
        <div className="px-6 flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Zones to Watch</h3>
          <button className="text-green-600 font-bold text-xs">Map View</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-6">
          {[
            { name: 'Temple Area', count: 12, color: 'bg-orange-50' },
            { name: 'Market Road', count: 8, color: 'bg-blue-50' },
            { name: 'School Zone', count: 15, color: 'bg-red-50' },
            { name: 'Park Avenue', count: 5, color: 'bg-green-50' },
          ].map((zone, i) => (
            <div key={i} className={`flex-shrink-0 w-32 p-4 rounded-2xl ${zone.color} border border-white shadow-sm`}>
              <p className="text-xs font-black text-slate-900 mb-1">{zone.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{zone.count} Issues</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Action Banner */}
      <section className="px-6 py-4">
        <div className="bg-mint-50 border border-green-100 rounded-[32px] p-6 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-black text-slate-900 mb-1">Help your area</h4>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Report issues to earn points</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-600/20">
            Create Report
          </button>
        </div>
      </section>
    </div>
  );
};

const TrendingPostCard: React.FC<{
  image: string;
  title: string;
  location: string;
  urgency: 'Urgent' | 'Medium' | 'Low';
  supports: number;
}> = ({ image, title, location, urgency, supports }) => (
  <div className="flex-shrink-0 w-64 bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-sm group active:scale-95 transition-transform">
    <div className="relative h-36">
      <img src={image} alt="" className="w-full h-full object-cover" />
      <div className="absolute top-3 left-3">
        <UrgencyBadge urgency={urgency} />
      </div>
      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
        <Award className="w-3 h-3 text-green-600" />
        <span className="text-[9px] font-black text-slate-900">{supports}</span>
      </div>
    </div>
    <div className="p-4">
      <h4 className="text-sm font-black text-slate-900 mb-1 truncate">{title}</h4>
      <div className="flex items-center gap-1 text-slate-400">
        <MapPin className="w-3 h-3" />
        <span className="text-[10px] font-bold truncate">{location}</span>
      </div>
    </div>
  </div>
);

const ExploreSkeleton: React.FC = () => (
  <div className="min-h-screen bg-slate-50 pb-24 px-6 pt-8 space-y-8">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <div className="w-32 h-8 bg-slate-200 rounded-lg animate-pulse" />
        <div className="w-48 h-4 bg-slate-200 rounded-lg animate-pulse" />
      </div>
      <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
    </div>
    <div className="w-full h-14 bg-slate-200 rounded-2xl animate-pulse" />
    <div className="flex gap-2 overflow-hidden">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex-shrink-0 w-24 h-10 bg-slate-200 rounded-full animate-pulse" />
      ))}
    </div>
    <div className="w-full h-40 bg-slate-200 rounded-[32px] animate-pulse" />
    <div className="grid grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} className="space-y-2">
          <div className="w-full aspect-square bg-slate-200 rounded-2xl animate-pulse" />
          <div className="w-full h-3 bg-slate-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

const EmptyState: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-12 text-center">
    <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-8">
      <Search className="w-20 h-20 text-slate-200" />
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-2">No results found</h3>
    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
      We couldn't find any issues matching your search. Try different filters or keywords.
    </p>
    <button 
      onClick={onReset}
      className="bg-green-600 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-green-600/20 flex items-center gap-2"
    >
      <RefreshCw className="w-4 h-4" /> Reset Filters
    </button>
  </div>
);
