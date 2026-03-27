import { 
  Search, 
  Filter, 
  MapPin, 
  Navigation, 
  Layers, 
  Maximize2, 
  Minimize2, 
  AlertTriangle,
  ChevronRight,
  Clock,
  ArrowRight,
  List,
  Map as MapIcon
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Urgency } from '../types';

const CATEGORIES = ['All', 'Roads', 'Water', 'Pollution', 'Garbage', 'Streetlights', 'Drainage', 'Unsafe'];

const MOCK_MARKERS = [
  { id: '1', lat: 40, lng: 40, type: 'Roads', urgency: 'Urgent', title: 'Major Pothole' },
  { id: '2', lat: 60, lng: 30, type: 'Pollution', urgency: 'High', title: 'River Waste' },
  { id: '3', lat: 30, lng: 70, type: 'Garbage', urgency: 'Medium', title: 'Illegal Dump' },
  { id: '4', lat: 80, lng: 50, type: 'Streetlights', urgency: 'Low', title: 'Dark Lane' },
  { id: '5', lat: 20, lng: 20, type: 'Water', urgency: 'High', title: 'Pipe Leak' },
];

const NEARBY_ISSUES = [
  { id: '1', title: 'Large pothole near school gate', category: 'Roads', urgency: 'Urgent', distance: '300m', time: '2h ago' },
  { id: '2', title: 'Garbage dumping beside market', category: 'Garbage', urgency: 'Medium', distance: '800m', time: '5h ago' },
  { id: '3', title: 'Polluted drain near colony', category: 'Drainage', urgency: 'High', distance: '1.2km', time: '1d ago' },
];

export const MapExplore = ({ onSelectPost }: { onSelectPost: (id: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);

  return (
    <div className="h-screen bg-slate-100 relative overflow-hidden">
      {/* Map Background Mockup */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#e5e7eb] opacity-50" />
        {/* Grid lines to simulate map */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Mock Markers */}
        {MOCK_MARKERS.map(marker => (
          <motion.button
            key={marker.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${marker.lat}%`, top: `${marker.lng}%` }}
            onClick={() => onSelectPost(marker.id)}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white transition-transform group-active:scale-90 ${
              marker.urgency === 'Urgent' ? 'bg-red-500' : 
              marker.urgency === 'High' ? 'bg-orange-500' : 
              'bg-green-500'
            }`}>
              <MapPin className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <p className="text-[10px] font-bold text-slate-900">{marker.title}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Top Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 space-y-4">
        <header className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <MapIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 leading-tight">Nearby Issues</h1>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <MapPin className="w-3 h-3 text-green-500" />
                <span>Ayodhya • Within 5km</span>
              </div>
            </div>
          </div>
          <button className="p-2.5 bg-slate-50 text-slate-600 rounded-full">
            <Search className="w-5 h-5" />
          </button>
        </header>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-lg ${
                activeCategory === cat 
                ? 'bg-green-500 text-white border-green-500 shadow-green-500/20' 
                : 'bg-white text-slate-500 border-white/50 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-600 active:scale-90 transition-all border border-gray-100">
          <Maximize2 className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-600 active:scale-90 transition-all border border-gray-100">
          <Minimize2 className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-green-600 active:scale-90 transition-all border border-gray-100">
          <Navigation className="w-5 h-5" />
        </button>
        <div className="h-px bg-gray-100 mx-2" />
        <button 
          onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          className="w-12 h-12 bg-green-500 rounded-2xl shadow-xl flex items-center justify-center text-white active:scale-90 transition-all"
        >
          {viewMode === 'map' ? <List className="w-5 h-5" /> : <MapIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Area Insight Card */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-40 bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-xl space-y-3"
      >
        <div className="flex items-center gap-2 text-green-600">
          <AlertTriangle className="w-4 h-4" />
          <h4 className="text-[10px] font-bold uppercase tracking-wider">Local Insight</h4>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-900">Road Damage</p>
          <p className="text-[10px] text-slate-500">Most reported this week</p>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[10px] font-bold text-green-600">12 Active Reports</p>
        </div>
      </motion.div>

      {/* Bottom Sheet Issue Preview */}
      <motion.div 
        animate={{ height: isSheetExpanded ? '80vh' : '320px' }}
        className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-[40px] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] border-t border-gray-100 overflow-hidden"
      >
        <div 
          className="w-full py-4 flex flex-col items-center cursor-pointer"
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
        >
          <div className="w-12 h-1.5 bg-gray-100 rounded-full mb-4" />
          <div className="w-full px-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">24 Issues Nearby</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Swipe up to explore</p>
            </div>
            <button className="p-2 bg-green-50 text-green-600 rounded-xl">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 pb-24 overflow-y-auto h-full no-scrollbar">
          {/* Urgent Highlight */}
          <div className="mb-6 bg-red-50 rounded-3xl p-4 border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Urgent Alert</p>
                <p className="text-xs font-bold text-red-900">3 high-risk reports nearby</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-red-400" />
          </div>

          {/* Issue List */}
          <div className="space-y-4">
            {NEARBY_ISSUES.map(issue => (
              <button 
                key={issue.id}
                onClick={() => onSelectPost(issue.id)}
                className="w-full bg-white border border-gray-100 rounded-3xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-all text-left group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                  <img src={`https://picsum.photos/seed/issue${issue.id}/100/100`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{issue.category}</span>
                    <span className="text-[10px] font-bold text-slate-400">{issue.distance}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 truncate mb-1">{issue.title}</h4>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider ${
                      issue.urgency === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {issue.urgency}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{issue.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-green-500 transition-colors" />
              </button>
            ))}
          </div>

          {/* Trending Areas Carousel */}
          <div className="mt-8 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest opacity-40">Trending Zones</h4>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {['Bus Stand', 'School Zone', 'Market Road', 'Lake View'].map(zone => (
                <div key={zone} className="w-40 shrink-0 bg-slate-50 rounded-3xl p-4 border border-gray-100 space-y-3">
                  <div className="aspect-video rounded-2xl bg-white overflow-hidden border border-gray-100">
                    <img src={`https://picsum.photos/seed/${zone}/200/100`} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{zone}</p>
                    <p className="text-[10px] font-bold text-green-600">5 Active Reports</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
