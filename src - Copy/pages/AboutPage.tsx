import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Heart,
  Flame,
  ArrowRight,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#9E3809] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Sacred Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-serif-spiritual text-[#2C241E]">
          Preserving Timeless Vedic Sanctity for Modern Homes
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Founded with pure reverence, <strong>Spiritual Home</strong> bridges centuries-old artisan traditions from holy temple towns directly to your home altar.
        </p>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="aspect-4/3 rounded-3xl overflow-hidden bg-[#F4EFE6] border border-[#E8DFC8] shadow-md">
          <img
            src="https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=800&q=80"
            alt="Artisans Crafting Brass Murtis"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-xl font-bold font-serif-spiritual text-[#2C241E]">
            Direct From Master Sthapathis & Holy Shrines
          </h2>
          <p>
            Unlike mass-produced commercial decor, sacred murtis and puja articles require unbroken dedication and adherence to Shilpa Shastra guidelines.
          </p>
          <p>
            We collaborate directly with generational metal artisans in Moradabad and Kumbakonam, certified Rudraksha harvesters in the Nepalese foothills, and organic sandalwood distillers in Mysore.
          </p>
          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Virgin Solid Brass & Pure Natural Metals</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Lab Certified Nepali Rudraksha & Astrological Yantras</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Consecrated with Vedic Prana Pratishtha rituals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9E3809] flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-serif-spiritual text-[#2C241E]">Uncompromised Purity</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Zero adulteration or toxic fillings. Every idol is solid cast with pristine finish and heavy gauge metal.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9E3809] flex items-center justify-center mx-auto shadow-inner">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-serif-spiritual text-[#2C241E]">Ritually Energized</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Our items undergo sanctification and chanting in auspicious muhurats before packaging.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9E3809] flex items-center justify-center mx-auto shadow-inner">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-serif-spiritual text-[#2C241E]">Reverent Packaging</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Multilayered cushioning ensures your deities arrive in immaculate condition right to your doorstep.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-[#2C241E] text-white p-8 sm:p-10 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold font-serif-spiritual text-amber-200">
          Bring Divine Blessings to Your Home Sanctum
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
          Explore our collection of authentic murtis, sacred yantras, and puja essentials with instant PhonePe QR checkout.
        </p>
        <button
          type="button"
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#9E3809] hover:bg-[#802204] text-white font-bold text-xs shadow-lg cursor-pointer"
        >
          <span>Explore Sacred Store</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
