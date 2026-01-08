import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { TechExplainer } from '@/components/landing/TechExplainer';
import { SecurityScan } from '@/components/landing/SecurityScan';
import { PricingAndFAQ } from '@/components/landing/PricingAndFAQ';
import { Footer } from '@/components/landing/Footer';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
      {/* Background Mesh/Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full opacity-30" />
      </div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechExplainer />
        <SecurityScan />
        <PricingAndFAQ />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}