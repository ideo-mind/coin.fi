import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, RefreshCcw, Smartphone, CheckCircle2, XCircle } from 'lucide-react';
const chains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base', 'Avalanche', 'Mantle', 'Scroll', 'Linea'];
export function Features() {
  return (
    <div className="py-24 space-y-32 bg-[#050505]">
      {/* Chain Ticker */}
      <section className="relative overflow-hidden py-10 border-y border-zinc-900 bg-zinc-950/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center px-10">
              {chains.map((chain) => (
                <div key={chain} className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-black text-primary">
                    {chain[0]}
                  </div>
                  <span className="text-lg font-bold tracking-tight text-white">{chain}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      </section>
      {/* Problem/Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-10 rounded-4xl bg-zinc-900/20 border border-zinc-900 space-y-8">
            <div className="flex items-center gap-4">
              <XCircle className="w-8 h-8 text-red-500/50" />
              <h3 className="text-2xl font-black">Legacy Wallets</h3>
            </div>
            <ul className="space-y-6 text-zinc-500 font-medium">
              <li>• Requires gas tokens before first transaction</li>
              <li>• Seed phrases are single points of failure</li>
              <li>• Complex "Approve" transactions waste time</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-10 rounded-4xl bg-gradient-brand/5 border border-primary/20 space-y-8 shadow-glow">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-black">Coin Fi</h3>
            </div>
            <ul className="space-y-6 text-white font-bold">
              <li className="flex gap-3"><Zap className="w-5 h-5 text-primary shrink-0" /> Zero gas required to start</li>
              <li className="flex gap-3"><Zap className="w-5 h-5 text-primary shrink-0" /> Social recovery & Biometrics</li>
              <li className="flex gap-3"><Zap className="w-5 h-5 text-primary shrink-0" /> Atomic execution batches</li>
            </ul>
          </motion.div>
        </div>
      </section>
      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <h2 className="text-4xl font-black text-center">Engineered for <span className="text-gradient">Performance</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Non-Custodial', desc: 'Total control with device hardware encryption.' },
            { icon: Zap, title: 'Instant Execution', desc: 'Skip approvals with one-click atomic actions.' },
            { icon: RefreshCcw, title: 'Smart Account', desc: 'Native ERC-4337 features like session keys.' },
            { icon: Smartphone, title: 'Cross-Device', desc: 'Synced passkeys via secure enclaves.' }
          ].map((b, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-8 rounded-4xl bg-zinc-900/30 border border-zinc-800 hover:border-primary/50 transition-all space-y-4">
              <b.icon className="w-10 h-10 text-primary" />
              <h4 className="text-xl font-bold">{b.title}</h4>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}