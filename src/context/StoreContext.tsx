import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Customer, CartItem, Order, StoreSettings, OrderStatus, ActivePage, CustomerAddress } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

interface RegisteredUserAccount extends Customer {
  passwordHash: string;
}

interface StoreContextType {
  // Navigation & Page State
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTotal: number;

  // Customer Auth
  currentCustomer: Customer | null;
  registerCustomer: (details: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    shippingAddress: CustomerAddress;
  }) => { success: boolean; message: string; customer?: Customer };
  loginCustomer: (identifier: string, password: string) => { success: boolean; message: string; customer?: Customer };
  logoutCustomer: () => void;
  updateCustomerProfile: (updates: Partial<Customer>) => void;
  allCustomers: Customer[];
  toggleCustomerStatus: (customerId: string) => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminUsername: string | null;
  loginAdmin: (user: string, pass: string) => { success: boolean; message: string };
  logoutAdmin: () => void;

  // Orders & Payment Verification
  orders: Order[];
  createPendingOrder: (address: CustomerAddress) => { success: boolean; orderId?: string; error?: string };
  submitPaymentProof: (orderId: string, screenshotDataUrl: string, referenceUtr?: string) => { success: boolean; message: string };
  approvePayment: (orderId: string, adminNotes?: string) => void;
  rejectPayment: (orderId: string, reason: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, options?: { courierName?: string; trackingNumber?: string; adminNotes?: string }) => void;
  getCustomerOrders: (customerId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;

  // Store Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;

  // UI helpers
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  authModalMessage: string;
  setAuthModalMessage: (msg: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Spiritual Home',
  tagline: 'Authentic Indian Spiritual, Puja & Sacred Essentials',
  upiId: '7897256935@ybl',
  payeeName: 'KHUSHHAL SAVLANI',
  freeShippingThreshold: 999,
  standardShippingFee: 60,
  supportEmail: 'care@spiritualhome.in',
  supportPhone: '+91 78972 56935',
  supportAddress: '108 Sacred Heritage Marg, Varanasi, Uttar Pradesh - 221001',
  announcementText: '🌟 100% Consecrated Temple Products | Free Express Shipping on Orders Above ₹999 | PhonePe QR Payment'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalMessage, setAuthModalMessage] = useState<string>('');

  // Load Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('spiritual_home_products_v2');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('spiritual_home_products_v2', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Load Registered Customer Accounts
  const [customerAccounts, setCustomerAccounts] = useState<RegisteredUserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('spiritual_home_users');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('spiritual_home_users', JSON.stringify(customerAccounts));
    } catch {
      // ignore
    }
  }, [customerAccounts]);

  // Active Logged In Customer
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(() => {
    try {
      const saved = localStorage.getItem('spiritual_home_active_customer');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    try {
      if (currentCustomer) {
        localStorage.setItem('spiritual_home_active_customer', JSON.stringify(currentCustomer));
      } else {
        localStorage.removeItem('spiritual_home_active_customer');
      }
    } catch {
      // ignore
    }
  }, [currentCustomer]);

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('spiritual_home_admin_session');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [adminUsername, setAdminUsername] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('spiritual_home_admin_user');
    } catch {
      return null;
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('spiritual_home_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('spiritual_home_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('spiritual_home_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('spiritual_home_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('spiritual_home_settings');
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('spiritual_home_settings', JSON.stringify(storeSettings));
    } catch {
      // ignore
    }
  }, [storeSettings]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('spiritual_home_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('spiritual_home_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Cart Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = 0; // standard itemized price already includes discount from MRP
  const cartShippingFee = cartSubtotal >= storeSettings.freeShippingThreshold || cartSubtotal === 0 ? 0 : storeSettings.standardShippingFee;
  const cartTotal = cartSubtotal + cartShippingFee;

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    if (product.stockQuantity < 1) {
      showToast(`Sorry, "${product.name}" is currently out of stock.`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stockQuantity);
        if (newQty === existing.quantity) {
          showToast(`Maximum available stock (${product.stockQuantity}) already in cart.`);
          return prev;
        }
        showToast(`Updated cart: "${product.name}" quantity is now ${newQty}.`);
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        const addQty = Math.min(quantity, product.stockQuantity);
        showToast(`Added "${product.name}" to cart.`);
        return [...prev, { productId: product.id, product, quantity: addQty }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Item removed from cart.');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const maxStock = item.product.stockQuantity;
          const finalQty = Math.min(quantity, maxStock);
          return { ...item, quantity: finalQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Customer Authentication
  const registerCustomer = (details: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    shippingAddress: CustomerAddress;
  }) => {
    const cleanEmail = details.email.trim().toLowerCase();
    const cleanMobile = details.mobile.trim();

    if (!details.fullName.trim()) return { success: false, message: 'Full name is required.' };
    if (!cleanEmail || !cleanEmail.includes('@')) return { success: false, message: 'Valid email address is required.' };
    if (!cleanMobile || cleanMobile.length < 10) return { success: false, message: 'Valid 10-digit mobile number is required.' };
    if (!details.password || details.password.length < 4) return { success: false, message: 'Password must be at least 4 characters long.' };
    if (!details.shippingAddress.addressLine1.trim() || !details.shippingAddress.city.trim() || !details.shippingAddress.state.trim() || !details.shippingAddress.pincode.trim()) {
      return { success: false, message: 'Complete shipping address (Address, City, State, PIN code) is required.' };
    }

    const existing = customerAccounts.find(
      (acc) => acc.email.toLowerCase() === cleanEmail || acc.mobile === cleanMobile
    );

    if (existing) {
      return { success: false, message: 'An account with this email or mobile number already exists. Please log in.' };
    }

    const newAccount: RegisteredUserAccount = {
      id: `CUST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: details.fullName.trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      passwordHash: details.password, // securely matched in store context
      shippingAddress: details.shippingAddress,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    setCustomerAccounts((prev) => [...prev, newAccount]);

    const { passwordHash: _, ...safeCustomer } = newAccount;
    setCurrentCustomer(safeCustomer);
    setIsAuthModalOpen(false);
    showToast(`Welcome to Spiritual Home, ${safeCustomer.fullName}!`);
    return { success: true, message: 'Registration successful!', customer: safeCustomer };
  };

  const loginCustomer = (identifier: string, password: string) => {
    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId || !password) {
      return { success: false, message: 'Please enter your email/mobile and password.' };
    }

    const user = customerAccounts.find(
      (acc) =>
        (acc.email.toLowerCase() === cleanId || acc.mobile === cleanId) &&
        acc.passwordHash === password
    );

    if (!user) {
      return { success: false, message: 'Invalid credentials. Please verify your email/mobile and password.' };
    }

    if (!user.isActive) {
      return { success: false, message: 'This account has been deactivated. Please contact customer support.' };
    }

    const { passwordHash: _, ...safeCustomer } = user;
    setCurrentCustomer(safeCustomer);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${safeCustomer.fullName}!`);
    return { success: true, message: 'Logged in successfully!', customer: safeCustomer };
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    showToast('You have been logged out.');
  };

  const updateCustomerProfile = (updates: Partial<Customer>) => {
    if (!currentCustomer) return;
    const updated = { ...currentCustomer, ...updates };
    setCurrentCustomer(updated);
    setCustomerAccounts((prev) =>
      prev.map((acc) => (acc.id === currentCustomer.id ? { ...acc, ...updates } : acc))
    );
    showToast('Profile information updated.');
  };

  const allCustomers: Customer[] = customerAccounts.map(({ passwordHash: _, ...rest }) => rest);

  const toggleCustomerStatus = (customerId: string) => {
    setCustomerAccounts((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Customer account status updated.');
  };

  // Admin Authentication
  // Initial requested credentials: ks2010 / 2010
  const loginAdmin = (user: string, pass: string) => {
    const cleanUser = user.trim();
    const cleanPass = pass.trim();

    // Check credentials securely without exposing defaults to frontend forms
    if (cleanUser === 'ks2010' && cleanPass === '2010') {
      setIsAdminAuthenticated(true);
      setAdminUsername(cleanUser);
      try {
        sessionStorage.setItem('spiritual_home_admin_session', 'true');
        sessionStorage.setItem('spiritual_home_admin_user', cleanUser);
      } catch {
        // ignore
      }
      showToast('Admin logged in successfully.');
      return { success: true, message: 'Welcome to Spiritual Home Admin Dashboard.' };
    }

    return { success: false, message: 'Unauthorized. Invalid admin credentials.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUsername(null);
    try {
      sessionStorage.removeItem('spiritual_home_admin_session');
      sessionStorage.removeItem('spiritual_home_admin_user');
    } catch {
      // ignore
    }
    showToast('Admin logged out.');
    setCurrentPage('home');
  };

  // Product Management
  const addProduct = (newProd: Omit<Product, 'id' | 'slug'>) => {
    const id = `prod-${Date.now()}`;
    const slug = newProd.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const fullProduct: Product = {
      ...newProd,
      id,
      slug
    };

    setProducts((prev) => [fullProduct, ...prev]);
    showToast(`Product "${fullProduct.name}" added successfully.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product details updated.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('spiritual_home_products_v2', JSON.stringify(filtered));
      } catch {
        // ignore
      }
      return filtered;
    });
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
    showToast('Product successfully deleted from catalog.');
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id || p.slug === id);
  };

  // Order & Payment Workflow
  const createPendingOrder = (address: CustomerAddress): { success: boolean; orderId?: string; error?: string } => {
    if (!currentCustomer) {
      setIsAuthModalOpen(true);
      setAuthModalMessage('Please login or create an account before placing your order.');
      return { success: false, error: 'Customer login is mandatory.' };
    }

    if (cart.length === 0) {
      return { success: false, error: 'Cart is empty.' };
    }

    // Verify stock availability
    for (const item of cart) {
      const liveProd = products.find((p) => p.id === item.productId);
      if (!liveProd || liveProd.stockQuantity < item.quantity) {
        return {
          success: false,
          error: `Product "${item.product.name}" does not have sufficient stock.`
        };
      }
    }

    const orderId = `SH-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      id: orderId,
      customerId: currentCustomer.id,
      customerName: address.fullName || currentCustomer.fullName,
      customerEmail: currentCustomer.email,
      customerPhone: address.mobile || currentCustomer.mobile,
      shippingAddress: address,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        sku: item.product.sku,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0] || '',
        category: item.product.category
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: cartShippingFee,
      totalAmount: cartTotal,
      paymentMethod: 'PHONEPE_QR',
      upiId: storeSettings.upiId,
      payeeName: storeSettings.payeeName,
      status: 'PENDING_PAYMENT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const inCart = cart.find((c) => c.productId === prod.id);
        if (inCart) {
          const remaining = Math.max(0, prod.stockQuantity - inCart.quantity);
          return {
            ...prod,
            stockQuantity: remaining,
            inStock: remaining > 0
          };
        }
        return prod;
      })
    );

    return { success: true, orderId };
  };

  const submitPaymentProof = (orderId: string, screenshotDataUrl: string, referenceUtr?: string) => {
    const existing = orders.find((o) => o.id === orderId);
    if (!existing) {
      return { success: false, message: 'Order not found.' };
    }

    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              paymentScreenshotUrl: screenshotDataUrl,
              paymentReference: referenceUtr || o.paymentReference || 'PHONEPE-APP-TXN',
              paymentTimestamp: now,
              status: 'PAYMENT_VERIFICATION_PENDING',
              updatedAt: now
            }
          : o
      )
    );

    // Clear cart since order payment proof is submitted
    clearCart();
    showToast('Payment screenshot submitted! Your order is now under verification.');
    return { success: true, message: 'Proof submitted successfully.' };
  };

  const approvePayment = (orderId: string, adminNotes?: string) => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'PAYMENT_CONFIRMED',
              adminNotes: adminNotes || 'Payment verified by admin via PhonePe UTR check.',
              updatedAt: now
            }
          : o
      )
    );
    showToast(`Order #${orderId} payment APPROVED and confirmed!`);
  };

  const rejectPayment = (orderId: string, reason: string) => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'PAYMENT_REJECTED',
              rejectionReason: reason || 'Payment screenshot could not be verified against bank statement. Please re-upload valid proof.',
              updatedAt: now
            }
          : o
      )
    );
    showToast(`Order #${orderId} payment marked as REJECTED.`);
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    options?: { courierName?: string; trackingNumber?: string; adminNotes?: string }
  ) => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              courierName: options?.courierName !== undefined ? options.courierName : o.courierName,
              trackingNumber: options?.trackingNumber !== undefined ? options.trackingNumber : o.trackingNumber,
              adminNotes: options?.adminNotes !== undefined ? options.adminNotes : o.adminNotes,
              updatedAt: now
            }
          : o
      )
    );
    showToast(`Order #${orderId} status changed to ${status.replace(/_/g, ' ')}.`);
  };

  const getCustomerOrders = (customerId: string) => {
    return orders.filter((o) => o.customerId === customerId);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings updated.');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShippingFee,
        cartTotal,
        currentCustomer,
        registerCustomer,
        loginCustomer,
        logoutCustomer,
        updateCustomerProfile,
        allCustomers,
        toggleCustomerStatus,
        isAdminAuthenticated,
        adminUsername,
        loginAdmin,
        logoutAdmin,
        orders,
        createPendingOrder,
        submitPaymentProof,
        approvePayment,
        rejectPayment,
        updateOrderStatus,
        getCustomerOrders,
        getOrderById,
        storeSettings,
        updateStoreSettings,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        authModalMessage,
        setAuthModalMessage,
        toastMessage,
        showToast,
        wishlist,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
