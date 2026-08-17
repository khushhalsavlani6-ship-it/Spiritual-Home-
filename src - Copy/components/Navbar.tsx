import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ShieldAlert,
  LogOut,
  Package,
  Sliders,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cartCount,
    wishlist,
    currentCustomer,
    logoutCustomer,
    isAdminAuthenticated,
    setIsAuthModalOpen,
    setAuthModalMode,
    setAuthModalMessage,
    storeSettings
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage('shop');
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('shop');
    setIsMobileMenuOpen(false);
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalMessage('');
    setIsAuthModalOpen(true);
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8] shadow-sm">
      {/* Sacred Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#802204] via-[#9E3809] to-[#802204] text-white py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-2 overflow-hidden shadow-inner">
        <span className="inline-block animate-pulse text-amber-300">✦</span>
        <span className="truncate">{storeSettings.announcementText}</span>
        <span className="hidden md:inline-block text-amber-300">✦</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Identity */}
          <button
            type="button"
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9E3809] to-[#B84A14] flex items-center justify-center text-amber-200 shadow-md shadow-orange-950/20 group-hover:scale-105 transition-transform border border-amber-400/30">
              <span className="text-2xl font-serif-spiritual select-none leading-none">ॐ</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold font-serif-spiritual tracking-wider text-[#9E3809] block leading-tight">
                {storeSettings.storeName}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest font-sans block">
                Pure Sacred Essentials
              </span>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Lord Ram, Hanuman, Ram Darbar idols..."
              autoComplete="off"
              className="w-full pl-10 pr-24 py-2.5 text-sm bg-white/90 border border-[#E0D7C3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9E3809] focus:border-transparent transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-[#9E3809] text-white text-xs font-semibold hover:bg-[#802204] transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist */}
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Categories');
                setCurrentPage('shop');
              }}
              title="Saved items"
              className="relative p-2.5 rounded-full hover:bg-[#F3ECE0] text-neutral-700 hover:text-[#9E3809] transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#9E3809] text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon & Trigger */}
            <button
              type="button"
              id="header-cart-btn"
              onClick={() => setCurrentPage('cart')}
              className="relative flex items-center gap-2 py-2 px-3 rounded-full hover:bg-[#F3ECE0] text-neutral-800 hover:text-[#9E3809] transition-colors cursor-pointer border border-[#E8DFC8]"
            >
              <ShoppingCart className="w-5 h-5 text-[#9E3809]" />
              <span className="hidden sm:inline text-xs font-bold text-neutral-800">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#9E3809] text-white text-[11px] font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Account / Auth Dropdown */}
            <div className="relative">
              {currentCustomer ? (
                <button
                  type="button"
                  id="customer-profile-dropdown-btn"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-[#F3ECE0] border border-[#E0D7C3] hover:border-[#9E3809] text-neutral-900 transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#9E3809] text-white text-xs font-bold flex items-center justify-center">
                    {currentCustomer.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold max-w-[90px] truncate">
                    {currentCustomer.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              ) : (
                <button
                  type="button"
                  id="nav-login-btn"
                  onClick={() => handleOpenAuth('login')}
                  className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Customer Account Dropdown Menu */}
              {isUserDropdownOpen && currentCustomer && (
                <div
                  id="customer-dropdown-menu"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E8DFC8] py-2 z-50 animate-fade-in"
                >
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900 truncate">{currentCustomer.fullName}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{currentCustomer.email}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('customer-account');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-neutral-700 hover:bg-[#FAF8F5] hover:text-[#9E3809] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-[#9E3809]" />
                    <span>My Order History & Proofs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage('customer-account');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-[#FAF8F5] hover:text-[#9E3809] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[#9E3809]" />
                    <span>Saved Shipping Address</span>
                  </button>

                  <div className="border-t border-neutral-100 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        logoutCustomer();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Badge Shortcut if logged in */}
            {isAdminAuthenticated && (
              <button
                type="button"
                id="admin-dashboard-nav-shortcut"
                onClick={() => setCurrentPage('admin-dashboard')}
                title="Admin Control Center"
                className="hidden lg:flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-purple-900 text-purple-100 text-xs font-semibold hover:bg-purple-800 transition-colors cursor-pointer shadow-sm"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 hover:bg-[#F3ECE0] md:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-[#E8DFC8]/60">
            {PRODUCT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  currentPage === 'shop' && selectedCategory === category
                    ? 'bg-[#9E3809] text-white shadow-sm'
                    : 'text-neutral-700 hover:text-[#9E3809] hover:bg-[#F3ECE0]'
                }`}
              >
                {category}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage('customer-account')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ml-auto flex items-center gap-1.5 ${
                currentPage === 'customer-account'
                  ? 'bg-amber-100 text-[#9E3809] font-bold'
                  : 'text-neutral-700 hover:text-[#9E3809] hover:bg-[#F3ECE0]'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-[#9E3809]" />
              <span>Check Order Status</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('admin-dashboard')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'admin-dashboard' || currentPage === 'admin-login'
                  ? 'bg-neutral-900 text-amber-300 font-bold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('about-us')}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-[#9E3809] hover:bg-[#F3ECE0] rounded-full whitespace-nowrap cursor-pointer"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('contact-us')}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-[#9E3809] hover:bg-[#F3ECE0] rounded-full whitespace-nowrap cursor-pointer"
            >
              Contact
            </button>
          </nav>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8DFC8] px-4 pt-3 pb-6 space-y-4 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search sacred items..."
              autoComplete="off"
              className="w-full pl-10 pr-20 py-2 text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-[#9E3809] text-white text-xs font-semibold"
            >
              Search
            </button>
          </form>

          {/* Mobile Category List */}
          <div>
            <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-bold mb-2">
              Browse Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`text-left px-3 py-2 text-xs rounded-xl transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#9E3809] text-white font-semibold'
                      : 'bg-white/80 text-neutral-800 border border-[#E8DFC8]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="pt-3 border-t border-[#E8DFC8] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setCurrentPage('about-us');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-neutral-700 py-1"
            >
              About Spiritual Home
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('contact-us');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-neutral-700 py-1"
            >
              Contact Customer Care
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('shipping-policy');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-neutral-700 py-1"
            >
              Shipping & Delivery
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentPage('refund-policy');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs font-medium text-neutral-700 py-1"
            >
              Refund Policy
            </button>
            {isAdminAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('admin-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-xs font-bold text-purple-800 py-1.5 flex items-center gap-1.5"
              >
                <Sliders className="w-4 h-4 text-purple-700" />
                <span>Admin Dashboard</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCurrentPage('admin-login');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-xs text-neutral-500 py-1"
              >
                Admin Portal Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
