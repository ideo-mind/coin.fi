import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const plans = [
  {
    name: "Free Forever",
    price: "$0",
    desc: "Perfect for casual DeFi users and newcomers.",
    features: ["Unlimited Free Swaps", "Sponsored Gas (L2s)", "Passkey Security", "Basic AI Scan"],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$9.99",
    sub: "/ month",
    desc: "For power users who want maximum speed and safety.",
    features: ["All Free features", "Priority Bundler Speed", "Mainnet Gas Sponsorship", "Advanced Threat Intel", "MEV Protection"],
    cta: "Go Pro",
    popular: true
  }
];
const faqs = [
  { q: "How can it be 0 gas?", a: "We use Account Abstraction (ERC-4337) where our bundler fleet pays the gas fee on your behalf. For our Free plan, we partner with protocols to sponsor these fees." },
  { q: "Is it non-custodial?", a: "Absolutely. Coin Fi never has access to your keys. Your funds are secured by smart contracts and device-level biometrics (Passkeys)." },
  { q: "Which chains are supported?", a: "We currently support Ethereum Mainnet, Polygon, Arbitrum, Optimism, Base, and Avalanche, with more being added weekly." },
  { q: "What happens if I lose my phone?", a: "Coin Fi supports social recovery and multi-device sync. You can authorize a new device using your recovery partners or secondary devices." }
];
export function PricingAndFAQ() {
  return (
    <div className="py-24 space-y-32">
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black">Simple, Transparent <span className="text-gradient">Pricing</span></h2>
          <p className="text-muted-foreground font-medium text-lg">Choose the plan that fits your journey into web3.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-8 rounded-4xl border transition-all duration-300",
                plan.popular
                  ? "border-primary/50 bg-primary/5 shadow-glow-lg scale-105 z-10"
                  : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black tracking-widest uppercase shadow-glow">
                  Most Popular
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                  {plan.sub && <span className="text-muted-foreground font-medium">{plan.sub}</span>}
                </div>
                <ul className="space-y-4 pt-4 border-t border-zinc-800/50">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "w-full h-14 text-lg font-bold rounded-2xl transition-all active:scale-95",
                    plan.popular ? "btn-gradient border-none" : "bg-transparent border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-white"
                  )}
                  asChild
                >
                  <a href="#waitlist">{plan.cta}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="text-3xl sm:text-4xl font-black text-center">Frequently Asked <span className="text-gradient">Questions</span></h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-zinc-800/50 bg-zinc-900/10 rounded-3xl px-6 transition-colors hover:bg-zinc-900/20">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-all hover:no-underline py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 font-medium text-base leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}