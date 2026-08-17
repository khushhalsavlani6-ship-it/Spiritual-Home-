import React, { useState, useEffect } from 'react';
import {
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  ArrowLeft,
  ChevronRight,
  Share2,
  Lock,
  Flame
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    setCurrentPage,
    addToCart,
    toggleWishlist,
    isInWishlist,
    currentCustomer,
    setIsAuthModalOpen,
    setAuthModalMode,
    setAuthModalMessage,
    showToast,
    storeSettings
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'energization'>('details');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [selectedProductId]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-neutral-800">Product Not Found</h2>
        <button
          type="button"
          onClick={() => setCurrentPage('shop')}
          className="mt-4 px-4 py-2 bg-[#9E3809] text-white text-xs font-bold rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const discountPercent =
    product.discountPrice && product.discountPrice > product.price
      ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
      : 0;

  const handleBuyNow = () => {
    if (!currentCustomer) {
      setAuthModalMode('login');
      setAuthModalMessage('Please login or create an account before placing your order.');
      setIsAuthModalOpen(true);
      return;
    }

    addToCart(product, quantity);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.');
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500">
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
          className="hover:text-[#9E3809] cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          type="button"
          onClick={() => setCurrentPage('shop')}
          className="hover:text-[#9E3809] cursor-pointer"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-800 font-semibold truncate max-w-xs sm:max-w-md">
          {product.name}
        </span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Display Image */}
          <div className="aspect-square w-full rounded-3xl overflow-hidden bg-[#F4EFE6] border border-[#E8DFC8] relative shadow-md">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-[#9E3809] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {discountPercent}% OFF
              </span>
            )}

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/80 text-neutral-600 hover:text-rose-600 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#9E3809] ring-2 ring-[#9E3809]/20'
                      : 'border-[#E8DFC8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Sourcing Badge */}
          <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#E0D7C3] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2C241E]">Ritually Energized</h4>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                {product.specifications.energizedBy || 'Consecrated by certified Vedic priests'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Product Overview & Buying Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9E3809] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                {product.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-[#2C241E] leading-snug">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-xs font-extrabold text-neutral-800">{product.rating}</span>
                <span className="text-xs text-neutral-500">({product.reviewCount} reviews)</span>
              </div>

              {product.stockQuantity > 0 ? (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock ({product.stockQuantity} available)</span>
                </span>
              ) : (
                <span className="text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                  Currently Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#2C241E] font-sans">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.discountPrice && product.discountPrice > product.price && (
                  <span className="text-base text-neutral-400 line-through">
                    ₹{product.discountPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#9E3809]">Save {discountPercent}%</span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Inclusive of all taxes • Free shipping on orders over ₹{storeSettings.freeShippingThreshold}
              </p>
            </div>

            <button
              type="button"
              onClick={handleShare}
              title="Share this product"
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-800 hover:bg-[#F3ECE0] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            {product.description}
          </p>

          {/* Key Benefits List */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Spiritual & Material Benefits:
              </h4>
              <ul className="space-y-1.5">
                {product.benefits.map((b, i) => (
                  <li key={i} className="text-xs text-neutral-600 flex items-start gap-2">
                    <span className="text-[#9E3809] font-bold mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-2 border-t border-neutral-200">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Quantity:</span>
              <div className="flex items-center border border-[#E0D7C3] rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-neutral-800 min-w-10 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
                  disabled={quantity >= product.stockQuantity}
                  className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                id="product-detail-add-to-cart-btn"
                onClick={() => addToCart(product, quantity)}
                disabled={product.stockQuantity < 1}
                className="py-3.5 px-6 rounded-2xl bg-[#F3ECE0] hover:bg-[#E8DFC8] border border-[#D4A373] text-[#9E3809] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-98 disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Sacred Cart</span>
              </button>

              <button
                type="button"
                id="product-detail-buy-now-btn"
                onClick={handleBuyNow}
                disabled={product.stockQuantity < 1}
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9E3809] to-[#B84A14] hover:from-[#802204] hover:to-[#9E3809] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-950/20 transition-all active:scale-98 disabled:opacity-50"
              >
                <span className="font-serif-spiritual font-bold">पे</span>
                <span>Buy Now with PhonePe QR</span>
              </button>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F4EFE6] border border-[#E0D7C3] text-center">
            <div>
              <Truck className="w-4 h-4 text-[#9E3809] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-neutral-800 block">Safe Transit</span>
              <span className="text-[10px] text-neutral-500">Bubble cushioned</span>
            </div>
            <div>
              <ShieldCheck className="w-4 h-4 text-[#9E3809] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-neutral-800 block">PhonePe Verified</span>
              <span className="text-[10px] text-neutral-500">Manual review</span>
            </div>
            <div>
              <Sparkles className="w-4 h-4 text-[#9E3809] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-neutral-800 block">Temple Certified</span>
              <span className="text-[10px] text-neutral-500">Authentic materials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Deep Specifications & Description Tabs */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm">
        <div className="flex border-b border-neutral-200 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 cursor-pointer transition-colors ${
              activeTab === 'details'
                ? 'border-[#9E3809] text-[#9E3809]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Spiritual Significance & Lore
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 cursor-pointer transition-colors ${
              activeTab === 'specs'
                ? 'border-[#9E3809] text-[#9E3809]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Detailed Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('energization')}
            className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 cursor-pointer transition-colors ${
              activeTab === 'energization'
                ? 'border-[#9E3809] text-[#9E3809]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Energization & Care Guide
          </button>
        </div>

        {/* Tab 1: Details */}
        {activeTab === 'details' && (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <p>{product.longDescription || product.description}</p>
            <p>
              Every sacred article provided by Spiritual Home is treated with profound devotion, packed in sanctified conditions, and ready to be placed on your home altar or meditation space.
            </p>
          </div>
        )}

        {/* Tab 2: Specs Table */}
        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <tbody>
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-[#FAF8F5]' : 'bg-white'}>
                    <td className="py-2.5 px-4 font-bold text-neutral-700 capitalize border border-[#E8DFC8]/60 w-1/3">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </td>
                    <td className="py-2.5 px-4 text-neutral-600 border border-[#E8DFC8]/60">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Energization & Care */}
        {activeTab === 'energization' && (
          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <h4 className="font-bold text-[#802204] mb-1">Consecration Details</h4>
              <p className="text-xs text-amber-900">
                {product.specifications.energizedBy || 'Vedic Mantras recited during Prana Pratishtha'}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 mb-1">Care & Maintenance Instructions:</h4>
              <p className="text-xs text-neutral-600">
                {product.specifications.careInstructions || 'Clean regularly with a clean microfiber cloth. Keep in an elevated sacred location.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-serif-spiritual text-[#2C241E]">
            Related Sacred Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
