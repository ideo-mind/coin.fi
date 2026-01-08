import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, RefreshCcw, Smartphone, MousePointer2, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
const chains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base', 'Avalanche', 'ZKSync'];
const benefits = [
  { icon: Shield, title: 'Non-Custodial', desc: 'Your keys, your crypto. Total control with industry-leading security.' },
  { icon: Zap, title: 'Instant Execution', desc: 'Skip the "Approve" transactions. One click to swap, stake, or send.' },
  { icon: RefreshCcw, title: 'Smart Account', desc: 'Native ERC-4337 support for session keys and multi-sig recovery.' },
  { icon: Smartphone, title: 'Cross-Device', desc: 'Biometric passkeys synced across your devices via secure enclaves.' },
];
export function Features() {
  return (
    <div className="py-24 space-y-32">
      {/* Chain Ticker */}
      <section className="overflow-hidden py-10 border-y bg-muted/30">
        <div className="flex whitespace-nowrap animate-shimmer">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-12 mx-6">
              {chains.map((chain) => (
                <div key={chain} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                    {chain[0]}
                  </div>
                  <span className="text-lg font-medium font-display">{chain}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      {/* Problem/Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <h3 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              <MousePointer2 className="w-5 h-5 rotate-45" /> Old Way
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">❌ Buy ETH first to pay for gas</li>
              <li className="flex gap-3">❌ Wait for network confirmation</li>
              <li className="flex gap-3">❌ Sign multiple approvals per app</li>
              <li className="flex gap-3">❌ Lose access if seed phrase lost</li>
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-32 h-32 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Zap className="w-5 h-5 fill-primary" /> Coin Fi Way
            </h3>
            <ul className="space-y-4 text-foreground font-medium">
              <li className="flex gap-3">✅ 0 ETH needed to start</li>
              <li className="flex gap-3">✅ Sponsored transactions instantly</li>
              <li className="flex gap-3">✅ Atomic batched operations</li>
              <li className="flex gap-3">✅ Social recovery & Biometrics</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Everything you expect from a <span className="text-gradient">modern wallet</span>.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Built for the next billion users who don't want to care about gas prices.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border bg-card hover:border-primary/50 transition-colors text-left space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <b.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">{b.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}