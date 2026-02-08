import { motion } from "framer-motion";
import {
  CheckCircle2,
  RefreshCcw,
  Shield,
  Smartphone,
  XCircle,
  Zap,
} from "lucide-react";

const chains = [
  "Ethereum",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Base",
  "Avalanche",
  "Mantle",
  "Scroll",
  "Linea",
];
export function Features() {
  return (
    <div className="py-24 space-y-32 bg-[#050505] overflow-hidden">
      {/* Chain Ticker - Full Width */}
      <section className="w-full relative overflow-hidden py-14 border-y border-zinc-900 bg-zinc-950/40">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {[...Array(4)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Marquee items need index key
            <div key={i} className="flex gap-24 items-center px-12">
              {chains.map((chain) => (
                <div
                  key={chain}
                  className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-black text-primary group-hover:border-primary/50 group-hover:shadow-glow transition-all ring-1 ring-white/5">
                    {chain[0]}
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white">
                    {chain}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
      </section>
      {/* Problem/Solution - Guttered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 md:p-12 rounded-4xl bg-zinc-900/10 border border-zinc-800/50 space-y-8 backdrop-blur-sm relative group hover:border-zinc-700/60 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-500/5 ring-1 ring-red-500/20">
                <XCircle className="w-8 h-8 text-red-500/60" />
              </div>
              <h3 className="text-2xl font-black text-white">Legacy Wallets</h3>
            </div>
            <ul className="space-y-6 text-zinc-500 font-medium text-lg">
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/40 mt-3 shrink-0" />
                Requires gas tokens before first transaction
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/40 mt-3 shrink-0" />
                Seed phrases are single points of failure
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/40 mt-3 shrink-0" />
                Complex "Approve" transactions waste time
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 md:p-12 rounded-4xl bg-gradient-brand/5 border border-primary/30 space-y-8 shadow-glow-lg relative overflow-hidden transition-all duration-500 hover:shadow-glow-xl group"
          >
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 rounded-2xl bg-primary/10 ring-1 ring-primary/40 shadow-glow">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-white">Coin Fi</h3>
            </div>
            <ul className="space-y-6 text-white font-bold text-lg relative z-10">
              <li className="flex gap-4 items-center group/item">
                <Zap className="w-6 h-6 text-primary shrink-0 animate-pulseGlow" />
                Zero gas required to start
              </li>
              <li className="flex gap-4 items-center group/item">
                <Zap className="w-6 h-6 text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                Social recovery & Biometrics
              </li>
              <li className="flex gap-4 items-center group/item">
                <Zap className="w-6 h-6 text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                Atomic execution batches
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
      {/* Benefits Grid - Guttered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Engineered for <span className="text-gradient">Performance</span>
          </h2>
          <p className="text-zinc-500 font-medium text-lg max-w-2xl mx-auto">
            Native account abstraction features that disappear into the
            background.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Non-Custodial",
              desc: "Total control with hardware encryption via the Secure Enclave.",
            },
            {
              icon: Zap,
              title: "Instant Execution",
              desc: "Skip approvals with one-click atomic actions and bundled operations.",
            },
            {
              icon: RefreshCcw,
              title: "Smart Account",
              desc: "Native ERC-4337 features like session keys and custom logic.",
            },
            {
              icon: Smartphone,
              title: "Cross-Device",
              desc: "Synced passkeys via secure cloud-encrypted backup channels.",
            },
          ].map((b) => (
            <motion.div
              key={b.title}
              whileHover={{ y: -10 }}
              className="p-10 rounded-4xl bg-zinc-900/20 border border-zinc-800/40 hover:border-primary/50 transition-all duration-300 group ring-1 ring-white/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:shadow-glow transition-all ring-1 ring-white/5">
                <b.icon className="w-8 h-8 text-primary group-hover:animate-pulseGlow transition-transform" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {b.title}
              </h4>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
