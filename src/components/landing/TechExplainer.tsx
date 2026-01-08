import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
export function TechExplainer() {
  const [activeStep, setActiveStep] = useState('bundler');
  const techData = {
    bundler: {
      title: "Proprietary Bundler Fleet",
      desc: "Our high-performance nodes aggregate UserOperations into single on-chain transactions, paying gas for you through our sponsorship engine.",
      points: ["99.9% Transaction Reliability", "Auto-scaling Capacity", "MEV-Resistant Routing"]
    },
    '7702': {
      title: "ERC-7702 Next-Gen Relay",
      desc: "Coin Fi uses the latest 7702 standard to allow existing accounts to behave as smart accounts without migrations.",
      points: ["Native EOA Compatibility", "Zero-Migration Onboarding", "Trustless Delegation"]
    },
    passkeys: {
      title: "Hardware-level Security",
      desc: "Forget seed phrases. Use your device's Secure Enclave to sign with biometrics for 10x better security.",
      points: ["Multi-device Sync", "Cloud Backup (Encrypted)", "Phishing Resistance"]
    }
  };
  return (
    <section id="tech" className="py-24 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black">The Tech Behind <span className="text-primary">0 Gas</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">Next-generation account abstraction infrastructure.</p>
        </div>
        <Tabs defaultValue="bundler" onValueChange={setActiveStep} className="space-y-16">
          <div className="flex justify-center">
            <TabsList className="bg-zinc-900/50 border border-zinc-800 p-1.5 h-auto flex flex-wrap justify-center rounded-2xl">
              <TabsTrigger value="bundler" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
                Bundler
              </TabsTrigger>
              <TabsTrigger value="7702" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
                ERC-7702
              </TabsTrigger>
              <TabsTrigger value="passkeys" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold transition-all">
                Passkeys
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-8"
              >
                <h3 className="text-4xl font-bold">{techData[activeStep as keyof typeof techData].title}</h3>
                <p className="text-zinc-400 text-xl leading-relaxed">{techData[activeStep as keyof typeof techData].desc}</p>
                <ul className="space-y-4">
                  {techData[activeStep as keyof typeof techData].points.map((p, i) => (
                    <li key={i} className="flex items-center gap-3 text-primary font-bold group">
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="relative aspect-video bg-zinc-950 rounded-4xl border border-zinc-800 flex items-center justify-center p-8 overflow-hidden shadow-glow-lg group">
              <svg viewBox="0 0 400 200" className="w-full h-auto filter drop-shadow-primary">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Main Flow Paths */}
                <path id="pathTop" d="M 40 60 Q 150 60 200 100" stroke="#18181b" strokeWidth="2" fill="none" />
                <path id="pathBottom" d="M 40 140 Q 150 140 200 100" stroke="#18181b" strokeWidth="2" fill="none" />
                <path id="pathExit" d="M 200 100 H 360" stroke="#18181b" strokeWidth="2" fill="none" />
                {/* Nodes */}
                <circle cx="40" cy="60" r="12" fill="#050505" stroke="#7000ff" strokeWidth="2" />
                <circle cx="40" cy="140" r="12" fill="#050505" stroke="#7000ff" strokeWidth="2" />
                <motion.rect x="180" y="80" width="40" height="40" rx="8" fill="#050505" stroke="#00f2ff" strokeWidth="2" animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                <circle cx="360" cy="100" r="15" fill="#050505" stroke="#00f2ff" strokeWidth="3" />
                {/* Packet Particles - Native SVG Animation to avoid Framer Motion prop warnings */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <React.Fragment key={i}>
                    {/* Incoming Top */}
                    <circle r="3" fill="#00f2ff" filter="url(#glow)" opacity="0">
                      <animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.45}s`}>
                        <mpath href="#pathTop" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin={`${i * 0.45}s`} />
                    </circle>
                    {/* Incoming Bottom */}
                    <circle r="3" fill="#00f2ff" filter="url(#glow)" opacity="0">
                      <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${i * 0.5}s`}>
                        <mpath href="#pathBottom" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                    </circle>
                    {/* Outgoing Unified */}
                    <circle r="4" fill="#7000ff" filter="url(#glow)" opacity="0">
                      <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`}>
                        <mpath href="#pathExit" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                    </circle>
                  </React.Fragment>
                ))}
              </svg>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}