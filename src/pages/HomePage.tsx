import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { MobileCTA } from "@/components/landing/MobileCTA";
import { Navbar } from "@/components/landing/Navbar";
import { PricingAndFAQ } from "@/components/landing/PricingAndFAQ";
import { SecurityScan } from "@/components/landing/SecurityScan";
import { TechExplainer } from "@/components/landing/TechExplainer";
import { Toaster } from "@/components/ui/sonner";
export function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
      {/* Background Mesh/Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full opacity-30" />
      </div>
      <Navbar />
      <main className="relative">
        <div className="space-y-16 md:space-y-24 lg:space-y-32 pb-16 md:pb-24 lg:pb-32">
          {/* Hero section handles its own max-width and internal spacing */}
          <Hero />
          {/* Component manages its own spacing and nested containers */}
          <Features />
          {/* TechExplainer spans full width with internal gutters */}
          <TechExplainer />
          {/* SecurityScan and PricingAndFAQ follow standard gutter patterns internally */}
          <SecurityScan />
          <PricingAndFAQ />
        </div>
      </main>
      <Footer />
      {/* Sticky Bottom CTA for Mobile */}
      <MobileCTA />
      <Toaster position="top-center" richColors />
    </div>
  );
}
