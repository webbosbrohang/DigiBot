import React from 'react';
import { Shield, Twitter, Github, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-vault-border/50 bg-vault-dark mt-auto relative z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-slate-600" />
            <span className="font-display font-bold text-lg text-slate-500">
              DIGI<span className="text-slate-700">BOT</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-vault-neon transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-vault-neon transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-vault-neon transition-colors">Support</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-vault-card border border-vault-border rounded-full text-slate-400 hover:text-white hover:border-vault-neon hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-vault-card border border-vault-border rounded-full text-slate-400 hover:text-white hover:border-vault-neon hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-vault-card border border-vault-border rounded-full text-slate-400 hover:text-white hover:border-vault-neon hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-700 font-mono">
          © {new Date().getFullYear()} DIGIBOT. ALL RIGHTS RESERVED. SYSTEM SECURE.
        </div>
      </div>
    </footer>
  );
};