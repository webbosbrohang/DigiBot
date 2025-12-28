import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  categories: string[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'CapCut Pro (1 Year)',
    category: 'Video',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    inStock: true,
    description: 'Unlock the full potential of your video editing with CapCut Pro. Get access to premium effects, cloud storage, and advanced AI features for a full year. Perfect for TikTok and Reels creators.',
    features: ['1 Year Subscription', 'No Watermark', 'Premium Effects & Filters', '100GB Cloud Storage'],
    rating: 4.9,
    reviews: 342
  },
  {
    id: '2',
    name: 'Adobe Creative Cloud',
    category: 'Design',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?auto=format&fit=crop&q=80&w=800',
    inStock: true,
    description: 'Get full access to the entire Adobe Creative Cloud suite including Photoshop, Illustrator, Premiere Pro, and more. This is a private account with your own email.',
    features: ['All Apps Included', '100GB Cloud Storage', 'Private Account', 'Supports Updates'],
    rating: 4.8,
    reviews: 890
  },
  {
    id: '3',
    name: 'Netflix Premium 4K',
    category: 'Streaming',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=800',
    inStock: true,
    description: 'Enjoy movies and TV shows in stunning 4K UHD. This premium subscription profile supports 4 screens and offline downloads. Warranty included for the full duration.',
    features: ['4K Ultra HD', '4 Screens Allowed', 'No Ads', 'Download Supported'],
    rating: 5.0,
    reviews: 1250
  },
  {
    id: '4',
    name: 'Canva Pro Lifetime',
    category: 'Design',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1625530182604-e3f6d77c4491?auto=format&fit=crop&q=80&w=800',
    inStock: true,
    description: 'Join a private Canva Pro team and get lifetime access to premium templates, fonts, and stock photos. One-time payment for unlimited creativity.',
    features: ['Lifetime Access', 'Magic Resize', 'Background Remover', 'Brand Kit Access'],
    rating: 4.9,
    reviews: 567
  },
  {
    id: '5',
    name: 'Spotify Premium',
    category: 'Streaming',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800',
    inStock: true,
    description: 'Upgrade your personal account to Spotify Premium Individual. Enjoy ad-free music, offline playback, and high-quality audio streaming. Works worldwide.',
    features: ['Upgrade Your Own Account', 'Ad-Free Listening', 'Offline Mode', 'High Quality Audio'],
    rating: 4.9,
    reviews: 420
  },
  {
    id: '6',
    name: 'ChatGPT Plus (Shared)',
    category: 'Utility',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    inStock: true,
    description: 'Access the power of GPT-4 and DALL-E 3 with a shared ChatGPT Plus account. Ideal for students and developers needing advanced AI capabilities at a lower cost.',
    features: ['GPT-4 Access', 'DALL-E 3 Image Gen', 'Faster Response Speed', 'Priority Access'],
    rating: 4.7,
    reviews: 156
  },
  {
    id: '7',
    name: 'NordVPN 2-Year Plan',
    category: 'Utility',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    inStock: true,
    description: 'Secure your digital life with NordVPN. Account valid for 2 years with active warranty. Protects up to 6 devices simultaneously with military-grade encryption.',
    features: ['2 Year Validity', '6 Devices', 'Threat Protection', 'No Logs Policy'],
    rating: 4.8,
    reviews: 310
  },
  {
    id: '8',
    name: 'YouTube Premium',
    category: 'Streaming',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=800',
    inStock: false,
    description: 'Watch YouTube without ads, play videos in the background, and download content for offline viewing. Includes access to YouTube Music Premium.',
    features: ['Ad-Free Video', 'Background Play', 'YouTube Music Included', 'Offline Downloads'],
    rating: 4.8,
    reviews: 215
  }
];

const DEFAULT_CATEGORIES = ['Video', 'Design', 'Streaming', 'Utility'];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage or use Mock data
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('products');
      return savedProducts ? JSON.parse(savedProducts) : MOCK_PRODUCTS;
    } catch (e) {
      console.error("Failed to load products from localStorage", e);
      return MOCK_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const savedCategories = localStorage.getItem('categories');
      return savedCategories ? JSON.parse(savedCategories) : DEFAULT_CATEGORIES;
    } catch (e) {
      console.error("Failed to load categories from localStorage", e);
      return DEFAULT_CATEGORIES;
    }
  });

  // Persist to LocalStorage whenever products or categories change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      rating: 5.0, // Default for new products
      reviews: 0
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCategory = (category: string) => {
    if (category && !categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const deleteCategory = (category: string) => {
    setCategories(prev => prev.filter(c => c !== category));
  };

  return (
    <ProductContext.Provider value={{ products, categories, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};