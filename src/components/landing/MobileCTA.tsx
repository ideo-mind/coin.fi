import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
export function MobileCTA() {
  // Use a trigger element at the bottom of the hero to show/hide the fixed CTA
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true,
  });
  return (
    <>
      {/* Ghost element to track scroll position */}
      <div ref={ref} className="absolute top-[800px] h-1 w-full pointer-events-none" />
      <AnimatePresence>
        {!inView && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
          >
            <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-2xl flex items-center justify-between gap-4 max-w-lg mx-auto overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />
              <div className="flex flex-col z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-primary" />
                  Free Gas
                </span>
                <span className="text-sm font-bold text-white">Join the Waitlist</span>
              </div>
              <Button size="lg" className="rounded-2xl px-6 h-12 font-bold shadow-glow bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#waitlist">
                  Join Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}