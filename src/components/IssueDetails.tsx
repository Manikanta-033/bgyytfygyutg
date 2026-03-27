import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  MapPin, 
  Clock, 
  Heart, 
  MessageCircle, 
  MoreHorizontal,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Navigation,
  Users,
  Info,
  Play,
  ArrowRight
} from 'lucide-react';
import { Post, Urgency } from '../types';
import { motion } from 'motion/react';

interface IssueDetailsProps {
  post: Post;
  onBack: () => void;
  onOpenComments?: () => void;
  onOpenStatus?: (post: Post) => void;
}

const UrgencyBadge = ({ urgency }: { urgency: Urgency }) => {
  const colors = {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-amber-700',
    High: 'bg-orange-100 text-orange-700',
    Urgent: 'bg-red-100 text-red-700',
    Resolved: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${colors[urgency]}`}>
      {urgency}
    </div>
  );
};

export const IssueDetails = ({ post, onBack, onOpenComments, onOpenStatus }: IssueDetailsProps) => {
  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">Issue Details</h1>
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-600 hover:bg-gray-50 rounded-full transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-600 hover:bg-gray-50 rounded-full transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Media Section */}
      <section className="relative aspect-square bg-slate-100 overflow-hidden">
        <img 
          src={post.media.url[0]} 
          alt={post.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {post.media.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-[11px] font-bold text-slate-800 shadow-lg uppercase tracking-wider">
            {post.category}
          </div>
          <UrgencyBadge urgency={post.urgency} />
        </div>

        {post.media.type === 'carousel' && (
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {post.media.url.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
            ))}
          </div>
        )}
      </section>

      <div className="px-5 py-6 space-y-8">
        {/* Title & Summary */}
        <section className="space-y-3">
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            {post.title}
          </h2>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-slate-400 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-500" />
              <span className="text-slate-600">{post.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Posted {post.timestamp}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Navigation className="w-4 h-4" />
              <span>1.2 km away</span>
            </div>
          </div>
        </section>

        {/* Reporter Card */}
        <section className="bg-green-50/50 rounded-3xl p-4 border border-green-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={post.user.avatar} 
              alt={post.user.name} 
              className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm text-slate-900">{post.user.name}</span>
                {post.user.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 fill-green-500/10" />}
              </div>
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Verified Resident</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white text-green-600 rounded-xl text-xs font-bold shadow-sm border border-green-100 active:scale-95 transition-all">
            Follow
          </button>
        </section>

        {/* Engagement Row */}
        <section className="flex items-center justify-between py-2 border-y border-gray-50">
          <div className="flex items-center gap-6">
            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-green-600 transition-colors">
              <Heart className="w-6 h-6" />
              <span className="text-[10px] font-bold">{post.likes}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-green-600 transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="text-[10px] font-bold">{post.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-green-600 transition-colors">
              <Share2 className="w-6 h-6" />
              <span className="text-[10px] font-bold">{post.shares}</span>
            </button>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl border border-green-100">
            <Users className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold text-green-700">42 Supports</span>
          </div>
        </section>

        {/* Civic Actions */}
        <section className="grid grid-cols-2 gap-3">
          <button className="col-span-2 py-4 bg-green-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-500/20 hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Raise to Authority
          </button>
          <button 
            onClick={() => onOpenStatus?.(post)}
            className="py-4 bg-white border border-gray-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Track Status
          </button>
          <button className="py-4 bg-white border border-gray-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2">
            Nearby Reports
          </button>
        </section>

        {/* Description */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">Description</h3>
          <div className="bg-slate-50 rounded-3xl p-5 border border-gray-100">
            <p className="text-sm text-slate-600 leading-relaxed">
              {post.description}
              <br /><br />
              This issue has been persistent for over two weeks. It's causing significant delays during peak hours and poses a major safety risk to school children who commute through this route daily. The situation worsens during rain as the potholes get filled with water, making them invisible to drivers.
            </p>
          </div>
        </section>

        {/* Status Timeline */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">Issue Progress</h3>
          <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
            {[
              { label: 'Resolved', date: 'Pending', active: false },
              { label: 'In Progress', date: 'Mar 26', active: true, current: true },
              { label: 'Sent to Authority', date: 'Mar 25', active: true },
              { label: 'Reported', date: 'Mar 24', active: true },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${
                  step.active ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                  {step.active && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${step.current ? 'text-green-600' : step.active ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{step.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location Map Card */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">Location</h3>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 card-shadow">
            <div className="aspect-video relative bg-slate-100">
              <img src={`https://picsum.photos/seed/map${post.id}/600/300`} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-bounce">
                  <MapPin className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-xl">
                  <Navigation className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs font-bold text-slate-600">{post.location}</p>
              </div>
              <button className="text-green-600 font-bold text-xs flex items-center gap-1">
                Open Map <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* Affected Groups */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">Public Impact</h3>
          <div className="flex flex-wrap gap-2">
            {['Drivers', 'School Children', 'Pedestrians', 'Residents', 'Cyclists'].map(chip => (
              <div key={chip} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-slate-500 shadow-sm">
                {chip}
              </div>
            ))}
          </div>
        </section>

        {/* Community Comments */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest opacity-40">Community Comments</h3>
            <button onClick={onOpenComments} className="text-green-600 font-bold text-xs">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { user: 'Mike Ross', text: 'This road has been bad for over 2 months. Glad someone reported it!', time: '1h ago' },
              { user: 'Jessica P.', text: 'Streetlights here also stopped working nearby. It\'s very dark at night.', time: '3h ago' },
            ].map((comment, i) => (
              <div key={i} className="flex gap-3" onClick={onOpenComments}>
                <img src={`https://picsum.photos/seed/user${i}/100/100`} className="w-8 h-8 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1 bg-slate-50 rounded-2xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{comment.user}</span>
                    <span className="text-[10px] text-slate-400">{comment.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-4" onClick={onOpenComments}>
            <div className="w-full pl-4 pr-12 py-4 bg-white border border-gray-100 rounded-2xl text-xs text-slate-400 shadow-sm cursor-text">
              Add a helpful comment...
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Safety Note */}
        <section className="bg-amber-50 rounded-3xl p-5 border border-amber-100 flex items-start gap-4">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
            Please avoid unsafe confrontation while capturing public issues. Do not share personal or harmful content. Use clear and accurate information.
          </p>
        </section>
      </div>
    </div>
  );
};
