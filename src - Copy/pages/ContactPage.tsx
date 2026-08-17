import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { storeSettings, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Your inquiry has been received. Our team will contact you shortly.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#9E3809]">
          Direct Devotee Care
        </span>
        <h1 className="text-3xl font-black font-serif-spiritual text-[#2C241E]">
          Contact Spiritual Home
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Have queries about product consecration, custom brass idols, or your PhonePe QR transaction? We are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E] border-b pb-3">
              Official Helpline & Support
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#9E3809] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">Phone & WhatsApp Support</h4>
                  <p className="text-neutral-600 font-mono mt-0.5">{storeSettings.supportPhone}</p>
                  <span className="text-[10px] text-neutral-400">Available Mon-Sat (9:00 AM - 8:00 PM IST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#9E3809] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">Email Assistance</h4>
                  <p className="text-neutral-600 mt-0.5">{storeSettings.supportEmail}</p>
                  <span className="text-[10px] text-neutral-400">Response within 4 business hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#9E3809] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">Sacred Studio & Dispatch Hub</h4>
                  <p className="text-neutral-600 mt-0.5">
                    Spiritual Home Sacred Artworks, Temple Lane, Varanasi, Uttar Pradesh - 221001, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5f259f]/10 text-[#5f259f] flex items-center justify-center shrink-0 font-bold">
                  <span className="font-serif-spiritual text-base">पे</span>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">Official Merchant UPI Account</h4>
                  <p className="text-neutral-600 font-mono font-bold mt-0.5">{storeSettings.upiId}</p>
                  <span className="text-[10px] text-neutral-500">Payee: {storeSettings.payeeName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold font-serif-spiritual text-neutral-900">
                Message Sent Successfully
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Thank you for contacting Spiritual Home. A devotee support representative will reach out to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setMobile('');
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#9E3809] text-white text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E] border-b pb-3">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Verma"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">10-Digit Mobile</label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                    required
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-medium text-neutral-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                  required
                />
              </div>

              <div className="text-xs">
                <label className="block font-medium text-neutral-700 mb-1">Inquiry / Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question regarding product dimensions, custom consecrations, or order tracking..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#9E3809] hover:bg-[#802204] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submit Sacred Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
