import React from 'react';
import { ArrowRight, Lock, Unlock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 flex flex-col items-center text-center">
      
      {/* Abstract Tech Patterns / Grid Background localized to Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-vault-neon/10 via-transparent to-transparent opacity-40 blur-3xl" />
        {/* Horizontal scanline animation */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vault-neon/10 border border-vault-neon/20 text-vault-neon text-xs font-mono tracking-wider mb-8 animate-pulse-slow">
        <span className="w-2 h-2 rounded-full bg-vault-neon animate-ping" />
        SYSTEM ONLINE v3.1.0
      </div>

      <h1 className="max-w-4xl text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-2xl">
        Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-neon to-vault-accent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">DigiBot</span> to <br className="hidden md:block" />
        Premium Tools
      </h1>

      <p className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
        Instant access to top-tier creative software, streaming subscriptions, and digital utilities. 
        Elevate your workflow and entertainment at a fraction of the cost.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button className="group relative px-8 py-4 bg-vault-neon text-vault-dark font-bold font-display tracking-wide uppercase overflow-hidden rounded-sm hover:shadow-[0_0_30px_rgba(96,165,250,0.4)] transition-all duration-300">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
          <span className="relative flex items-center justify-center gap-2">
            View Catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        
        <button className="px-8 py-4 bg-transparent border border-vault-border text-slate-300 font-display font-medium tracking-wide uppercase rounded-sm hover:border-vault-neon hover:text-white hover:bg-vault-neon/5 transition-all duration-300 backdrop-blur-sm">
          Lifetime Warranty
        </button>
      </div>

      {/* Stats or Trust Indicators */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/5 pt-8">
        {[
          { label: 'Product Uptime', value: '99.9%' },
          { label: 'Instant Delivery', value: '< 1min' },
          { label: 'Active Subs', value: '150k+' },
          { label: 'Savings', value: 'UP TO 80%' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-2xl font-mono font-bold text-white mb-1">{stat.value}</span>
            <span className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};