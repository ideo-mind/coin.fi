import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
const API_URL = 'https://script.google.com/macros/s/AKfycbxxQ7TN7qwyvKey9IIpTFEtrAW-Tfw6IwnViwUK5Qmh70oj8Gg0ajdx_eevACl3gt31/exec';
const PLATFORMS = ['iOS', 'Android', 'Chrome Extension', 'Web App'];
export function Hero() {
  const [email, setEmail] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(PLATFORMS);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(true);
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: buttonRef, inView: buttonInView } = useInView({
    threshold: 0,
  });
  const fetchCount = async (signal?: AbortSignal) => {
    setIsCountLoading(true);
    try {
      const res = await fetch(API_URL, { 
        signal,
        mode: 'cors',
        credentials: 'omit'
      });
      if (res.ok) {
        const text = await res.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch (e) {
          // If response isn't pure JSON, we don't treat it as a critical failure
          return;
        }
        const pioneerCount = json?.count ?? json?.data?.count ?? json?.data?.total ?? json?.total ?? 0;
        if (typeof pioneerCount === 'number' || !isNaN(Number(pioneerCount))) {
          setCount(Number(pioneerCount));
        }
      }
    } catch (err) {
      // Suppress logs for abort errors or common network hiccups to keep console clean
      if (err instanceof Error && err.name !== 'AbortError') {
        // Fallback to 0 if we can't fetch, but don't show an error toast to users
        setCount(0);
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
    if (!email) return toast.error("Email address is required to proceed.");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Please enter a valid email address.");
    if (platforms.length === 0) return toast.error("Please select at least one platform.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('platforms', JSON.stringify(platforms));
      // Use no-cors for POST to handle Google Apps Script redirection behavior
      await fetch(API_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      toast.success("Welcome pioneer! You're on the list.");
      setEmail('');
      // Re-fetch count after a small delay to allow for backend processing
      setTimeout(() => fetchCount(), 2500);
    } catch (err) {
      console.error('[WAITLIST SUBMIT ERROR]', err);
      toast.error("Could not connect to the waitlist service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };
  return (
    <section id="waitlist" ref={sectionRef} className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest shadow-glow self-start">
              <Zap className="w-3.5 h-3.5 fill-primary animate-pulse shrink-0" />
              <span className="leading-none">Unlimited Gas Sponsorship</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-white">
              Wallet <span className="text-gradient">Zero</span> Gas.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
              Next-gen non-custodial wallet powered by ERC-7702. Truly zero gas, biometric security, and atomic execution.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div className="flex flex-col sm:flex-row gap-3" ref={buttonRef}>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus-visible:ring-primary text-lg"
                  disabled={loading}
                />
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="h-14 px-8 rounded-2xl text-lg font-bold shadow-glow bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95"
                >
                  {loading ? "..." : "Access"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  {PLATFORMS.map((p) => (
                    <div key={p} className="flex items-center space-x-3 group">
                      <Checkbox
                        id={`p-${p.replace(/\s+/g, '-').toLowerCase()}`}
                        checked={platforms.includes(p)}
                        onCheckedChange={() => togglePlatform(p)}
                        className="data-[state=checked]:bg-primary"
                        disabled={loading}
                      />
                      <Label
                        htmlFor={`p-${p.replace(/\s+/g, '-').toLowerCase()}`}
                        className="text-sm font-medium text-muted-foreground group-hover:text-foreground cursor-pointer flex-1 py-1"
                      >
                        {p}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <div className="flex items-center gap-3 min-h-[24px]">
              {isCountLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Waitlist count loading...</span>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-950 bg-gradient-brand shadow-glow" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{(count ?? 0).toLocaleString()}</strong> pioneers joined
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex justify-center perspective-1000"
          >
            <motion.div
              whileHover={{ rotateY: -10, rotateX: 5 }}
              className="relative w-[300px] h-[600px] bg-zinc-950 rounded-[3rem] border-[10px] border-zinc-900 shadow-2xl overflow-hidden ring-1 ring-white/10"
            >
              <div className="p-8 pt-16 space-y-10 bg-gradient-to-b from-zinc-950 to-zinc-900 h-full">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center shadow-glow shadow-primary/10 overflow-hidden">
                  <img
                    src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/icon/btc.png"
                    alt="Coin Fi App"
                    className="w-10 h-10 object-contain brightness-110"
                  />
                </div>
                <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Gas Cost</span>
                    <div className="px-3 py-1 rounded-full text-primary text-xs font-black shadow-glow flex items-center gap-1.5 animate-pulseGlow">
                      $0.00
                    </div>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-gradient-brand shadow-glow"
                    />
                  </div>
                </div>
              </div>
              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ duration: 4, repeat: Infinity }} 
                className="absolute -right-6 top-1/4 bg-zinc-900/90 p-4 rounded-2xl border border-white/10 shadow-glow"
              >
                <ShieldCheck className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
      <div className="hidden" data-cta-visible={buttonInView} id="hero-cta-trigger" />
    </section>
  );
}