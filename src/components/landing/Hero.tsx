import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Zap, ArrowRight, RefreshCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwMAvL5Eyhbfs9aoyUhKi2RZvNXvkYXTxXtxDQ7LlpbrL5XuD3jv1j92lXHFRx6G5Dk/exec';
const PLATFORMS = ['iOS', 'Android', 'Chrome Extension', 'Web App'];
const FALLBACK_COUNT = 12540;
export function Hero() {
  const [email, setEmail] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [isCountLoading, setIsCountLoading] = useState(true);
  const countRef = useRef<number | null>(null);
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: buttonRef, inView: buttonInView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    if (isIOS) {
      setPlatforms(['iOS']);
    } else if (isAndroid) {
      setPlatforms(['Android']);
    } else {
      setPlatforms([]);
    }
  }, []);
  const fetchCount = useCallback(async (signal?: AbortSignal) => {
    if (countRef.current === null) {
      setIsCountLoading(true);
    }
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), 8000);
    const activeSignal = signal || timeoutController.signal;
    try {
      const res = await fetch(API_URL, {
        signal: activeSignal,
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      let pioneerCount: number | null = null;
      try {
        const json = JSON.parse(text);
        pioneerCount = Number(json?.count ?? json?.data?.count ?? json?.total ?? json?.data);
      } catch {
        const num = parseInt(text.trim());
        if (!isNaN(num)) pioneerCount = num;
      }
      if (pioneerCount && !isNaN(pioneerCount)) {
        setCount(pioneerCount);
        countRef.current = pioneerCount;
      } else if (countRef.current === null) {
        setCount(FALLBACK_COUNT);
        countRef.current = FALLBACK_COUNT;
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        if (countRef.current === null) {
          setCount(FALLBACK_COUNT);
          countRef.current = FALLBACK_COUNT;
        }
      }
    } finally {
      clearTimeout(timeoutId);
      setIsCountLoading(false);
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    fetchCount(controller.signal);
    return () => controller.abort();
  }, [fetchCount]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Please enter a valid email address.");
    }
    if (platforms.length === 0) {
      return toast.error("Please select at least one platform.");
    }
    setLoading(true);
    const toastId = toast.loading("Reserving your spot in the future of DeFi...");
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          email: email.trim(),
          platforms: platforms.join(', '),
          source: 'landing_hero',
          timestamp: new Date().toISOString()
        })
      });
      const text = await response.text();
      const logData = {
        url: API_URL,
        method: 'POST',
        status: response.status,
        statusText: response.statusText,
        headersPreview: Object.fromEntries([...Array.from(response.headers.entries()).slice(0, 10)]),
        bodyPreview: text.slice(0, 200)
      };
      if (!response.ok) {
        console.error('[Hero] Waitlist HTTP error:', logData);
        toast.error(`Server error (${response.status}). Please try again.`, { id: toastId });
        return;
      }
      let parsed: any;
      try {
        parsed = JSON.parse(text);
      } catch {/* Non-JSON 200 responses treated as success (GAS tolerant) */}
      if (parsed?.error) {
        console.error('[Hero] Waitlist GAS error:', { ...logData, parsedError: parsed.error });
        toast.error(
          typeof parsed.error === 'string' && parsed.error 
            ? parsed.error 
            : 'Server rejected submission. Please try again.',
          { id: toastId }
        );
        return;
      }
      toast.success("Welcome aboard! You're officially on the list.", { id: toastId });
      setEmail('');
      setTimeout(() => fetchCount(), 2000);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('[Hero] Waitlist network error:', { 
          url: API_URL, 
          method: 'POST', 
          timestamp: new Date().toISOString(), 
          error: { 
            name: err.name, 
            message: err.message, 
            stack: err.stack 
          } 
        });
        toast.error('Connectivity issue. We\'ve noted your request—please try again later.', {
          id: toastId,
          icon: <AlertCircle className="w-5 h-5 text-destructive" />
        });
      }
    } finally {
      setLoading(false);
    }
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
              <span>Unlimited Gas Sponsorship</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-white">
                Wallet <span className="text-gradient">Zero</span> Gas.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                Proprietary bundler technology. Biometric security. Truly gasless transactions for the next billion users.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div className="flex flex-col sm:flex-row gap-3" ref={buttonRef}>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus-visible:ring-primary text-lg"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-14 px-8 rounded-2xl text-lg font-bold shadow-glow bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95 shrink-0 whitespace-nowrap"
                >
                  {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : "Early Access"}
                  {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </div>
              <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  {PLATFORMS.map((p) => (
                    <div key={p} className="flex items-center space-x-3 group">
                      <Checkbox
                        id={`p-${p.replace(/\s+/g, '-').toLowerCase()}`}
                        checked={platforms.includes(p)}
                        onCheckedChange={(checked) => {
                          setPlatforms(prev => checked ? [...prev, p] : prev.filter(x => x !== p));
                        }}
                        className="data-[state=checked]:bg-primary shrink-0"
                      />
                      <Label
                        htmlFor={`p-${p.replace(/\s+/g, '-').toLowerCase()}`}
                        className="text-sm font-medium text-muted-foreground group-hover:text-foreground cursor-pointer flex-1 py-1 truncate"
                      >
                        {p}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <div className="flex items-center gap-3 pt-4 min-h-[44px]">
              <AnimatePresence mode="wait">
                {isCountLoading && !count ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 w-64"
                  >
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin shrink-0" />
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Verifying network...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="count"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 w-full max-w-xs"
                  >
                    <div className="flex -space-x-2 shrink-0">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-gradient-brand shadow-glow ring-1 ring-white/10" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      <strong className="text-foreground font-black">{(count ?? FALLBACK_COUNT).toLocaleString()}</strong> pioneers joined
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
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
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-2xl bg-[#f38020] flex items-center justify-center shadow-glow shadow-[#f38020]/40 ring-1 ring-white/20">
                    <img
                      src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/icon/btc.png"
                      alt="Coin Fi"
                      className="w-10 h-10 brightness-0"
                    />
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Gas Cost</span>
                    <div className="px-3 py-1 rounded-full text-primary text-xs font-black shadow-glow animate-pulse">
                      $0.00
                    </div>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-gradient-brand"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
      <div className="hidden" data-cta-visible={buttonInView} id="hero-cta-trigger" />
    </section>
  );
}