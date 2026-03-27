import React from 'react';
import { ChevronLeft, Info, Filter, Share2, Award, ShieldCheck, TrendingUp, Users, CheckCircle2, MapPin, ArrowUp, ArrowRight, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Contributor {
  id: string;
  rank: number;
  name: string;
  username: string;
  avatar: string;
  role: string;
  metric: string;
  metricValue: string;
  trend: 'up' | 'down' | 'flat';
  isVerified: boolean;
  area?: string;
}

interface LeaderboardProps {
  onBack: () => void;
}

export const Leaderboard = ({ onBack }: LeaderboardProps) => {
  const [activeTab, setActiveTab] = React.useState('This Month');
  const [activeFilter, setActiveFilter] = React.useState('Reports Shared');
  const [selectedContributor, setSelectedContributor] = React.useState<Contributor | null>(null);

  const tabs = ['This Week', 'This Month', 'All Time', 'Nearby'];
  const filters = ['Reports Shared', 'Helpful Updates', 'Resolved Issues', 'Community Supports'];

  const top3: Contributor[] = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Jenkins',
      username: '@sarah_j',
      avatar: 'https://picsum.photos/seed/sarah/200/200',
      role: 'Community Guardian',
      metric: 'Reports',
      metricValue: '42',
      trend: 'up',
      isVerified: true,
      area: 'Downtown'
    },
    {
      id: '2',
      rank: 2,
      name: 'Marcus Chen',
      username: '@marcus_c',
      avatar: 'https://picsum.photos/seed/marcus/200/200',
      role: 'Civic Hero',
      metric: 'Reports',
      metricValue: '38',
      trend: 'up',
      isVerified: true,
      area: 'Sector 4'
    },
    {
      id: '3',
      rank: 3,
      name: 'Elena Rodriguez',
      username: '@elena_r',
      avatar: 'https://picsum.photos/seed/elena/200/200',
      role: 'Local Watcher',
      metric: 'Reports',
      metricValue: '35',
      trend: 'flat',
      isVerified: false,
      area: 'Market Road'
    }
  ];

  const rankings: Contributor[] = [
    { id: '4', rank: 4, name: 'David Kim', username: '@davidk', avatar: 'https://picsum.photos/seed/david/100/100', role: 'Verified Resident', metric: 'Reports', metricValue: '28', trend: 'up', isVerified: true },
    { id: '5', rank: 5, name: 'Priya Sharma', username: '@priya_s', avatar: 'https://picsum.photos/seed/priya/100/100', role: 'Community Reporter', metric: 'Reports', metricValue: '24', trend: 'up', isVerified: false },
    { id: '6', rank: 6, name: 'James Wilson', username: '@jamesw', avatar: 'https://picsum.photos/seed/james/100/100', role: 'Local Contributor', metric: 'Reports', metricValue: '21', trend: 'down', isVerified: true },
    { id: '7', rank: 7, name: 'Lisa Thompson', username: '@lisat', avatar: 'https://picsum.photos/seed/lisa/100/100', role: 'Civic Volunteer', metric: 'Reports', metricValue: '19', trend: 'flat', isVerified: false },
    { id: '8', rank: 8, name: 'Robert Chen', username: '@robertc', avatar: 'https://picsum.photos/seed/robert/100/100', role: 'Verified Resident', metric: 'Reports', metricValue: '17', trend: 'up', isVerified: true },
  ];

  const badges = [
    { id: '1', name: 'First Report', icon: <Star className="w-5 h-5" />, color: 'bg-amber-500' },
    { id: '2', name: 'Local Watcher', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-green-500' },
    { id: '3', name: 'Verified Voice', icon: <CheckCircle2 className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: '4', name: 'Area Guardian', icon: <Award className="w-5 h-5" />, color: 'bg-purple-500' },
    { id: '5', name: 'Rising Star', icon: <Zap className="w-5 h-5" />, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">Top Contributors</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Community Impact</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <Share2 className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <Info className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Hero Summary */}
      <div className="px-6 pt-6 mb-8">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-[32px] p-6 text-white shadow-xl shadow-green-600/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-2">Celebrate meaningful community action</h2>
            <p className="text-sm text-white/80 leading-relaxed mb-6">See who is helping improve public awareness and making Sector 4 a better place to live.</p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl font-black mb-0.5">126</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">Active Contributors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-2xl font-black mb-0.5">48</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">Issues Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="sticky top-[73px] z-40 bg-slate-50/80 backdrop-blur-md py-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto px-6 no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
                  : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto px-6 no-scrollbar">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeFilter === filter 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-6 mb-10 pt-4">
        <div className="flex items-end justify-center gap-3 h-64">
          {/* Rank 2 */}
          <PodiumCard 
            contributor={top3[1]} 
            height="h-48" 
            medalColor="bg-slate-300"
            onClick={() => setSelectedContributor(top3[1])}
          />
          {/* Rank 1 */}
          <PodiumCard 
            contributor={top3[0]} 
            height="h-56" 
            medalColor="bg-amber-400"
            isWinner
            onClick={() => setSelectedContributor(top3[0])}
          />
          {/* Rank 3 */}
          <PodiumCard 
            contributor={top3[2]} 
            height="h-40" 
            medalColor="bg-orange-400"
            onClick={() => setSelectedContributor(top3[2])}
          />
        </div>
      </div>

      {/* Full Ranking List */}
      <div className="px-6 mb-10">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Community Rankings</h3>
        <div className="space-y-3">
          {rankings.map((person, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={person.id}
              onClick={() => setSelectedContributor(person)}
              className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-slate-300 w-4">#{person.rank}</span>
                <div className="relative">
                  <img 
                    src={person.avatar} 
                    alt={person.name} 
                    className="w-12 h-12 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {person.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-white">
                      <CheckCircle2 className="w-2 h-2 text-white fill-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{person.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{person.role}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-green-600">{person.metricValue}</div>
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{person.metric}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Personal Rank Card */}
      <div className="px-6 mb-10">
        <div className="bg-green-50 rounded-[32px] p-6 border border-green-100 flex items-center gap-6">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/user/200/200" 
              alt="You" 
              className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">#24</div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-slate-900 mb-1">Your Impact</h4>
            <p className="text-xs text-slate-500 mb-3">You gained 4 places this week! 🚀</p>
            <div className="w-full bg-green-200/50 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full w-[65%]" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] font-bold text-green-700 uppercase tracking-wider">2 reports to top 20</span>
              <span className="text-[9px] font-bold text-green-700 uppercase tracking-wider">65%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Strip */}
      <div className="mb-10">
        <div className="flex items-center justify-between px-6 mb-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Achievements</h3>
          <button className="text-[10px] font-bold text-green-600 uppercase tracking-widest">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar">
          {badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-16 h-16 ${badge.color} rounded-[24px] flex items-center justify-center text-white shadow-lg shadow-slate-200`}>
                {badge.icon}
              </div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider text-center max-w-[64px]">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Community Impact Banner */}
      <div className="px-6 mb-10">
        <div className="bg-slate-900 rounded-[32px] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/20 to-transparent" />
          <Users className="w-10 h-10 text-green-400 mx-auto mb-4 relative z-10" />
          <h3 className="text-lg font-black mb-2 relative z-10">Real Impact, Real Change</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-6 relative z-10">This month, top contributors helped highlight 48 major civic issues, improving awareness across 12 local zones.</p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-green-500/20 active:scale-95 transition-all relative z-10">
            Join the Movement
          </button>
        </div>
      </div>

      {/* Contributor Preview Modal */}
      <AnimatePresence>
        {selectedContributor && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedContributor(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-[101] p-8 max-w-md mx-auto"
            >
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                  <img 
                    src={selectedContributor.avatar} 
                    alt={selectedContributor.name} 
                    className="w-24 h-24 rounded-[32px] object-cover border-4 border-white shadow-2xl shadow-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-600 text-white text-xs font-black px-3 py-1.5 rounded-xl border-4 border-white">
                    #{selectedContributor.rank}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{selectedContributor.name}</h3>
                  {selectedContributor.isVerified && <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/10" />}
                </div>
                <p className="text-sm font-bold text-slate-400 mb-4">{selectedContributor.username}</p>
                <div className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {selectedContributor.role}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-xl font-black text-slate-900">{selectedContributor.metricValue}</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Reports</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-slate-900">12</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-slate-900">450</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Impact</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-600/20 active:scale-95 transition-all">
                  View Profile
                </button>
                <button className="p-4 bg-slate-100 text-slate-600 rounded-2xl active:scale-95 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const PodiumCard = ({ contributor, height, medalColor, isWinner = false, onClick }: { contributor: Contributor, height: string, medalColor: string, isWinner?: boolean, onClick: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: contributor.rank * 0.1 }}
    onClick={onClick}
    className={`flex-1 flex flex-col items-center cursor-pointer group`}
  >
    <div className="relative mb-4">
      <img 
        src={contributor.avatar} 
        alt={contributor.name} 
        className={`${isWinner ? 'w-20 h-20' : 'w-16 h-16'} rounded-[24px] object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform`}
        referrerPolicy="no-referrer"
      />
      <div className={`absolute -bottom-2 -right-2 ${medalColor} text-white w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs font-black shadow-lg`}>
        {contributor.rank}
      </div>
    </div>
    <div className={`w-full ${height} bg-white rounded-t-[32px] shadow-2xl shadow-slate-200/50 flex flex-col items-center pt-4 px-2 text-center border-x border-t border-slate-50`}>
      <h4 className="text-[11px] font-black text-slate-900 truncate w-full">{contributor.name}</h4>
      <p className="text-[9px] font-bold text-green-600 uppercase tracking-wider mt-1">{contributor.metricValue} {contributor.metric}</p>
      {contributor.trend === 'up' && <ArrowUp className="w-3 h-3 text-green-500 mt-2" />}
    </div>
  </motion.div>
);
