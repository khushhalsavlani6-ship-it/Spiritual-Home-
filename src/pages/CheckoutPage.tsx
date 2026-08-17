import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  Upload,
  AlertCircle,
  CheckCircle2,
  Lock,
  User,
  Phone,
  Mail,
  MapPin,
  FileImage,
  ArrowRight,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PhonePeQRCodeCard } from '../components/PhonePeQRCodeCard';
import { CustomerAddress } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    currentCustomer,
    cart,
    cartSubtotal,
    cartShippingFee,
    cartTotal,
    createPendingOrder,
    submitPaymentProof,
    setCurrentPage,
    setIsAuthModalOpen,
    setAuthModalMode,
    setAuthModalMessage,
    showToast,
    storeSettings
  } = useStore();

  // Redirect or trigger auth if customer is not logged in
  useEffect(() => {
    if (!currentCustomer) {
      setAuthModalMode('login');
      setAuthModalMessage('Please login or create an account before placing your order.');
      setIsAuthModalOpen(true);
      setCurrentPage('cart');
    }
  }, [currentCustomer]);

  // Address state initialized strictly from customer's saved profile if available
  const [shippingAddress, setShippingAddress] = useState<CustomerAddress>(() => {
    if (currentCustomer?.shippingAddress) {
      return { ...currentCustomer.shippingAddress };
    }
    return {
      fullName: currentCustomer?.fullName || '',
      mobile: currentCustomer?.mobile || '',
      addressLine1: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    };
  });

  // Active Order workflow state
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'address-review' | 'phonepe-payment' | 'upload-proof'>('address-review');

  // Screenshot Upload State
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [transactionUtr, setTransactionUtr] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!currentCustomer || cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-neutral-800">Checkout Unavailable</h2>
        <p className="text-xs text-neutral-500 mt-2">
          Your cart is currently empty or customer authentication is required.
        </p>
        <button
          type="button"
          onClick={() => setCurrentPage('shop')}
          className="mt-4 px-5 py-2 bg-[#9E3809] text-white text-xs font-bold rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Handle Step 1: Create pending order & generate PhonePe QR
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shippingAddress.fullName.trim() ||
      !shippingAddress.mobile.trim() ||
      !shippingAddress.addressLine1.trim() ||
      !shippingAddress.city.trim() ||
      !shippingAddress.state.trim() ||
      !shippingAddress.pincode.trim()
    ) {
      showToast('Please complete all mandatory shipping address fields.');
      return;
    }

    const res = createPendingOrder(shippingAddress);
    if (!res.success || !res.orderId) {
      showToast(res.error || 'Failed to initialize order. Please check item stock.');
      return;
    }

    setCreatedOrderId(res.orderId);
    setCheckoutStep('phonepe-payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle File selection for Screenshot
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image format
    if (!file.type.startsWith('image/')) {
      setUploadError('Invalid format. Please upload an image screenshot (JPEG, PNG, or WEBP).');
      return;
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit. Please upload a smaller image.');
      return;
    }

    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadError('');
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Invalid format. Please upload an image screenshot.');
      return;
    }

    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle Proof Submission
  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    if (!createdOrderId) {
      setUploadError('Order session expired. Please re-initiate checkout.');
      return;
    }

    if (!screenshotPreview) {
      setUploadError('Please upload a screenshot of your successful PhonePe payment confirmation.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = submitPaymentProof(createdOrderId, screenshotPreview, transactionUtr.trim() || undefined);
      if (res.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Redirect to Order Confirmation / Customer History
        setCurrentPage('order-confirmation');
      } else {
        setUploadError(res.message || 'Failed to submit payment proof.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'An unexpected error occurred during upload.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Checkout Header & Steps indicator */}
      <div className="border-b border-[#E8DFC8] pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-[#2C241E]">
          Sacred PhonePe Checkout
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Authenticated Devotee: <strong>{currentCustomer.fullName}</strong> ({currentCustomer.email})
        </p>

        {/* Step Progress Tracker */}
        <div className="flex items-center gap-3 mt-6 max-w-xl">
          <div className={`flex-1 pb-2 border-b-2 font-semibold text-xs transition-colors ${
            checkoutStep === 'address-review'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-emerald-600 text-emerald-700'
          }`}>
            1. Shipping Address & Review
          </div>

          <div className={`flex-1 pb-2 border-b-2 font-semibold text-xs transition-colors ${
            checkoutStep === 'phonepe-payment' || checkoutStep === 'upload-proof'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-neutral-200 text-neutral-400'
          }`}>
            2. PhonePe QR Payment & Proof
          </div>
        </div>
      </div>

      {/* Main Checkout View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form / Payment View (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {checkoutStep === 'address-review' ? (
            /* STEP 1: Shipping Address Form */
            <form onSubmit={handleProceedToPayment} className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                <MapPin className="w-5 h-5 text-[#9E3809]" />
                <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E]">
                  Confirm Delivery Shipping Address
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Recipient Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="checkout-fullname"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      autoComplete="off"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      10-Digit Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="checkout-mobile"
                      value={shippingAddress.mobile}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, mobile: e.target.value })}
                      placeholder="10-digit mobile number"
                      autoComplete="off"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    House / Flat No. & Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="checkout-addressline"
                    value={shippingAddress.addressLine1}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                    placeholder="e.g. Flat 302, Sacred Heights, Near Ganga Ghat"
                    autoComplete="off"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="checkout-city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="City"
                      autoComplete="off"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="checkout-state"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      placeholder="State"
                      autoComplete="off"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="checkout-pincode"
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      placeholder="6 digits"
                      maxLength={6}
                      autoComplete="off"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Landmark / Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    id="checkout-landmark"
                    value={shippingAddress.landmark || ''}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, landmark: e.target.value })}
                    placeholder="e.g. Near Hanuman Temple"
                    autoComplete="off"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                  />
                </div>
              </div>

              {/* Payment Mode Note */}
              <div className="p-4 rounded-2xl bg-neutral-900 text-white flex items-center justify-between gap-3 border border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5f259f] flex items-center justify-center text-white font-bold text-lg">
                    <span className="font-serif-spiritual">पे</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold">Exclusive Payment Mode: PhonePe QR</div>
                    <div className="text-[11px] text-neutral-400">
                      Scan PhonePe QR code and upload confirmation screenshot
                    </div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-amber-400 font-mono">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                id="generate-phonepe-qr-btn"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9E3809] to-[#B84A14] hover:from-[#802204] hover:to-[#9E3809] text-white font-bold text-sm shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <span>Continue to PhonePe QR Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: PhonePe QR Display & Payment Screenshot Upload */
            <div className="space-y-6">
              {/* Official PhonePe QR Component */}
              <PhonePeQRCodeCard
                amount={cartTotal}
                orderId={createdOrderId || undefined}
              />

              {/* Screenshot Upload Form */}
              <form onSubmit={handleSubmitProof} className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                  <FileImage className="w-5 h-5 text-[#9E3809]" />
                  <div>
                    <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E]">
                      Upload Payment Confirmation Screenshot
                    </h2>
                    <p className="text-[11px] text-neutral-500">
                      Mandatory step: upload the screenshot after completing payment via PhonePe.
                    </p>
                  </div>
                </div>

                {uploadError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Drag and drop upload box */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                    screenshotPreview
                      ? 'border-emerald-400 bg-emerald-50/20'
                      : 'border-[#E0D7C3] hover:border-[#9E3809] bg-[#FAF8F5]'
                  }`}
                >
                  <input
                    type="file"
                    id="phonepe-screenshot-file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="phonepe-screenshot-file-input" className="cursor-pointer block">
                    {screenshotPreview ? (
                      <div className="space-y-3">
                        <div className="w-32 h-40 mx-auto rounded-xl overflow-hidden shadow-md border-2 border-emerald-400 relative">
                          <img
                            src={screenshotPreview}
                            alt="Payment Screenshot Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Screenshot Selected: {screenshotFile?.name || 'Uploaded proof'}</span>
                        </div>
                        <span className="text-[11px] text-[#9E3809] underline block">
                          Click to choose a different screenshot
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9E3809] flex items-center justify-center mx-auto shadow-inner">
                          <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-neutral-800">
                          Click to select PhonePe payment screenshot or drag & drop here
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          Supported formats: JPG, PNG, WEBP (Max 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Optional UTR Number Input */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    UPI Transaction ID / 12-Digit UTR Number (Recommended)
                  </label>
                  <input
                    type="text"
                    id="payment-utr-input"
                    value={transactionUtr}
                    onChange={(e) => setTransactionUtr(e.target.value)}
                    placeholder="e.g. 412345678901 (visible in PhonePe payment details)"
                    autoComplete="off"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809] font-mono"
                  />
                </div>

                {/* Verification Notice */}
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-600 text-[11px] space-y-1">
                  <p className="font-semibold text-neutral-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#9E3809]" />
                    <span>How Payment Verification Works:</span>
                  </p>
                  <p>
                    1. Once you submit this proof, your order is recorded under <strong>Payment Verification Pending</strong>.
                  </p>
                  <p>
                    2. Our administrative team will verify the screenshot against the merchant bank record and confirm your dispatch.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="submit-payment-proof-btn"
                  disabled={!screenshotPreview || isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9E3809] to-[#B84A14] hover:from-[#802204] hover:to-[#9E3809] text-white font-bold text-sm shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Proof...' : 'Submit Payment Proof & Confirm Order'}</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Order Itemized Review (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8DFC8] p-6 shadow-sm space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E]">
              Order Summary
            </h2>
            {createdOrderId && (
              <span className="text-[11px] font-mono font-bold text-[#9E3809] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                #{createdOrderId}
              </span>
            )}
          </div>

          {/* Ordered Products List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cart.map(({ productId, product, quantity }) => (
              <div key={productId} className="flex items-center gap-3 text-xs">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E8DFC8]">
                  <img src={product.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-neutral-800 truncate">{product.name}</h4>
                  <p className="text-[10px] text-neutral-500">
                    Qty: {quantity} × ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="font-bold text-neutral-900 shrink-0">
                  ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-neutral-800">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Shipping Fee:</span>
              <span className="font-semibold">
                {cartShippingFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `₹${cartShippingFee}`
                )}
              </span>
            </div>

            <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-neutral-900">Total Amount:</span>
              <span className="text-2xl font-black text-[#9E3809] font-sans">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Sourcing & Consecration Note */}
          <div className="p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#E0D7C3] flex items-start gap-2.5 text-[11px] text-neutral-700">
            <Sparkles className="w-4 h-4 text-[#9E3809] shrink-0 mt-0.5" />
            <p>
              All sacred items are safely cleansed and consecrated prior to express Pan-India shipping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
