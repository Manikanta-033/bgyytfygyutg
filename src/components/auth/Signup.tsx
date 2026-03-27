import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, User, Mail, Lock, Eye, EyeOff, 
  UserPlus, ShieldCheck, CheckCircle2, AlertCircle
} from 'lucide-react';

interface SignupProps {
  onBack: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

export function Signup({ onBack, onSignIn, onSignUp }: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Create Account</h1>
        </div>
      </header>

      <div className="px-8 py-10 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Join the community</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Start reporting and discovering issues in your community.
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <InputField 
            label="Full Name" 
            placeholder="Alex Rivers" 
            icon={<User />} 
            isFocused={isFocused === 'name'} 
            onFocus={() => setIsFocused('name')} 
            onBlur={() => setIsFocused(null)} 
          />
          <InputField 
            label="Email / Phone" 
            placeholder="alex@example.com" 
            icon={<Mail />} 
            isFocused={isFocused === 'email'} 
            onFocus={() => setIsFocused('email')} 
            onBlur={() => setIsFocused(null)} 
          />
          <InputField 
            label="Username" 
            placeholder="alex_civic" 
            icon={<User />} 
            isFocused={isFocused === 'username'} 
            onFocus={() => setIsFocused('username')} 
            onBlur={() => setIsFocused(null)} 
          />
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
            <div className={`relative group transition-all duration-300 ${isFocused === 'password' ? 'scale-[1.02]' : ''}`}>
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'password' ? 'text-green-600' : 'text-slate-400'}`} />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-white border-2 border-slate-100 rounded-[24px] py-4 pl-12 pr-12 text-sm font-medium focus:outline-none focus:border-green-500/30 focus:ring-4 focus:ring-green-500/5 transition-all"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-green-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Guidelines Checkbox */}
        <div className="flex items-start gap-3 px-2">
          <button 
            onClick={() => setAgreed(!agreed)}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? 'bg-green-500 border-green-500' : 'bg-white border-slate-200'}`}
          >
            {agreed && <CheckCircle2 className="w-4 h-4 text-white" />}
          </button>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
              I agree to the <span className="text-green-600">Community Guidelines</span> and will share only useful and accurate civic content.
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSignUp}
          className="w-full py-4 bg-green-600 text-white font-black rounded-[24px] shadow-xl shadow-green-600/30 flex items-center justify-center gap-3"
        >
          <UserPlus className="w-5 h-5" />
          Create Account
        </motion.button>

        <div className="text-center pt-4">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account?{' '}
            <button onClick={onSignIn} className="text-green-600 font-black hover:text-green-700 transition-colors">
              Sign In
            </button>
          </p>
        </div>

        {/* Responsible Use Card */}
        <div className="bg-mint-50 border border-green-100 rounded-[28px] p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <ShieldCheck className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900 leading-tight">Built for responsible civic reporting.</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Avoid harmful or private information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, placeholder, icon, isFocused, onFocus, onBlur }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">{label}</label>
      <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
        {React.cloneElement(icon, { className: `absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused ? 'text-green-600' : 'text-slate-400'}` })}
        <input 
          type="text"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full bg-white border-2 border-slate-100 rounded-[24px] py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-green-500/30 focus:ring-4 focus:ring-green-500/5 transition-all"
        />
      </div>
    </div>
  );
}
