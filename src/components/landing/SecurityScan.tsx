import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Zap, AlertTriangle } from 'lucide-react';
export function SecurityScan() {
  return (
    <section id="security" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative perspective-1000">
            <motion.div 
              whileHover={{ rotateY: 15, rotateX: 5 }}
              transition={{ type: 'spring', stiffness: 50 }}
              className="relative w-full max-w-md mx-auto aspect-[4/5] bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl p-8 space-y-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* AI Scanner Visual Layers */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">AI Threat Analysis</h4>
                    <p className="text-xs text-muted-foreground">Monitoring network mempool...</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 space-y-4">
                  <div className="flex justify-between text-xs">
                    <span>Simulation Result</span>
                    <span className="text-green-400">SAFE</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-zinc-700 rounded-full" />
                    <div className="h-2 w-2/3 bg-zinc-700 rounded-full" />
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">Verified Contract</span>
                    </div>
                    <span className="text-xs text-green-500">YES</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Funds Drain Risk</span>
                    </div>
                    <span className="text-xs text-blue-500">0.0%</span>
                  </div>
                </div>
              </div>
              {/* Decorative scan line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-primary/40 shadow-[0_0_15px_rgba(243,128,32,0.5)] z-10"
              />
            </motion.div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">AI-Powered <span className="text-gradient">Transaction Guard</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every transaction you initiate is first simulated in our secure sandbox. Our AI engine scans for common attack patterns, malicious contract calls, and phishing attempts before it ever hits the chain.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h5 className="font-bold">Real-time Simulation</h5>
                <p className="text-sm text-muted-foreground">See exactly what leaves your wallet before you sign.</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-bold">MEV Protection</h5>
                <p className="text-sm text-muted-foreground">Hidden transaction routing to avoid frontrunning bots.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}