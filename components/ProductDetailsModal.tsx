import React, { useEffect, useState } from 'react';
import { X, ShoppingCart, ShieldCheck, Zap, Star, Check, Globe, Server, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onOpenCart: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose, onOpenCart }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    onClose();
    onOpenCart();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-vault-dark/90 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-vault-card border border-vault-border rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-black/50 hover:bg-vault-neon/20 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/10 hover:border-vault-neon/50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image */}
        <div className="relative w-full md:w-5/12 h-48 sm:h-64 md:h-auto shrink-0 group bg-vault-dark">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover filter brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vault-card via-transparent to-transparent opacity-100 md:bg-gradient-to-r md:from-transparent md:to-vault-card"></div>
          
          {/* Status Badge overlay */}
          <div className="absolute top-4 left-4 z-20">
             {product.inStock ? (
               <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/50 text-emerald-400 rounded-md text-[10px] sm:text-xs font-mono font-bold shadow-lg">
                 <Zap className="w-3 h-3 fill-current" /> INSTANT DELIVERY
               </span>
             ) : (
               <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 backdrop-blur-xl border border-red-500/50 text-red-400 rounded-md text-[10px] sm:text-xs font-mono font-bold">
                 OUT OF STOCK
               </span>
             )}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col bg-vault-card/95 backdrop-blur-sm relative overflow-y-auto custom-scrollbar">
          {/* Scanline decoration */}
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-vault-neon to-transparent opacity-50 pointer-events-none"></div>

          <div className="p-5 sm:p-8">
            <div className="mb-1">
               <span className="text-vault-neon text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-2 block">
                  {product.category} ACCESS // ID: {product.id.padStart(4, '0')}
               </span>
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 leading-tight">
                 {product.name}
               </h2>
               
               <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 mb-6">
                  <div className="flex items-center gap-1 text-vault-accent">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'}`} />
                     ))}
                     <span className="ml-1 text-white font-bold">{product.rating}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span>{product.reviews} verified reviews</span>
               </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 border-l-2 border-vault-neon/30 pl-4">
               {product.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-vault-dark/50 border border-vault-border/50">
                  <Check className="w-4 h-4 text-vault-neon shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price & Action */}
            <div className="mt-auto pt-6 border-t border-vault-border/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-6 justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-mono tracking-wider">Total Price</span>
                <span className="text-3xl sm:text-4xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  ${product.price}
                </span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto flex-1">
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdded}
                  className={`flex-1 px-4 py-3.5 rounded-md font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 ${
                    product.inStock 
                      ? isAdded
                        ? 'bg-white text-vault-dark'
                        : 'bg-vault-card border border-vault-border text-white hover:border-vault-neon hover:text-vault-neon' 
                      : 'bg-vault-border text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button 
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className={`flex-1 px-4 py-3.5 rounded-md font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    product.inStock 
                      ? 'bg-vault-neon text-vault-dark hover:bg-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:-translate-y-1' 
                      : 'bg-vault-border text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Buy Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Trust Footers */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-y-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
               <div className="flex items-center gap-1.5">
                 <Globe className="w-3 h-3" /> <span className="hidden sm:inline">Global Activation</span><span className="sm:hidden">Global</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <Server className="w-3 h-3" /> <span className="hidden sm:inline">Secure Handover</span><span className="sm:hidden">Secure</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <ShieldCheck className="w-3 h-3" /> Warranty
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};