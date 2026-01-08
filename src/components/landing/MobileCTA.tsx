import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Trigger when user scrolls past the main hero fold (~600px)
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
        >
          <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 max-w-lg mx-auto overflow-hidden relative group">
            {/* Ambient Background Glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
            <div className="flex flex-col z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-1.5">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-3 h-3 fill-primary" />
                </motion.div>
                Early Access
              </span>
              <span className="text-sm font-bold text-foreground">Join the Revolution</span>
            </div>
            <Button
              size="lg"
              className="rounded-2xl px-6 h-12 font-bold shadow-glow relative z-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
              asChild
            >
              <a href="#waitlist">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] animate-shimmer pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}