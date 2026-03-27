import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  ArrowLeft, 
  X, 
  Mic, 
  Clock, 
  TrendingUp, 
  MapPin, 
  User, 
  Hash, 
  ChevronRight, 
  Filter, 
  MoreHorizontal,
  Info,
  AlertCircle,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Post, Urgency } from '../types';
import { UrgencyBadge } from './PostCard';

interface SearchProps {
  onBack: () => void;
  onSelectPost: (post: Post) => void;
}

const RECENT_SEARCHES = [
  'Road damage near school',
  'Polluted lake',
  'Garbage in market area',
  'Temple Street potholes',
  'Streetlight issue'
];

const TRENDING_SEARCHES = [
  { text: 'Road damage this week', icon: <TrendingUp className="w-3 h-3" /> },
  { text: 'Nearby pollution reports', icon: <Navigation className="w-3 h-3" /> },
  { text: 'Water leakage', icon: <TrendingUp className="w-3 h-3" /> },
  { text: 'Urgent issues near me', icon: <MapPin className="w-3 h-3" /> }
];

const CATEGORIES = [
  { id: 'roads', label: 'Roads', icon: '🛣️' },
  { id: 'water', label: 'Water', icon: '💧' },
  { id: 'garbage', label: 'Garbage', icon: '🗑️' },
  { id: 'drainage', label: 'Drainage', icon: '🌊' },
  { id: 'infra', label: 'Infrastructure', icon: '🏗️' },
  { id: 'unsafe', label: 'Unsafe Areas', icon: '⚠️' },
  { id: 'lights', label: 'Streetlights', icon: '💡' },
  { id: 'pollution', label: 'Pollution', icon: '🌫️' }
];

const FILTER_CHIPS = ['All', 'Posts', 'Locations', 'People', 'Categories', 'Urgent', 'Resolved', 'Nearby', 'Verified'];

