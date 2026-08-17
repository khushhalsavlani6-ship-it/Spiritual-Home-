import React, { useState } from 'react';
import {
  ShieldCheck,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Plus,
  Edit2,
  Trash2,
  Truck,
  TrendingUp,
  AlertTriangle,
  Lock,
  LogOut,
  Search,
  Check,
  CheckCheck,
  Save,
  RotateCcw,
  Sparkles,
  QrCode,
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus, Product } from '../types';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

export const AdminDashboardPage: React.FC = () => {
  const {
    isAdminAuthenticated,
    adminUsername: currentAdminUser,
    loginAdmin,
    logoutAdmin,
    orders,
    products,
    allCustomers: customers,
    updateOrderStatus,
    approvePayment,
    rejectPayment,
    addProduct,
    updateProduct,
    deleteProduct,
    storeSettings,
    updateStoreSettings,
    showToast,
    setCurrentPage
  } = useStore();

  // Admin login form state (always blank initially - requires entering User ID and Password every time)
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<'verifications' | 'orders' | 'products' | 'customers' | 'settings'>('verifications');

  // Verification & Order modals
  const [viewScreenshotOrder, setViewScreenshotOrder] = useState<Order | null>(null);
  const [rejectingOrder, setRejectingOrder] = useState<Order | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Comprehensive Status & Logistics Update Modal
  const [statusModalOrder, setStatusModalOrder] = useState<Order | null>(null);
  const [targetStatus, setTargetStatus] = useState<OrderStatus>('PAYMENT_CONFIRMED');
  const [targetCourier, setTargetCourier] = useState('Blue Dart Express');
  const [targetTracking, setTargetTracking] = useState('');
  const [targetNotes, setTargetNotes] = useState('');
  const [targetRejectionReason, setTargetRejectionReason] = useState('');

  // Shipping Modal
  const [shippingOrder, setShippingOrder] = useState<Order | null>(null);
  const [courierName, setCourierName] = useState('Blue Dart Express');
  const [trackingNumber, setTrackingNumber] = useState('');

  // Product Add / Edit Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    sku: string;
    category: string;
    price: number;
    discountPrice: number;
    stockQuantity: number;
    description: string;
    longDescription: string;
    images: string;
    isFeatured: boolean;
    material: string;
    dimensions: string;
    weight: string;
  }>({
    name: '',
    sku: '',
    category: 'Lord Ram Idols',
    price: 1999,
    discountPrice: 2799,
    stockQuantity: 10,
    description: '',
    longDescription: '',
    images: '',
    isFeatured: false,
    material: 'Pure Solid Brass',
    dimensions: '7 x 4 x 3 inches',
    weight: '1.2 kg'
  });

  // Filters
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [searchOrderQuery, setSearchOrderQuery] = useState('');
  const [searchProductQuery, setSearchProductQuery] = useState('');

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = loginAdmin(adminUsername, adminPassword);
    if (!res.success) {
      setLoginError(res.message || 'Invalid Administrator credentials. Please enter authorized User ID and password.');
    } else {
      setAdminUsername('');
      setAdminPassword('');
    }
  };

  // If not logged in as Admin, show login screen (always asks User ID and Password)
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
        <div className="bg-white rounded-3xl border border-[#E8DFC8] p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold font-serif-spiritual text-[#2C241E]">
              Admin Control Sanctum
            </h1>
            <p className="text-xs text-neutral-500">
              Spiritual Home Operations • Order Fulfillment & Payment Verification
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-600 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#9E3809] shrink-0" />
            <span>Restricted Access: Enter your authorized administrator credentials to manage orders, payments, and catalog.</span>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Admin User ID
              </label>
              <input
                type="text"
                id="admin-username-input"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="Enter admin user ID"
                autoComplete="off"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                id="admin-password-input"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="off"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                required
              />
            </div>

            <button
              type="submit"
              id="admin-login-submit-btn"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#9E3809] to-[#B84A14] hover:from-[#802204] hover:to-[#9E3809] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="text-xs text-neutral-500 hover:text-[#9E3809] underline cursor-pointer"
            >
              Return to Public Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate high level metrics
  const pendingVerificationOrders = orders.filter((o) => o.status === 'PAYMENT_VERIFICATION_PENDING');
  const confirmedOrders = orders.filter((o) =>
    ['PAYMENT_CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(o.status)
  );
  const totalRevenue = confirmedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Filtered orders list
  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter !== 'ALL' && order.status !== orderStatusFilter) {
      return false;
    }
    if (searchOrderQuery.trim()) {
      const q = searchOrderQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchEmail = order.customerEmail.toLowerCase().includes(q);
      const matchUtr = (order.paymentReference || '').toLowerCase().includes(q);
      if (!matchId && !matchName && !matchEmail && !matchUtr) return false;
    }
    return true;
  });

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    if (searchProductQuery.trim()) {
      const q = searchProductQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handle Open Add Product
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      sku: `SH-${Date.now().toString().slice(-4)}`,
      category: 'Lord Ram Idols',
      price: 1999,
      discountPrice: 2799,
      stockQuantity: 10,
      description: '',
      longDescription: '',
      images: 'https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=600&q=80',
      isFeatured: false,
      material: 'Pure Solid Brass',
      dimensions: '6 x 4 x 3 inches',
      weight: '750 grams'
    });
    setIsProductModalOpen(true);
  };

  // Handle Open Edit Product
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      price: prod.price,
      discountPrice: prod.discountPrice || prod.price,
      stockQuantity: prod.stockQuantity,
      description: prod.description,
      longDescription: prod.longDescription || prod.description,
      images: prod.images.join('\n'),
      isFeatured: prod.isFeatured,
      material: prod.specifications.material || '',
      dimensions: prod.specifications.dimensions || '',
      weight: prod.specifications.weight || ''
    });
    setIsProductModalOpen(true);
  };

  // Handle Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const imagesArray = productForm.images
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload: Omit<Product, 'id' | 'rating' | 'reviewCount'> = {
      name: productForm.name,
      slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: productForm.sku,
      category: productForm.category,
      price: Number(productForm.price),
      discountPrice: Number(productForm.discountPrice),
      stockQuantity: Number(productForm.stockQuantity),
      inStock: Number(productForm.stockQuantity) > 0,
      description: productForm.description,
      longDescription: productForm.longDescription,
      images: imagesArray.length > 0 ? imagesArray : ['https://images.unsplash.com/photo-1567591974584-f1832b94966f?auto=format&fit=crop&w=600&q=80'],
      isFeatured: Boolean(productForm.isFeatured),
      benefits: ['Auspicious blessings', 'Vedic consecration', 'Handcrafted perfection'],
      tags: [productForm.category, 'Spiritual'],
      specifications: {
        material: productForm.material,
        dimensions: productForm.dimensions,
        weight: productForm.weight,
        origin: 'India',
        energizedBy: 'Temple Priests'
      }
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
      showToast('Product updated successfully.');
    } else {
      addProduct(productPayload);
      showToast('New sacred product added to catalog.');
    }
    setIsProductModalOpen(false);
  };

  // Handle Dispatch Order Form
  const handleDispatchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingOrder) return;
    updateOrderStatus(shippingOrder.id, 'SHIPPED', {
      trackingNumber: trackingNumber.trim() || undefined,
      courierName: courierName.trim() || undefined
    });
    setShippingOrder(null);
    setTrackingNumber('');
    showToast(`Order #${shippingOrder.id} marked as SHIPPED with tracking.`);
  };

  // Handle Reject Payment Submit
  const handleRejectPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingOrder) return;
    rejectPayment(rejectingOrder.id, rejectionReason.trim() || 'Payment screenshot did not match account statement.');
    setRejectingOrder(null);
    setRejectionReason('');
    showToast(`Order #${rejectingOrder.id} payment proof was rejected.`);
  };

  // Open Status Management Modal
  const openStatusModal = (order: Order) => {
    setStatusModalOrder(order);
    setTargetStatus(order.status);
    setTargetCourier(order.courierName || 'Blue Dart Express');
    setTargetTracking(order.trackingNumber || '');
    setTargetNotes(order.adminNotes || '');
    setTargetRejectionReason(order.rejectionReason || '');
  };

  // Handle Save Order Status & Logistics from Modal
  const handleSaveOrderStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalOrder) return;

    if (targetStatus === 'PAYMENT_CONFIRMED') {
      approvePayment(statusModalOrder.id, targetNotes);
    } else if (targetStatus === 'PAYMENT_REJECTED') {
      rejectPayment(statusModalOrder.id, targetRejectionReason || 'Payment screenshot could not be verified against bank statement.');
    } else {
      updateOrderStatus(statusModalOrder.id, targetStatus, {
        courierName: targetCourier.trim() || undefined,
        trackingNumber: targetTracking.trim() || undefined,
        adminNotes: targetNotes.trim() || undefined
      });
    }

    setStatusModalOrder(null);
  };

  // Quick Direct Status Switcher from table dropdown
  const handleQuickStatusChange = (order: Order, newStatus: OrderStatus) => {
    if (newStatus === order.status) return;

    if (newStatus === 'PAYMENT_CONFIRMED') {
      approvePayment(order.id);
    } else if (newStatus === 'PAYMENT_REJECTED') {
      setRejectingOrder(order);
    } else if (newStatus === 'SHIPPED') {
      setShippingOrder(order);
    } else {
      updateOrderStatus(order.id, newStatus);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Admin Navbar */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-1 border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Master Administrator Control</span>
          </div>
          <h1 className="text-2xl font-bold font-serif-spiritual">
            Spiritual Home Operations Hub
          </h1>
          <p className="text-xs text-neutral-400">
            Active UPI: <strong className="text-neutral-200 font-mono">{storeSettings.upiId}</strong> ({storeSettings.payeeName})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage('home')}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 font-semibold transition-colors cursor-pointer"
          >
            Preview Store
          </button>
          <button
            type="button"
            onClick={logoutAdmin}
            className="px-4 py-2 rounded-xl bg-red-900/40 hover:bg-red-900/60 border border-red-700/50 text-xs text-red-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-5 shadow-sm">
          <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Pending Proofs</div>
          <div className="text-2xl font-black text-amber-600 mt-1 font-sans">
            {pendingVerificationOrders.length}
          </div>
          <span className="text-[10px] text-neutral-400">Needs manual review</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-5 shadow-sm">
          <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Total Orders</div>
          <div className="text-2xl font-black text-[#2C241E] mt-1 font-sans">
            {orders.length}
          </div>
          <span className="text-[10px] text-neutral-400">{confirmedOrders.length} confirmed</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-5 shadow-sm">
          <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Total Revenue</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-sans">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-neutral-400">From verified PhonePe</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-5 shadow-sm">
          <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Products</div>
          <div className="text-2xl font-black text-[#2C241E] mt-1 font-sans">
            {products.length}
          </div>
          <span className="text-[10px] text-neutral-400">Active sacred catalog</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-5 shadow-sm col-span-2 lg:col-span-1">
          <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Registered Devotees</div>
          <div className="text-2xl font-black text-[#9E3809] mt-1 font-sans">
            {customers.length}
          </div>
          <span className="text-[10px] text-neutral-400">Verified customers</span>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-[#E8DFC8] gap-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setAdminTab('verifications')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-2 ${
            adminTab === 'verifications'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>PhonePe Verifications ({pendingVerificationOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('orders')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-2 ${
            adminTab === 'orders'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>All Orders ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('products')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-2 ${
            adminTab === 'products'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('customers')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-2 ${
            adminTab === 'customers'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Devotees ({customers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab('settings')}
          className={`pb-3 text-xs sm:text-sm font-bold tracking-wide border-b-2 shrink-0 cursor-pointer transition-colors flex items-center gap-2 ${
            adminTab === 'settings'
              ? 'border-[#9E3809] text-[#9E3809]'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>UPI & Store Settings</span>
        </button>
      </div>

      {/* TAB 1: PHONEPE VERIFICATION QUEUE */}
      {adminTab === 'verifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-serif-spiritual text-[#2C241E]">
                Payment Verification Queue
              </h2>
              <p className="text-xs text-neutral-500">
                Inspect customer PhonePe payment confirmation screenshots and approve or reject orders.
              </p>
            </div>
          </div>

          {pendingVerificationOrders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E8DFC8] p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-800 font-serif-spiritual">
                All PhonePe Payments Cleared!
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                There are no pending payment confirmation proofs awaiting administrator verification.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingVerificationOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-sm space-y-4 relative"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#9E3809]">
                        Order #{order.id}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 mt-0.5">
                        {order.customerName}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {order.customerEmail} • {order.customerMobile}
                      </p>
                    </div>

                    <span className="text-lg font-black text-[#9E3809] font-sans">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Screenshot Thumbnail & UTR */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center gap-4">
                    {order.paymentScreenshotUrl ? (
                      <button
                        type="button"
                        onClick={() => setViewScreenshotOrder(order)}
                        className="w-20 h-24 rounded-xl overflow-hidden border border-neutral-300 relative group shrink-0 cursor-pointer shadow-sm"
                      >
                        <img
                          src={order.paymentScreenshotUrl}
                          alt="Screenshot"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity">
                          View
                        </div>
                      </button>
                    ) : (
                      <div className="w-20 h-24 rounded-xl bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-500 text-center p-1">
                        No image uploaded
                      </div>
                    )}

                    <div className="flex-1 text-xs space-y-1">
                      <div className="text-neutral-500">
                        Submitted UTR: <strong className="font-mono text-neutral-800">{order.paymentReference || 'None entered'}</strong>
                      </div>
                      <div className="text-neutral-500">
                        Time: {new Date(order.createdAt).toLocaleTimeString('en-IN')}
                      </div>
                      <div className="text-neutral-500">
                        Items: {order.items.length} items (Total Qty: {order.items.reduce((s, i) => s + i.quantity, 0)})
                      </div>
                      {order.paymentScreenshotUrl && (
                        <button
                          type="button"
                          onClick={() => setViewScreenshotOrder(order)}
                          className="text-[#9E3809] underline font-bold text-[11px] block pt-1 cursor-pointer"
                        >
                          Enlarge PhonePe Screenshot →
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setRejectingOrder(order)}
                      className="py-2.5 px-3 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Proof</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openStatusModal(order)}
                      className="py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Update Status</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => approvePayment(order.id)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Payment</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ORDER MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-serif-spiritual text-[#2C241E]">
                Order Management & Status Control
              </h2>
              <p className="text-xs text-neutral-500">
                Update live order stages, verify PhonePe payments, assign courier tracking AWB, and manage fulfillment.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchOrderQuery}
                  onChange={(e) => setSearchOrderQuery(e.target.value)}
                  placeholder="Search ID, customer, UTR..."
                  className="pl-8 pr-3 py-2 text-xs bg-white border border-[#E8DFC8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#9E3809]"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="py-2 px-3 text-xs font-semibold bg-white border border-[#E8DFC8] rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Order Statuses</option>
                <option value="PAYMENT_VERIFICATION_PENDING">Pending Verification</option>
                <option value="PAYMENT_CONFIRMED">Payment Confirmed</option>
                <option value="PROCESSING">Processing / Consecration</option>
                <option value="SHIPPED">Shipped / Dispatched</option>
                <option value="DELIVERED">Delivered</option>
                <option value="PAYMENT_REJECTED">Payment Rejected</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E8DFC8] text-neutral-600 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Order ID & Date</th>
                    <th className="py-3.5 px-4">Customer & Contact</th>
                    <th className="py-3.5 px-4">Items & Amount</th>
                    <th className="py-3.5 px-4">Current Status & Quick Change</th>
                    <th className="py-3.5 px-4 text-right">Fulfillment & Verification Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF8F5]/80">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-[#9E3809] block">#{order.id}</span>
                        <span className="text-[11px] text-neutral-400">
                          {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </span>
                        {order.paymentReference && (
                          <span className="text-[10px] font-mono text-neutral-500 block truncate max-w-[140px]">
                            UTR: {order.paymentReference}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-neutral-900 block">{order.customerName}</span>
                        <span className="text-[11px] text-neutral-500 block">{order.customerMobile}</span>
                        <span className="text-[10px] text-neutral-400 truncate max-w-xs block">
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-neutral-900 font-sans block">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          {order.items.length} item types ({order.items.reduce((s, i) => s + i.quantity, 0)} pcs)
                        </span>
                      </td>

                      <td className="py-3.5 px-4 space-y-1.5">
                        <div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            order.status === 'PAYMENT_CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                            order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'DELIVERED' ? 'bg-teal-100 text-teal-800' :
                            order.status === 'PROCESSING' ? 'bg-indigo-100 text-indigo-800' :
                            order.status === 'PAYMENT_VERIFICATION_PENDING' ? 'bg-amber-100 text-amber-800 font-bold' :
                            order.status === 'PAYMENT_REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-neutral-100 text-neutral-700'
                          }`}>
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        {/* Direct Inline Status Dropdown */}
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-neutral-400 font-medium">Set:</span>
                          <select
                            value={order.status}
                            onChange={(e) => handleQuickStatusChange(order, e.target.value as OrderStatus)}
                            className="text-[11px] font-medium bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#9E3809] cursor-pointer"
                          >
                            <option value="PENDING_PAYMENT">Pending Payment</option>
                            <option value="PAYMENT_VERIFICATION_PENDING">Under Verification</option>
                            <option value="PAYMENT_CONFIRMED">Payment Confirmed</option>
                            <option value="PROCESSING">Processing / Consecration</option>
                            <option value="SHIPPED">Shipped / In Transit</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="PAYMENT_REJECTED">Payment Rejected</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        {/* Primary Quick Actions depending on status */}
                        {order.status === 'PAYMENT_VERIFICATION_PENDING' && (
                          <button
                            type="button"
                            onClick={() => approvePayment(order.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm inline-flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verify Payment</span>
                          </button>
                        )}

                        {order.status === 'PAYMENT_CONFIRMED' && (
                          <button
                            type="button"
                            onClick={() => updateOrderStatus(order.id, 'PROCESSING')}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
                          >
                            Mark Processing
                          </button>
                        )}

                        {order.status === 'PROCESSING' && (
                          <button
                            type="button"
                            onClick={() => setShippingOrder(order)}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm inline-flex items-center gap-1"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Dispatch Order</span>
                          </button>
                        )}

                        {order.status === 'SHIPPED' && (
                          <button
                            type="button"
                            onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm inline-flex items-center gap-1"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>Mark Delivered</span>
                          </button>
                        )}

                        {/* Detailed Status & Logistics Update Button */}
                        <button
                          type="button"
                          onClick={() => openStatusModal(order)}
                          className="px-2.5 py-1.5 bg-[#F3ECE0] hover:bg-[#E8DFC8] text-[#9E3809] border border-[#E0D7C3] rounded-xl text-xs font-bold cursor-pointer inline-flex items-center gap-1 transition-colors"
                          title="Update Status & Logistics"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span>Manage Status</span>
                        </button>

                        {order.paymentScreenshotUrl && (
                          <button
                            type="button"
                            onClick={() => setViewScreenshotOrder(order)}
                            className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl inline-block align-middle cursor-pointer transition-colors"
                            title="View PhonePe Screenshot"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCT MANAGEMENT */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-serif-spiritual text-[#2C241E]">
                Sacred Product Catalog Management
              </h2>
              <p className="text-xs text-neutral-500">
                Add, edit, change pricing, and maintain inventory for spiritual products.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchProductQuery}
                  onChange={(e) => setSearchProductQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-8 pr-3 py-2 text-xs bg-white border border-[#E8DFC8] rounded-xl focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <button
                type="button"
                id="admin-add-product-btn"
                onClick={handleOpenAddProduct}
                className="px-4 py-2 rounded-xl bg-[#9E3809] hover:bg-[#802204] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Sacred Product</span>
              </button>
            </div>
          </div>

          {/* Product Grid / Table */}
          <div className="bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E8DFC8] text-neutral-600 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Item & Image</th>
                    <th className="py-3.5 px-4">Category & SKU</th>
                    <th className="py-3.5 px-4">Price (₹)</th>
                    <th className="py-3.5 px-4">Stock Level</th>
                    <th className="py-3.5 px-4">Featured</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF8F5]/80">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E8DFC8]">
                            <img src={prod.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <span className="font-bold text-neutral-900 block leading-tight">{prod.name}</span>
                            <span className="text-[10px] text-neutral-400">ID: {prod.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-neutral-800 block">{prod.category}</span>
                        <span className="font-mono text-[11px] text-neutral-400">{prod.sku}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-extrabold text-neutral-900 font-sans">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.discountPrice && prod.discountPrice > prod.price && (
                          <span className="text-[10px] text-neutral-400 line-through block">
                            MRP: ₹{prod.discountPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateProduct(prod.id, { stockQuantity: Math.max(0, prod.stockQuantity - 1) })}
                            className="w-5 h-5 rounded bg-neutral-100 hover:bg-neutral-200 text-center font-bold text-neutral-700 cursor-pointer"
                          >
                            -
                          </button>
                          <span className={`font-bold min-w-6 text-center ${prod.stockQuantity <= 3 ? 'text-red-600' : 'text-neutral-800'}`}>
                            {prod.stockQuantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateProduct(prod.id, { stockQuantity: prod.stockQuantity + 1 })}
                            className="w-5 h-5 rounded bg-neutral-100 hover:bg-neutral-200 text-center font-bold text-neutral-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => updateProduct(prod.id, { isFeatured: !prod.isFeatured })}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                            prod.isFeatured ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {prod.isFeatured ? '★ Featured' : 'Standard'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 text-neutral-600 hover:text-[#9E3809] hover:bg-amber-50 rounded-lg cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProductToDelete(prod)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REGISTERED CUSTOMERS */}
      {adminTab === 'customers' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold font-serif-spiritual text-[#2C241E]">
              Registered Devotees / Customer Directory
            </h2>
            <p className="text-xs text-neutral-500">
              Devotees who have registered and authenticated on Spiritual Home.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E8DFC8] text-neutral-600 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Customer Name</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Mobile</th>
                    <th className="py-3.5 px-4">Saved City / State</th>
                    <th className="py-3.5 px-4">Orders Placed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {customers.map((c) => {
                    const customerOrderCount = orders.filter((o) => o.customerId === c.id).length;
                    return (
                      <tr key={c.id} className="hover:bg-[#FAF8F5]/80">
                        <td className="py-3 px-4 font-bold text-neutral-900">{c.fullName}</td>
                        <td className="py-3 px-4 text-neutral-600">{c.email}</td>
                        <td className="py-3 px-4 font-mono text-neutral-700">{c.mobile}</td>
                        <td className="py-3 px-4 text-neutral-500">
                          {c.shippingAddress?.city ? `${c.shippingAddress.city}, ${c.shippingAddress.state}` : 'Not set'}
                        </td>
                        <td className="py-3 px-4 font-bold text-[#9E3809]">{customerOrderCount} orders</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: UPI & STORE SETTINGS */}
      {adminTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm max-w-2xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#5f259f] text-white flex items-center justify-center font-bold text-base">
              <span className="font-serif-spiritual">पे</span>
            </div>
            <div>
              <h2 className="text-base font-bold font-serif-spiritual text-[#2C241E]">
                PhonePe QR & Store Configuration
              </h2>
              <p className="text-[11px] text-neutral-500">
                Official UPI credentials generated on all customer QR payment screens.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">UPI ID (VPA)</label>
              <input
                type="text"
                value={storeSettings.upiId}
                onChange={(e) => updateStoreSettings({ upiId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7C3] rounded-xl font-mono text-neutral-900 font-bold"
              />
              <p className="text-[10px] text-neutral-400 mt-1">Configured UPI ID: {storeSettings.upiId}</p>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Payee Name</label>
              <input
                type="text"
                value={storeSettings.payeeName}
                onChange={(e) => updateStoreSettings({ payeeName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7C3] rounded-xl text-neutral-900 font-bold"
              />
              <p className="text-[10px] text-neutral-400 mt-1">Beneficiary name shown on customer PhonePe app: {storeSettings.payeeName}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Support Phone</label>
                <input
                  type="text"
                  value={storeSettings.supportPhone}
                  onChange={(e) => updateStoreSettings({ supportPhone: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E0D7C3] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={storeSettings.supportEmail}
                  onChange={(e) => updateStoreSettings({ supportEmail: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E0D7C3] rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Free Shipping Order Threshold (₹)</label>
              <input
                type="number"
                value={storeSettings.freeShippingThreshold}
                onChange={(e) => updateStoreSettings({ freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E0D7C3] rounded-xl font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL: COMPREHENSIVE ORDER STATUS & PAYMENT VERIFICATION */}
      {statusModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-6 max-h-[90vh] overflow-y-auto border border-[#E8DFC8] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#9E3809] flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-serif-spiritual flex items-center gap-2">
                    Update Order Status & Logistics
                    <span className="font-mono text-sm text-[#9E3809]">#{statusModalOrder.id}</span>
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Direct control over payment verification, consecration stage, and courier dispatch.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStatusModalOrder(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Order Devotee & Financial Summary Card */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Devotee</span>
                <strong className="text-neutral-900 text-sm block">{statusModalOrder.customerName}</strong>
                <span className="text-neutral-500">{statusModalOrder.customerMobile}</span>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Amount & Items</span>
                <strong className="text-[#9E3809] text-sm block font-sans">₹{statusModalOrder.totalAmount.toLocaleString('en-IN')}</strong>
                <span className="text-neutral-500">{statusModalOrder.items.length} items ({statusModalOrder.items.reduce((s, i) => s + i.quantity, 0)} pcs)</span>
              </div>

              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Payment Proof</span>
                <span className="font-mono text-neutral-800 block">UTR: {statusModalOrder.paymentReference || 'None'}</span>
                {statusModalOrder.paymentScreenshotUrl ? (
                  <button
                    type="button"
                    onClick={() => setViewScreenshotOrder(statusModalOrder)}
                    className="text-[#9E3809] underline font-bold text-[11px] cursor-pointer"
                  >
                    View Screenshot Proof ↗
                  </button>
                ) : (
                  <span className="text-neutral-400 italic">No image uploaded</span>
                )}
              </div>
            </div>

            {/* Status Selector Form */}
            <form onSubmit={handleSaveOrderStatus} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Select Order Lifecycle Status:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'PAYMENT_VERIFICATION_PENDING', label: 'Under Verification', color: 'border-amber-400 bg-amber-50 text-amber-900' },
                    { id: 'PAYMENT_CONFIRMED', label: 'Payment Confirmed', color: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
                    { id: 'PROCESSING', label: 'Processing / Packing', color: 'border-indigo-400 bg-indigo-50 text-indigo-900' },
                    { id: 'SHIPPED', label: 'Shipped / In Transit', color: 'border-purple-400 bg-purple-50 text-purple-900' },
                    { id: 'DELIVERED', label: 'Delivered', color: 'border-teal-500 bg-teal-50 text-teal-900' },
                    { id: 'PENDING_PAYMENT', label: 'Pending Payment', color: 'border-neutral-300 bg-neutral-50 text-neutral-800' },
                    { id: 'PAYMENT_REJECTED', label: 'Payment Rejected', color: 'border-red-400 bg-red-50 text-red-900' },
                    { id: 'CANCELLED', label: 'Cancelled', color: 'border-gray-400 bg-gray-100 text-gray-800' },
                  ].map((s) => {
                    const isSelected = targetStatus === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setTargetStatus(s.id as OrderStatus)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? `${s.color} ring-2 ring-[#9E3809] shadow-sm`
                            : 'border-[#E8DFC8] bg-white text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="leading-tight">{s.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#9E3809]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional Shipping & Tracking info */}
              {(targetStatus === 'SHIPPED' || targetStatus === 'DELIVERED' || statusModalOrder.courierName) && (
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                    <Truck className="w-4 h-4" />
                    <span>Courier & Logistics Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                        Courier Partner
                      </label>
                      <input
                        type="text"
                        value={targetCourier}
                        onChange={(e) => setTargetCourier(e.target.value)}
                        placeholder="e.g. Blue Dart, Delhivery, DTDC"
                        className="w-full px-3 py-2 text-xs bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                        Tracking Number / AWB
                      </label>
                      <input
                        type="text"
                        value={targetTracking}
                        onChange={(e) => setTargetTracking(e.target.value)}
                        placeholder="e.g. BLU987654321IN"
                        className="w-full px-3 py-2 text-xs font-mono bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Conditional Rejection Reason */}
              {targetStatus === 'PAYMENT_REJECTED' && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Reason for Payment Rejection</span>
                  </div>
                  <textarea
                    value={targetRejectionReason}
                    onChange={(e) => setTargetRejectionReason(e.target.value)}
                    placeholder="e.g. UTR reference not reflected in PhonePe merchant account, or screenshot amount mismatch."
                    rows={2}
                    className="w-full px-3 py-2 text-xs bg-white border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              )}

              {/* Admin Internal Notes */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  Internal Administrator Notes (Optional)
                </label>
                <input
                  type="text"
                  value={targetNotes}
                  onChange={(e) => setTargetNotes(e.target.value)}
                  placeholder="e.g. Consecrated on Tuesday morning; special saffron packaging included."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E3809]"
                />
              </div>

              {/* Fast Action Shortcuts + Save */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8DFC8]">
                <div className="flex items-center gap-2">
                  {statusModalOrder.status === 'PAYMENT_VERIFICATION_PENDING' && (
                    <button
                      type="button"
                      onClick={() => {
                        approvePayment(statusModalOrder.id, targetNotes);
                        setStatusModalOrder(null);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Confirm Now</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const ord = statusModalOrder;
                      setStatusModalOrder(null);
                      setRejectingOrder(ord);
                    }}
                    className="px-3 py-2 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject Proof</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStatusModalOrder(null)}
                    className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-100 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#9E3809] to-[#B84A14] hover:from-[#802204] hover:to-[#9E3809] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Apply Status Update</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW SCREENSHOT ENLARGED */}
      {viewScreenshotOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 font-serif-spiritual">
                  PhonePe Screenshot: Order #{viewScreenshotOrder.id}
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Customer: {viewScreenshotOrder.customerName} (₹{viewScreenshotOrder.totalAmount})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewScreenshotOrder(null)}
                className="text-neutral-500 hover:text-black cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {viewScreenshotOrder.paymentScreenshotUrl && (
              <div className="rounded-2xl overflow-hidden border border-neutral-200 max-h-[480px] flex items-center justify-center bg-black">
                <img
                  src={viewScreenshotOrder.paymentScreenshotUrl}
                  alt="Full PhonePe Screenshot"
                  className="max-w-full max-h-[480px] object-contain"
                />
              </div>
            )}

            <div className="p-3 bg-neutral-50 rounded-xl text-xs space-y-1">
              <p>Provided UTR: <strong className="font-mono text-neutral-900">{viewScreenshotOrder.paymentReference || 'None specified'}</strong></p>
              <p>Expected Payable: <strong>₹{viewScreenshotOrder.totalAmount}</strong></p>
            </div>

            {viewScreenshotOrder.status === 'PAYMENT_VERIFICATION_PENDING' && (
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const ord = viewScreenshotOrder;
                    setViewScreenshotOrder(null);
                    setRejectingOrder(ord);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 text-xs font-bold cursor-pointer"
                >
                  Reject Payment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    approvePayment(viewScreenshotOrder.id);
                    setViewScreenshotOrder(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Approve & Confirm Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: REJECT PAYMENT PROOF */}
      {rejectingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleRejectPaymentSubmit}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-red-700 font-serif-spiritual">
                Reject Payment for #{rejectingOrder.id}
              </h3>
              <button
                type="button"
                onClick={() => setRejectingOrder(null)}
                className="text-neutral-500 hover:text-black cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-600">
              Explain why this PhonePe screenshot proof was rejected. The customer will see this message in their account and be allowed to re-upload.
            </p>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Rejection Reason</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Transaction amount does not match order value, or UTR number is unreadable."
                rows={3}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E0D7C3] rounded-xl focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectingOrder(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border border-neutral-300 text-neutral-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-red-700 text-white cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: SHIP / DISPATCH ORDER */}
      {shippingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleDispatchOrder}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-700" />
                <h3 className="text-sm font-bold text-neutral-900 font-serif-spiritual">
                  Dispatch Order #{shippingOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShippingOrder(null)}
                className="text-neutral-500 hover:text-black cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-neutral-600">
              Recipient: <strong>{shippingOrder.customerName}</strong> ({shippingOrder.shippingAddress.city}, {shippingOrder.shippingAddress.state})
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Courier Partner</label>
              <input
                type="text"
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
                placeholder="e.g. Bluedart / Delhivery / DTDC"
                className="w-full px-3 py-2 text-xs bg-white border border-[#E0D7C3] rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Tracking Number / AWB</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. BLU789123456"
                className="w-full px-3 py-2 text-xs bg-white border border-[#E0D7C3] rounded-xl font-mono"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShippingOrder(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border border-neutral-300 text-neutral-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-purple-700 text-white cursor-pointer"
              >
                Confirm Dispatch
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleSaveProduct}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-neutral-900 font-serif-spiritual">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Sacred Product'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="text-neutral-500 hover:text-black cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-medium text-neutral-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Consecrated Solid Brass Mahadev Shiva Idol"
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">SKU</label>
                <input
                  type="text"
                  value={productForm.sku}
                  onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl font-semibold cursor-pointer"
                >
                  {PRODUCT_CATEGORIES.filter((c) => c !== 'All Categories').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl font-bold font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">MRP Slashed Price (₹)</label>
                <input
                  type="number"
                  value={productForm.discountPrice}
                  onChange={(e) => setProductForm({ ...productForm, discountPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  value={productForm.stockQuantity}
                  onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl font-mono font-bold"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={productForm.isFeatured}
                  onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                  className="rounded text-[#9E3809] cursor-pointer"
                />
                <label htmlFor="featured-checkbox" className="font-semibold text-neutral-800 cursor-pointer">
                  Feature on Homepage Hero & Bestsellers
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-neutral-700 mb-1">Image URLs (One per line)</label>
                <textarea
                  value={productForm.images}
                  onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl font-mono text-[11px]"
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-neutral-700 mb-1">Short Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Material</label>
                <input
                  type="text"
                  value={productForm.material}
                  onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Dimensions</label>
                <input
                  type="text"
                  value={productForm.dimensions}
                  onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E0D7C3] rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t">
              {editingProduct && (
                <button
                  type="button"
                  onClick={() => {
                    const prod = editingProduct;
                    setIsProductModalOpen(false);
                    setProductToDelete(prod);
                  }}
                  className="py-2.5 px-3 text-xs font-semibold rounded-xl border border-red-200 text-red-700 hover:bg-red-50 cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}
              <div className="flex items-center gap-2 flex-1 justify-end">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="py-2.5 px-4 text-xs font-semibold rounded-xl border border-neutral-300 text-neutral-700 cursor-pointer hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 text-xs font-semibold rounded-xl bg-[#9E3809] hover:bg-[#802204] text-white cursor-pointer shadow-md"
                >
                  {editingProduct ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: CONFIRM PRODUCT DELETION */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-red-200 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-neutral-900 font-serif-spiritual">
                Delete Product from Catalog?
              </h3>
              <p className="text-xs text-neutral-500">
                Are you sure you want to permanently remove this sacred item from the storefront?
              </p>
            </div>

            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                <img
                  src={productToDelete.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 text-xs">
                <strong className="text-neutral-900 block leading-tight">{productToDelete.name}</strong>
                <span className="text-neutral-500 block">{productToDelete.category} • ₹{productToDelete.price.toLocaleString('en-IN')}</span>
                <span className="font-mono text-[10px] text-neutral-400">SKU: {productToDelete.sku}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 text-xs font-semibold rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                Keep Product
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }}
                className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-md transition-colors"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
