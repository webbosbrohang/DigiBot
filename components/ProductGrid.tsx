import React, { useState, useEffect } from 'react';
import { Box, Lock, RefreshCw, ShoppingCart, Star, Zap, ShieldCheck, Eye, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductDetailsModal } from './ProductDetailsModal';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

interface ProductGridProps {
  searchQuery: string;
  filter: string;
  onOpenCart: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery, filter, onOpenCart }) => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  // Simulate async fetching/filtering
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const results = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All' || product.category === filter;
        return matchesSearch && matchesFilter;
      });
      setFilteredProducts(results);
      setIsLoading(false);
    }, 600); // 600ms delay for effect

    return () => clearTimeout(timer);
  }, [searchQuery, filter, products]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-vault-card border border-vault-border rounded-xl overflow-hidden h-[400px] flex flex-col animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 bg-slate-800/40 w-full relative">
               <div className="absolute top-3 right-3 w-16 h-6 bg-slate-700/50 rounded" />
               <div className="absolute top-3 left-3 w-16 h-6 bg-slate-700/50 rounded" />
            </div>
            
            {/* Content Skeleton */}
            <div className="p-5 flex flex-col flex-1">
              {/* Title */}
              <div className="h-7 bg-slate-800/50 rounded w-3/4 mb-3" />
              {/* Rating */}
              <div className="h-4 bg-slate-800/50 rounded w-1/3 mb-auto" />
              
              {/* Bottom Row */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/50">
                <div className="flex flex-col gap-2">
                   <div className="h-3 bg-slate-800/50 rounded w-10" />
                   <div className="h-8 bg-slate-800/50 rounded w-20" />
                </div>
                <div className="w-10 h-10 bg-slate-800/50 rounded-lg" />
              </div>
              
              {/* Warranty text */}
              <div className="mt-4 h-3 bg-slate-800/30 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
        {/* Empty State Card Container */}
        <div className="relative w-full max-w-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-vault-neon/5 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="relative bg-vault-card/50 border border-vault-border/50 backdrop-blur-md rounded-2xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 bg-[linear-gradient(transparent_0%,#3B82F6_50%,transparent_100%)] bg-[length:100%_200%] animate-scan"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-vault-dark border-2 border-vault-border rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] group relative">
                <div className="absolute inset-0 bg-vault-neon/10 rounded-2xl animate-pulse"></div>
                <Box className="w-10 h-10 text-slate-600 group-hover:text-vault-neon transition-colors duration-500" />
                <div className="absolute -bottom-2 -right-2 bg-vault-dark border border-vault-border p-1.5 rounded-full text-vault-accent">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">Database Empty</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                {searchQuery 
                  ? `No results found for "${searchQuery}" in ${filter}.` 
                  : "No items available matching your criteria."}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-6 py-2.5 bg-vault-border/50 hover:bg-vault-border text-slate-300 rounded-md transition-all text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group relative bg-vault-card border border-vault-border rounded-xl overflow-hidden hover:border-vault-neon/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-2 cursor-pointer opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
               {/* Image */}
               <img 
                 src={product.image} 
                 alt={product.name}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
               />
               
               {/* Overlay Gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-vault-card via-transparent to-transparent opacity-90" />

               {/* Quick View Overlay Button */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-[2px] bg-black/20">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-vault-card/90 border border-vault-neon text-vault-neon font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-vault-neon hover:text-vault-dark transition-all transform translate-y-4 group-hover:translate-y-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  >
                    <Eye className="w-4 h-4" />
                    Quick View
                  </button>
               </div>
               
               {/* Category Badge */}
               <div className="absolute top-3 left-3 z-10">
                 <span className="px-2 py-1 bg-vault-dark/80 backdrop-blur border border-vault-border text-xs font-mono font-bold text-vault-neon rounded uppercase tracking-wider">
                   {product.category}
                 </span>
               </div>

               {/* Status Badge */}
               <div className="absolute top-3 right-3 z-10">
                  {product.inStock ? (
                    <span className="flex items-center gap-1 px-2 py-1 bg-emerald-950/80 backdrop-blur border border-emerald-900 text-xs font-mono text-emerald-400 rounded">
                      <Zap className="w-3 h-3" /> INSTANT
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-950/80 backdrop-blur border border-red-900 text-xs font-mono text-red-400 rounded">
                      SOLD OUT
                    </span>
                  )}
               </div>
            </div>

            {/* Content Section */}
            <div className="p-5 relative h-[208px] flex flex-col">
              {/* Decorative line */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-vault-neon group-hover:w-full transition-all duration-700"></div>

              <div className="mb-auto">
                <h3 className="font-display font-bold text-xl text-white group-hover:text-vault-neon transition-colors truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-vault-accent">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'}`} />
                     ))}
                  </div>
                  <span className="text-xs text-slate-500 font-mono">({product.rating})</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-0.5">Price</span>
                  <span className="text-2xl font-display font-bold text-white group-hover:text-shadow-glow transition-all">
                    ${product.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product.inStock) addToCart(product);
                    }}
                    disabled={!product.inStock}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                      product.inStock 
                        ? 'bg-vault-card border border-vault-border text-slate-400 hover:text-white hover:border-vault-neon hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                        : 'bg-vault-dark/50 border border-vault-border text-slate-700 cursor-not-allowed'
                    }`}
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>

                  <button
                     onClick={(e) => {
                       e.stopPropagation();
                       if (product.inStock) {
                         addToCart(product);
                         onOpenCart();
                       }
                     }}
                     disabled={!product.inStock}
                     className={`h-10 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1 ${
                       product.inStock
                        ? 'bg-vault-neon text-vault-dark hover:bg-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : 'bg-vault-border text-slate-600 cursor-not-allowed'
                     }`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
              
              {/* Trust badge */}
              <div className="mt-4 pt-4 border-t border-vault-border/50 flex items-center gap-2 text-slate-500">
                 <ShieldCheck className="w-3 h-3 text-vault-accent" />
                 <span className="text-xs font-mono">Verified • Lifetime Warranty</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onOpenCart={onOpenCart}
        />
      )}
    </>
  );
};