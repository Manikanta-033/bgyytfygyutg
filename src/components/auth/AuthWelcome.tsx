import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, UserPlus, LogIn, User } from 'lucide-react';

interface AuthWelcomeProps {
  onSignUp: () => void;
  onSignIn: () => void;
  onContinueAsGuest: () => void;
}

export function AuthWelcome({ onSignUp, onSignIn, onContinueAsGuest }: AuthWelcomeProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between px-8 py-16">
      <div className="flex flex-col items-center text-center mt-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 bg-green-50 rounded-[40px] flex items-center justify-center mb-8 shadow-xl shadow-green-500/10"
        >
          <ShieldCheck className="w-12 h-12 text-green-600" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-slate-900 tracking-tight mb-4"
        >
          CivicPulse
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-500 font-medium leading-relaxed max-w-[280px]"
        >
          Join a community that reports what matters.
        </motion.p>
      </div>

      {/* Illustration Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-[300px] aspect-square bg-mint-50 rounded-[64px] flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-full space-y-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSignUp}
          className="w-full py-4 bg-green-600 text-white font-black rounded-[24px] shadow-xl shadow-green-600/30 flex items-center justify-center gap-3"
        >
          <UserPlus className="w-5 h-5" />
          Create Account
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSignIn}
          className="w-full py-4 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-[24px] flex items-center justify-center gap-3"
        >
          <LogIn className="w-5 h-5" />
          Sign In
        </motion.button>

        <button
          onClick={onContinueAsGuest}
          className="w-full py-2 text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-green-600 transition-colors"
        >
          Continue as Guest
        </button>
      </div>
      
      <div className="mt-8 px-6 py-3 bg-mint-50 rounded-2xl border border-green-100">
        <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest text-center">
          Built for responsible civic reporting
        </p>
      </div>
    </div>
  );
}
