import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Cpu, Network, Key, ArrowRight } from 'lucide-react';
export function TechExplainer() {
  const [activeStep, setActiveStep] = useState('bundler');
  const techData = {
    bundler: {
      title: "Proprietary Bundler Fleet",
      desc: "Our high-performance bundler nodes pick up your UserOperations and aggregate them into single on-chain transactions, paying the gas on your behalf through our sponsorship engine.",
      points: ["99.9% Transaction Reliability", "Auto-scaling Capacity", "MEV-Resistant Routing"]
    },
    '7702': {
      title: "ERC-7702 Next-Gen Relay",
      desc: "Coin Fi uses the latest 7702 standard to allow existing EOAs to temporarily behave as smart accounts. This enables native gas sponsorship without needing complex wallet migrations.",
      points: ["Native EOA Compatibility", "Zero-Migration Onboarding", "Trustless Delegation"]
    },
    passkeys: {
      title: "Hardware-level Security",
      desc: "Forget seed phrases. We utilize your device's Secure Enclave to sign transactions with biometrics, providing 10x better security and a seamless cross-device login experience.",
      points: ["Multi-device Sync", "Cloud Backup (Encrypted)", "Phishing Resistance"]
    }
  };
  return (
    <section id="tech" className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">The Tech Behind <span className="text-primary">0 Gas</span></h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">We leverage the latest Ethereum standards to abstract away the complexity of blockchain interactions.</p>
        </div>
        <Tabs defaultValue="bundler" onValueChange={setActiveStep} className="space-y-12">
          <div className="flex justify-center">
            <TabsList className="bg-zinc-900 border-zinc-800 p-1 h-auto flex flex-wrap justify-center">
              <TabsTrigger value="bundler" className="px-6 py-3 data-[state=active]:bg-primary transition-all">
                <Cpu className="w-4 h-4 mr-2" /> Bundler (ERC-4337)
              </TabsTrigger>
              <TabsTrigger value="7702" className="px-6 py-3 data-[state=active]:bg-primary transition-all">
                <Network className="w-4 h-4 mr-2" /> Relay (ERC-7702)
              </TabsTrigger>
              <TabsTrigger value="passkeys" className="px-6 py-3 data-[state=active]:bg-primary transition-all">
                <Key className="w-4 h-4 mr-2" /> Passkeys
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[480px]">
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold">
                    {techData[activeStep as keyof typeof techData].title}
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {techData[activeStep as keyof typeof techData].desc}
                  </p>
                  <ul className="grid sm:grid-cols-1 gap-4">
                    {techData[activeStep as keyof typeof techData].points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-primary font-medium group">
                        <div className="p-1 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative h-[300px] flex items-center justify-center p-8 bg-zinc-900/30 rounded-4xl border border-zinc-800/50 backdrop-blur-sm overflow-hidden">
              {/* Visual Tech Flow Animation */}
              <svg width="400" height="200" viewBox="0 0 400 200" className="w-full h-auto drop-shadow-2xl">
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F38020" stopOpacity="0" />
                    <stop offset="50%" stopColor="#F38020" stopOpacity="1" />
                    <stop offset="100%" stopColor="#F38020" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Connecting Path */}
                <path d="M 50 100 Q 200 100 350 100" stroke="#333" strokeWidth="2" fill="none" strokeDasharray="6,6" />
                {/* Nodes */}
                <motion.circle cx="50" cy="100" r="25" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                <motion.rect 
                  x="170" y="70" width="60" height="60" rx="12" fill="#18181b" 
                  stroke="#F38020" strokeWidth="2" 
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle cx="350" cy="100" r="25" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                {/* Labels */}
                <text x="50" y="155" textAnchor="middle" fill="#71717a" fontSize="10" className="uppercase tracking-widest font-bold">User</text>
                <text x="200" y="155" textAnchor="middle" fill="#F38020" fontSize="10" className="uppercase tracking-widest font-bold">Coin Fi</text>
                <text x="350" y="155" textAnchor="middle" fill="#71717a" fontSize="10" className="uppercase tracking-widest font-bold">Mainnet</text>
                {/* Particle Flow */}
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    r="4"
                    fill="#F38020"
                    filter="url(#glow)"
                    initial={{ cx: 50, opacity: 0 }}
                    animate={{
                      cx: [50, 200, 350],
                      opacity: [0, 1, 0],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </svg>
              {/* Background ambient pulse */}
              <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-4xl -z-10" />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}