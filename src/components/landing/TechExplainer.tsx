import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
export function TechExplainer() {
  const [activeStep, setActiveStep] = useState('bundler');
  const techData = {
    bundler: {
      title: "Proprietary Bundler Fleet",
      desc: "Our nodes aggregate UserOperations into single on-chain transactions, paying gas for you through our sponsorship engine.",
      points: ["99.9% Transaction Reliability", "Auto-scaling Capacity", "MEV-Resistant Routing"]
    },
    '7702': {
      title: "ERC-7702 Integration",
      desc: "Coin Fi uses the latest 7702 standard to allow standard EOA accounts to behave as smart accounts without migrations.",
      points: ["Native Wallet Compatibility", "Zero-Migration Path", "Trustless Delegation"]
    },
    passkeys: {
      title: "Secure Enclave Signing",
      desc: "Forget seed phrases. Use your device's Secure Enclave to sign with biometrics for phishing-proof security.",
      points: ["Multi-device Sync", "Biometric Authentication", "Phishing Resistance"]
    }
  };
  return (
    <section id="tech" className="py-24 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black">The Tech Behind <span className="text-primary">0 Gas</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium text-lg">Next-generation account abstraction infrastructure.</p>
        </div>
        <Tabs defaultValue="bundler" onValueChange={setActiveStep} className="space-y-16">
          <div className="flex justify-center">
            <TabsList className="bg-zinc-900/50 border border-zinc-800 p-1.5 h-auto rounded-2xl">
              <TabsTrigger value="bundler" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Bundler</TabsTrigger>
              <TabsTrigger value="7702" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">ERC-7702</TabsTrigger>
              <TabsTrigger value="passkeys" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Passkeys</TabsTrigger>
            </TabsList>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="min-h-[350px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <h3 className="text-4xl font-black tracking-tight">{techData[activeStep as keyof typeof techData].title}</h3>
                  <p className="text-zinc-400 text-xl leading-relaxed font-medium">{techData[activeStep as keyof typeof techData].desc}</p>
                  <ul className="space-y-4">
                    {techData[activeStep as keyof typeof techData].points.map((p, i) => (
                      <li key={i} className="flex items-center gap-3 text-primary font-bold group">
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /> {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative aspect-video bg-zinc-950 rounded-[2.5rem] border border-zinc-800/50 flex items-center justify-center p-8 overflow-hidden shadow-glow-lg">
              <svg viewBox="0 0 400 200" className="w-full h-auto">
                <defs>
                  <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path id="pathTop" d="M 40 60 Q 150 60 200 100" stroke="#18181b" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path id="pathBottom" d="M 40 140 Q 150 140 200 100" stroke="#18181b" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path id="pathExit" d="M 200 100 H 360" stroke="#18181b" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <circle cx="40" cy="60" r="14" fill="#050505" stroke="#7000ff" strokeWidth="2" filter="url(#svgGlow)" />
                <circle cx="40" cy="140" r="14" fill="#050505" stroke="#7000ff" strokeWidth="2" filter="url(#svgGlow)" />
                <motion.rect
                  x="180" y="80" width="40" height="40" rx="10"
                  fill="#050505" stroke="#00f2ff" strokeWidth="2"
                  filter="url(#svgGlow)"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <circle cx="360" cy="100" r="18" fill="#050505" stroke="#00f2ff" strokeWidth="3" filter="url(#svgGlow)" />
                {[0, 1, 2].map((i) => (
                  <React.Fragment key={i}>
                    <circle r="4" fill="#00f2ff" filter="url(#svgGlow)" opacity="0">
                      <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 1}s`}>
                        <mpath href="#pathTop" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" begin={`${i * 1}s`} />
                    </circle>
                    <circle r="4" fill="#00f2ff" filter="url(#svgGlow)" opacity="0">
                      <animateMotion dur="3.5s" repeatCount="indefinite" begin={`${i * 1.2}s`}>
                        <mpath href="#pathBottom" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3.5s" repeatCount="indefinite" begin={`${i * 1.2}s`} />
                    </circle>
                    <circle r="5" fill="#7000ff" filter="url(#svgGlow)" opacity="0">
                      <animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.7}s`}>
                        <mpath href="#pathExit" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.7}s`} />
                    </circle>
                  </React.Fragment>
                ))}
              </svg>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}