import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, Share2, Bookmark, MapPin, 
  Clock, CheckCircle2, AlertTriangle, 
  ArrowRight, Info, Users, ShieldCheck, 
  MessageSquare, Image as ImageIcon, ExternalLink
} from 'lucide-react';
import { Post, Urgency } from '../types';
import { UrgencyBadge } from './PostCard';

interface StatusTrackingProps {
  post: Post;
  onBack: () => void;
  onViewDetails: () => void;
}

export function StatusTracking({ post, onBack, onViewDetails }: StatusTrackingProps) {
  const stages = [
    { id: 'reported', label: 'Reported', status: 'completed', date: 'Oct 12, 09:30 AM' },
    { id: 'verified', label: 'Verified', status: 'completed', date: 'Oct 12, 11:45 AM' },
    { id: 'review', label: 'Under Review', status: 'current', date: 'Oct 13, 02:15 PM' },
    { id: 'forwarded', label: 'Forwarded', status: 'pending', date: null },
    { id: 'progress', label: 'In Progress', status: 'pending', date: null },
    { id: 'resolved', label: 'Resolved', status: 'pending', date: null },
  ];

  const timeline = [
    { 
      title: 'Under Review', 
      desc: 'The report is currently being reviewed by the local civic authority team.', 
      time: '2h ago', 
      type: 'Review Update',
      icon: <Clock className="w-4 h-4" />
    },
    { 
      title: 'Community Verified', 
      desc: '12 community members have verified this issue as accurate and urgent.', 
      time: '5h ago', 
      type: 'Community Update',
      icon: <Users className="w-4 h-4" />
    },
    { 
      title: 'Reported Successfully', 
      desc: 'Issue has been successfully logged into the CivicPulse system.', 
      time: '1d ago', 
      type: 'System Update',
      icon: <CheckCircle2 className="w-4 h-4" />
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Track Report</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Issue Summary Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100"
        >
          <div className="relative h-48">
            <img 
              src={post.media.url[0]} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4">
              <UrgencyBadge urgency={post.urgency} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase rounded-lg tracking-widest">
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-lg font-black text-slate-900 leading-tight mb-2">{post.title}</h2>
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{post.location}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <img src={post.user.avatar} alt={post.user.name} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Posted by {post.user.name}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{post.timestamp}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Status Badge */}
        <div className="bg-mint-50 border border-green-100 rounded-[28px] p-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-2xl shadow-lg shadow-green-500/20 mb-4">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-black uppercase tracking-widest">Under Review</span>
          </div>
          <p className="text-sm font-bold text-slate-900">Your report is currently being reviewed by local authorities.</p>
          <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-widest">Last updated 2 hours ago</p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Report Lifecycle</h3>
          <div className="relative space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100" />
            
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-start gap-4 relative">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                  stage.status === 'completed' ? 'bg-green-500 shadow-lg shadow-green-500/20' : 
                  stage.status === 'current' ? 'bg-white border-2 border-green-500 ring-4 ring-green-500/10' : 
                  'bg-white border-2 border-slate-100'
                }`}>
                  {stage.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  {stage.status === 'current' && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-black tracking-tight ${stage.status === 'pending' ? 'text-slate-300' : 'text-slate-900'}`}>
                      {stage.label}
                    </h4>
                    {stage.date && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stage.date}</span>}
                  </div>
                  {stage.status === 'current' && (
                    <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Current Stage</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Timeline */}
        <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Recent Updates</h3>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">{item.type}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Acknowledgment Card */}
        <div className="bg-white rounded-[28px] p-5 border-2 border-green-500/10 shadow-sm flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-slate-900">Acknowledgment Received</h4>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">The civic authority has acknowledged this report.</p>
          </div>
          <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-green-600 transition-all">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Issue Info Section */}
        <div className="grid grid-cols-2 gap-4">
          <InfoItem icon={<Info />} label="Report ID" value="#CP-92831" />
          <InfoItem icon={<Clock />} label="Last Update" value="2h ago" />
          <InfoItem icon={<ImageIcon />} label="Evidence" value="3 Photos" />
          <InfoItem icon={<MapPin />} label="Area" value="Sector 4" />
        </div>

        {/* Community Response */}
        <div className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Community Impact</h3>
            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Verified</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xl font-black text-slate-900">42</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Supports</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-xl font-black text-slate-900">18</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Comments</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-xl font-black text-slate-900">6</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Nearby</p>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
          <div className="h-32 bg-slate-100 relative">
            <img 
              src="https://picsum.photos/seed/map/400/200" 
              alt="Map" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/40 border-4 border-white">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <button className="w-full py-4 bg-white text-xs font-black text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <ExternalLink className="w-3.5 h-3.5" />
            Open in Maps
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button 
            onClick={onViewDetails}
            className="w-full py-4 bg-green-600 text-white font-black rounded-[24px] shadow-xl shadow-green-600/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            View Full Details
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-4 bg-white border border-slate-100 text-slate-600 font-black rounded-[24px] flex items-center justify-center gap-2 active:scale-95 transition-all">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">Share Update</span>
            </button>
            <button className="py-4 bg-white border border-slate-100 text-slate-600 font-black rounded-[24px] flex items-center justify-center gap-2 active:scale-95 transition-all">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs">Comments</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-3">
      <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
      </div>
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-xs font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}
