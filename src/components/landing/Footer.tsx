import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#f38020] p-1 rounded-lg shadow-glow shadow-[#f38020]/20 overflow-hidden shrink-0">
                <img
                  src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/icon/btc.png"
                  alt="Coin Fi"
                  className="w-6 h-6 object-contain brightness-110"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">Coin Fi</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Making web3 accessible to everyone through gasless transactions
              and hardware-grade security.
            </p>
            <div className="flex gap-4">
              <a
                href="/"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold">Product</h5>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li>
                <a href="#tech" className="hover:text-white transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="hover:text-white transition-colors"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold">Developers</h5>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Bundler API
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Open Source
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Grants
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold">Enterprise</h5>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                Contact Sales
              </p>
              <p className="text-sm text-zinc-300">
                Need custom sponsorship for your dApp?
              </p>
              <a
                href="mailto:sales@coinfi.io"
                className="text-sm text-primary font-bold hover:underline"
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© 2025 Coin Fi Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
