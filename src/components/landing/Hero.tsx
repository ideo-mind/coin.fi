import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Wallet2, Zap, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
const API_URL = 'https://script.google.com/macros/s/AKfycbxchu6OrPZY5gI232X-y3cpU9NrajkWzDua-18exZINVvMaMd-VA5mD0cpeSKDEPnQQ/exec';
const PLATFORMS = ['iOS', 'Android', 'Chrome Extension', 'Web App'];
export function Hero() {
  const [email, setEmail] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(PLATFORMS);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(true);
  const fetchCount = async (signal?: AbortSignal) => {
    try {
      // Use no-cors mode if the external API doesn't support CORS for GET, 
      // but typically we want the JSON response. GAS usually requires redirects.
      const res = await fetch(API_URL, { signal });
      if (res.ok) {
        const json = await res.json();
        // Handle GAS structure: usually { success: true, count: 123 }
        if (json.success) {
          setCount(json.count ?? json.data?.count ?? 0);
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.warn('Waitlist count fetch failed (might be CORS or URL policy):', err.message);
      }
    } finally {
      setIsCountLoading(false);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchCount(controller.signal);
    return () => controller.abort();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    if (platforms.length === 0) return toast.error("Please select at least one platform");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('platforms', JSON.stringify(platforms));
      // Note: Google Apps Script usually requires 'mode: no-cors' for POST from some environments
      // but that prevents reading the response. Using standard fetch first.
      const res = await fetch(API_URL, { 
        method: 'POST', 
        body: formData,
      });
      // GAS often returns a redirect or opaque response if no-cors is used.
      // If the res.ok check fails because of CORS but the data actually sends:
      if (res.ok || res.type === 'opaque') {
        toast.success("Welcome aboard! You're on the list.");
        setEmail('');
        setPlatforms(PLATFORMS);
        fetchCount();
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (err) {
      // Fallback: If it's a CORS error but it likely reached the script
      console.error('Waitlist submission error:', err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handlePlatformChange = (p: string, checked: boolean) => {
    setPlatforms(prev =>
      checked
        ? [...prev, p]
        : prev.filter(item => item !== p)
    );
  };
  return (
    <section id="waitlist" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold shadow-glow">
              <Zap className="w-4 h-4 fill-primary animate-pulse" />
              <span>Unlimited Gas-Sponsored Transactions</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-[0.95] lg:max-w-xl">
              The Wallet <span className="text-gradient">Without</span> Gas.
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
              Next-gen non-custodial wallet powered by ERC-7702. Truly zero gas, biometric security, and atomic execution.
            </p>
            <div className="space-y-8 max-w-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary text-secondary-foreground border-input h-14 rounded-2xl focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary/50 text-lg transition-all"
                  />
                  <Button type="submit" disabled={loading} className="h-14 px-8 rounded-2xl text-lg font-bold group shadow-glow active:scale-95 transition-transform bg-primary text-primary-foreground hover:bg-primary/90">
                    {loading ? "..." : "Get Access"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="space-y-4 p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Preferred Platform</Label>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    {PLATFORMS.map((p) => (
                      <div key={p} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handlePlatformChange(p, !platforms.includes(p))}>
                        <Checkbox
                          id={`platform-${p}`}
                          checked={platforms.includes(p)}
                          onCheckedChange={(checked) => handlePlatformChange(p, !!checked)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md border-zinc-700 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Label
                          htmlFor={`platform-${p}`}
                          className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer select-none"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {p}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
              <div className="flex items-center gap-3">
                {isCountLoading ? (
                  <div className="h-6 w-32 bg-zinc-800/50 rounded-full animate-pulse" />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2.5 py-1 px-4 rounded-full bg-zinc-900 border border-zinc-800 text-sm"
                  >
                    <div className="flex -space-x-2 relative">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden">
                           <div className="w-full h-full bg-gradient-to-br from-primary/40 to-zinc-700" />
                        </div>
                      ))}
                      <motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                      />
                    </div>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{count?.toLocaleString() || 0}</strong> pioneers waiting
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative perspective-1000 hidden lg:flex justify-center"
          >
            <motion.div
              whileHover={{ rotateY: -10, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative w-[320px] h-[640px] bg-zinc-950 rounded-[3.5rem] border-[12px] border-zinc-900 shadow-2xl overflow-hidden ring-1 ring-white/10"
            >
              <div className="absolute top-0 w-full h-10 bg-black/50 flex justify-center items-center z-20">
                <div className="w-20 h-5 bg-zinc-900 rounded-full" />
              </div>
              <div className="p-8 pt-16 space-y-8 bg-gradient-to-b from-zinc-950 to-zinc-900 h-full">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center shadow-glow">
                  <Wallet2 className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-20 bg-zinc-800 rounded-full opacity-50" />
                  <div className="h-10 w-44 bg-zinc-800 rounded-xl" />
                </div>
                <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-5 backdrop-blur-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Gas Fee</span>
                    <motion.div
                      animate={{
                        opacity: [1, 0.4, 1],
                        scale: [1, 1.1, 1],
                        backgroundColor: ["rgba(34,197,94,0.1)", "rgba(34,197,94,0.3)", "rgba(34,197,94,0.1)"]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="px-3 py-1 rounded-full text-green-400 text-xs font-black shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center gap-1.5"
                    >
                      <Zap className="w-2.5 h-2.5 fill-green-400" />
                      $0.00
                    </motion.div>
                  </div>
                  <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                      className="h-full bg-gradient-to-r from-primary to-orange-400 shadow-glow"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-28 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-end p-4">
                    <div className="h-2 w-10 bg-zinc-800 rounded-full" />
                  </div>
                  <div className="h-28 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-end p-4">
                    <div className="h-2 w-10 bg-zinc-800 rounded-full" />
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 top-1/4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-2xl z-30"
              >
                <ShieldCheck className="w-7 h-7 text-primary" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-10 bottom-1/4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-2xl z-30"
              >
                <Globe className="w-7 h-7 text-primary" />
              </motion.div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-primary/5 to-transparent -z-10" />
    </section>
  );
}