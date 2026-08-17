import React from 'react';
import { Star, ShoppingCart, Heart, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    setSelectedProductId,
    setCurrentPage,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const isSaved = isInWishlist(product.id);
  const discountPercent = product.discountPrice && product.discountPrice > product.price
    ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
    : 0;

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden hover:shadow-xl hover:border-[#D4A373] transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4EFE6]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-[#9E3809] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        )}

        {/* Featured Tag */}
        {product.isFeatured && (
          <span className="absolute bottom-3 left-3 bg-amber-500/95 text-neutral-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-neutral-900" />
            <span>Featured</span>
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          title={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isSaved
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-neutral-600 hover:text-rose-600 hover:bg-white shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] font-semibold text-[#9E3809] uppercase tracking-wider mb-1">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-[#2C241E] line-clamp-2 group-hover:text-[#9E3809] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-neutral-800">{product.rating}</span>
            <span className="text-[11px] text-neutral-400">({product.reviewCount})</span>
            {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
              <span className="ml-auto text-[10px] text-orange-600 font-bold bg-orange-50 px-1.5 py-0.5 rounded">
                Only {product.stockQuantity} left
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#2C241E]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.discountPrice && product.discountPrice > product.price && (
                <span className="text-xs text-neutral-400 line-through">
                  ₹{product.discountPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium block">
              Inclusive of all taxes
            </span>
          </div>

          <button
            type="button"
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            disabled={product.stockQuantity < 1}
            className={`py-2 px-3 sm:px-3.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
              product.stockQuantity < 1
                ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'bg-[#9E3809] hover:bg-[#802204] text-white hover:shadow-md active:scale-95'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
