import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, Mail, Lock, Eye, EyeOff, 
  LogIn, Smartphone, Apple, Chrome,
  ShieldCheck, AlertCircle
} from 'lucide-react';

interface LoginProps {
  onBack: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
  onLogin: () => void;
}

export function Login({ onBack, onSignUp, onForgotPassword, onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Sign In</h1>
        </div>
      </header>

      <div className="px-8 py-10 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Welcome back</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Sign in to continue reporting and tracking issues in your community.
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email / Phone</label>
            <div className={`relative group transition-all duration-300 ${isFocused === 'email' ? 'scale-[1.02]' : ''}`}>
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'email' ? 'text-green-600' : 'text-slate-400'}`} />
              <input 
                type="text"
                placeholder="Enter your email or phone"
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-white border-2 border-slate-100 rounded-[24px] py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-green-500/30 focus:ring-4 focus:ring-green-500/5 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
            <div className={`relative group transition-all duration-300 ${isFocused === 'password' ? 'scale-[1.02]' : ''}`}>
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused === 'password' ? 'text-green-600' : 'text-slate-400'}`} />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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
            <div className="flex justify-end pr-4">
              <button onClick={onForgotPassword} className="text-[10px] font-black text-green-600 uppercase tracking-widest hover:text-green-700 transition-colors">
                Forgot Password?
              </button>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onLogin}
          className="w-full py-4 bg-green-600 text-white font-black rounded-[24px] shadow-xl shadow-green-600/30 flex items-center justify-center gap-3"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </motion.button>

        {/* Divider */}
        <div className="relative flex items-center gap-4 py-4">
          <div className="flex-1 h-[1px] bg-slate-200" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Or continue with</span>
          <div className="flex-1 h-[1px] bg-slate-200" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <SocialButton icon={<Chrome className="w-5 h-5" />} />
          <SocialButton icon={<Apple className="w-5 h-5" />} />
          <SocialButton icon={<Smartphone className="w-5 h-5" />} />
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-slate-500 font-medium">
            Don't have an account?{' '}
            <button onClick={onSignUp} className="text-green-600 font-black hover:text-green-700 transition-colors">
              Sign Up
            </button>
          </p>
        </div>

        {/* Trust Card */}
        <div className="bg-mint-50 border border-green-100 rounded-[28px] p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <ShieldCheck className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900 leading-tight">Join a cleaner, safer, more informed community.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="w-full aspect-square bg-white border-2 border-slate-100 rounded-[24px] flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all"
    >
      {icon}
    </motion.button>
  );
}
