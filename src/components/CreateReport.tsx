import { 
  ArrowLeft, 
  Camera, 
  Image as ImageIcon, 
  Video, 
  MapPin, 
  Info, 
  Sparkles,
  X,
  Check,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  'Road Damage', 'Water Pollution', 'Garbage Dump', 
  'Streetlight Issue', 'Drainage Problem', 'Broken Infrastructure', 
  'Unsafe Area', 'Water Leakage', 'Public Cleanliness', 'Other'
];

const URGENCY_LEVELS = [
  { label: 'Low', color: 'bg-green-50 text-green-600 border-green-100' },
  { label: 'Medium', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { label: 'High', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { label: 'Urgent', color: 'bg-red-50 text-red-600 border-red-100' },
];

const IMPACT_CHIPS = [
  'Pedestrians', 'Drivers', 'School Children', 'Residents', 
  'Shopkeepers', 'Cyclists', 'Daily Commuters', 'Elderly People', 'Environment'
];

export const CreateReport = ({ onBack, onSubmit }: { onBack: () => void, onSubmit?: () => void }) => {
  const [media, setMedia] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [impacts, setImpacts] = useState<string[]>([]);

  const toggleImpact = (chip: string) => {
    setImpacts(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Create Report</h1>
        <button className="text-green-600 font-bold text-sm">Drafts</button>
      </header>

      <div className="px-4 py-6 space-y-8">
        {/* Intro Section */}
        <section className="bg-green-50 rounded-3xl p-5 border border-green-100 flex items-start gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <Info className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="font-bold text-green-900 mb-1">Share what your community should know</h2>
            <p className="text-xs text-green-700/80 leading-relaxed">Post a photo or video of public issues so people stay informed and authorities can take action.</p>
          </div>
        </section>

        {/* Media Upload */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 px-1">Media Upload</h3>
          <div 
            className={`relative aspect-video rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 overflow-hidden ${
              media ? 'border-green-500 bg-white' : 'border-gray-200 bg-white hover:border-green-300'
            }`}
            onClick={() => setMedia('https://picsum.photos/seed/report/800/600')}
          >
            {media ? (
              <>
                <img src={media} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setMedia(null); }}
                  className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2">
                   <button className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                     <ImageIcon className="w-3 h-3" /> Edit
                   </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                  <Camera className="w-7 h-7 text-green-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-900">Add photo or video</p>
                  <p className="text-xs text-slate-400 mt-1">Clear visuals help others understand better</p>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-gray-50">
              <Camera className="w-4 h-4" /> Camera
            </button>
            <button className="flex-1 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-gray-50">
              <ImageIcon className="w-4 h-4" /> Gallery
            </button>
            <button className="flex-1 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-gray-50">
              <Video className="w-4 h-4" /> Video
            </button>
          </div>
        </section>

        {/* Title Field */}
        <section className="space-y-3">
          <label className="text-sm font-bold text-slate-900 px-1">Issue Title</label>
          <input 
            type="text" 
            placeholder="Ex: Major potholes near school entrance"
            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
          />
          <p className="text-[11px] text-slate-400 px-1">Keep the title short and clear</p>
        </section>

        {/* Category Selector */}
        <section className="space-y-3">
          <label className="text-sm font-bold text-slate-900 px-1">Category</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  category === cat 
                  ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20' 
                  : 'bg-white text-slate-500 border-gray-100 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Urgency Selector */}
        <section className="space-y-3">
          <label className="text-sm font-bold text-slate-900 px-1">Urgency / Severity</label>
          <div className="grid grid-cols-4 gap-2">
            {URGENCY_LEVELS.map(level => (
              <button
                key={level.label}
                onClick={() => setUrgency(level.label)}
                className={`py-3 rounded-2xl text-xs font-bold transition-all border flex flex-col items-center gap-1 ${
                  urgency === level.label 
                  ? `${level.color} ring-2 ring-offset-1 ring-current` 
                  : 'bg-white text-slate-400 border-gray-100'
                }`}
              >
                {level.label}
                {urgency === level.label && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 px-1">Choose urgency based on how serious or risky the issue is</p>
        </section>

        {/* Location Input */}
        <section className="space-y-3">
          <label className="text-sm font-bold text-slate-900 px-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Enter area, landmark, or street"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
            />
          </div>
          <button className="w-full py-3 bg-green-50 text-green-600 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border border-green-100">
            <MapPin className="w-4 h-4" /> Use Current Location
          </button>
          
          {/* Mini Map Preview */}
          <div className="aspect-[2/1] bg-slate-100 rounded-3xl overflow-hidden relative border border-gray-100">
             <img src="https://picsum.photos/seed/mapview/600/300" className="w-full h-full object-cover opacity-70" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-bounce">
                  <MapPin className="w-5 h-5 text-white fill-white" />
                </div>
             </div>
          </div>
        </section>

        {/* Description */}
        <section className="space-y-3">
          <label className="text-sm font-bold text-slate-900 px-1">Description</label>
          <div className="relative">
            <textarea 
              rows={4}
              placeholder="Explain what the problem is, how long it has been there, and why it matters"
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm resize-none"
            />
            <span className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300">0/500</span>
          </div>
        </section>

        {/* Public Impact */}
        <section className="space-y-3">
          <label className="text-sm font-bold text-slate-900 px-1">Who might be affected?</label>
          <div className="flex flex-wrap gap-2">
            {IMPACT_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => toggleImpact(chip)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                  impacts.includes(chip) 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : 'bg-white text-slate-500 border-gray-100 hover:bg-gray-50'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* Report Preview Card */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-sm font-bold text-slate-900">Report Preview</label>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Live Preview</span>
          </div>
          <div className="opacity-60 scale-[0.98] origin-top border-2 border-green-100 rounded-3xl overflow-hidden pointer-events-none grayscale-[0.2]">
            <div className="bg-white p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100" />
              <div className="space-y-1">
                <div className="w-20 h-2 bg-slate-100 rounded" />
                <div className="w-24 h-1.5 bg-slate-50 rounded" />
              </div>
            </div>
            <div className="aspect-video bg-slate-50 flex items-center justify-center">
              {media ? (
                <img src={media} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-200" />
              )}
            </div>
            <div className="p-4 space-y-2">
              <div className="w-3/4 h-3 bg-slate-100 rounded" />
              <div className="w-full h-2 bg-slate-50 rounded" />
              <div className="flex gap-2 pt-2">
                <div className="w-16 h-5 bg-green-50 rounded-lg" />
                <div className="w-16 h-5 bg-amber-50 rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Smart Tips */}
        <section className="bg-white rounded-3xl p-5 border border-gray-100 space-y-4 card-shadow">
          <div className="flex items-center gap-2 text-green-600">
            <Sparkles className="w-5 h-5" />
            <h4 className="font-bold text-sm">Smart Tips</h4>
          </div>
          <ul className="space-y-3">
            {[
              'Use a clear photo from a safe distance',
              'Mention a nearby landmark for easier identification',
              'Short titles perform better'
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-slate-500 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* Community Guidelines */}
        <p className="text-[10px] text-center text-slate-400 px-6 leading-relaxed">
          By posting, you agree to our <span className="text-green-600 font-bold">Community Guidelines</span>. 
          Please capture issues safely and avoid private information.
        </p>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex gap-3 z-50">
        <button className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all active:scale-95">
          Save Draft
        </button>
        <button 
          onClick={onSubmit}
          className="flex-[2] py-4 bg-green-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-green-500/20 hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Post Report <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