const MOCK_RESULTS = {
  posts: [
    {
      id: 's1',
      user: { name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', isVerified: true },
      location: 'Oakwood Avenue',
      timestamp: '3h ago',
      title: 'Large Pothole causing traffic',
      description: 'A massive pothole has opened up right in the middle of Oakwood Ave. Cars are swerving to avoid it.',
      category: 'Roads',
      media: { type: 'image', url: ['https://picsum.photos/seed/pothole/400/300'] },
      urgency: 'High',
      likes: 45,
      comments: 12,
      shares: 5,
      status: 'Pending'
    } as Post
  ],
  locations: [
    { id: 'l1', name: 'Market Road', issueCount: 12, topCategory: 'Garbage', image: 'https://picsum.photos/seed/market/100/100' },
    { id: 'l2', name: 'School Zone', issueCount: 5, topCategory: 'Roads', image: 'https://picsum.photos/seed/school/100/100' }
  ],
  profiles: [
    { id: 'u1', name: 'Local Reporter 01', handle: '@localreporter_01', role: 'Community Reporter', contributions: 156, avatar: 'https://i.pravatar.cc/150?u=reporter' },
    { id: 'u2', name: 'John Doe', handle: '@johndoe', role: 'Verified Resident', contributions: 42, avatar: 'https://i.pravatar.cc/150?u=john' }
  ],
  tags: [
    { id: 't1', name: '#RoadDamage', count: 1240 },
    { id: 't2', name: '#WaterPollution', count: 850 }
  ]
};

export const Search: React.FC<SearchProps> = ({ onBack, onSelectPost }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setShowResults(false);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* Top Search Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          
          <div className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-2xl transition-all duration-300 border-2 ${
            isFocused ? 'bg-white border-green-500 shadow-lg shadow-green-500/10' : 'bg-slate-50 border-transparent'
          }`}>
            <SearchIcon className={`w-5 h-5 ${isFocused ? 'text-green-500' : 'text-slate-400'}`} />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search issues, places, users..."
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400"
            />
            {query && (
              <button onClick={clearSearch} className="p-1 hover:bg-slate-200 rounded-full">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            )}
            {!query && <Mic className="w-5 h-5 text-slate-400" />}
          </div>

          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Filter className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mt-3 -mx-4 px-4 pb-1">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                activeFilter === chip 
                  ? 'bg-green-500 border-green-500 text-white shadow-md shadow-green-500/20' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-green-200'
              }`}
            >
              {chip}
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
              <div className="space-y-3">
                <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl animate-pulse" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                        <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : showResults ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 space-y-8"
            >
              {/* Top Result */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Top Result</h3>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">BEST MATCH</span>
                </div>
                <div 
                  onClick={() => onSelectPost(MOCK_RESULTS.posts[0])}
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm active:scale-[0.98] transition-all"
                >
                  <div className="relative h-48">
                    <img 
                      src={MOCK_RESULTS.posts[0].media.url[0]} 
                      alt="Top Result"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <UrgencyBadge urgency={MOCK_RESULTS.posts[0].urgency} />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">
                        {MOCK_RESULTS.posts[0].category}
                      </span>
                      <span className="text-[10px] text-slate-400">• {MOCK_RESULTS.posts[0].timestamp}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{MOCK_RESULTS.posts[0].title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{MOCK_RESULTS.posts[0].description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <MapPin className="w-3 h-3" />
                      <span>{MOCK_RESULTS.posts[0].location}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* People Results */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Reporters & Users</h3>
                <div className="space-y-4">
                  {MOCK_RESULTS.profiles.map(user => (
                    <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-2xl transition-colors">
                      <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{user.name}</h4>
                          <CheckCircle2 className="w-3 h-3 text-blue-500" />
                        </div>
                        <p className="text-[10px] text-slate-400">{user.handle} • {user.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-green-600">{user.contributions}</p>
                        <p className="text-[8px] text-slate-400 uppercase">Reports</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Location Results */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Locations</h3>
                <div className="grid grid-cols-2 gap-3">
                  {MOCK_RESULTS.locations.map(loc => (
                    <div key={loc.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                        <MapPin className="w-5 h-5 text-green-500" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{loc.name}</h4>
                      <p className="text-[10px] text-slate-500">{loc.issueCount} issues reported</p>
                      <div className="mt-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        Mainly {loc.topCategory}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tag Results */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {MOCK_RESULTS.tags.map(tag => (
                    <div key={tag.id} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <Hash className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-bold text-slate-700">{tag.name.replace('#', '')}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{tag.count}</span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 space-y-8"
            >
              {/* Smart Search Tip */}
              <div className="p-4 bg-green-50 rounded-3xl border border-green-100 flex gap-3">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-green-900 mb-0.5">Search Tip</h4>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Try searching by area name or issue type like <span className="font-bold italic">"road"</span>, <span className="font-bold italic">"garbage"</span>, or <span className="font-bold italic">"pollution"</span>.
                  </p>
                </div>
              </div>

              {/* Recent Searches */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Searches</h3>
                  <button className="text-xs font-bold text-green-600">Clear All</button>
                </div>
                <div className="space-y-1">
                  {RECENT_SEARCHES.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => setQuery(item)}
                      className="flex items-center gap-3 py-3 px-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group"
                    >
                      <Clock className="w-4 h-4 text-slate-300 group-hover:text-green-500" />
                      <span className="flex-1 text-sm text-slate-600">{item}</span>
                      <X className="w-4 h-4 text-slate-300 hover:text-red-500" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Trending Queries */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Trending Civic Queries</h3>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((item, i) => (
                    <button 
                      key={i}
                      onClick={() => setQuery(item.text)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-green-50 hover:border-green-200 transition-all group"
                    >
                      <span className="text-green-500 group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-700">{item.text}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Category Discovery Grid */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Browse by Category</h3>
                <div className="grid grid-cols-4 gap-3">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setQuery(cat.label)}
                      className="flex flex-col items-center gap-2 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-green-100 transition-all active:scale-95"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-[10px] font-bold text-slate-600 text-center">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty State (Visible when query yields nothing) */}
      {query.length > 10 && !isLoading && showResults && MOCK_RESULTS.posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-12 h-12 text-slate-200" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No results found</h3>
          <p className="text-sm text-slate-500 mb-8">Try a different keyword, place, or category to find what you're looking for.</p>
          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={clearSearch}
              className="w-full py-3 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-500/20 active:scale-95 transition-all"
            >
              Clear Filters
            </button>
            <button className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl active:scale-95 transition-all">
              Explore Trending
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
