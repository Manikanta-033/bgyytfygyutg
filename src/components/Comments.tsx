import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  X, 
  ChevronDown, 
  MessageSquare, 
  Send, 
  Image as ImageIcon, 
  MoreHorizontal, 
  Heart, 
  Reply, 
  CheckCircle2, 
  MapPin, 
  Pin, 
  Info, 
  AlertCircle, 
  ArrowLeft,
  Filter,
  MoreVertical,
  Share2,
  Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UrgencyBadge } from './PostCard';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVerified?: boolean;
    isLocal?: boolean;
  };
  text: string;
  time: string;
  helpfulCount: number;
  isPinned?: boolean;
  isUpdate?: boolean;
  type?: 'Update' | 'Suggestion' | 'Confirmation' | 'Warning' | 'Regular';
  media?: string;
  replies?: Comment[];
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    user: { name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', isVerified: true, isLocal: true },
    text: 'I live right next to this road. The potholes have increased significantly after the heavy rain yesterday. Please be careful while driving at night.',
    time: '2h ago',
    helpfulCount: 24,
    isPinned: true,
    type: 'Warning',
    replies: [
      {
        id: '1-1',
        user: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john' },
        text: 'Thanks for the heads up, Sarah! I was planning to take this route tonight.',
        time: '1h ago',
        helpfulCount: 5,
      }
    ]
  },
  {
    id: '2',
    user: { name: 'Civic Watch', avatar: 'https://i.pravatar.cc/150?u=civic', isVerified: true },
    text: 'Waterlogging increased after yesterday’s rain. Road was inspected this morning by the local authorities.',
    time: '4h ago',
    helpfulCount: 15,
    isUpdate: true,
    type: 'Update',
    media: 'https://picsum.photos/seed/update/400/300'
  },
  {
    id: '3',
    user: { name: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=mike', isLocal: true },
    text: 'Yes, same problem near the bus stop too. The drainage seems to be blocked completely.',
    time: '6h ago',
    helpfulCount: 8,
    type: 'Confirmation',
  },
  {
    id: '4',
    user: { name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?u=emma' },
    text: 'Please also report the broken streetlight nearby. It makes this area very unsafe after dark.',
    time: '8h ago',
    helpfulCount: 12,
    type: 'Suggestion',
  }
];

const SORT_OPTIONS = ['Most Helpful', 'Newest', 'Oldest', 'Nearby', 'Verified'];
const FILTER_CHIPS = ['All', 'Updates', 'Suggestions', 'Confirmations', 'Warnings'];

export const Comments: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [activeSort, setActiveSort] = useState('Most Helpful');
  const [activeFilter, setActiveFilter] = useState('All');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CommentsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 -ml-2 text-slate-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-tight">Community Comments</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">48 Helpful Updates</p>
          </div>
        </div>
        <button className="p-2 bg-slate-100 rounded-full text-slate-600">
          <Filter className="w-5 h-5" />
        </button>
      </header>

      {/* Issue Context Strip */}
      <section className="px-6 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
            <img src="https://picsum.photos/seed/pothole/100/100" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-black text-slate-900 truncate">Large potholes near school road</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-0.5 text-slate-400">
                <MapPin className="w-2.5 h-2.5" />
                <span className="text-[9px] font-bold truncate">Temple Street</span>
              </div>
              <UrgencyBadge urgency="Urgent" />
            </div>
          </div>
          <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest">
            Pending
          </div>
        </div>
      </section>

      {/* Sort & Filter Row */}
      <section className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeFilter === chip 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* Guidelines Strip */}
      <section className="px-6 py-2">
        <div className="bg-green-50 rounded-2xl p-3 flex items-start gap-3 border border-green-100">
          <Info className="w-4 h-4 text-green-600 mt-0.5" />
          <p className="text-[10px] text-green-800 font-medium leading-relaxed">
            Share accurate local updates. Avoid harmful information. Keep discussion relevant to the civic issue.
          </p>
        </div>
      </section>

      {/* Comment List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {MOCK_COMMENTS.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
        
        {/* Empty State Example (if no comments) */}
        {/* <EmptyComments /> */}
      </div>

      {/* Comment Input Area */}
      <section className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 pb-8">
        <div className="flex items-end gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=me" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 relative">
            <textarea 
              rows={1}
              placeholder="Add a helpful comment..."
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-4 pr-12 text-sm font-medium focus:ring-2 focus:ring-green-500 transition-all resize-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <button className="p-1.5 text-slate-400 hover:text-green-600">
                <Smile className="w-5 h-5" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-green-600">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button 
            disabled={!commentText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              commentText.trim() ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-slate-100 text-slate-300'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest text-center mt-3">
          Keep comments useful and respectful
        </p>
      </section>
    </div>
  );
};

