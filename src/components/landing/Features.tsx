import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, RefreshCcw, Smartphone, MousePointer2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
const chains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base', 'Avalanche', 'ZKSync', 'Mantle', 'Scroll', 'Linea'];
const benefits = [
  { icon: Shield, title: 'Non-Custodial', desc: 'Your keys, your crypto. Total control with industry-leading security and encryption.' },
  { icon: Zap, title: 'Instant Execution', desc: 'Skip the "Approve" transactions. One click to swap, stake, or send tokens instantly.' },
  { icon: RefreshCcw, title: 'Smart Account', desc: 'Native ERC-4337 support for session keys, daily limits, and multi-sig recovery.' },
  { icon: Smartphone, title: 'Cross-Device', desc: 'Biometric passkeys synced across your devices via secure hardware enclaves.' },
];
export function Features() {
  return (
    <div className="py-24 space-y-32">
      {/* Chain Ticker */}
      <section className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden py-12 border-y bg-zinc-950/50 backdrop-blur-sm">
        <div className="flex w-fit animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {chains.map((chain) => (
                <div key={chain} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-bold shadow-soft">
                    {chain[0]}
                  </div>
                  <span className="text-xl font-semibold tracking-tight whitespace-nowrap">{chain}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Gradient overlays for the ticker ends */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </section>
      {/* Problem/Solution Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-4xl bg-zinc-900/50 border border-zinc-800 space-y-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Legacy Wallets</h3>
            </div>
            <ul className="space-y-6 text-muted-foreground">
              <li className="flex gap-4 items-start">
                <span className="mt-1 text-red-500/50">•</span>
                <span>Requires gas tokens (ETH/MATIC) before first transaction</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-1 text-red-500/50">•</span>
                <span>Complex seed phrases are single points of failure</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-1 text-red-500/50">•</span>
                <span>Confusing "Approve" transactions waste time and gas</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-1 text-red-500/50">•</span>
                <span>No built-in protection against malicious contracts</span>
              </li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-10 rounded-4xl bg-primary/5 border border-primary/20 space-y-8 relative overflow-hidden group shadow-glow"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-48 h-48 text-primary" />
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Coin Fi Solution</h3>
            </div>
            <ul className="space-y-6 text-foreground/90 font-medium">
              <li className="flex gap-4 items-start">
                <span className="mt-1 text-primary">•</span>
                <span>Zero gas required to start swapping instantly</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-1 text-primary">•</span>
                <span>Social recovery & biometrics via Passkeys</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-1 text-primary">•</span>
                <span>Atomic batches: Sign once, execute everything</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="mt-1 text-primary">•</span>
                <span>Real-time AI security scans on every signature</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">The <span className="text-gradient">Premium</span> Wallet Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Engineered for security, designed for simplicity, and powered by innovation.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-4xl border bg-card/50 hover:border-primary/50 transition-all duration-300 text-left space-y-5 group shadow-soft"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-glow">
                <b.icon className="w-7 h-7" />
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