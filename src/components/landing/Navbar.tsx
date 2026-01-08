import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Technology', href: '#tech' },
    { name: 'Security', href: '#security' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];
  const handleMobileLinkClick = () => {
    setOpen(false);
  };
  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled ? "bg-background/80 backdrop-blur-md border-zinc-800 py-3" : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1 rounded-lg shadow-glow overflow-hidden shrink-0">
            <img
              src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/icon/btc.png"
              alt="Coin Fi"
              className="w-8 h-8 object-contain brightness-0"
            />
          </div>
          <span className="text-xl font-black tracking-tight text-white">Coin Fi</span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold text-zinc-400 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button size="sm" className="font-bold rounded-xl px-6 shadow-glow transition-transform active:scale-95" asChild>
            <a href="#waitlist">Join Waitlist</a>
          </Button>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-900">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-zinc-950 border-zinc-800">
              <div className="flex flex-col gap-8 mt-12">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={handleMobileLinkClick}
                    className="text-2xl font-black text-white hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  className="w-full h-14 text-lg font-black rounded-2xl mt-4 shadow-glow" 
                  onClick={handleMobileLinkClick}
                  asChild
                >
                  <a href="#waitlist">Join Waitlist</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}