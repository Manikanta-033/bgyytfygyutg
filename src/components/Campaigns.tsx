import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  Info, 
  Flame, 
  TrendingUp, 
  Users, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Leaf, 
  Droplets, 
  Construction, 
  ShieldAlert, 
  Trash2, 
  Lightbulb, 
  Clock, 
  Award, 
  Share2, 
  Bookmark, 
  Plus,
  Target,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CampaignsProps {
  onBack: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Zap },
  { id: 'active', label: 'Active', icon: Flame },
  { id: 'nearby', label: 'Nearby', icon: MapPin },
  { id: 'environment', label: 'Environment', icon: Leaf },
  { id: 'roads', label: 'Roads', icon: Construction },
  { id: 'safety', label: 'Safety', icon: ShieldAlert },
  { id: 'cleanliness', label: 'Cleanliness', icon: Trash2 },
  { id: 'water', label: 'Water', icon: Droplets },
];

const STATS = [
  { label: 'Active Campaigns', value: '12', icon: Flame, color: 'text-orange-500' },
  { label: 'Nearby Missions', value: '4', icon: MapPin, color: 'text-blue-500' },
  { label: 'Participants', value: '320', icon: Users, color: 'text-green-500' },
  { label: 'Actions This Week', value: '28', icon: Target, color: 'text-purple-500' },
];

const CAMPAIGNS = [
  {
    id: '1',
    title: 'Clean Lake Awareness Week',
    description: 'Help us monitor and report pollution levels in the city lake.',
    category: 'Environment',
    image: 'https://picsum.photos/seed/lake/800/400',
    participants: 128,
    reports: 62,
    progress: 65,
    status: 'Active',
    date: 'Mar 24 - Mar 31',
    urgency: 'High',
    isNearby: true,
  },
  {
    id: '2',
    title: 'Pothole Watch Drive',
    description: 'Mapping every major pothole in Sector 4 for faster repairs.',
    category: 'Roads',
    image: 'https://picsum.photos/seed/road/800/400',
    participants: 85,
    reports: 42,
    progress: 40,
    status: 'Active',
    date: 'Mar 20 - Apr 05',
    urgency: 'Medium',
    isNearby: false,
  },
  {
    id: '3',
    title: 'Safe Streets for School Zones',
    description: 'Identifying unsafe crossings and broken lights near primary schools.',
    category: 'Safety',
    image: 'https://picsum.photos/seed/school/800/400',
    participants: 210,
    reports: 15,
    progress: 20,
    status: 'Upcoming',
    date: 'Starts in 3 days',
    urgency: 'High',
    isNearby: true,
  },
  {
    id: '4',
    title: 'Neighborhood Garbage Watch',
    description: 'Community-led initiative to eliminate illegal dumping spots.',
    category: 'Cleanliness',
    image: 'https://picsum.photos/seed/garbage/800/400',
    participants: 340,
    reports: 88,
    progress: 100,
    status: 'Completed',
    date: 'Feb 15 - Mar 15',
    urgency: 'Low',
    isNearby: false,
  }
];

