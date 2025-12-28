import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { 
  Shield, LogOut, Package, Plus, Search, 
  Trash2, Edit, X, Save, CheckCircle, BarChart3,
  DollarSign, Users, Activity, Layers, Tag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { products, categories, deleteProduct, addProduct, updateProduct, addCategory, deleteCategory } = useProducts();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State for Product
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: 0,
    image: '',
    description: '',
    inStock: true,
    features: ['']
  });

  // State for new category
  const [newCategory, setNewCategory] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0] || 'Video',
      price: 0,
      image: '',
      description: '',
      inStock: true,
      features: ['']
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
        updateProduct(editingProduct.id, formData);
    } else {
        // Validation basic
        if (!formData.name || !formData.price) return;
        addProduct(formData as Omit<Product, 'id'>);
    }
    setIsModalOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...(formData.features || []), ''] });
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="min-h-screen bg-vault-dark text-slate-200 font-sans">
        {/* Top Bar */}
        <header className="bg-vault-card border-b border-vault-border p-4 sticky top-0 z-30">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-vault-neon" />
                    <span className="font-display font-bold text-xl">DIGIBOT <span className="text-slate-500">ADMIN</span></span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        {user?.email}
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-md transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>

        <main className="container mx-auto p-4 lg:p-8 space-y-8">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-vault-card border border-vault-border p-5 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 text-xs font-mono uppercase">Total Products</span>
                        <Package className="w-4 h-4 text-vault-neon" />
                    </div>
                    <span className="text-2xl font-bold text-white">{products.length}</span>
                </div>
                <div className="bg-vault-card border border-vault-border p-5 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 text-xs font-mono uppercase">Total Categories</span>
                        <Layers className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">{categories.length}</span>
                </div>
                <div className="bg-vault-card border border-vault-border p-5 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 text-xs font-mono uppercase">Total Revenue</span>
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">$12,450.00</span>
                </div>
                <div className="bg-vault-card border border-vault-border p-5 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-500 text-xs font-mono uppercase">System Status</span>
                        <Activity className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-emerald-400">OPERATIONAL</span>
                </div>
            </div>

            {/* Management Section */}
            <div className="bg-vault-card border border-vault-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-vault-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Package className="w-5 h-5 text-slate-500" /> Inventory Management
                    </h2>
                    
                    <div className="flex w-full md:w-auto gap-3">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                            <input 
                                type="text" 
                                placeholder="Search inventory..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-vault-dark border border-vault-border rounded pl-9 pr-4 py-2 text-sm focus:border-vault-neon focus:outline-none"
                            />
                        </div>
                        
                        <button 
                            onClick={() => setIsCategoryModalOpen(true)}
                            className="bg-vault-dark border border-vault-border text-slate-300 px-4 py-2 rounded font-bold text-sm flex items-center gap-2 hover:bg-vault-border transition-colors hover:text-white"
                        >
                            <Tag className="w-4 h-4" /> Categories
                        </button>

                        <button 
                            onClick={openAddModal}
                            className="bg-vault-neon text-vault-dark px-4 py-2 rounded font-bold text-sm flex items-center gap-2 hover:bg-white transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Add Product
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-vault-dark text-slate-500 text-xs font-mono uppercase">
                                <th className="p-4">Product</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-vault-border">
                            {filteredProducts.map(product => (
                                <tr key={product.id} className="hover:bg-vault-dark/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-vault-dark border border-vault-border overflow-hidden">
                                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-medium text-slate-200">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded bg-vault-dark border border-vault-border text-xs text-slate-400">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-emerald-400">
                                        ${product.price}
                                    </td>
                                    <td className="p-4">
                                        {product.inStock ? (
                                            <span className="text-emerald-500 text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" /> In Stock</span>
                                        ) : (
                                            <span className="text-red-500 text-xs flex items-center gap-1"><X className="w-3 h-3" /> Sold Out</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEditModal(product)}
                                                className="p-2 hover:bg-blue-500/20 text-blue-400 rounded"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 hover:bg-red-500/20 text-red-400 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

        {/* Category Management Modal */}
        {isCategoryModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                 <div className="bg-vault-card border border-vault-border w-full max-w-md rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                     <div className="p-4 border-b border-vault-border flex justify-between items-center bg-vault-dark">
                         <h3 className="font-bold text-white text-lg flex items-center gap-2">
                             <Tag className="w-4 h-4 text-vault-neon" /> Manage Categories
                         </h3>
                         <button onClick={() => setIsCategoryModalOpen(false)} className="text-slate-500 hover:text-white">
                             <X className="w-5 h-5" />
                         </button>
                     </div>
                     
                     <div className="p-4 flex-1 overflow-y-auto">
                        <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
                            <input 
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="New category name"
                                className="flex-1 bg-vault-dark border border-vault-border rounded p-2 text-white focus:border-vault-neon focus:outline-none text-sm"
                            />
                            <button 
                                type="submit"
                                className="bg-vault-neon text-vault-dark font-bold px-4 rounded hover:bg-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </form>

                        <div className="space-y-2">
                            {categories.map(cat => (
                                <div key={cat} className="flex items-center justify-between p-3 bg-vault-dark/50 border border-vault-border rounded group hover:border-vault-border/80">
                                    <span className="text-slate-300 text-sm">{cat}</span>
                                    <button 
                                        onClick={() => deleteCategory(cat)}
                                        className="text-slate-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Delete Category"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                     </div>
                     <div className="p-4 border-t border-vault-border bg-vault-dark text-xs text-slate-500 text-center">
                         Deleting a category does not delete products in that category.
                     </div>
                 </div>
             </div>
        )}

        {/* Edit/Add Product Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-vault-card border border-vault-border w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    <div className="p-4 border-b border-vault-border flex justify-between items-center bg-vault-dark">
                        <h3 className="font-bold text-white text-lg">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto">
                        <form id="productForm" onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-slate-500 uppercase">Product Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-vault-dark border border-vault-border rounded p-2 text-white focus:border-vault-neon focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-slate-500 uppercase">Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        className="w-full bg-vault-dark border border-vault-border rounded p-2 text-white focus:border-vault-neon focus:outline-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-slate-500 uppercase">Price ($)</label>
                                    <input 
                                        required
                                        type="number" 
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                                        className="w-full bg-vault-dark border border-vault-border rounded p-2 text-white focus:border-vault-neon focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-slate-500 uppercase">Image URL</label>
                                    <input 
                                        required
                                        type="url" 
                                        value={formData.image}
                                        onChange={e => setFormData({...formData, image: e.target.value})}
                                        className="w-full bg-vault-dark border border-vault-border rounded p-2 text-white focus:border-vault-neon focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-mono text-slate-500 uppercase">Description</label>
                                <textarea 
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-vault-dark border border-vault-border rounded p-2 text-white focus:border-vault-neon focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-slate-500 uppercase flex justify-between">
                                    Features
                                    <button type="button" onClick={addFeatureField} className="text-vault-neon hover:underline">+ Add Feature</button>
                                </label>
                                {formData.features?.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={feature}
                                            onChange={e => handleFeatureChange(index, e.target.value)}
                                            className="flex-1 bg-vault-dark border border-vault-border rounded p-2 text-white focus:border-vault-neon focus:outline-none"
                                            placeholder="Feature description"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => removeFeatureField(index)}
                                            className="text-red-500 hover:text-red-400 p-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input 
                                    type="checkbox" 
                                    id="inStock"
                                    checked={formData.inStock}
                                    onChange={e => setFormData({...formData, inStock: e.target.checked})}
                                    className="rounded border-vault-border bg-vault-dark text-vault-neon focus:ring-vault-neon"
                                />
                                <label htmlFor="inStock" className="text-sm text-slate-300">Product is In Stock</label>
                            </div>
                        </form>
                    </div>

                    <div className="p-4 border-t border-vault-border bg-vault-dark flex justify-end gap-3">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            form="productForm"
                            className="px-6 py-2 bg-vault-neon text-vault-dark font-bold rounded hover:bg-white transition-colors flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Save Product
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};