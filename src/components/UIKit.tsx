import React, { useState } from 'react';
import { 
  Type, 
  Palette, 
  MousePointer2, 
  Layout, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Search, 
  User, 
  Bell, 
  Plus, 
  ChevronRight, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  Award,
  Trash2,
  MoreVertical,
  Heart,
  Share2,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

// --- UI Kit Components ---

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <div className="h-1 w-8 bg-green-500 rounded-full" />
      <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">{title}</h2>
    </div>
    {children}
  </section>
);

const ColorSwatch: React.FC<{ color: string, name: string, hex: string }> = ({ color, name, hex }) => (
  <div className="flex flex-col gap-2">
    <div className={`w-full h-20 ${color} rounded-2xl shadow-sm border border-slate-100`} />
    <div>
      <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{name}</p>
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{hex}</p>
    </div>
  </div>
);

const Button: React.FC<{ variant: string, label: string, icon?: any, disabled?: boolean }> = ({ variant, label, icon: Icon, disabled = false }) => {
  const base = "px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 w-full";
  const styles: any = {
    primary: "bg-green-600 text-white shadow-lg shadow-green-600/20",
    secondary: "bg-white text-green-600 border border-green-100 shadow-sm",
    tertiary: "bg-slate-100 text-slate-600",
    outline: "bg-transparent border border-slate-200 text-slate-600",
    danger: "bg-red-500 text-white shadow-lg shadow-red-500/20",
    ghost: "bg-transparent text-slate-400",
  };

  return (
    <button className={`${base} ${styles[variant]} ${disabled ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
};

const Input: React.FC<{ label: string, placeholder: string, icon?: any, error?: boolean }> = ({ label, placeholder, icon: Icon, error = false }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
      <input 
        type="text" 
        placeholder={placeholder}
        className={`w-full bg-white border ${error ? 'border-red-200 focus:ring-red-500/10' : 'border-slate-100 focus:ring-green-500/10'} rounded-2xl py-3.5 ${Icon ? 'pl-11' : 'px-4'} pr-4 text-xs font-medium focus:outline-none focus:ring-4 transition-all shadow-sm`}
      />
    </div>
    {error && <p className="text-[8px] font-bold text-red-500 uppercase tracking-widest ml-1">This field is required</p>}
  </div>
);

const Chip: React.FC<{ label: string, active?: boolean, status?: boolean, color?: string }> = ({ label, active = false, status = false, color = 'bg-green-500' }) => (
  <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
    active 
      ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
      : status 
        ? `${color.replace('500', '50')} ${color.replace('bg-', 'text-')} border ${color.replace('bg-', 'border-').replace('500', '100')}`
        : 'bg-white text-slate-400 border border-slate-100'
  }`}>
    {label}
  </button>
);

// --- Main UI Kit ---

export const UIKit = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* App Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">CivicPulse UI Kit</h1>
          <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Master Design Foundation</p>
        </div>
        <button 
          onClick={onBack}
          className="p-2.5 bg-slate-100 text-slate-600 rounded-xl active:scale-95 transition-all"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
      </header>

      <div className="p-6">
        {/* Colors */}
        <Section title="Color System">
          <div className="grid grid-cols-3 gap-4">
            <ColorSwatch color="bg-green-600" name="Primary" hex="#16A34A" />
            <ColorSwatch color="bg-slate-900" name="Dark Green" hex="#0F172A" />
            <ColorSwatch color="bg-green-50" name="Mint" hex="#F0FDF4" />
            <ColorSwatch color="bg-white" name="White" hex="#FFFFFF" />
            <ColorSwatch color="bg-slate-50" name="Off-White" hex="#F8FAFC" />
            <ColorSwatch color="bg-slate-100" name="Light Gray" hex="#F1F5F9" />
            <ColorSwatch color="bg-amber-400" name="Warning" hex="#FBBF24" />
            <ColorSwatch color="bg-red-500" name="Error" hex="#EF4444" />
            <ColorSwatch color="bg-blue-500" name="Info" hex="#3B82F6" />
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <div className="space-y-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Heading XL</p>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">CivicPulse</h1>
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Heading L</p>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Community Impact</h2>
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Heading M</p>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Reports</h3>
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Body Large</p>
              <p className="text-sm font-bold text-slate-700 leading-relaxed">The north side of Blue Lake has turned dark gray and there's a strong chemical smell.</p>
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Body Regular</p>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">Waste hasn't been collected for 3 days in the Market Square area. Overflowing bins are attracting pests.</p>
            </div>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Caption / Label</p>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Verified Contributor</p>
            </div>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Button System">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="primary" label="Primary" />
            <Button variant="secondary" label="Secondary" />
            <Button variant="tertiary" label="Tertiary" />
            <Button variant="outline" label="Outline" />
            <Button variant="danger" label="Danger" />
            <Button variant="ghost" label="Ghost" />
            <Button variant="primary" label="With Icon" icon={Plus} />
            <Button variant="primary" label="Disabled" disabled />
          </div>
        </Section>

        {/* Inputs */}
        <Section title="Input System">
          <div className="space-y-4">
            <Input label="Full Name" placeholder="Enter your name" />
            <Input label="Search" placeholder="Search reports..." icon={Search} />
            <Input label="Email Address" placeholder="hello@civicpulse.com" error />
          </div>
        </Section>

        {/* Chips & Tags */}
        <Section title="Chip & Tag System">
          <div className="flex flex-wrap gap-2">
            <Chip label="All Reports" active />
            <Chip label="Roads" />
            <Chip label="Water" />
            <Chip label="Urgent" status color="bg-red-500" />
            <Chip label="Pending" status color="bg-amber-400" />
            <Chip label="Resolved" status color="bg-green-500" />
            <Chip label="Nearby" />
          </div>
        </Section>

        {/* Navigation */}
        <Section title="Navigation System">
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-sm font-black text-slate-900">CivicPulse</span>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-xl flex items-center justify-around">
              <div className="text-green-600 flex flex-col items-center gap-1">
                <Layout className="w-6 h-6" />
                <div className="w-1 h-1 bg-green-600 rounded-full" />
              </div>
              <div className="text-slate-300"><Search className="w-6 h-6" /></div>
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-600/30 -mt-8">
                <Plus className="w-6 h-6" />
              </div>
              <div className="text-slate-300"><Bell className="w-6 h-6" /></div>
              <div className="text-slate-300"><User className="w-6 h-6" /></div>
            </div>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Card System">
          <div className="space-y-4">
            {/* Stat Card */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolved</p>
                <h3 className="text-xl font-black text-slate-900">2,512</h3>
              </div>
            </div>

            {/* Campaign Card */}
            <div className="bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[8px] font-black uppercase tracking-widest text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Active Mission</span>
                <h4 className="text-lg font-black mt-2 mb-4">Clean the River Bank</h4>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className="w-2/3 h-full bg-green-400 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span>65% Complete</span>
                  <span>124 Joined</span>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl" />
            </div>

            {/* Notification Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
              <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h5 className="text-xs font-black text-slate-900">Report Status Updated</h5>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Your report "Broken Streetlight" is now In Progress.</p>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-2 block">2m ago</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            </div>
          </div>
        </Section>

        {/* Overlays */}
        <Section title="Modal & Sheet System">
          <div className="bg-white rounded-t-[40px] border-t border-slate-100 shadow-2xl p-6 pt-2">
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6" />
            <h3 className="text-lg font-black text-slate-900 text-center mb-2">Confirm Action</h3>
            <p className="text-xs text-slate-400 font-medium text-center mb-6">Are you sure you want to approve this report? This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="tertiary" label="Cancel" />
              <Button variant="primary" label="Confirm" />
            </div>
          </div>
        </Section>

        {/* States */}
        <Section title="States & Feedback">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-2xl flex flex-col items-center gap-2 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">Success</p>
            </div>
            <div className="bg-red-50 p-4 rounded-2xl flex flex-col items-center gap-2 text-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <p className="text-[10px] font-black text-red-700 uppercase tracking-widest">Error</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl flex flex-col items-center gap-2 text-center">
              <Clock className="w-8 h-8 text-amber-500" />
              <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Pending</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center gap-2 text-center">
              <Info className="w-8 h-8 text-blue-500" />
              <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Info</p>
            </div>
          </div>
        </Section>

        {/* Skeleton UI */}
        <Section title="Loading States (Skeleton)">
          <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-2/3 bg-slate-100 rounded-full animate-pulse" />
                <div className="h-2 w-1/3 bg-slate-50 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="h-32 w-full bg-slate-50 rounded-2xl animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 flex-1 bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-8 flex-1 bg-slate-100 rounded-xl animate-pulse" />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};