export const Campaigns: React.FC<CampaignsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof CAMPAIGNS[0] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredCampaigns = CAMPAIGNS.filter(c => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return c.status === 'Active';
    if (activeTab === 'nearby') return c.isNearby;
    return c.category.toLowerCase() === activeTab;
  });

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="p-6 space-y-6">
          <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse" />
          <div className="h-48 w-full bg-slate-100 rounded-[32px] animate-pulse" />
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-24 bg-slate-100 rounded-full animate-pulse flex-shrink-0" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-64 w-full bg-slate-100 rounded-[32px] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-none">Civic Missions</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Join focused community actions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="overflow-y-auto no-scrollbar">
        {/* Hero Banner */}
        <section className="px-6 py-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 rounded-[40px] overflow-hidden shadow-2xl shadow-green-600/20 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" 
              alt="Featured Campaign"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-green-500/30">Featured</span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Active Now</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-2 leading-tight">Clean Lake Awareness Week</h2>
              <p className="text-white/80 text-sm mb-6 max-w-[80%] line-clamp-2">Help us monitor and report pollution levels in the city lake to drive government action.</p>
              <div className="flex items-center gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-green-500/40 transition-all active:scale-95">
                  Join Campaign
                </button>
                <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all">
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Category Filters */}
        <section className="px-6 py-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  activeTab === cat.id 
                    ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-green-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-green-50/50 p-5 rounded-[32px] border border-green-100/50 flex flex-col items-center text-center group hover:bg-green-100/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Campaign List */}
        <section className="px-6 py-6 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Active Missions</h3>
            <button className="text-green-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign, i) => (
                  <motion.div
                    key={campaign.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedCampaign(campaign)}
                    className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 group active:scale-[0.98] transition-all"
                  >
                    <div className="relative h-48">
                      <img 
                        src={campaign.image} 
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                          campaign.status === 'Active' ? 'bg-green-500 text-white' :
                          campaign.status === 'Upcoming' ? 'bg-amber-500 text-white' :
                          'bg-slate-500 text-white'
                        }`}>
                          {campaign.status}
                        </span>
                        {campaign.isNearby && (
                          <span className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                            <MapPin className="w-3 h-3 text-green-600" /> Nearby
                          </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-green-600 shadow-lg transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{campaign.category}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{campaign.date}</span>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight">{campaign.title}</h4>
                      <p className="text-xs text-slate-500 mb-6 line-clamp-2">{campaign.description}</p>
                      
                      {/* Progress */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                              <img 
                                key={i}
                                src={`https://i.pravatar.cc/100?u=${campaign.id}${i}`}
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                alt="Participant"
                              />
                            ))}
                            <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-400">
                              +{campaign.participants - 3}
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{campaign.progress}% Goal</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${campaign.progress}%` }}
                            className="h-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-500/20 transition-all active:scale-95">
                          {campaign.status === 'Upcoming' ? 'Remind Me' : 'Join Mission'}
                        </button>
                        <button className="w-14 h-14 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 flex flex-col items-center text-center px-8"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <Leaf className="w-12 h-12 text-green-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">No missions found</h3>
                  <p className="text-slate-400 text-sm mb-8">Try another category or check back later for new community missions.</p>
                  <button 
                    onClick={() => setActiveTab('all')}
                    className="bg-green-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-green-600/20"
                  >
                    Explore All
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Community Impact Banner */}
        <section className="px-6 py-4">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-black mb-2 leading-tight">Your reports matter</h3>
              <p className="text-white/60 text-xs leading-relaxed mb-6">Focused campaigns help communities respond faster. Together, small reports create visible awareness and drive real change.</p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xl font-black">2.4k</div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Reports Resolved</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-xl font-black">12k</div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Citizens</div>
                </div>
              </div>
            </div>
            <TrendingUp className="absolute -right-12 -bottom-12 w-48 h-48 text-white/5 -rotate-12" />
          </div>
        </section>

        {/* Tags Strip */}
        <section className="px-6 py-8">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Popular Tags</h4>
          <div className="flex flex-wrap gap-2">
            {['#RoadSafety', '#CleanWater', '#GarbageWatch', '#StreetlightAlert', '#SafeCommute', '#GreenCity', '#CivicAction'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:border-green-200 hover:text-green-600 transition-all cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Campaign Details Preview (Bottom Sheet) */}
      <AnimatePresence>
        {selectedCampaign && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCampaign(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[48px] z-50 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-center border-b border-slate-50">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
              </div>
              
              <div className="p-8">
                <div className="relative h-56 rounded-[40px] overflow-hidden mb-8 shadow-xl">
                  <img 
                    src={selectedCampaign.image} 
                    alt={selectedCampaign.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {selectedCampaign.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{selectedCampaign.category}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedCampaign.date}</span>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{selectedCampaign.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{selectedCampaign.description} This community-led initiative aims to bring together citizens to identify and report issues that impact our daily lives. By participating, you help us build a stronger, safer, and cleaner neighborhood for everyone.</p>

                {/* Participation Tasks */}
                <div className="bg-slate-50 rounded-[32px] p-6 mb-8">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">How to Participate</h4>
                  <div className="space-y-4">
                    {[
                      { icon: Plus, label: 'Post related issue reports', desc: 'Add photos and details of issues you find.' },
                      { icon: CheckCircle2, label: 'Support local updates', desc: 'Verify and upvote useful reports from others.' },
                      { icon: Share2, label: 'Share awareness posts', desc: 'Spread the word on social media.' }
                    ].map((task, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm flex-shrink-0">
                          <task.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-0.5">{task.label}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{task.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Participation Summary */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-xl font-black text-slate-900">{selectedCampaign.participants}</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Joined</div>
                  </div>
                  <div className="text-center border-x border-slate-100">
                    <div className="text-xl font-black text-slate-900">{selectedCampaign.reports}</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-black text-slate-900">18</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Updates</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-5 rounded-[24px] text-sm font-black uppercase tracking-widest shadow-xl shadow-green-500/30 transition-all active:scale-95">
                    Join Campaign
                  </button>
                  <button onClick={() => setSelectedCampaign(null)} className="px-8 bg-slate-100 hover:bg-slate-200 text-slate-500 py-5 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
