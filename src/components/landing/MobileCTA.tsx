import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 400px down
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden"
        >
          <div className="bg-background/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl flex items-center justify-between gap-4 max-w-lg mx-auto overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Zap className="w-3 h-3 fill-primary" /> Join Early
              </span>
              <span className="text-sm font-semibold text-foreground">Zero Gas Wallet</span>
            </div>
            <Button 
              size="lg" 
              className="rounded-2xl px-6 h-12 font-bold shadow-glow relative z-10"
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