import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Search, User, Bell, MapPin, Shield, 
  Eye, Palette, HelpCircle, Info, LogOut, Trash2, 
  ChevronRight, Globe, Lock, Moon, Smartphone, 
  CheckCircle2, AlertTriangle, MessageSquare, 
  FileText, Heart, Share2, Settings as SettingsIcon,
  Zap, Users, TrendingUp, ListFilter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SettingsSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Settings</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage your app preferences</p>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Search within Settings */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search settings"
            className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-green-500/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* User Mini Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-5 shadow-sm border border-slate-100 flex items-center gap-4 group"
        >
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/user/200/200" 
              alt="User" 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-black text-slate-900 leading-tight">Alex Rivers</h2>
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Community Reporter</p>
          </div>
          <button className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-slate-100 transition-all">
            View Profile
          </button>
        </motion.div>

        {/* Quick Settings Summary Card */}
        <div className="bg-mint-50 border border-green-100 rounded-[28px] p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">Quick Status</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nearby Alerts</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-black text-slate-900">Active</span>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Urgent Mode</p>
              <span className="text-xs font-black text-slate-900">Enabled</span>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Saved Areas</p>
              <span className="text-xs font-black text-slate-900">3 Locations</span>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Theme</p>
              <span className="text-xs font-black text-slate-900">Eco Light</span>
            </div>
          </div>
        </div>

        {/* Account Settings Group */}
        <SettingsGroup title="Account">
          <SettingsRow icon={<User />} title="Edit Profile" subtitle="Update your personal information" />
          <SettingsRow icon={<Globe />} title="Language" trailing="English (US)" />
          <SettingsRow icon={<MapPin />} title="Saved Areas" trailing="3" />
          <SettingsRow icon={<Smartphone />} title="Connected Accounts" trailing="Google" />
          <SettingsRow icon={<Shield />} title="Account Status" trailing={<span className="px-2 py-0.5 bg-green-100 text-green-700 text-[8px] font-black uppercase rounded">Verified</span>} />
        </SettingsGroup>

        {/* Notification Preferences Group */}
        <SettingsGroup title="Notifications">
          <SettingsRow icon={<Bell />} title="Nearby Issue Alerts" hasToggle defaultChecked />
          <SettingsRow icon={<Zap />} title="Status Updates" subtitle="Get notified when reports progress" hasToggle defaultChecked />
          <SettingsRow icon={<Users />} title="Community Activity" hasToggle />
          <SettingsRow icon={<AlertTriangle />} title="Urgent Only Mode" subtitle="Only receive high priority alerts" hasToggle />
          <SettingsRow icon={<MessageSquare />} title="Email Updates" hasToggle />
        </SettingsGroup>

        {/* Location / Saved Area Preferences */}
        <SettingsGroup title="Location Awareness">
          <SettingsRow icon={<MapPin />} title="Preferred Radius" trailing="5 km" />
          <SettingsRow icon={<TrendingUp />} title="Nearby Alerts Priority" trailing="High" />
          <div className="px-4 pb-4">
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Followed Zones</p>
              <div className="flex flex-wrap gap-2">
                {['Sector 4', 'Downtown', 'Market Road'].map(zone => (
                  <span key={zone} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">{zone}</span>
                ))}
                <button className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold border border-green-100">+ Add</button>
              </div>
            </div>
          </div>
        </SettingsGroup>

        {/* Appearance / Theme Section */}
        <SettingsGroup title="Appearance">
          <SettingsRow icon={<Palette />} title="Theme Style" trailing="Eco Light" />
          <SettingsRow icon={<Moon />} title="Compact Mode" hasToggle />
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between bg-slate-50 p-1 rounded-xl border border-slate-100">
              {['Small', 'Default', 'Large'].map(size => (
                <button 
                  key={size}
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${size === 'Default' ? 'bg-white shadow-sm text-green-600' : 'text-slate-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </SettingsGroup>

        {/* Privacy-style Section */}
        <SettingsGroup title="Privacy & Safety">
          <SettingsRow icon={<Eye />} title="Public Profile Visibility" hasToggle defaultChecked />
          <SettingsRow icon={<MapPin />} title="Show Location Publicly" hasToggle />
          <SettingsRow icon={<Lock />} title="Report Visibility" trailing="Everyone" />
          <SettingsRow icon={<MessageSquare />} title="Comment Controls" trailing="Followers" />
        </SettingsGroup>

        {/* Content Preferences Section */}
        <SettingsGroup title="Content Preferences">
          <SettingsRow icon={<ListFilter />} title="Preferred Categories" subtitle="Roads, Water, Garbage" />
          <SettingsRow icon={<Eye />} title="Default Feed Filter" trailing="Recent" />
        </SettingsGroup>

        {/* Support and Help Section */}
        <SettingsGroup title="Support">
          <SettingsRow icon={<HelpCircle />} title="Help Center" />
          <SettingsRow icon={<AlertTriangle />} title="Report a Problem" />
          <SettingsRow icon={<FileText />} title="Community Guidelines" />
          <SettingsRow icon={<MessageSquare />} title="Contact Support" />
        </SettingsGroup>

        {/* About App Section */}
        <SettingsGroup title="About">
          <SettingsRow icon={<Info />} title="App Version" trailing="v2.4.0" />
          <SettingsRow icon={<FileText />} title="Terms of Service" />
          <SettingsRow icon={<Shield />} title="Privacy Policy" />
        </SettingsGroup>

        {/* Destructive / Caution Action Style */}
        <div className="space-y-3 pt-4">
          <button className="w-full py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 flex items-center justify-center gap-2 active:scale-95 transition-all">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
          <button className="w-full py-4 bg-red-50 border border-red-100 rounded-2xl text-sm font-bold text-red-600 flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            CivicPulse • Built for the Community
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingsGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-2">{title}</h3>
      <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
        {children}
      </div>
    </section>
  );
}

function SettingsRow({ 
  icon, 
  title, 
  subtitle, 
  trailing, 
  hasToggle, 
  defaultChecked 
}: { 
  icon: React.ReactNode, 
  title: string, 
  subtitle?: string, 
  trailing?: React.ReactNode,
  hasToggle?: boolean,
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked || false);

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors group cursor-pointer border-b border-slate-50 last:border-0">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition-all">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-900 leading-tight">{title}</h4>
        {subtitle && <p className="text-[10px] text-slate-400 font-medium mt-0.5">{subtitle}</p>}
      </div>
      {hasToggle ? (
        <button 
          onClick={() => setChecked(!checked)}
          className={`w-10 h-5 rounded-full relative transition-all ${checked ? 'bg-green-500' : 'bg-slate-200'}`}
        >
          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${checked ? 'left-6' : 'left-1'}`} />
        </button>
      ) : (
        <div className="flex items-center gap-2">
          {trailing && <span className="text-xs font-bold text-slate-400">{trailing}</span>}
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
      )}
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-pulse">
      <div className="bg-white px-6 py-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full" />
            <div className="space-y-2">
              <div className="w-32 h-4 bg-slate-100 rounded-lg" />
              <div className="w-24 h-2 bg-slate-100 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="w-full h-12 bg-slate-100 rounded-2xl" />
      </div>
      <div className="p-6 space-y-8">
        <div className="w-full h-24 bg-white rounded-[32px] border border-slate-100" />
        <div className="w-full h-40 bg-white rounded-[28px] border border-slate-100" />
        <div className="space-y-4">
          <div className="w-24 h-3 bg-slate-200 rounded-full" />
          <div className="w-full h-64 bg-white rounded-[28px] border border-slate-100" />
        </div>
      </div>
    </div>
  );
}
