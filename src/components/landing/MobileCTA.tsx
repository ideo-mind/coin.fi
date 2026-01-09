import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const target = document.querySelector('#hero-cta-trigger');
    const handleVisibility = (isHeroVisible: boolean) => {
      setIsVisible(!isHeroVisible);
    };
    if (target && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => handleVisibility(entry.isIntersecting),
        { threshold: 0, rootMargin: '0px 0px -100px 0px' }
      );
      observerRef.current.observe(target);
    } else {
      // Fallback scroll listener
      const handleScroll = () => setIsVisible(window.scrollY > 800);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 150,
            mass: 0.6
          }}
          className="fixed bottom-6 left-4 right-4 z-[999] md:hidden"
        >
          <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-glass flex items-center justify-between gap-4 max-w-lg mx-auto overflow-hidden relative ring-1 ring-white/5">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
            <div className="flex flex-col z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 mb-0.5">
                <Zap className="w-3 h-3 fill-primary animate-pulse" />
                Waitlist Live
              </span>
              <span className="text-sm font-black text-white tracking-tight">Join Early Access</span>
            </div>
            <Button
              size="lg"
              className="rounded-2xl px-6 h-12 font-bold shadow-glow bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 z-10"
              asChild
            >
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