import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Network, Key, ArrowRight } from 'lucide-react';
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
              <TabsTrigger value="bundler" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
                Bundler
              </TabsTrigger>
              <TabsTrigger value="7702" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
                ERC-7702
              </TabsTrigger>
              <TabsTrigger value="passkeys" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
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
                className="space-y-8"
              >
                <h3 className="text-4xl font-bold">{techData[activeStep as keyof typeof techData].title}</h3>
                <p className="text-zinc-400 text-xl leading-relaxed">{techData[activeStep as keyof typeof techData].desc}</p>
                <ul className="space-y-4">
                  {techData[activeStep as keyof typeof techData].points.map((p, i) => (
                    <li key={i} className="flex items-center gap-3 text-primary font-bold">
                      <ArrowRight className="w-5 h-5" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="relative aspect-video bg-zinc-900/30 rounded-4xl border border-zinc-800 flex items-center justify-center p-12 overflow-hidden shadow-glow">
              <svg viewBox="0 0 400 200" className="w-full h-auto">
                <path d="M 50 100 H 350" stroke="#333" strokeWidth="2" strokeDasharray="8,8" />
                <motion.circle cx="50" cy="100" r="20" fill="#050505" stroke="#00f2ff" strokeWidth="2" />
                <motion.rect x="175" y="75" width="50" height="50" rx="10" fill="#050505" stroke="#7000ff" strokeWidth="2" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
                <motion.circle cx="350" cy="100" r="20" fill="#050505" stroke="#00f2ff" strokeWidth="2" />
                {[0, 1, 2].map(i => (
                  <motion.circle key={i} r="4" fill="#00f2ff" initial={{ cx: 50, opacity: 0 }} animate={{ cx: [50, 350], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }} />
                ))}
              </svg>
              <div className="absolute inset-0 bg-primary/5 animate-pulse -z-10" />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}