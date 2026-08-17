import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (selectedCategory !== 'All Categories' && product.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesSku && !matchesTags) {
          return false;
        }
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Stock filter
      if (onlyInStock && product.stockQuantity <= 0) {
        return false;
      }

      // Featured filter
      if (onlyFeatured && !product.isFeatured) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, maxPrice, onlyInStock, onlyFeatured, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('All Categories');
    setSearchQuery('');
    setMaxPrice(5000);
    setOnlyInStock(false);
    setOnlyFeatured(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    searchQuery.trim() !== '' ||
    maxPrice < 5000 ||
    onlyInStock ||
    onlyFeatured;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-neutral-500 mb-1">
          <span>Home</span> / <span className="text-[#9E3809] font-medium">Sacred Shop</span>
          {selectedCategory !== 'All Categories' && (
            <span> / <strong className="text-neutral-800">{selectedCategory}</strong></span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-[#2C241E]">
              {selectedCategory === 'All Categories' ? 'Sacred Temple Collection' : selectedCategory}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Showing {filteredProducts.length} energized and verified authentic products
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-white border border-[#E8DFC8] text-xs font-semibold text-neutral-700 flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#9E3809]" />
              <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
            </button>

            <div className="relative flex items-center gap-2">
              <span className="text-xs text-neutral-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 pl-3 pr-8 text-xs font-semibold bg-white border border-[#E8DFC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="mb-6 p-3 rounded-xl bg-[#F4EFE6] border border-[#E0D7C3] flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-700 mr-1">Active Filters:</span>

          {selectedCategory !== 'All Categories' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs text-[#9E3809] font-semibold border border-[#E0D7C3]">
              Category: {selectedCategory}
              <button
                type="button"
                onClick={() => setSelectedCategory('All Categories')}
                className="hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery.trim() && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs text-[#9E3809] font-semibold border border-[#E0D7C3]">
              Search: "{searchQuery}"
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {maxPrice < 5000 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs text-[#9E3809] font-semibold border border-[#E0D7C3]">
              Max: ₹{maxPrice}
              <button
                type="button"
                onClick={() => setMaxPrice(5000)}
                className="hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyInStock && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs text-[#9E3809] font-semibold border border-[#E0D7C3]">
              In Stock Only
              <button
                type="button"
                onClick={() => setOnlyInStock(false)}
                className="hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyFeatured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs text-[#9E3809] font-semibold border border-[#E0D7C3]">
              Featured Only
              <button
                type="button"
                onClick={() => setOnlyFeatured(false)}
                className="hover:text-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-neutral-600 hover:text-red-700 underline ml-auto font-semibold cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-sm space-y-6">
            {/* Search within shop */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2C241E] block mb-2">
                Search Catalog
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keyword or SKU..."
                  autoComplete="off"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#9E3809]"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2C241E] block mb-2">
                Categories
              </label>
              <div className="space-y-1">
                {PRODUCT_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = cat === 'All Categories'
                    ? products.length
                    : products.filter((p) => p.category === cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#9E3809] text-white font-bold'
                          : 'text-neutral-700 hover:bg-[#FAF8F5] hover:text-[#9E3809]'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                        isSelected ? 'bg-black/20 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2C241E]">
                  Price Filter
                </label>
                <span className="text-xs font-bold text-[#9E3809]">Up to ₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="400"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#9E3809] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>₹400</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Availability & Featured toggles */}
            <div className="space-y-2.5 pt-2 border-t border-neutral-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#9E3809] focus:ring-[#9E3809] cursor-pointer"
                />
                <span className="text-xs text-neutral-700">In Stock Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyFeatured}
                  onChange={(e) => setOnlyFeatured(e.target.checked)}
                  className="rounded text-[#9E3809] focus:ring-[#9E3809] cursor-pointer"
                />
                <span className="text-xs text-neutral-700">Featured Items Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E8DFC8] p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#9E3809] flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-800 font-serif-spiritual">
                No Sacred Items Found
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                No products match your active search or filters. Try adjusting your query or clearing filters.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-[#9E3809] text-white text-xs font-semibold hover:bg-[#802204] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="w-full max-w-xs bg-white h-full ml-auto p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-neutral-900 font-serif-spiritual">Filter Products</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category selection */}
            <div>
              <label className="text-xs font-bold uppercase text-neutral-700 block mb-2">Category</label>
              <div className="space-y-1">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                      selectedCategory === cat ? 'bg-[#9E3809] text-white font-bold' : 'text-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Max Price</span>
                <span className="text-[#9E3809]">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="400"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#9E3809]"
              />
            </div>

            <div className="pt-4 border-t space-y-3">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#9E3809] text-white text-xs font-bold rounded-xl"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 text-neutral-600 text-xs font-medium"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
