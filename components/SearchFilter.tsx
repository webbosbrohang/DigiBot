import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilterChange }) => {
  const { categories } = useProducts();

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between p-1">
      
      {/* Search Bar */}
      <div className="relative w-full md:w-2/3 group">
        <div className="absolute inset-0 bg-gradient-to-r from-vault-neon to-vault-accent rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="relative flex items-center bg-vault-card border border-vault-border/50 rounded-lg overflow-hidden transition-colors focus-within:border-vault-neon/50">
          <div className="pl-4 text-slate-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search for software, subscriptions, or tools..."
            className="w-full bg-transparent border-none py-4 px-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-0 font-sans"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="w-full md:w-1/3 flex gap-3">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-slate-500 group-hover:text-vault-neon transition-colors" />
          </div>
          <select 
            className="appearance-none w-full bg-vault-card border border-vault-border/50 text-slate-300 py-4 pl-10 pr-10 rounded-lg cursor-pointer focus:outline-none focus:border-vault-neon/50 transition-colors"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};