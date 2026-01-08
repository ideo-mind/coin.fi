import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show fixed CTA when hero button is NOT visible (scrolled past)
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    const target = document.querySelector('#hero-cta-trigger');
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-6 left-4 right-4 z-[60] md:hidden"
        >
          <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-glass-lg flex items-center justify-between gap-4 max-w-lg mx-auto overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/15 blur-3xl rounded-full group-hover:bg-primary/25 transition-colors" />
            <div className="flex flex-col z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 mb-0.5">
                <Zap className="w-3 h-3 fill-primary animate-pulseGlow" />
                Free Gas
              </span>
              <span className="text-sm font-black text-white tracking-tight">Access Coin Fi Early</span>
            </div>
            <Button size="lg" className="rounded-2xl px-6 h-12 font-bold shadow-glow bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95" asChild>
              <a href="#waitlist">
                Join Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}