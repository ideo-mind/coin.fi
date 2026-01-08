import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Wallet2, Zap, ShieldCheck, Globe, Users } from 'lucide-react';
import { toast } from 'sonner';
const API_URL = '/api/waitlist';
const PLATFORMS = ['iOS', 'Android', 'Chrome Extension', 'Web App'];
export function Hero() {
  const [email, setEmail] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(true);
  const fetchCount = async (signal?: AbortSignal) => {
    try {
      const res = await fetch(API_URL, { signal });
      if (res.ok) {
        const json = await res.json();
        setCount(json.data?.count ?? 0);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Failed to fetch waitlist count', err);
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
  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(i => i !== p) : [...prev, p]);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('platforms', JSON.stringify(platforms));
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        toast.success("Welcome to the future of gasless web3!");
        setEmail('');
        setPlatforms([]);
        fetchCount();
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="waitlist" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Zap className="w-4 h-4 fill-primary" />
              <span>Unlimited Gas-Sponsored Transactions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              The First <span className="text-gradient">Gas-Free</span> EVM Wallet.
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Proprietary bundler technology powered by ERC-7702 and ERC-4337. Secure, non-custodial, and truly zero gas.
            </p>
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary/50 border-input h-12"
                  />
                  <Button type="submit" disabled={loading} className="h-12 px-8">
                    {loading ? "Joining..." : "Join Early Access"}
                  </Button>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground/80">Select your platforms</Label>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3">
                    {PLATFORMS.map((p) => (
                      <div key={p} className="flex items-center space-x-2 group cursor-pointer" onClick={() => togglePlatform(p)}>
                        <Checkbox 
                          id={`platform-${p}`} 
                          checked={platforms.includes(p)} 
                          onCheckedChange={() => togglePlatform(p)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Label 
                          htmlFor={`platform-${p}`} 
                          className="text-sm text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer select-none"
                        >
                          {p}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
              <div className="min-h-[24px]">
                {isCountLoading ? (
                  <div className="flex items-center gap-2 animate-pulse">
                    <div className="w-4 h-4 rounded-full bg-muted" />
                    <div className="h-3 w-32 bg-muted rounded" />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Users className="w-4 h-4 text-primary" />
                    <span>
                      Already <span className="text-foreground font-bold">{count?.toLocaleString() || '0'}</span> pioneers on the waitlist!
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-[300px] h-[600px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 w-full h-8 bg-black/40 flex justify-center items-center">
                <div className="w-16 h-4 bg-zinc-800 rounded-full" />
              </div>
              <div className="p-6 pt-12 space-y-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Wallet2 className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-zinc-800 rounded" />
                  <div className="h-8 w-40 bg-zinc-700 rounded" />
                </div>
                <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-500">Transaction Fee</span>
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold"
                    >
                      Gas: 0
                    </motion.span>
                  </div>
                  <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-20 rounded-xl bg-zinc-800/30 border border-zinc-700/50" />
                  <div className="h-20 rounded-xl bg-zinc-800/30 border border-zinc-700/50" />
                </div>
              </div>
              <div className="absolute -right-8 top-1/4 bg-background border p-3 rounded-2xl shadow-xl floating">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -left-12 bottom-1/4 bg-background border p-3 rounded-2xl shadow-xl floating" style={{ animationDelay: '1s' }}>
                <Globe className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}