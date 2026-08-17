import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, ExternalLink, ShieldCheck, Sparkles, Download } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PhonePeQRCodeCardProps {
  amount?: number;
  orderId?: string;
  className?: string;
  showPayIntentButton?: boolean;
}

export const PhonePeQRCodeCard: React.FC<PhonePeQRCodeCardProps> = ({
  amount,
  orderId,
  className = '',
  showPayIntentButton = true
}) => {
  const { storeSettings, showToast } = useStore();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const upiId = storeSettings.upiId || '7897256935@ybl';
  const payeeName = storeSettings.payeeName || 'KHUSHHAL SAVLANI';

  // Construct UPI link according to NPCI specifications
  const upiUri = amount && amount > 0
    ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(orderId ? `Order ${orderId} - Spiritual Home` : 'Spiritual Home Order')}`
    : `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=Spiritual%20Home%20Purchase`;

  // Generate QR code onto canvas & data URL
  useEffect(() => {
    // If admin set a custom QR image URL, we can use that, otherwise generate high quality QR
    if (storeSettings.qrImageUrl) {
      setQrDataUrl(storeSettings.qrImageUrl);
      return;
    }

    QRCode.toDataURL(upiUri, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('QR generation failed', err);
      });
  }, [upiUri, storeSettings.qrImageUrl]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    showToast(`Copied UPI ID: ${upiId}`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `PhonePe-QR-SpiritualHome-${orderId || 'Payment'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('PhonePe QR code downloaded.');
  };

  return (
    <div
      id="phonepe-qr-card-container"
      className={`rounded-2xl overflow-hidden bg-[#0A0A0A] text-white shadow-2xl border border-neutral-800 ${className}`}
    >
      {/* PhonePe Dark Theme Aesthetic Card */}
      <div className="p-6 md:p-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#5f259f]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 mb-2 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-xl shadow-lg border border-purple-400/40">
            <span className="font-serif-spiritual text-2xl leading-none">पे</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-sans">PhonePe</span>
        </div>

        {/* ACCEPTED HERE Banner */}
        <div className="relative z-10 mb-1">
          <span className="text-xs font-extrabold tracking-widest text-[#9d4edd] uppercase px-3 py-0.5 rounded-full bg-[#5f259f]/20 border border-[#5f259f]/40">
            ACCEPTED HERE
          </span>
        </div>

        <p className="text-neutral-400 text-xs mt-1 mb-5 relative z-10">
          Scan & Pay Using PhonePe App or Any UPI App
        </p>

        {/* Order Amount Highlight if available */}
        {amount !== undefined && amount > 0 && (
          <div className="w-full mb-5 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border border-amber-500/30 text-center relative z-10">
            <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">Exact Payable Amount</div>
            <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-0.5 flex items-center justify-center gap-1">
              <span className="text-amber-400">₹</span>
              <span>{amount.toLocaleString('en-IN')}</span>
            </div>
            {orderId && (
              <div className="text-[10px] text-neutral-400 mt-0.5 font-mono">
                Order Ref: #{orderId}
              </div>
            )}
          </div>
        )}

        {/* QR Code Container with Centered PhonePe Badge */}
        <div className="relative p-4 bg-white rounded-2xl shadow-xl w-64 h-64 flex items-center justify-center z-10 border-4 border-white">
          {qrDataUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={qrDataUrl}
                alt="PhonePe Payment QR Code"
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              {/* PhonePe Center Badge */}
              <div className="absolute inset-0 m-auto w-10 h-10 bg-[#5f259f] border-2 border-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm font-serif-spiritual">पे</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
              Generating PhonePe QR...
            </div>
          )}
        </div>

        {/* Payee Name */}
        <div className="mt-5 text-center relative z-10">
          <div className="text-xs uppercase tracking-wider text-neutral-400">Merchant / Beneficiary</div>
          <div className="text-base font-bold text-white tracking-wide mt-0.5 font-mono">
            {payeeName}
          </div>
        </div>

        {/* UPI ID with Copy Button */}
        <div className="mt-3 flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-700/80 rounded-xl px-3.5 py-2 max-w-full z-10">
          <span className="text-xs text-neutral-400 font-mono">UPI ID:</span>
          <span className="text-xs font-mono font-bold text-amber-300 select-all truncate">
            {upiId}
          </span>
          <button
            type="button"
            onClick={handleCopyUpi}
            title="Copy UPI ID"
            className="p-1 rounded-md hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Copy UPI ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Instant Pay button */}
        {showPayIntentButton && (
          <div className="w-full mt-4 flex flex-col gap-2 z-10">
            <a
              href={upiUri}
              id="pay-via-phonepe-app-btn"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#5f259f] to-[#7b2cbf] hover:from-[#6d2ab7] hover:to-[#8a33d8] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition-all cursor-pointer transform active:scale-98"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Pay with PhonePe / Any UPI App</span>
            </a>

            <button
              type="button"
              onClick={handleDownloadQr}
              className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>Save / Download QR to Gallery</span>
            </button>
          </div>
        )}

        {/* Security & Verification Guarantee */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 z-10">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>100% Secure Manual Admin Verification</span>
        </div>

        {/* Copyright notice matching authentic PhonePe template */}
        <div className="mt-3 text-[9px] text-neutral-600 font-sans leading-tight z-10">
          © 2026, All rights reserved, PhonePe Ltd (Formerly known as 'PhonePe Private Ltd')
        </div>
      </div>
    </div>
  );
};
