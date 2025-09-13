// Streamlined Checkout Types for BRMS

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
  category: string;
  modifiers: CartItemModifier[];
  specialInstructions?: string;
}

export interface CartItemModifier {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  location: string;
  deliveryInstructions?: string;
  deliveryMethod: "dine_in" | "take_away" | "delivery_1hour";
}

export interface PaymentInfo {
  method: "cash_on_delivery" | "mobile_money" | "card" | "bank_transfer";
  mobileNumber?: string;
  cardNumber?: string;
  cardHolderName?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
}

// Payment methods
export const paymentMethods = [
  {
    id: "cash_on_delivery",
    name: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "💰",
    popular: true,
  },
  {
    id: "mobile_money",
    name: "Mobile Money",
    description: "MTN, Airtel, M-Pesa",
    icon: "📱",
    popular: true,
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard",
    icon: "💳",
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    description: "Direct bank transfer",
    icon: "🏦",
  },
];

// Delivery methods
export const deliveryMethods = [
  {
    id: "dine_in",
    name: "Dine In",
    description: "Enjoy at our restaurant",
    price: 0,
    icon: "🍽️",
  },
  {
    id: "take_away",
    name: "Take Away",
    description: "Pick up your order",
    price: 0,
    icon: "🛍️",
  },
  {
    id: "delivery_1hour",
    name: "Fast Delivery",
    description: "Delivered in 1 hour",
    price: 3000,
    icon: "🚚",
  },
];

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random.toString().padStart(3, "0")}`;
};

export const calculateOrderTotals = (
  items: CartItem[],
  deliveryFee: number = 0
) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax + deliveryFee;

  return { subtotal, tax, deliveryFee, total };
};
