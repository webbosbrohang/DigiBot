import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-12 h-12 rounded-lg bg-vault-card/90 border border-vault-neon/30 text-vault-neon shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-vault-neon hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 bg-vault-neon/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <ArrowUp className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
      </button>
    </div>
  );
};