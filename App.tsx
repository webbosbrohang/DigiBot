import React, { useState, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchFilter } from './components/SearchFilter';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { Shield } from 'lucide-react';

// Lazy Load Admin Components to separate logic and improve performance for users
const AdminLogin = React.lazy(() => import('./components/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard').then(module => ({ default: module.AdminDashboard })));

// Loading Component for Suspense
const LoadingScreen = () => (
  <div className="min-h-screen bg-vault-dark flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-vault-neon blur-xl opacity-20 animate-pulse"></div>
        <Shield className="w-12 h-12 text-vault-neon animate-pulse" />
      </div>
      <span className="text-vault-neon font-mono text-sm tracking-widest animate-pulse">LOADING SYSTEM...</span>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // Redirect to the secret login page if not authenticated
    return <Navigate to="/_admin_secret_portal_99" replace />;
  }
  return <>{children}</>;
};

// Store Layout Wrapper
const StoreLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-vault-dark text-slate-200 selection:bg-vault-neon/30 selection:text-vault-neon flex flex-col relative overflow-x-hidden">
        {/* Background Decor */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-vault-neon/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-vault-accent/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-16">
            <Hero />
            
            <div className="space-y-8" id="browse">
              <SearchFilter 
                onSearch={setSearchQuery} 
                onFilterChange={setSelectedFilter} 
              />
              <ProductGrid 
                searchQuery={searchQuery} 
                filter={selectedFilter} 
                onOpenCart={() => setIsCartOpen(true)}
              />
            </div>
          </main>

          <Footer />
          <ScrollToTop />
        </div>
        
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* Public Store Route */}
                <Route path="/" element={<StoreLayout />} />
                
                {/* Secret Admin Routes */}
                <Route path="/_admin_secret_portal_99" element={<AdminLogin />} />
                <Route 
                  path="/_admin_secret_portal_99/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Redirect any standard admin attempts to home or 404 */}
                <Route path="/admin" element={<Navigate to="/" replace />} />
                <Route path="/admin/login" element={<Navigate to="/" replace />} />
                
              </Routes>
            </Suspense>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;