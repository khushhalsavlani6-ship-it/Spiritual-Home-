export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAYMENT_VERIFICATION_PENDING'
  | 'PAYMENT_CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'PAYMENT_REJECTED';

export interface CustomerAddress {
  fullName: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  shippingAddress: CustomerAddress;
  createdAt: string;
  isActive: boolean;
}

export interface ProductSpecification {
  material?: string;
  dimensions?: string;
  weight?: string;
  deityOrigin?: string;
  origin?: string;
  color?: string;
  careInstructions?: string;
  inTheBox?: string;
  energizedBy?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  discountPrice?: number; // MRP or slashed price
  sku: string;
  category: string;
  stockQuantity: number;
  inStock: boolean;
  images: string[];
  specifications: ProductSpecification;
  tags: string[];
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  benefits?: string[];
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: CustomerAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'PHONEPE_QR';
  upiId: string;
  payeeName: string;
  paymentScreenshotUrl?: string;
  paymentReference?: string; // UTR or transaction ID
  paymentTimestamp?: string;
  status: OrderStatus;
  adminNotes?: string;
  rejectionReason?: string;
  courierName?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  upiId: string;
  payeeName: string;
  qrImageUrl?: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  supportEmail: string;
  supportPhone: string;
  supportAddress: string;
  announcementText: string;
}

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'customer-account'
  | 'admin-login'
  | 'admin-dashboard'
  | 'about-us'
  | 'contact-us'
  | 'privacy-policy'
  | 'terms'
  | 'refund-policy'
  | 'shipping-policy';
