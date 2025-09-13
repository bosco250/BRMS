// Customer Order Data for BRMS

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  restaurantName: string;
  items: OrderItem[];
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled";
  createdAt: string;
  deliveryMethod: "dine_in" | "take_away" | "delivery_1hour";
  paymentMethod: "cash_on_delivery" | "mobile_money";
  estimatedDeliveryTime?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  image?: string;
  modifiers?: string[];
  specialInstructions?: string;
}

// Utility function for formatting currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Sample customer orders data
export const customerOrders: CustomerOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-1703123456789-001",
    restaurantName: "Kigali Restaurant",
    items: [
      {
        id: "1",
        name: "Chicken Burger",
        quantity: 2,
        price: 5000,
        totalPrice: 10000,
        image: "/images/chicken-burger.jpg",
        modifiers: ["Extra Cheese", "No Pickles"],
        specialInstructions: "Well done",
      },
      {
        id: "2",
        name: "French Fries",
        quantity: 1,
        price: 2000,
        totalPrice: 2000,
        image: "/images/french-fries.jpg",
      },
    ],
    total: 12000,
    status: "delivered",
    createdAt: "2024-01-15T10:30:00Z",
    deliveryMethod: "dine_in",
    paymentMethod: "cash_on_delivery",
    estimatedDeliveryTime: "2024-01-15T11:00:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-1703123456789-002",
    restaurantName: "Pizza Palace",
    items: [
      {
        id: "3",
        name: "Pizza Margherita",
        quantity: 1,
        price: 8000,
        totalPrice: 8000,
        image: "/images/pizza-margherita.jpg",
        modifiers: ["Extra Mozzarella"],
      },
      {
        id: "4",
        name: "Coca Cola",
        quantity: 2,
        price: 1500,
        totalPrice: 3000,
        image: "/images/coca-cola.jpg",
      },
    ],
    total: 11000,
    status: "preparing",
    createdAt: "2024-01-15T11:15:00Z",
    deliveryMethod: "delivery_1hour",
    paymentMethod: "mobile_money",
    estimatedDeliveryTime: "2024-01-15T12:15:00Z",
  },
  {
    id: "3",
    orderNumber: "ORD-1703123456789-003",
    restaurantName: "Steak House",
    items: [
      {
        id: "5",
        name: "Beef Steak",
        quantity: 1,
        price: 12000,
        totalPrice: 12000,
        image: "/images/beef-steak.jpg",
        modifiers: ["Medium Rare"],
        specialInstructions: "Extra seasoning",
      },
      {
        id: "6",
        name: "Caesar Salad",
        quantity: 1,
        price: 3000,
        totalPrice: 3000,
        image: "/images/caesar-salad.jpg",
      },
    ],
    total: 15000,
    status: "ready",
    createdAt: "2024-01-15T12:00:00Z",
    deliveryMethod: "take_away",
    paymentMethod: "cash_on_delivery",
    estimatedDeliveryTime: "2024-01-15T12:30:00Z",
  },
  {
    id: "4",
    orderNumber: "ORD-1703123456789-004",
    restaurantName: "Sushi Bar",
    items: [
      {
        id: "7",
        name: "Salmon Sushi Roll",
        quantity: 2,
        price: 4000,
        totalPrice: 8000,
        image: "/images/salmon-sushi.jpg",
        modifiers: ["Extra Wasabi"],
      },
      {
        id: "8",
        name: "Miso Soup",
        quantity: 1,
        price: 2500,
        totalPrice: 2500,
        image: "/images/miso-soup.jpg",
      },
    ],
    total: 10500,
    status: "cancelled",
    createdAt: "2024-01-15T13:00:00Z",
    deliveryMethod: "dine_in",
    paymentMethod: "mobile_money",
  },
];

// Helper functions
export const getOrderStatusColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "confirmed":
      return "text-blue-600 bg-blue-100";
    case "preparing":
      return "text-orange-600 bg-orange-100";
    case "ready":
      return "text-green-600 bg-green-100";
    case "delivered":
      return "text-green-600 bg-green-100";
    case "cancelled":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

// Alias for backward compatibility
export const getStatusColor = getOrderStatusColor;

export const getOrderStatusText = (status: string): string => {
  switch (status) {
    case "pending":
      return "Order Received";
    case "confirmed":
      return "Order Confirmed";
    case "preparing":
      return "Preparing Your Order";
    case "ready":
      return "Ready for Pickup/Delivery";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
};

export const getDeliveryMethodText = (method: string): string => {
  switch (method) {
    case "dine_in":
      return "Dine In";
    case "take_away":
      return "Take Away";
    case "delivery_1hour":
      return "Fast Delivery";
    default:
      return method;
  }
};

export const getPaymentMethodText = (method: string): string => {
  switch (method) {
    case "cash_on_delivery":
      return "Cash on Delivery";
    case "mobile_money":
      return "Mobile Money";
    default:
      return method;
  }
};

// Additional helper functions for OrderHistory
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getPaymentStatusColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "paid":
      return "text-green-600 bg-green-100";
    case "failed":
      return "text-red-600 bg-red-100";
    case "refunded":
      return "text-blue-600 bg-blue-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const getOrderTypeIcon = (deliveryMethod: string): string => {
  switch (deliveryMethod) {
    case "dine_in":
      return "🍽️";
    case "take_away":
      return "🛍️";
    case "delivery_1hour":
      return "🚚";
    default:
      return "📦";
  }
};
