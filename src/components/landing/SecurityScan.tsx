import { motion } from "framer-motion";
import { AlertTriangle, Eye, ShieldCheck } from "lucide-react";

export function SecurityScan() {
  return (
    <section id="security" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative perspective-1000 order-2 lg:order-1">
            <motion.div
              whileHover={{ rotateY: 15, rotateX: 5 }}
              className="relative w-full max-w-sm mx-auto aspect-[3/4] bg-zinc-900/50 rounded-4xl border border-zinc-800 shadow-glow p-10 space-y-10 backdrop-blur-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">AI Shield Active</h4>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                      Scanning payload...
                    </p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-zinc-800 space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                    <span className="text-zinc-500">Simulation</span>
                    <span className="text-primary">Secure</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-800/30 border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold">Malicious Code</span>
                    </div>
                    <span className="text-xs font-black text-primary">
                      NONE
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-800/30 border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-bold">Contract Audit</span>
                    </div>
                    <span className="text-xs font-black text-primary">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-primary/40 shadow-glow z-20 pointer-events-none"
              />
            </motion.div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-black">
              AI-Powered <span className="text-gradient">Guardian</span>
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed font-medium">
              Every transaction is simulated in a secure sandbox. Our AI scans
              for malicious contract patterns and phishing attempts before
              execution.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
                  1
                </div>
                <h5 className="font-bold text-lg">Real-time Simulation</h5>
                <p className="text-sm text-zinc-500">
                  See the exact outcome of your transaction before signing.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-black">
                  2
                </div>
                <h5 className="font-bold text-lg">MEV Protection</h5>
                <p className="text-sm text-zinc-500">
                  Hidden routing to protect you from frontrunning bots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
