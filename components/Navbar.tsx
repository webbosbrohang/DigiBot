import React, { useState } from 'react';
import { Menu, X, Shield, Send, ExternalLink, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Browse', href: '#browse' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-vault-border/50 bg-vault-dark/80 backdrop-blur-xl supports-[backdrop-filter]:bg-vault-dark/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-vault-neon blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <Shield className="h-8 w-8 text-vault-neon relative z-10" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-vault-glow transition-colors">
              DIGI<span className="text-vault-neon">BOT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-400 hover:text-vault-neon transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-vault-neon transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_#3B82F6]"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onOpenCart}
                className="relative p-2 text-slate-400 hover:text-white transition-colors group"
              >
                <ShoppingCart className="w-6 h-6 group-hover:text-vault-neon transition-colors" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-vault-neon text-[10px] font-bold text-vault-dark border-2 border-vault-dark">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <a
                href="https://t.me/messagebotkhbot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-vault-neon/10 hover:bg-vault-neon/20 border border-vault-neon/50 text-vault-neon px-5 py-2.5 rounded-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group"
              >
                <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Join Telegram Channel</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-slate-400 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-vault-neon text-[10px] font-bold text-vault-dark">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-vault-border bg-vault-dark/95 backdrop-blur-xl absolute w-full h-screen z-50">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-slate-300 hover:bg-vault-neon/10 hover:text-vault-neon border-l-2 border-transparent hover:border-vault-neon transition-all"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 pb-2">
              <a
                href="https://t.me/messagebotkhbot"
                target="_blank"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-vault-neon text-vault-dark font-bold px-4 py-3 hover:bg-vault-glow transition-colors"
              >
                <Send className="w-5 h-5" />
                Join Telegram Channel
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};