import React from 'react';
import { CheckCircle2, Share2, ArrowRight, Eye, MapPin, Clock, AlertCircle, ChevronRight, Bookmark, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Post } from '../types';

interface ReportSuccessProps {
  post: Post;
  onViewReport: () => void;
  onTrackStatus: () => void;
  onBackToHome: () => void;
  isFirstTime?: boolean;
}

export const ReportSuccess = ({ post, onViewReport, onTrackStatus, onBackToHome, isFirstTime = false }: ReportSuccessProps) => {
  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Minimal Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="w-10" />
        <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest">Confirmation</h1>
        <button 
          onClick={onBackToHome}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Share2 className="w-5 h-5 text-slate-400" />
        </button>
      </header>

      <div className="px-6 pt-8">
        {/* Success Hero */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="w-24 h-24 bg-green-50 rounded-[40px] flex items-center justify-center mb-6 relative"
          >
            <div className="absolute inset-0 bg-green-500/10 rounded-[40px] animate-pulse" />
            <CheckCircle2 className="w-12 h-12 text-green-600 relative z-10" />
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-black text-slate-900 tracking-tight mb-3"
          >
            {isFirstTime ? "Welcome to the community!" : "Report submitted successfully"}
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 text-sm leading-relaxed max-w-[280px]"
          >
            Your report is now visible and can help others stay informed. Thank you for helping your community.
          </motion.p>
        </div>

        {/* First Time Contributor Badge */}
        {isFirstTime && (
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl text-white shadow-xl shadow-green-500/20 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">First Report Shared</h4>
              <p className="text-[10px] text-white/80 uppercase tracking-wider font-medium">Achievement Unlocked</p>
            </div>
          </motion.div>
        )}

        {/* Report Summary Card */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden mb-8"
        >
          <div className="relative h-48">
            <img 
              src={post.media.url[0]} 
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4">
              <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                post.urgency === 'Urgent' ? 'bg-red-500/90 text-white' : 'bg-white/90 text-slate-900'
              }`}>
                {post.urgency}
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <button className="p-2 bg-white/90 backdrop-blur-md rounded-xl shadow-sm">
                <Bookmark className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{post.category}</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Posted just now</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">{post.title}</h3>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
              <MapPin className="w-3.5 h-3.5" />
              {post.location}
            </div>
            
            {/* Mini Status Strip */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[11px] font-bold text-slate-700">Status: Reported</span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 italic">Waiting for review</span>
            </div>
          </div>
        </motion.div>

        {/* What Happens Next */}
        <div className="mb-10">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 px-2">What happens next</h3>
          <div className="space-y-4">
            <NextStep 
              icon={<Eye className="w-5 h-5 text-green-600" />}
              title="Community Visibility"
              description="Your neighbors can now see, support, and comment on this issue."
            />
            <NextStep 
              icon={<Clock className="w-5 h-5 text-green-600" />}
              title="Verification Process"
              description="Local authorities and community leaders will review the report details."
            />
            <NextStep 
              icon={<AlertCircle className="w-5 h-5 text-green-600" />}
              title="Status Updates"
              description="You'll receive real-time notifications as the issue progresses."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-10">
          <button 
            onClick={onTrackStatus}
            className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Track Status
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onViewReport}
              className="py-4 bg-white border border-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Post
            </button>
            <button className="py-4 bg-white border border-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
          <button 
            onClick={onBackToHome}
            className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm active:scale-95 transition-all"
          >
            Back to Home
          </button>
        </div>

        {/* Community Impact Message */}
        <div className="p-6 bg-green-50 rounded-[32px] border border-green-100/50 text-center mb-10">
          <p className="text-green-800 text-sm font-medium leading-relaxed italic">
            "Every report helps make communities safer and more informed. Your contribution matters."
          </p>
        </div>

        {/* Nearby Issues Preview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Nearby Issues</h3>
            <button className="text-[10px] font-bold text-green-600 uppercase tracking-widest">View Map</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            <NearbyCard 
              image="https://picsum.photos/seed/light/200/200"
              title="Broken Streetlight"
              location="200m away"
              urgency="Medium"
            />
            <NearbyCard 
              image="https://picsum.photos/seed/water/200/200"
              title="Water Leakage"
              location="450m away"
              urgency="Urgent"
            />
            <NearbyCard 
              image="https://picsum.photos/seed/drain/200/200"
              title="Drainage Overflow"
              location="800m away"
              urgency="High"
            />
          </div>
        </div>

        {/* Mini Tracking Card */}
        <div className="p-5 bg-slate-900 rounded-[32px] text-white flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm mb-1">Track your impact</h4>
            <p className="text-[10px] text-slate-400">Monitor all your reports in one place</p>
          </div>
          <button className="px-4 py-2 bg-green-500 rounded-xl text-[10px] font-bold uppercase tracking-wider">
            Open Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const NextStep = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

const NearbyCard = ({ image, title, location, urgency }: { image: string, title: string, location: string, urgency: string }) => (
  <div className="w-40 shrink-0 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
    <img src={image} alt={title} className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
    <div className="p-3">
      <div className={`text-[8px] font-bold uppercase tracking-widest mb-1 ${
        urgency === 'Urgent' ? 'text-red-500' : 'text-green-600'
      }`}>{urgency}</div>
      <h4 className="text-xs font-bold text-slate-900 truncate mb-1">{title}</h4>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <MapPin className="w-2.5 h-2.5" />
        {location}
      </div>
    </div>
  </div>
);
