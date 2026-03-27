import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Filter, 
  Bell, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Flag, 
  ChevronRight, 
  MoreVertical, 
  Check, 
  X, 
  AlertTriangle,
  BarChart3,
  Users,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Calendar,
  ShieldCheck,
  Eye,
  Trash2,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface Report {
  id: string;
  title: string;
  category: string;
  location: string;
  urgency: 'Urgent' | 'High' | 'Medium' | 'Low';
  time: string;
  status: 'Pending' | 'Flagged' | 'Verified' | 'Resolved' | 'In Progress';
  image: string;
  flagReason?: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
}

// --- Mock Data ---

const STATS: Stat[] = [
  { label: 'Total Reports', value: '2,840', change: '+12%', trend: 'up', icon: LayoutDashboard, color: 'text-slate-600', bgColor: 'bg-slate-100' },
  { label: 'Pending Review', value: '142', change: '+5%', trend: 'up', icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  { label: 'In Progress', value: '86', change: '-2%', trend: 'down', icon: Zap, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: 'Resolved', value: '2,512', change: '+18%', trend: 'up', icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Flagged', value: '12', change: '-40%', trend: 'down', icon: Flag, color: 'text-red-600', bgColor: 'bg-red-100' },
];

const REPORTS: Report[] = [
  {
    id: '1',
    title: 'Major Pothole on Main St',
    category: 'Roads',
    location: 'Downtown, Sector 4',
    urgency: 'Urgent',
    time: '12m ago',
    status: 'Pending',
    image: 'https://picsum.photos/seed/pothole/200/200'
  },
  {
    id: '2',
    title: 'River Pollution Near Factory',
    category: 'Environment',
    location: 'East River Bank',
    urgency: 'High',
    time: '45m ago',
    status: 'Flagged',
    flagReason: 'Potential Duplicate',
    image: 'https://picsum.photos/seed/river/200/200'
  },
  {
    id: '3',
    title: 'Broken Streetlight',
    category: 'Infrastructure',
    location: 'Oak Avenue',
    urgency: 'Medium',
    time: '2h ago',
    status: 'Verified',
    image: 'https://picsum.photos/seed/light/200/200'
  },
  {
    id: '4',
    title: 'Garbage Dumping Site',
    category: 'Sanitation',
    location: 'West End Park',
    urgency: 'High',
    time: '3h ago',
    status: 'In Progress',
    image: 'https://picsum.photos/seed/garbage/200/200'
  }
];

const ACTIVITIES: Activity[] = [
  { id: '1', user: 'Admin Sarah', action: 'approved', target: 'Road Repair #442', time: '5m ago', icon: Check, iconColor: 'bg-green-500' },
  { id: '2', user: 'Mod Mike', action: 'flagged', target: 'Noise Complaint #12', time: '12m ago', icon: Flag, iconColor: 'bg-red-500' },
  { id: '3', user: 'System', action: 'auto-assigned', target: 'Water Leak #88', time: '20m ago', icon: Zap, iconColor: 'bg-blue-500' },
  { id: '4', user: 'Admin Sarah', action: 'resolved', target: 'Streetlight #102', time: '1h ago', icon: CheckCircle2, iconColor: 'bg-green-600' },
];

const INSIGHTS = [
  { label: 'Most reported issue', value: 'Road Damage', icon: AlertTriangle, color: 'text-orange-500' },
  { label: 'Top area', value: 'Market Road', icon: MapPin, color: 'text-blue-500' },
  { label: 'Resolution rate', value: '+14% this week', icon: TrendingUp, color: 'text-green-500' },
];

// --- Components ---

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => (
  <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div className={`w-10 h-10 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center`}>
        <stat.icon className="w-5 h-5" />
      </div>
      <div className={`flex items-center gap-0.5 text-[10px] font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {stat.change}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
      <h3 className="text-xl font-black text-slate-900">{stat.value}</h3>
    </div>
  </div>
);

const StatusDistribution = () => (
  <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Status Distribution</h3>
      <BarChart3 className="w-4 h-4 text-slate-400" />
    </div>
    <div className="space-y-4">
      {[
        { label: 'Reported', count: 1240, color: 'bg-slate-200', percent: 45 },
        { label: 'Under Review', count: 142, color: 'bg-amber-400', percent: 15 },
        { label: 'In Progress', count: 86, color: 'bg-blue-500', percent: 10 },
        { label: 'Resolved', count: 2512, color: 'bg-green-500', percent: 85 },
      ].map((item) => (
        <div key={item.label} className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="text-slate-500">{item.label}</span>
            <span className="text-slate-900">{item.count}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${item.percent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${item.color} rounded-full`}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
  const urgencyColors = {
    Urgent: 'bg-red-50 text-red-600 border-red-100',
    High: 'bg-orange-50 text-orange-600 border-orange-100',
    Medium: 'bg-blue-50 text-blue-600 border-blue-100',
    Low: 'bg-slate-50 text-slate-600 border-slate-100',
  };

  const statusColors = {
    Pending: 'bg-amber-50 text-amber-600',
    Flagged: 'bg-red-50 text-red-600',
    Verified: 'bg-green-50 text-green-600',
    'In Progress': 'bg-blue-50 text-blue-600',
    Resolved: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className={`bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm mb-4 ${report.status === 'Flagged' ? 'border-red-100 bg-red-50/30' : ''}`}>
      <div className="flex gap-4">
        <img 
          src={report.image} 
          alt={report.title} 
          className="w-20 h-20 rounded-2xl object-cover shadow-sm"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${urgencyColors[report.urgency]}`}>
              {report.urgency}
            </span>
            <span className="text-[10px] font-medium text-slate-400">{report.time}</span>
          </div>
          <h4 className="text-sm font-black text-slate-900 truncate mb-0.5">{report.title}</h4>
          <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mb-2">
            <MapPin className="w-3 h-3" /> {report.location}
          </p>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${statusColors[report.status]}`}>
              {report.status}
            </span>
            <span className="text-[10px] text-slate-400 font-bold">• {report.category}</span>
          </div>
        </div>
      </div>

      {report.status === 'Flagged' && (
        <div className="mt-3 p-2 bg-red-100/50 rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-3 h-3 text-red-600" />
          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Flagged: {report.flagReason}</span>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
        {report.status === 'Flagged' ? (
          <>
            <button className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Review</button>
            <button className="flex-1 py-2 border border-red-200 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Remove</button>
            <button className="p-2 bg-slate-100 text-slate-400 rounded-xl active:scale-95 transition-all"><X className="w-4 h-4" /></button>
          </>
        ) : (
          <>
            <button className="flex-1 py-2 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2">
              <Check className="w-3 h-3" /> Approve
            </button>
            <button className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Reject</button>
            <button className="p-2 bg-slate-100 text-slate-400 rounded-xl active:scale-95 transition-all"><MoreVertical className="w-4 h-4" /></button>
          </>
        )}
      </div>
    </div>
  );
};

const ActivityTimeline = () => (
  <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Recent Activity</h3>
      <button className="text-[10px] font-bold text-green-600 uppercase tracking-widest">View All</button>
    </div>
    <div className="space-y-6">
      {ACTIVITIES.map((activity, idx) => (
        <div key={activity.id} className="flex gap-4 relative">
          {idx !== ACTIVITIES.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-50" />
          )}
          <div className={`w-8 h-8 ${activity.iconColor} rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200`}>
            <activity.icon className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-900 font-medium leading-tight">
              <span className="font-black">{activity.user}</span> {activity.action} <span className="font-black text-slate-600">{activity.target}</span>
            </p>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuickActions = () => (
  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-6 -mx-6">
    {[
      { label: 'Bulk Approve', icon: ShieldCheck, color: 'bg-green-50 text-green-600' },
      { label: 'Review Urgent', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
      { label: 'Analytics', icon: BarChart3, color: 'bg-blue-50 text-blue-600' },
      { label: 'Users', icon: Users, color: 'bg-purple-50 text-purple-600' },
      { label: 'Settings', icon: Settings, color: 'bg-slate-50 text-slate-600' },
    ].map((action) => (
      <button key={action.label} className="flex flex-col items-center gap-2 shrink-0 group">
        <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-sm group-active:scale-95 transition-all`}>
          <action.icon className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{action.label}</span>
      </button>
    ))}
  </div>
);

const InsightCard: React.FC<{ insight: any }> = ({ insight }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 shrink-0 w-48">
    <div className={`w-10 h-10 bg-slate-50 ${insight.color} rounded-xl flex items-center justify-center`}>
      <insight.icon className="w-5 h-5" />
    </div>
    <div className="min-w-0">
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate">{insight.label}</p>
      <p className="text-xs font-black text-slate-900 truncate">{insight.value}</p>
    </div>
  </div>
);

// --- Main Dashboard ---

export const AdminDashboard = ({ onBack }: { onBack: () => void }) => {
  const [activeFilter, setActiveFilter] = useState('All Reports');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filters = ['All Reports', 'Pending', 'Flagged', 'Urgent', 'Verified'];

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen pb-24">
        <div className="p-6 space-y-6">
          <div className="h-10 w-48 bg-slate-200 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-200 rounded-3xl animate-pulse" />)}
          </div>
          <div className="h-48 bg-slate-200 rounded-[32px] animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-[28px] animate-pulse" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* App Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Moderator Panel</h1>
          <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Manage reports and activity</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 bg-slate-100 text-slate-600 rounded-xl active:scale-95 transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2.5 bg-slate-100 text-slate-600 rounded-xl relative active:scale-95 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search reports, users, or locations..."
            className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
          />
        </div>

        {/* Overview Stats */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Snapshot</h3>
            <button className="text-green-600 font-bold text-xs">Refresh</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.slice(0, 4).map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
          <div className="mt-4">
            <StatCard stat={STATS[4]} />
          </div>
        </section>

        {/* Status Distribution */}
        <StatusDistribution />

        {/* Quick Actions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Actions</h3>
          </div>
          <QuickActions />
        </section>

        {/* Mini Analytics */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Insights</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-6 -mx-6">
            {INSIGHTS.map((insight) => (
              <InsightCard key={insight.label} insight={insight} />
            ))}
          </div>
        </section>

        {/* Filters */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Report Review</h3>
            <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
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

        {/* Report List */}
        <section>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {REPORTS.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </motion.div>
          </AnimatePresence>
          
          <button className="w-full py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-400 uppercase tracking-widest active:scale-[0.98] transition-all">
            Load More Reports
          </button>
        </section>

        {/* Activity Timeline */}
        <ActivityTimeline />

        {/* Empty State Preview (Hidden by default) */}
        {false && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-1">No reports to review</h4>
            <p className="text-xs text-slate-400 font-medium">Everything is up to date. Good job!</p>
          </div>
        )}
      </div>
    </div>
  );
};
