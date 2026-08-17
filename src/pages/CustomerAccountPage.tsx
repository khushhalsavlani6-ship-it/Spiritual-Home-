import React, { useState } from 'react';
import {
  Package,
  User,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Truck,
  Eye,
  LogOut,
  Upload,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Search,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';

export const CustomerAccountPage: React.FC = () => {
  const {
    currentCustomer,
    orders,
    logoutCustomer,
    submitPaymentProof,
    updateCustomerProfile,
    setCurrentPage,
    setIsAuthModalOpen,
    setAuthModalMode,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'track' | 'profile'>('orders');
  const [selectedOrderForScreenshot, setSelectedOrderForScreenshot] = useState<Order | null>(null);
  const [reuploadOrderId, setReuploadOrderId] = useState<string | null>(null);
  const [reuploadFile, setReuploadFile] = useState<string | null>(null);
  const [reuploadUtr, setReuploadUtr] = useState<string>('');

  // Order tracking specific state
  const [trackSearchId, setTrackSearchId] = useState<string>('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [trackSearchError, setTrackSearchError] = useState<string>('');
  const [copiedTracking, setCopiedTracking] = useState<boolean>(false);

  // Profile edit state
  const [fullName, setFullName] = useState(currentCustomer?.fullName || '');
  const [mobile, setMobile] = useState(currentCustomer?.mobile || '');
  const [addressLine1, setAddressLine1] = useState(currentCustomer?.shippingAddress?.addressLine1 || '');
  const [city, setCity] = useState(currentCustomer?.shippingAddress?.city || '');
  const [state, setState] = useState(currentCustomer?.shippingAddress?.state || '');
  const [pincode, setPincode] = useState(currentCustomer?.shippingAddress?.pincode || '');

  // Filter only this customer's orders
  const myOrders = currentCustomer ? orders.filter((o) => o.customerId === currentCustomer.id) : [];

  // Handle Order Status Lookup
  const handleTrackSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTrackSearchError('');
    const cleanQuery = trackSearchId.trim().toUpperCase().replace('#', '');
    if (!cleanQuery) {
      setTrackSearchError('Please enter an Order ID or 10-digit mobile number.');
      return;
    }

    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === cleanQuery ||
        o.customerPhone.includes(cleanQuery) ||
        o.customerEmail.toLowerCase() === cleanQuery.toLowerCase() ||
        (o.paymentReference && o.paymentReference.toUpperCase().includes(cleanQuery))
    );

    if (found) {
      setTrackedOrder(found);
      setTrackSearchError('');
    } else {
      setTrackedOrder(null);
      setTrackSearchError(`No order found matching "${trackSearchId}". Please double-check your Order ID.`);
    }
  };

  const handleSelectOrderToTrack = (order: Order) => {
    setTrackedOrder(order);
    setTrackSearchId(order.id);
    setActiveTab('track');
  };

  const handleCopyTrackingNumber = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedTracking(true);
    showToast('Tracking ID copied to clipboard.');
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3" /> Pending Payment
          </span>
        );
      case 'PAYMENT_VERIFICATION_PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3 h-3" /> Payment Under Verification
          </span>
        );
      case 'PAYMENT_CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3 h-3" /> Payment Confirmed
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
            <Sparkles className="w-3 h-3" /> Packaging & Consecrating
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <Truck className="w-3 h-3" /> Shipped / In Transit
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
            <CheckCircle className="w-3 h-3" /> Delivered
          </span>
        );
      case 'PAYMENT_REJECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3 h-3" /> Payment Proof Rejected
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-neutral-200 text-neutral-700">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const getTimelineSteps = (order: Order) => {
    const statusOrder: OrderStatus[] = [
      'PENDING_PAYMENT',
      'PAYMENT_VERIFICATION_PENDING',
      'PAYMENT_CONFIRMED',
      'PROCESSING',
      'SHIPPED',
      'DELIVERED'
    ];

    const currentStatusIndex = statusOrder.indexOf(order.status);
    const isRejected = order.status === 'PAYMENT_REJECTED';
    const isCancelled = order.status === 'CANCELLED';

    const steps = [
      {
        title: 'Order Placed & UPI Receipt Generated',
        description: `Order #${order.id} registered for ₹${order.totalAmount.toLocaleString('en-IN')}. PhonePe QR generated.`,
        date: new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
        completed: true,
        current: order.status === 'PENDING_PAYMENT'
      },
      {
        title: 'PhonePe Payment Verification',
        description: isRejected
          ? `Proof rejected: ${order.rejectionReason || 'Screenshot did not match bank statement.'}`
          : order.paymentScreenshotUrl
          ? (currentStatusIndex >= 2 ? 'Payment verified & approved by Spiritual Home admin.' : 'Payment proof submitted. Admin checking bank records.')
          : 'Awaiting customer payment screenshot upload.',
        date: order.paymentTimestamp
          ? new Date(order.paymentTimestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
          : undefined,
        completed: currentStatusIndex >= 2,
        current: order.status === 'PAYMENT_VERIFICATION_PENDING' || isRejected,
        error: isRejected
      },
      {
        title: 'Vedic Consecration & Protective Packaging',
        description: 'Idol sanitized, energized with Vedic mantras, and securely packed in multi-layered velvet padding.',
        completed: currentStatusIndex >= 3,
        current: order.status === 'PAYMENT_CONFIRMED' || order.status === 'PROCESSING'
      },
      {
        title: 'Dispatched & In Transit',
        description: order.trackingNumber
          ? `Dispatched via ${order.courierName || 'Express Courier'} • AWB: ${order.trackingNumber}`
          : 'Express logistics partner assignment in progress.',
        completed: currentStatusIndex >= 4,
        current: order.status === 'SHIPPED',
        trackingNumber: order.trackingNumber,
        courierName: order.courierName
      },
      {
        title: 'Delivered to Home Altar',
        description: 'Package safely delivered with sacred blessings.',
        completed: order.status === 'DELIVERED',
        current: order.status === 'DELIVERED'
      }
    ];

    return { steps, isRejected, isCancelled };
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCustomer) return;
    updateCustomerProfile({
      fullName,
      mobile,
      shippingAddress: {
        ...currentCustomer.shippingAddress,
        fullName,
        mobile,
        addressLine1,
        city,
        state,
        pincode
      }
    });
    showToast('Saved your profile and address details.');
  };

  const handleReuploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setReuploadFile(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleReuploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reuploadOrderId || !reuploadFile) return;
    submitPaymentProof(reuploadOrderId, reuploadFile, reuploadUtr || undefined);
    setReuploadOrderId(null);
    setReuploadFile(null);
    setReuploadUtr('');
  };

  // If NOT logged in as customer, show Guest Order Tracking Lookup + Sign In option
  if (!currentCustomer) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in">
        {/* Guest Tracking Card */}
        <div className="bg-white rounded-3xl border border-[#E8DFC8] p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-[#9E3809] flex items-center justify-center mx-auto shadow-sm">
              <Truck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold font-serif-spiritual text-[#2C241E]">
              Check Order Status & Live Tracking
            </h1>
            <p className="text-xs text-neutral-500">
              Enter your Order ID (e.g. #ORD-XXXX) or registered Mobile Number to track your sacred brass idol shipment in real-time.
            </p>
          </div>

          <form onSubmit={handleTrackSearch} className="max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={trackSearchId}
                onChange={(e) => setTrackSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-123456) or Mobile"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E0D7C3] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9E3809] font-mono"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-bold rounded-2xl shadow-md transition-colors cursor-pointer shrink-0"
            >
              Track Status
            </button>
          </form>

          {trackSearchError && (
            <div className="max-w-md mx-auto p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{trackSearchError}</span>
            </div>
          )}

          {/* Tracked Order Result for Guest */}
          {trackedOrder && (
            <div className="border-t border-[#E8DFC8] pt-6 space-y-6">
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E8DFC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#9E3809] block">
                    Order #{trackedOrder.id}
                  </span>
                  <h3 className="text-sm font-bold text-[#2C241E] mt-0.5">
                    {trackedOrder.customerName}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Placed on {new Date(trackedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Total: <strong className="text-neutral-900 font-sans">₹{trackedOrder.totalAmount.toLocaleString('en-IN')}</strong>
                  </p>
                </div>
                <div>{getStatusBadge(trackedOrder.status)}</div>
              </div>

              {/* Visual Tracking Progress */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono">
                  Live Order Lifecycle Timeline
                </h4>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                  {getTimelineSteps(trackedOrder).steps.map((step, idx) => (
                    <div key={idx} className="relative group">
                      <div
                        className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 transition-all ${
                          step.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : step.current
                            ? 'bg-amber-500 border-amber-500 animate-pulse'
                            : 'bg-white border-neutral-300'
                        }`}
                      />
                      <div className="text-xs space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold ${step.completed || step.current ? 'text-neutral-900' : 'text-neutral-400'}`}>
                            {step.title}
                          </span>
                          {step.date && (
                            <span className="text-[10px] text-neutral-400 font-mono">{step.date}</span>
                          )}
                        </div>
                        <p className={`text-[11px] leading-relaxed ${step.error ? 'text-red-600 font-semibold' : 'text-neutral-500'}`}>
                          {step.description}
                        </p>

                        {step.trackingNumber && (
                          <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
                            <div className="text-xs text-purple-900">
                              <span className="text-[10px] uppercase font-bold text-purple-700 block">Courier AWB ID</span>
                              <strong className="font-mono">{step.trackingNumber}</strong> ({step.courierName})
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyTrackingNumber(step.trackingNumber!)}
                              className="px-2.5 py-1 bg-white border border-purple-300 hover:bg-purple-100 rounded-lg text-xs font-semibold text-purple-800 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedTracking ? 'Copied' : 'Copy AWB'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Devotee Login / Register Banner */}
          <div className="p-6 bg-gradient-to-r from-amber-50 to-[#FAF8F5] border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-[#2C241E]">
                Have a Spiritual Home Customer Account?
              </h3>
              <p className="text-xs text-neutral-500">
                Sign in to view your complete order history, download invoices, and save your puja altar shipping address.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="px-5 py-2.5 bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-bold rounded-xl shadow-sm shrink-0 cursor-pointer"
            >
              Sign In to Customer Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Account Header */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9E3809] to-[#B84A14] text-white text-2xl font-bold flex items-center justify-center shadow-md font-serif-spiritual">
            {currentCustomer.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#9E3809] text-[10px] font-bold mb-1">
              <Sparkles className="w-3 h-3" /> Devotee Member
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif-spiritual text-[#2C241E]">
              {currentCustomer.fullName}
            </h1>
            <p className="text-xs text-neutral-500 flex flex-wrap items-center gap-3 mt-1">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#9E3809]" /> {currentCustomer.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#9E3809]" /> {currentCustomer.mobile}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={logoutCustomer}
            className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E8DFC8] gap-4 sm:gap-6 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'orders'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Order History ({myOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('track');
            if (myOrders.length > 0 && !trackedOrder) {
              setTrackedOrder(myOrders[0]);
              setTrackSearchId(myOrders[0].id);
            }
          }}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'track'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span className="relative">
            Check Order Status & Live Tracking
            <span className="ml-1.5 px-1.5 py-0.2 bg-amber-100 text-[#9E3809] text-[10px] rounded-full font-bold">
              Live
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'profile'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Shipping Address</span>
        </button>
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {myOrders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E8DFC8] p-12 text-center">
              <Package className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-800 font-serif-spiritual">
                No Sacred Orders Placed Yet
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Explore our catalog of authentic solid brass Lord Ram, Hanuman, and Ram Darbar idols.
              </p>
              <button
                type="button"
                onClick={() => setCurrentPage('shop')}
                className="mt-4 px-5 py-2.5 bg-[#9E3809] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Browse Sacred Idols
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-[#E8DFC8] p-6 shadow-sm space-y-4 hover:border-amber-300 transition-colors"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-100 gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#9E3809] mr-3">
                        Order #{order.id}
                      </span>
                      <span className="text-xs text-neutral-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                      <button
                        type="button"
                        onClick={() => handleSelectOrderToTrack(order)}
                        className="px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#9E3809] rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Live Status</span>
                      </button>
                    </div>
                  </div>

                  {/* Rejected Alert with Re-upload option */}
                  {order.status === 'PAYMENT_REJECTED' && (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <strong>Payment Proof Rejected by Admin:</strong>
                        <p className="mt-0.5 text-[11px] text-rose-700">
                          Reason: {order.rejectionReason || 'Screenshot did not match bank statement.'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReuploadOrderId(order.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shrink-0 cursor-pointer"
                      >
                        Re-Upload Valid Screenshot
                      </button>
                    </div>
                  )}

                  {/* Tracking info if shipped */}
                  {order.trackingNumber && (
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-purple-700 shrink-0" />
                        <span>
                          Courier: <strong>{order.courierName || 'Blue Dart Express'}</strong> • Tracking ID: <strong className="font-mono">{order.trackingNumber}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectOrderToTrack(order)}
                        className="text-xs text-purple-800 hover:underline font-bold text-left cursor-pointer"
                      >
                        View Full Tracking Timeline →
                      </button>
                    </div>
                  )}

                  {/* Items List */}
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-[#E8DFC8]" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-bold text-neutral-800 block text-xs sm:text-sm">{item.name}</span>
                            <span className="text-[11px] text-neutral-500">Qty: {item.quantity} • Category: {item.category}</span>
                          </div>
                        </div>
                        <span className="font-bold text-neutral-900 font-sans">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer details */}
                  <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="text-neutral-500">
                      <span>Delivery Address: </span>
                      <strong className="text-neutral-800">{order.shippingAddress.addressLine1}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</strong>
                    </div>

                    <div className="flex items-center gap-4">
                      {order.paymentScreenshotUrl && (
                        <button
                          type="button"
                          onClick={() => setSelectedOrderForScreenshot(order)}
                          className="text-xs text-[#9E3809] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Payment Proof</span>
                        </button>
                      )}

                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 block">Total Amount</span>
                        <span className="text-base font-extrabold text-[#9E3809] font-sans">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CHECK ORDER STATUS & LIVE TRACKING */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-lg font-bold font-serif-spiritual text-[#2C241E] flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#9E3809]" />
                  <span>Check Order Status & Live Shipment Tracking</span>
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Inspect real-time PhonePe payment approval status, consecration progress, and express courier tracking.
                </p>
              </div>

              {/* Order Quick Selector if customer has multiple orders */}
              {myOrders.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 font-semibold shrink-0">Your Orders:</span>
                  <select
                    value={trackedOrder?.id || ''}
                    onChange={(e) => {
                      const sel = myOrders.find((o) => o.id === e.target.value);
                      if (sel) handleSelectOrderToTrack(sel);
                    }}
                    className="px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E0D7C3] rounded-xl font-mono focus:outline-none cursor-pointer"
                  >
                    {myOrders.map((o) => (
                      <option key={o.id} value={o.id}>
                        #{o.id} ({o.status.replace(/_/g, ' ')})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Search / Lookup Bar */}
            <form onSubmit={handleTrackSearch} className="flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={trackSearchId}
                  onChange={(e) => setTrackSearchId(e.target.value)}
                  placeholder="Search by Order ID (e.g. ORD-123456) or Mobile Number"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809] font-mono"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Check Status
              </button>
            </form>

            {trackSearchError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{trackSearchError}</span>
              </div>
            )}

            {/* Active Tracked Order Details */}
            {trackedOrder ? (
              <div className="space-y-6 pt-2">
                {/* Summary Card */}
                <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E8DFC8] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#9E3809]">
                        Order #{trackedOrder.id}
                      </span>
                      <span>•</span>
                      <span className="text-xs text-neutral-500">
                        {new Date(trackedOrder.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">
                      {trackedOrder.customerName} ({trackedOrder.customerPhone})
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Destination: {trackedOrder.shippingAddress.addressLine1}, {trackedOrder.shippingAddress.city}, {trackedOrder.shippingAddress.state} - {trackedOrder.shippingAddress.pincode}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div>{getStatusBadge(trackedOrder.status)}</div>
                    <div className="text-xs">
                      <span className="text-neutral-400">Total Paid: </span>
                      <strong className="text-base text-[#9E3809] font-sans font-bold">
                        ₹{trackedOrder.totalAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono">
                    Sacred Order Progress & Fulfillment Stages
                  </h4>

                  <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                    {getTimelineSteps(trackedOrder).steps.map((step, idx) => (
                      <div key={idx} className="relative group">
                        <div
                          className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                            step.completed
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : step.current
                              ? 'bg-amber-500 border-amber-500 animate-pulse'
                              : 'bg-white border-neutral-300'
                          }`}
                        >
                          {step.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>

                        <div className="text-xs space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span
                              className={`font-bold text-sm ${
                                step.completed ? 'text-emerald-900' : step.current ? 'text-[#9E3809]' : 'text-neutral-400'
                              }`}
                            >
                              {step.title}
                            </span>
                            {step.date && (
                              <span className="text-[10px] text-neutral-400 font-mono bg-white px-2 py-0.5 rounded border border-neutral-200">
                                {step.date}
                              </span>
                            )}
                          </div>

                          <p className={`text-xs leading-relaxed ${step.error ? 'text-rose-700 font-semibold' : 'text-neutral-600'}`}>
                            {step.description}
                          </p>

                          {/* Live Courier Details Card */}
                          {step.trackingNumber && (
                            <div className="mt-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="space-y-0.5">
                                <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider block">
                                  Express Air Logistics Partner
                                </span>
                                <div className="text-xs text-purple-950 font-bold flex items-center gap-2">
                                  <span>{step.courierName || 'Blue Dart Express'}</span>
                                  <span>•</span>
                                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-purple-200 text-purple-900">
                                    AWB: {step.trackingNumber}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleCopyTrackingNumber(step.trackingNumber!)}
                                  className="px-3 py-1.5 bg-white border border-purple-300 hover:bg-purple-100 rounded-xl text-xs font-bold text-purple-900 flex items-center gap-1.5 cursor-pointer shadow-sm"
                                >
                                  {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{copiedTracking ? 'Copied!' : 'Copy AWB'}</span>
                                </button>

                                <a
                                  href={`https://www.google.com/search?q=${encodeURIComponent(`${step.courierName || 'Blue Dart'} tracking ${step.trackingNumber}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                                >
                                  <span>Live Partner Tracking</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items in Tracked Order */}
                <div className="pt-4 border-t border-neutral-100 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono">
                    Sacred Idols In This Order ({trackedOrder.items.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {trackedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-2xl border border-[#E8DFC8] flex items-center gap-3">
                        <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-[#E8DFC8]" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-neutral-900 truncate">{item.name}</h5>
                          <p className="text-[11px] text-neutral-500">Qty: {item.quantity} • ₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#E0D7C3]">
                <Search className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-xs text-neutral-500 font-medium">
                  Enter an Order ID above or select one from your Order History tab to view live tracking.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PROFILE & SHIPPING ADDRESS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm max-w-2xl">
          <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E] border-b pb-3 mb-6">
            Default Customer Information & Shipping Altar
          </h2>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Mobile Number (WhatsApp Enabled)</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Shipping Street Address</label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E0D7C3] rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E0D7C3] rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">PIN Code</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E0D7C3] rounded-xl"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-bold cursor-pointer"
            >
              Save Address Profile
            </button>
          </form>
        </div>
      )}

      {/* Screenshot Viewer Modal */}
      {selectedOrderForScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-neutral-900 font-serif-spiritual">
                Payment Screenshot for #{selectedOrderForScreenshot.id}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedOrderForScreenshot(null)}
                className="text-neutral-500 hover:text-black cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {selectedOrderForScreenshot.paymentScreenshotUrl ? (
              <div className="rounded-2xl overflow-hidden border border-neutral-200 max-h-96 flex items-center justify-center bg-neutral-950">
                <img
                  src={selectedOrderForScreenshot.paymentScreenshotUrl}
                  alt="Payment Confirmation"
                  className="max-w-full max-h-96 object-contain"
                />
              </div>
            ) : (
              <p className="text-xs text-neutral-500">No screenshot recorded.</p>
            )}

            <div className="text-xs text-neutral-600 space-y-1">
              <p>Amount: <strong>₹{selectedOrderForScreenshot.totalAmount}</strong></p>
              <p>Reference: <span className="font-mono">{selectedOrderForScreenshot.paymentReference || 'N/A'}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Re-Upload Screenshot Modal */}
      {reuploadOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleReuploadSubmit}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-neutral-900 font-serif-spiritual">
                Re-upload Payment Proof for #{reuploadOrderId}
              </h3>
              <button
                type="button"
                onClick={() => setReuploadOrderId(null)}
                className="text-neutral-500 hover:text-black cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Select Correct PhonePe Payment Screenshot
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleReuploadFile}
                className="w-full text-xs"
                required
              />
            </div>

            {reuploadFile && (
              <div className="w-28 h-36 mx-auto rounded-xl overflow-hidden border shadow-sm">
                <img src={reuploadFile} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                UTR / Transaction ID
              </label>
              <input
                type="text"
                value={reuploadUtr}
                onChange={(e) => setReuploadUtr(e.target.value)}
                placeholder="12-digit PhonePe UTR"
                autoComplete="off"
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E0D7C3] rounded-xl"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReuploadOrderId(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border border-neutral-300 text-neutral-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!reuploadFile}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-[#9E3809] text-white disabled:opacity-40 cursor-pointer"
              >
                Submit New Proof
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
