import React from 'react';
import {
  CheckCircle,
  Clock,
  Package,
  ArrowRight,
  ShieldCheck,
  MapPin,
  FileImage,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { currentCustomer, orders, setCurrentPage, storeSettings } = useStore();

  const customerOrders = currentCustomer ? orders.filter((o) => o.customerId === currentCustomer.id) : [];
  const latestOrder = customerOrders[0];

  if (!latestOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in">
        <h2 className="text-xl font-bold text-neutral-800">No Recent Order Found</h2>
        <button
          type="button"
          onClick={() => setCurrentPage('shop')}
          className="mt-4 px-5 py-2.5 bg-[#9E3809] text-white text-xs font-bold rounded-xl"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Top Success Banner */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-8 text-center shadow-md relative overflow-hidden">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-[#9E3809] flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-[#9E3809]" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
          Status: Payment Verification Pending
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif-spiritual text-[#2C241E]">
          Order #{latestOrder.id} Placed Successfully!
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed">
          Thank you for choosing <strong>{storeSettings.storeName}</strong>. We have received your PhonePe payment proof and our team is currently verifying the transaction.
        </p>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => setCurrentPage('customer-account')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Package className="w-4 h-4" />
            <span>Track in My Order History</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('shop')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F3ECE0] border border-[#E8DFC8] text-neutral-800 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Order Details Breakdown Card */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E] border-b border-neutral-100 pb-3">
          Order Summary & Payment Proof
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Shipping Details */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-2">
            <h4 className="font-bold text-neutral-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9E3809]" />
              <span>Shipping Destination</span>
            </h4>
            <p className="font-semibold text-neutral-900">{latestOrder.shippingAddress.fullName}</p>
            <p className="text-neutral-600">{latestOrder.shippingAddress.addressLine1}</p>
            <p className="text-neutral-600">
              {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.state} - {latestOrder.shippingAddress.pincode}
            </p>
            <p className="text-neutral-600">Mobile: {latestOrder.shippingAddress.mobile}</p>
          </div>

          {/* Payment Proof Details */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-2">
            <h4 className="font-bold text-neutral-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>PhonePe Payment Record</span>
            </h4>
            <p className="text-neutral-600">
              Merchant UPI: <strong className="font-mono text-neutral-800">{latestOrder.upiId}</strong>
            </p>
            <p className="text-neutral-600">
              Amount Paid: <strong className="text-neutral-900 font-bold">₹{latestOrder.totalAmount.toLocaleString('en-IN')}</strong>
            </p>
            <p className="text-neutral-600">
              Reference / UTR: <span className="font-mono">{latestOrder.paymentReference || 'Direct PhonePe Screenshot'}</span>
            </p>
            {latestOrder.paymentScreenshotUrl && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-emerald-700 font-medium">✓ Screenshot Attached</span>
              </div>
            )}
          </div>
        </div>

        {/* Item list */}
        <div>
          <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
            Ordered Items ({latestOrder.items.reduce((s, i) => s + i.quantity, 0)})
          </h4>
          <div className="space-y-3">
            {latestOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8]/60 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-800">{item.name}</h5>
                    <p className="text-[10px] text-neutral-500">
                      SKU: {item.sku} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-neutral-900">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
