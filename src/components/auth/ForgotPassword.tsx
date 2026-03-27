import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Mail, Send, ShieldCheck } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
  onContinue: () => void;
}

export function ForgotPassword({ onBack, onContinue }: ForgotPasswordProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Reset Password</h1>
        </div>
      </header>

      <div className="px-8 py-10 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Forgot password?</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Enter your email or phone to receive reset instructions.
          </p>
        </div>

        {/* Input Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email / Phone</label>
          <div className={`relative group transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused ? 'text-green-600' : 'text-slate-400'}`} />
            <input 
              type="text"
              placeholder="Enter your email or phone"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-white border-2 border-slate-100 rounded-[24px] py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-green-500/30 focus:ring-4 focus:ring-green-500/5 transition-all"
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full py-4 bg-green-600 text-white font-black rounded-[24px] shadow-xl shadow-green-600/30 flex items-center justify-center gap-3"
        >
          <Send className="w-5 h-5" />
          Send Code
        </motion.button>

        {/* Trust Card */}
        <div className="bg-mint-50 border border-green-100 rounded-[28px] p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <ShieldCheck className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900 leading-tight">Your account security is our priority.</p>
          </div>
        </div>

        <div className="text-center">
          <button onClick={onBack} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-green-600 transition-colors">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
