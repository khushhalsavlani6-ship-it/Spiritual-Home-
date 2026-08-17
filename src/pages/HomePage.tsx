import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle,
  Star,
  Flame,
  Award,
  ChevronRight,
  CreditCard,
  QrCode
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

export const HomePage: React.FC = () => {
  const {
    products,
    setCurrentPage,
    setSelectedCategory,
    setSelectedProductId,
    storeSettings
  } = useStore();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const bestsellers = products.slice(0, 4);

  const categoryImages: Record<string, string> = {
    'Lord Ram Idols': 'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=600&q=80',
    'Lord Hanuman Idols': 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    'Ram Darbar': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#2C241E] via-[#3D3025] to-[#251D17] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#524436]">
        {/* Glow & Mandalas Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Consecrated Brass Murtis • Ayodhya & Chitrakoot Sanctum Sourced</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif-spiritual tracking-tight text-white leading-tight">
              Consecrated <span className="text-amber-400">Lord Ram, Hanuman & Ram Darbar</span> Idols
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Bring sacred harmony, dharma, and supreme protection to your home mandir. Handcrafted solid virgin brass murtis of Bhagwan Shri Ram, Veer Hanuman, and complete Ram Darbar sets ritually energized by Vedic purohits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                id="hero-explore-collection-btn"
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setCurrentPage('shop');
                }}
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-gradient-to-r from-[#9E3809] to-[#B84A14] hover:from-[#802204] hover:to-[#9E3809] text-white font-bold text-sm shadow-xl shadow-orange-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <span>Explore Sacred Murtis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="hero-view-featured-btn"
                onClick={() => {
                  const target = document.getElementById('featured-products-section');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-[#3B322A] hover:bg-[#4A3F35] border border-[#524436] text-amber-100 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>View Bestsellers</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="pt-6 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-left border-t border-neutral-700/60">
              <div>
                <span className="text-xs font-bold text-white block">100% Solid Brass</span>
                <span className="text-[11px] text-neutral-400">Authentic heavy cast</span>
              </div>
              <div>
                <span className="text-xs font-bold text-white block">PhonePe QR</span>
                <span className="text-[11px] text-neutral-400">Direct UPI payment</span>
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Prana Pratishtha</span>
                <span className="text-[11px] text-neutral-400">Vedic energization</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card with PhonePe QR Feature Highlight */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#524436] bg-[#2E261E] p-6 text-center">
              <div className="aspect-4/3 rounded-2xl overflow-hidden relative mb-4 shadow-md bg-neutral-800">
                <img
                  src="https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80"
                  alt="Ayodhya Ram Lalla Brass Murti"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-left">
                    <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">Consecrated Masterpiece</span>
                    <span className="text-base font-bold text-white font-serif-spiritual">Ayodhya Ram Lalla Solid Brass Idol</span>
                  </div>
                </div>
              </div>

              {/* PhonePe QR Badge */}
              <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-[#5f259f]/40 flex items-center justify-between text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-base shadow">
                    <span className="font-serif-spiritual">पे</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">PhonePe QR Payment</div>
                    <div className="text-[10px] text-neutral-400 font-mono">UPI: {storeSettings.upiId}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('Lord Ram Idols');
                    setCurrentPage('shop');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-[#9E3809] uppercase tracking-widest block mb-1">
              Consecrated Sacred Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-[#2C241E]">
              Shop by Sacred Deity
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All Categories');
              setCurrentPage('shop');
            }}
            className="text-xs font-bold text-[#9E3809] hover:text-[#802204] flex items-center gap-1 cursor-pointer group"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PRODUCT_CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
            <div
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className="group bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:border-[#9E3809] transition-all transform hover:-translate-y-1"
            >
              <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#F4EFE6] mb-4 relative">
                <img
                  src={categoryImages[cat] || 'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=600&q=80'}
                  alt={cat}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-3">
                  <span className="text-white text-xs font-bold tracking-wider uppercase bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                    Explore Murtis
                  </span>
                </div>
              </div>
              <h3 className="text-base font-bold font-serif-spiritual text-[#2C241E] group-hover:text-[#9E3809] transition-colors leading-tight mb-1">
                {cat}
              </h3>
              <p className="text-xs text-neutral-500">
                {cat === 'Lord Ram Idols' && 'Ayodhya Ram Lalla & Kodanda Ram Idols'}
                {cat === 'Lord Hanuman Idols' && 'Panchmukhi, Dhyan Mudra & Veer Hanuman'}
                {cat === 'Ram Darbar' && 'Complete Ram, Sita, Lakshman & Hanuman Sets'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section id="featured-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-[#9E3809] uppercase tracking-widest block mb-1">
              Handpicked Auspicious Items
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-[#2C241E]">
              Featured Sacred Essentials
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All Categories');
              setCurrentPage('shop');
            }}
            className="text-xs font-bold text-[#9E3809] hover:text-[#802204] flex items-center gap-1 cursor-pointer group"
          >
            <span>Explore All ({products.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* PhonePe QR Payment Workflow Step Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#1C1814] via-[#2A231C] to-[#1C1814] text-white p-8 sm:p-12 border border-[#42382F] shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5f259f]/30 border border-[#5f259f]/60 text-purple-200 text-xs font-bold mb-3">
              <span className="font-serif-spiritual">पे</span>
              <span>100% Safe Direct PhonePe QR Payment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-white">
              How Simple PhonePe Payment Works
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2">
              We exclusively use direct PhonePe QR to ensure zero gateway surcharges and rapid manual payment confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#261F18] border border-[#3B322A] p-5 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-[#9E3809] text-white font-bold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Customer Sign In</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Log in or register your customer account with your delivery address before placing order.
              </p>
            </div>

            <div className="bg-[#261F18] border border-[#3B322A] p-5 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-[#5f259f] text-white font-bold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Scan PhonePe QR</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Scan our official PhonePe QR ({storeSettings.upiId}) and pay the exact order amount.
              </p>
            </div>

            <div className="bg-[#261F18] border border-[#3B322A] p-5 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Upload Screenshot</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Upload your PhonePe payment confirmation screenshot and submit your order reference.
              </p>
            </div>

            <div className="bg-[#261F18] border border-[#3B322A] p-5 rounded-2xl relative">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Admin Verification</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Admin verifies the payment against the UTR and dispatches your consecrated package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-[#9E3809] uppercase tracking-widest block mb-1">
              Devotee Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-[#2C241E]">
              Bestselling Spiritual Items
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All Categories');
              setCurrentPage('shop');
            }}
            className="text-xs font-bold text-[#9E3809] hover:text-[#802204] flex items-center gap-1 cursor-pointer group"
          >
            <span>View Full Shop</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Vedic Shloka / Blessing Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F4EFE6] border border-[#E0D7C3] p-8 sm:p-10 text-center relative overflow-hidden shadow-inner">
          <div className="w-12 h-12 rounded-full bg-[#9E3809] text-amber-200 flex items-center justify-center mx-auto mb-4 text-2xl font-serif-spiritual">
            ॐ
          </div>
          <p className="text-lg sm:text-xl font-bold font-serif-spiritual text-[#802204] tracking-wide mb-2">
            "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥"
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto italic">
            "May all sentient beings be at peace, may all be free from illness, may all see what is auspicious, and may no one suffer."
          </p>
          <div className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#9E3809]">
            — Brihadaranyaka Upanishad
          </div>
        </div>
      </section>
    </div>
  );
};
