import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Lock,
  Heart,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, storeSettings, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    showToast('Sacred blessings! You are subscribed to Spiritual Home updates.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#1C1814] text-[#E5DFD7] pt-14 pb-8 border-t border-[#3B322A]">
      {/* Value Proposition Banners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-6 rounded-2xl bg-[#28221C] border border-[#3B322A]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Consecrated</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Energized with Vedic rituals</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <span className="font-bold text-lg font-serif-spiritual">पे</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">PhonePe QR Only</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Direct verified UPI transfers</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pan-India Express</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Free delivery over ₹{storeSettings.freeShippingThreshold}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Authenticity Certified</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Solid brass & certified rudraksha</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#3B322A]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E3809] flex items-center justify-center text-amber-200 shadow-md">
                <span className="text-xl font-serif-spiritual">ॐ</span>
              </div>
              <span className="text-xl font-bold font-serif-spiritual tracking-wider text-white">
                {storeSettings.storeName}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Your sanctified destination for authentic solid brass Lord Ram idols, Veer Hanuman murtis, and complete Ram Darbar sets. Handcrafted with Vedic reverence and energized to bring divine harmony into every home.
            </p>

            {/* PhonePe Payment Method Assurance */}
            <div className="pt-2">
              <span className="text-[11px] text-neutral-400 block mb-2 font-medium">
                Official Payment Partner:
              </span>
              <div className="inline-flex items-center gap-2 bg-[#28221C] border border-[#453A30] rounded-xl px-3 py-1.5">
                <div className="w-5 h-5 rounded-full bg-[#5f259f] text-white flex items-center justify-center text-[10px] font-bold">
                  पे
                </div>
                <span className="text-xs font-bold text-white font-mono">PhonePe QR & UPI</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono border border-emerald-800">Verified</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#9E3809] pl-2">
              Explore Store
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('shop')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  All Sacred Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('about-us')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Our Sacred Mission
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('contact-us')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('cart')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Shopping Cart
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('customer-account')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Customer Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#9E3809] pl-2">
              Customer Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('shipping-policy')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('refund-policy')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Refund & Return Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('privacy-policy')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('terms')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentPage('contact-us')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Grievance Redressal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#9E3809] pl-2">
              Temple Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 mb-4">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">{storeSettings.supportAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-[11px] font-mono">{storeSettings.supportPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-[11px] font-mono">{storeSettings.supportEmail}</span>
              </li>
            </ul>

            <form onSubmit={handleNewsletter} className="mt-3">
              <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Sacred Newsletter
              </label>
              <div className="flex">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  autoComplete="off"
                  className="w-full px-3 py-1.5 text-xs bg-[#28221C] border border-[#3B322A] rounded-l-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-semibold rounded-r-lg cursor-pointer"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom copyright & Admin login link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {storeSettings.storeName}. All rights reserved. Handcrafted with reverence in India.</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              id="footer-admin-login-link"
              onClick={() => setCurrentPage('admin-login')}
              className="hover:text-neutral-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-neutral-400" />
              <span>Admin Portal</span>
            </button>
            <span>•</span>
            <span className="text-neutral-500">
              UPI: <strong className="text-neutral-400 font-mono">{storeSettings.upiId}</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
