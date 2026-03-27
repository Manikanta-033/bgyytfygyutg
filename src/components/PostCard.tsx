import { 
  MapPin, 
  Clock, 
  MessageCircle, 
  Heart, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  CheckCircle2, 
  AlertCircle,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { Post, Urgency } from '../types';
import { motion } from 'motion/react';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
  onCommentsClick?: () => void;
  onStatusClick?: () => void;
  key?: string | number;
}

export const UrgencyBadge = ({ urgency }: { urgency: Urgency }) => {
  const colors = {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-amber-700',
    High: 'bg-orange-100 text-orange-700',
    Urgent: 'bg-red-100 text-red-700',
    Resolved: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors[urgency]}`}>
      {urgency}
    </div>
  );
};

export const PostCard = ({ post, onClick, onCommentsClick, onStatusClick }: PostCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden card-shadow mb-6 border border-gray-100 active:scale-[0.98] transition-transform"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between" onClick={onClick}>
        <div className="flex items-center gap-3">
          <img 
            src={post.user.avatar} 
            alt={post.user.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-green-50"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-slate-900">{post.user.name}</span>
              {post.user.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 fill-green-500/10" />}
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>{post.location}</span>
              <span className="mx-1">•</span>
              <Clock className="w-3 h-3" />
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onStatusClick?.(); }}
            className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-green-100 transition-all"
          >
            Track Status
          </button>
          <button className="p-2 text-slate-400 hover:bg-gray-50 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Media */}
      <div className="relative aspect-[4/3] bg-slate-100 mx-4 rounded-2xl overflow-hidden group" onClick={onClick}>
        <img 
          src={post.media.url[0]} 
          alt={post.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {post.media.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-800 shadow-sm uppercase tracking-wide">
            {post.category}
          </div>
          <UrgencyBadge urgency={post.urgency} />
        </div>

        {post.media.type === 'carousel' && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-md text-[10px] text-white font-medium">
            1/{post.media.url.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div onClick={onClick}>
          <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2">
            {post.title}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-2 mb-3">
            {post.description}
            <button className="text-green-600 font-medium ml-1">Read more</button>
          </p>
        </div>

        {/* Mini Map Preview (Optional) */}
        {Math.random() > 0.7 && (
          <div className="mb-4 p-3 bg-green-50/50 rounded-xl border border-green-100 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white border border-green-100 flex items-center justify-center overflow-hidden">
               <img src={`https://picsum.photos/seed/map${post.id}/100/100`} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-green-800 uppercase tracking-wider">Location Preview</p>
              <p className="text-xs text-green-700/70">Tap to view on full map</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          </div>
        )}

        {/* Engagement */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-slate-500 hover:text-green-600 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-xs font-medium">{post.likes}</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onCommentsClick?.(); }}
              className="flex items-center gap-1.5 text-slate-500 hover:text-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-medium">{post.comments}</span>
            </button>
            <button className="text-slate-500 hover:text-green-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <button className="text-slate-500 hover:text-green-600 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-green-500/20 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Raise Report
          </button>
          <button className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-bold text-sm transition-all active:scale-95">
            Map
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const PostSkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden card-shadow mb-6 border border-gray-100 animate-pulse">
    <div className="p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-100" />
      <div className="space-y-2">
        <div className="w-24 h-3 bg-slate-100 rounded" />
        <div className="w-32 h-2 bg-slate-50 rounded" />
      </div>
    </div>
    <div className="aspect-[4/3] bg-slate-100 mx-4 rounded-2xl" />
    <div className="p-4 space-y-3">
      <div className="w-3/4 h-4 bg-slate-100 rounded" />
      <div className="w-full h-3 bg-slate-50 rounded" />
      <div className="w-full h-3 bg-slate-50 rounded" />
      <div className="flex gap-2 pt-4">
        <div className="flex-1 h-10 bg-slate-100 rounded-xl" />
        <div className="w-12 h-10 bg-slate-50 rounded-xl" />
      </div>
    </div>
  </div>
);
