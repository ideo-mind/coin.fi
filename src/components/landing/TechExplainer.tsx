import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Cpu, Network, Key, ArrowRight } from 'lucide-react';
export function TechExplainer() {
  const [activeStep, setActiveStep] = useState('bundler');
  return (
    <section id="tech" className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">The Tech Behind <span className="text-primary">0 Gas</span></h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">We leverage the latest Ethereum standards to abstract away the complexity of blockchain interactions.</p>
        </div>
        <Tabs defaultValue="bundler" onValueChange={setActiveStep} className="space-y-12">
          <div className="flex justify-center">
            <TabsList className="bg-zinc-900 border-zinc-800 p-1 h-auto">
              <TabsTrigger value="bundler" className="px-6 py-3 data-[state=active]:bg-primary">
                <Cpu className="w-4 h-4 mr-2" /> Bundler (ERC-4337)
              </TabsTrigger>
              <TabsTrigger value="7702" className="px-6 py-3 data-[state=active]:bg-primary">
                <Network className="w-4 h-4 mr-2" /> P2P Relay (ERC-7702)
              </TabsTrigger>
              <TabsTrigger value="passkeys" className="px-6 py-3 data-[state=active]:bg-primary">
                <Key className="w-4 h-4 mr-2" /> Passkeys
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[400px]">
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold">
                    {activeStep === 'bundler' && "Proprietary Bundler Fleet"}
                    {activeStep === '7702' && "ERC-7702 Next-Gen Relay"}
                    {activeStep === 'passkeys' && "Hardware-level Security"}
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {activeStep === 'bundler' && "Our high-performance bundler nodes pick up your UserOperations and aggregate them into single on-chain transactions, paying the gas on your behalf through our sponsorship engine."}
                    {activeStep === '7702' && "Coin Fi uses the latest 7702 standard to allow existing EOAs to temporarily behave as smart accounts, enabling gas sponsorship without needing to migrate funds."}
                    {activeStep === 'passkeys' && "No more seed phrases. We use your device's Secure Enclave to sign transactions with biometrics, providing 10x better security than traditional private keys."}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-primary font-medium">
                      <ArrowRight className="w-4 h-4" /> 
                      {activeStep === 'bundler' ? "99.9% Transaction Reliability" : activeStep === '7702' ? "One-click Upgrade" : "Multi-device Sync"}
                    </li>
                    <li className="flex items-center gap-2 text-primary font-medium">
                      <ArrowRight className="w-4 h-4" /> 
                      {activeStep === 'bundler' ? "Auto-scaling Capacity" : activeStep === '7702' ? "Compatible with MetaMask" : "Cloud Backup (Encrypted)"}
                    </li>
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative h-[300px] flex items-center justify-center">
              {/* SVG Animation Flow */}
              <svg width="400" height="200" viewBox="0 0 400 200" className="w-full h-auto">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F38020" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#F38020" stopOpacity="1" />
                    <stop offset="100%" stopColor="#F38020" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Nodes */}
                <circle cx="50" cy="100" r="30" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                <rect x="170" y="70" width="60" height="60" rx="8" fill="#18181b" stroke="#F38020" strokeWidth="2" />
                <circle cx="350" cy="100" r="30" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                {/* Labels */}
                <text x="50" y="150" textAnchor="middle" fill="#71717a" fontSize="12">App</text>
                <text x="200" y="150" textAnchor="middle" fill="#F38020" fontSize="12" fontWeight="bold">Bundler</text>
                <text x="350" y="150" textAnchor="middle" fill="#71717a" fontSize="12">Chain</text>
                {/* Animated Dot */}
                <motion.circle 
                  cx="50" cy="100" r="6" fill="#F38020"
                  animate={{ 
                    cx: [50, 200, 350],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Connecting Lines */}
                <path d="M 80 100 L 170 100" stroke="#3f3f46" strokeWidth="2" strokeDasharray="4" />
                <path d="M 230 100 L 320 100" stroke="#3f3f46" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}