import React from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Lock,
  ChevronLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    currentCustomer,
    setCurrentPage,
    setIsAuthModalOpen,
    setAuthModalMode,
    setAuthModalMessage,
    storeSettings
  } = useStore();

  const freeShippingDifference = storeSettings.freeShippingThreshold - cartSubtotal;

  const handleProceedToCheckout = () => {
    if (!currentCustomer) {
      setAuthModalMode('login');
      setAuthModalMessage('Please login or create an account before placing your order.');
      setIsAuthModalOpen(true);
      return;
    }

    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-[#F3ECE0] border border-[#E0D7C3] flex items-center justify-center mx-auto mb-5 text-[#9E3809] shadow-inner">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-serif-spiritual text-[#2C241E]">
          Your Sacred Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mt-2">
          Discover our authentic consecrated brass idols, certified rudrakshas, and pure sandalwood incense.
        </p>
        <button
          type="button"
          id="empty-cart-shop-now-btn"
          onClick={() => setCurrentPage('shop')}
          className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-bold shadow-lg shadow-orange-950/20 transition-all cursor-pointer"
        >
          <span>Explore Sacred Store</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-[#2C241E]">
            Your Shopping Cart
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Review your sacred items before proceeding to PhonePe QR checkout
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-neutral-500 hover:text-red-700 underline font-medium cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      {/* Free Shipping Alert Bar */}
      {freeShippingDifference > 0 ? (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#9E3809] shrink-0" />
            <span>
              Add <strong>₹{freeShippingDifference}</strong> more of sacred items to unlock <strong>FREE Express Shipping</strong>!
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage('shop')}
            className="text-xs font-bold text-[#9E3809] underline hover:text-[#802204] cursor-pointer"
          >
            Add More
          </button>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-semibold">
          <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Congratulations! Your order qualifies for FREE Express Shipping across India.</span>
        </div>
      )}

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ productId, product, quantity }) => (
            <div
              key={productId}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DFC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            >
              {/* Image & Title */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E8DFC8]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#9E3809] uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#2C241E] line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-neutral-800">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.discountPrice && product.discountPrice > product.price && (
                      <span className="text-[11px] text-neutral-400 line-through">
                        ₹{product.discountPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100">
                <div className="flex items-center border border-[#E0D7C3] rounded-xl bg-white shadow-inner">
                  <button
                    type="button"
                    onClick={() => updateQuantity(productId, quantity - 1)}
                    className="p-1.5 text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-neutral-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(productId, quantity + 1)}
                    disabled={quantity >= product.stockQuantity}
                    className="p-1.5 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="text-xs text-neutral-400 block text-[10px]">Total</span>
                  <span className="text-sm font-extrabold text-[#2C241E]">
                    ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(productId)}
                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E3809] hover:underline pt-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping for More Sacred Essentials</span>
          </button>
        </div>

        {/* Order Summary Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8DFC8] p-6 shadow-sm space-y-6 sticky top-28">
          <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E] border-b border-neutral-100 pb-3">
            Order Price Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Item Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items):</span>
              <span className="font-semibold text-neutral-800">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Shipping & Delivery Fee:</span>
              <span className="font-semibold">
                {cartShippingFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `₹${cartShippingFee}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Payment Mode:</span>
              <span className="font-bold text-[#5f259f] flex items-center gap-1">
                <span className="font-serif-spiritual">पे</span>
                <span>PhonePe QR</span>
              </span>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-neutral-900">Total Payable:</span>
              <span className="text-2xl font-black text-[#9E3809] font-sans">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 text-right">
              Exact amount payable through PhonePe QR
            </p>
          </div>

          {/* Authentication Status Callout */}
          {!currentCustomer && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-[11px] leading-relaxed">
              <strong>Note:</strong> Customer account login is mandatory prior to payment verification. You will be prompted to sign in when you proceed.
            </div>
          )}

          {/* Proceed Button */}
          <button
            type="button"
            id="proceed-to-checkout-btn"
            onClick={handleProceedToCheckout}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9E3809] to-[#B84A14] hover:from-[#802204] hover:to-[#9E3809] text-white font-bold text-sm shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <span>Proceed to PhonePe Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Security Assurance */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Verification & Dispatched with Sacred Care</span>
          </div>
        </div>
      </div>
    </div>
  );
};