const CommentCard: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => {
  const [isHelpful, setIsHelpful] = useState(false);

  return (
    <div className={`flex gap-3 ${isReply ? 'mt-4' : ''}`}>
      <div className={`${isReply ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-slate-200 flex-shrink-0 overflow-hidden`}>
        <img src={comment.user.avatar} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`relative ${comment.isPinned ? 'bg-mint-50 border border-green-100' : 'bg-white'} rounded-2xl p-4 ${!comment.isPinned ? 'border border-slate-100 shadow-sm' : ''}`}>
          {comment.isPinned && (
            <div className="absolute -top-2 -right-2 bg-green-600 text-white p-1 rounded-lg shadow-lg">
              <Pin className="w-3 h-3" />
            </div>
          )}
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-black text-slate-900 truncate">{comment.user.name}</span>
              {comment.user.isVerified && <CheckCircle2 className="w-3 h-3 text-green-600 fill-green-600/10" />}
              {comment.user.isLocal && (
                <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase whitespace-nowrap">Local</span>
              )}
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">{comment.time}</span>
          </div>

          {comment.type && (
            <div className="flex items-center gap-1 mb-2">
              <div className={`w-1.5 h-1.5 rounded-full ${
                comment.type === 'Update' ? 'bg-blue-500' : 
                comment.type === 'Warning' ? 'bg-red-500' : 
                comment.type === 'Suggestion' ? 'bg-orange-500' : 'bg-green-500'
              }`} />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{comment.type}</span>
            </div>
          )}

          <p className="text-xs text-slate-700 leading-relaxed mb-3">{comment.text}</p>

          {comment.media && (
            <div className="rounded-xl overflow-hidden mb-3 border border-slate-100">
              <img src={comment.media} alt="" className="w-full h-40 object-cover" />
            </div>
          )}

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsHelpful(!isHelpful)}
              className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors ${
                isHelpful ? 'text-green-600' : 'text-slate-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isHelpful ? 'fill-green-600' : ''}`} />
              {comment.helpfulCount + (isHelpful ? 1 : 0)} Helpful
            </button>
            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Reply className="w-3.5 h-3.5" />
              Reply
            </button>
            <div className="flex-1" />
            <button className="text-slate-300">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-2 border-l-2 border-slate-100 pl-4">
            {comment.replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentsSkeleton: React.FC = () => (
  <div className="min-h-screen bg-white p-6 space-y-8">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse" />
      <div className="space-y-2">
        <div className="w-32 h-4 bg-slate-100 rounded animate-pulse" />
        <div className="w-20 h-3 bg-slate-100 rounded animate-pulse" />
      </div>
    </div>
    <div className="w-full h-16 bg-slate-50 rounded-2xl animate-pulse" />
    <div className="flex gap-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="w-20 h-8 bg-slate-100 rounded-full animate-pulse" />
      ))}
    </div>
    {[1, 2, 3].map(i => (
      <div key={i} className="flex gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="w-full h-24 bg-slate-50 rounded-2xl animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyComments: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6">
      <MessageSquare className="w-12 h-12 text-slate-200" />
    </div>
    <h3 className="text-lg font-black text-slate-900 mb-1">No comments yet</h3>
    <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
      Be the first to share a useful update or helpful detail.
    </p>
  </div>
);
