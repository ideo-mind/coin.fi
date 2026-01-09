import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const handleVisibility = (isHeroVisible: boolean) => {
      // Logic: Show mobile CTA if hero button is NOT visible (scrolled past)
      setIsVisible(!isHeroVisible);
    };
    // Robust Intersection Observer setup
    const setupObserver = () => {
      const target = document.querySelector('#hero-cta-trigger');
      if (!target) return false;
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          handleVisibility(entry.isIntersecting);
        },
        { threshold: 0, rootMargin: '0px 0px -100px 0px' }
      );
      observerRef.current.observe(target);
      return true;
    };
    // Fallback scroll listener for browsers with potential race conditions or legacy support
    const handleScrollFallback = () => {
      if (!observerRef.current) {
        const scrolled = window.scrollY > 600;
        setIsVisible(scrolled);
      }
    };
    // Try setting up observer, if fails (element not yet in DOM), retry once
    const success = setupObserver();
    if (!success) {
      const timeoutId = setTimeout(setupObserver, 500);
      window.addEventListener('scroll', handleScrollFallback, { passive: true });
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', handleScrollFallback);
        observerRef.current?.disconnect();
      };
    }
    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScrollFallback);
    };
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 120,
            mass: 0.8
          }}
          className="fixed bottom-6 left-4 right-4 z-[70] md:hidden"
        >
          <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-glass flex items-center justify-between gap-4 max-w-lg mx-auto overflow-hidden relative group ring-1 ring-white/5">
            {/* Background Glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-colors pointer-events-none" />
            <div className="flex flex-col z-10 relative">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 mb-0.5">
                <Zap className="w-3 h-3 fill-primary animate-pulseGlow" />
                Waitlist Live
              </span>
              <span className="text-sm font-black text-white tracking-tight">Claim Early Access</span>
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