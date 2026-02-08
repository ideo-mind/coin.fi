import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "Technology", href: "#tech" },
    { name: "Security", href: "#security" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];
  const handleMobileLinkClick = () => {
    setOpen(false);
  };
  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b will-change-transform",
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-zinc-800/60 py-3 shadow-glass"
          : "bg-transparent border-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-3 group cursor-pointer bg-transparent border-none p-0"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="/logo-full.png"
            alt="CoinFi"
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-zinc-400 hover:text-primary transition-all duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="font-bold rounded-xl px-4 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            asChild
          >
            <a
              href="https://app.coinfi.ideomind.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Web App
            </a>
          </Button>
          <Button
            size="sm"
            className="font-bold rounded-xl px-6 shadow-glow transition-all active:scale-95 hover:scale-105"
            asChild
          >
            <a href="#waitlist">Join Waitlist</a>
          </Button>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-zinc-900 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-zinc-950 border-zinc-800 p-8 flex flex-col shadow-2xl"
            >
              <div className="flex flex-col gap-6 mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src="/logo-full.png"
                    alt="CoinFi"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleMobileLinkClick}
                    className="text-2xl font-black text-zinc-100 hover:text-primary transition-all border-b border-zinc-900/50 pb-4 flex items-center justify-between group"
                  >
                    {link.name}
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </a>
                ))}
                <Button
                  className="w-full h-14 text-lg font-black rounded-2xl mt-8 shadow-glow transition-transform active:scale-95"
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
