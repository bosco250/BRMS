// Checkout and Order Management Data for BRMS

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

export interface Cart {
  id: string;
  customerId: string;
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutStep {
  id: number;
  title: string;
  description: string;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  location: string;
  country: string;
  deliveryInstructions?: string;
  deliveryMethod: "dine_in" | "take_away" | "delivery_1hour";
}

export interface BillingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  location: string;
  country: string;
  company?: string;
  taxId?: string;
}

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "mobile_money" | "cash_on_delivery" | "bank_transfer";
  name: string;
  description: string;
  icon: string;
  isAvailable: boolean;
}

export interface OrderSummary {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  total: number;
  deliveryFee: number;
  grandTotal: number;
  estimatedDeliveryTime: string;
}

export interface CheckoutOrder {
  id: string;
  customerId: string;
  restaurantId: string;
  orderNumber: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  billingDetails: BillingDetails;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
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
  orderType: "delivery" | "takeaway";
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

// Static data for demonstration
export const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: "💳",
  },
  {
    id: "mtn-momo",
    name: "MTN Mobile Money",
    description: "Pay with MTN Mobile Money",
    icon: "📱",
  },
  {
    id: "airtel-money",
    name: "Airtel Money",
    description: "Pay with Airtel Money",
    icon: "📱",
  },
  {
    id: "m-pesa",
    name: "M-Pesa",
    description: "Pay with M-Pesa",
    icon: "📱",
  },
];

export const orderMethods = [
  {
    id: "dine_in",
    name: "Dine In",
    description: "Enjoy your meal at our restaurant",
    price: 0,
    icon: "🍽️",
  },
  {
    id: "take_away",
    name: "Take Away",
    description: "Pick up your order at our restaurant",
    price: 0,
    icon: "🛍️",
  },
  {
    id: "delivery_1hour",
    name: "Delivery in 1 Hour",
    description: "Fast delivery to your location",
    price: 3000, // 3,000 RWF
    icon: "⏰",
  },
];

export const checkoutSteps: CheckoutStep[] = [
  {
    id: 1,
    title: "Cart Review",
    description: "Review your items",
  },
  {
    id: 2,
    title: "Order Method",
    description: "Choose how to receive your order",
  },
  {
    id: 3,
    title: "Billing",
    description: "Billing information",
  },
  {
    id: 4,
    title: "Payment",
    description: "Payment method",
  },
  {
    id: 5,
    title: "Review",
    description: "Review your order",
  },
];

// Sample cart data
export const sampleCart: Cart = {
  id: "sample_cart",
  customerId: "customer_001",
  restaurantId: "r1",
  items: [
    {
      id: "1",
      productId: "pizza_margherita",
      name: "Margherita Pizza",
      description: "Classic tomato sauce with mozzarella cheese",
      price: 12.99,
      quantity: 2,
      totalPrice: 25.98,
      image: "/images/pizza-margherita.jpg",
      category: "Pizza",
      modifiers: [],
    },
    {
      id: "2",
      productId: "salad_caesar",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing",
      price: 8.99,
      quantity: 1,
      totalPrice: 8.99,
      image: "/images/caesar-salad.jpg",
      category: "Salad",
      modifiers: [],
    },
  ],
  subtotal: 34.97,
  tax: 2.8,
  serviceCharge: 0,
  discount: 0,
  total: 37.77,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Sample orders for admin/manager dashboard
export const sampleOrders: CheckoutOrder[] = [
  {
    id: "1",
    customerId: "customer_001",
    restaurantId: "r1",
    orderNumber: "ORD-2024-001",
    items: [
      {
        id: "1",
        productId: "pizza_margherita",
        name: "Margherita Pizza",
        description: "Classic tomato sauce with mozzarella cheese",
        price: 12.99,
        quantity: 2,
        totalPrice: 25.98,
        image: "/images/pizza-margherita.jpg",
        category: "Pizza",
        modifiers: [],
        specialInstructions: undefined,
      },
    ],
    shippingDetails: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+250 700 000 000",
      address: "123 Main St",
      district: "Kigali",
      location: "City Center",
      country: "Rwanda",
      deliveryInstructions: "Please ring the doorbell",
      deliveryMethod: "delivery_1hour",
    },
    billingDetails: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+250 700 000 000",
      address: "123 Main St",
      district: "Kigali",
      location: "City Center",
      country: "Rwanda",
      company: undefined,
      taxId: undefined,
    },
    paymentMethod: {
      id: "card",
      type: "credit_card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: "💳",
      isAvailable: true,
    },
    subtotal: 25.98,
    tax: 2.08,
    serviceCharge: 0,
    discount: 0,
    deliveryFee: 3000,
    total: 28.06,
    status: "pending",
    paymentStatus: "pending",
    orderType: "delivery",
    estimatedDeliveryTime: "2024-01-15T12:30:00Z",
    actualDeliveryTime: undefined,
    specialInstructions: "Extra cheese please",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    customerId: "customer_002",
    restaurantId: "r1",
    orderNumber: "ORD-2024-002",
    items: [
      {
        id: "2",
        productId: "salad_caesar",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing",
        price: 8.99,
        quantity: 1,
        totalPrice: 8.99,
        image: "/images/caesar-salad.jpg",
        category: "Salad",
        modifiers: [],
        specialInstructions: undefined,
      },
    ],
    shippingDetails: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "+250 701 111 111",
      address: "456 Oak Ave",
      district: "Gasabo",
      location: "Kanombe",
      country: "Rwanda",
      deliveryInstructions: undefined,
      deliveryMethod: "take_away",
    },
    billingDetails: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "+250 701 111 111",
      address: "456 Oak Ave",
      district: "Gasabo",
      location: "Kanombe",
      country: "Rwanda",
      company: undefined,
      taxId: undefined,
    },
    paymentMethod: {
      id: "mtn-momo",
      type: "mobile_money",
      name: "MTN Mobile Money",
      description: "Pay with MTN Mobile Money",
      icon: "📱",
      isAvailable: true,
    },
    subtotal: 8.99,
    tax: 0.72,
    serviceCharge: 0,
    discount: 0,
    deliveryFee: 0,
    total: 9.71,
    status: "delivered",
    paymentStatus: "paid",
    orderType: "takeaway",
    estimatedDeliveryTime: "2024-01-15T11:30:00Z",
    actualDeliveryTime: "2024-01-15T11:25:00Z",
    specialInstructions: undefined,
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T11:25:00Z",
  },
];

// Utility functions
export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08; // 8% tax
  const serviceCharge = 0; // No service charge for now
  const discount = 0; // No discount for now
  const total = subtotal + tax + serviceCharge - discount;

  return { subtotal, tax, serviceCharge, discount, total };
};

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
