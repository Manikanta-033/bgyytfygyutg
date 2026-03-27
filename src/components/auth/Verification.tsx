import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

interface VerificationProps {
  onBack: () => void;
  onVerify: () => void;
}

export function Verification({ onBack, onVerify }: VerificationProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Verification</h1>
        </div>
      </header>

      <div className="px-8 py-10 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Verify account</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Enter the 4-digit code sent to your email or phone.
          </p>
        </div>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-4">
          {code.map((digit, index) => (
            <motion.input
              key={index}
              id={`otp-${index}`}
              type="number"
              value={digit}
              onChange={(e) => handleInput(index, e.target.value)}
              whileFocus={{ scale: 1.1 }}
              className="w-16 h-16 bg-white border-2 border-slate-100 rounded-[20px] text-center text-2xl font-black text-slate-900 focus:outline-none focus:border-green-500/30 focus:ring-4 focus:ring-green-500/5 transition-all"
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Resend code in <span className="text-green-600">00:{timer < 10 ? `0${timer}` : timer}</span>
          </p>
          <button 
            disabled={timer > 0}
            className={`mt-2 text-[10px] font-black uppercase tracking-widest transition-colors ${timer > 0 ? 'text-slate-300' : 'text-green-600 hover:text-green-700'}`}
          >
            Resend Code
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onVerify}
          className="w-full py-4 bg-green-600 text-white font-black rounded-[24px] shadow-xl shadow-green-600/30 flex items-center justify-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5" />
          Verify
        </motion.button>

        {/* Trust Card */}
        <div className="bg-mint-50 border border-green-100 rounded-[28px] p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <ShieldCheck className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900 leading-tight">Verification helps keep our community safe.</p>
          </div>
        </div>

        <div className="text-center">
          <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-green-600 transition-colors">
            Edit Contact Info
          </button>
        </div>
      </div>
    </div>
  );
}
