import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  RotateCcw,
  Truck,
  Lock,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PoliciesPageProps {
  initialTab?: 'privacy' | 'terms' | 'refund' | 'shipping';
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ initialTab = 'privacy' }) => {
  const { currentPage, storeSettings } = useStore();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'shipping'>('privacy');

  useEffect(() => {
    if (currentPage === 'privacy-policy') setActiveTab('privacy');
    else if (currentPage === 'terms-conditions') setActiveTab('terms');
    else if (currentPage === 'refund-policy') setActiveTab('refund');
    else if (currentPage === 'shipping-policy') setActiveTab('shipping');
  }, [currentPage]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <div className="border-b border-[#E8DFC8] pb-6 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-black font-serif-spiritual text-[#2C241E]">
          Legal & Store Policies
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Transparency and trust are at the heart of Spiritual Home operations.
        </p>
      </div>

      {/* Policy Navigation Tabs */}
      <div className="flex border-b border-[#E8DFC8] gap-4 overflow-x-auto justify-center">
        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-1.5 ${
            activeTab === 'privacy'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-1.5 ${
            activeTab === 'terms'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms & Conditions</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('refund')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-1.5 ${
            activeTab === 'refund'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Refund & Return Policy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shipping')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-1.5 ${
            activeTab === 'shipping'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Delivery</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-6">
        {/* 1. Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif-spiritual text-[#2C241E]">
              Privacy Policy
            </h2>
            <p className="text-neutral-500 text-xs">Last updated: January 2025</p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">1. Devotee Information We Collect</h3>
            <p>
              At <strong>Spiritual Home</strong>, we value the trust and sanctity of your personal data. We collect your Name, Mobile Number, Email Address, and Postal Delivery Address exclusively for fulfilling your orders, verifying payments, and providing courier tracking updates.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">2. Payment Data & PhonePe Privacy</h3>
            <p>
              Payments are made directly through UPI via the PhonePe QR code to our merchant account (<code>{storeSettings.upiId}</code>). We do not store sensitive bank card or PIN numbers on our servers. Uploaded screenshots and UTR numbers are used solely for manual verification by our authorized administrators.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">3. Zero Third-Party Selling</h3>
            <p>
              We strictly do not rent, trade, or sell your personal details to any advertising networks. Your information is shared only with certified courier delivery partners (e.g. Bluedart, Delhivery, India Post) to fulfill doorstep shipment.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">4. Contact For Privacy Queries</h3>
            <p>
              For data modification or deletion requests, write to us at <strong>{storeSettings.supportEmail}</strong>.
            </p>
          </div>
        )}

        {/* 2. Terms & Conditions */}
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif-spiritual text-[#2C241E]">
              Terms and Conditions
            </h2>
            <p className="text-neutral-500 text-xs">Last updated: January 2025</p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">1. Agreement to Terms</h3>
            <p>
              By accessing or purchasing from <strong>Spiritual Home</strong>, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in India.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">2. Mandatory Account Creation</h3>
            <p>
              Customer login and account verification is mandatory to complete transactions on Spiritual Home. This ensures accurate ownership of orders, payment logs, and address verification.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">3. Payment Verification Procedure</h3>
            <p>
              All orders placed using PhonePe QR require the customer to upload a valid payment confirmation screenshot. An order enters the <em>Payment Verification Pending</em> queue and is only confirmed once verified against the merchant bank statement by our administrative team.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">4. Artisan Handcrafted Nature</h3>
            <p>
              Due to traditional sand-casting and hand-carving techniques, minor artistic variations in antique patina, brass weight, or dimensions are inherent marks of authentic spiritual craftsmanship.
            </p>
          </div>
        )}

        {/* 3. Refund & Return Policy */}
        {activeTab === 'refund' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif-spiritual text-[#2C241E]">
              Refund and Return Policy
            </h2>
            <p className="text-neutral-500 text-xs">Last updated: January 2025</p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">1. Damaged in Transit Guarantee</h3>
            <p>
              All consecrated idols and spiritual goods are inspected and packaged with 5-layer bubble cushioning. In the rare event an item arrives damaged during courier handling, please notify us within <strong>48 hours of delivery</strong> with an unboxing video/photo at <strong>{storeSettings.supportPhone}</strong> or <strong>{storeSettings.supportEmail}</strong>.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">2. Replacement & Consecration Protocol</h3>
            <p>
              For transit-damaged items, a consecrated brand-new replacement is dispatched at zero additional cost. If a replacement is out of stock, a full 100% refund is credited back to the original PhonePe UPI ID within 24-48 bank working hours.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">3. Non-Returnable Items</h3>
            <p>
              To maintain spiritual sanctity, opened dhoop sticks, consecrated kumkum/chandan, and energized custom astrological yantras that have had personal puja performed cannot be returned once delivered in good condition.
            </p>
          </div>
        )}

        {/* 4. Shipping & Delivery Policy */}
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif-spiritual text-[#2C241E]">
              Shipping and Delivery Policy
            </h2>
            <p className="text-neutral-500 text-xs">Last updated: January 2025</p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">1. Pan-India Delivery Coverage</h3>
            <p>
              Spiritual Home delivers to over 19,000+ PIN codes across India through Tier-1 express courier partners including Blue Dart, Delhivery, DTDC, and Speed Post for remote spiritual centers.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">2. Processing & Consecration Timelines</h3>
            <p>
              Once your PhonePe payment is verified by our admin team, your order is sanctified and securely dispatched within <strong>24 to 48 hours</strong>.
            </p>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">3. Estimated Transit Times</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Metro Cities (Delhi, Mumbai, Bengaluru, Chennai, Kolkata): 2 to 4 business days</li>
              <li>Tier 2 & 3 Cities: 3 to 6 business days</li>
              <li>North-East & Hill Stations: 5 to 7 business days</li>
            </ul>

            <h3 className="text-sm font-bold text-neutral-900 pt-2">4. Shipping Charges</h3>
            <p>
              We provide <strong>FREE Express Shipping</strong> on all orders above <strong>₹{storeSettings.freeShippingThreshold}</strong>. For orders below ₹{storeSettings.freeShippingThreshold}, a flat nominal handling fee of ₹99 is applied at checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
