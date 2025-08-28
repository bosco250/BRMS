// Customer Order Data for BRMS

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  restaurantName: string;
  orderType: "dine_in" | "take_away" | "delivery";
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  orderDate: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  specialInstructions?: string;
  deliveryAddress?: string;
  tableNumber?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
  category: string;
  modifiers: OrderItemModifier[];
}

export interface OrderItemModifier {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Sample customer orders
export const customerOrders: CustomerOrder[] = [
  {
    id: "order_001",
    orderNumber: "ORD-2024-001",
    restaurantName: "Kigali Delights",
    orderType: "delivery",
    status: "delivered",
    paymentStatus: "paid",
    items: [
      {
        id: "item_001",
        name: "Margherita Pizza",
        description: "Classic tomato sauce with mozzarella cheese",
        price: 18990,
        quantity: 2,
        totalPrice: 37980,
        image: "/images/pizza-margherita.jpg",
        category: "Pizza",
        modifiers: [
          { id: "mod_001", name: "Extra Cheese", price: 2000, quantity: 1 },
          { id: "mod_002", name: "Mushrooms", price: 1500, quantity: 1 },
        ],
      },
      {
        id: "item_002",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing",
        price: 8990,
        quantity: 1,
        totalPrice: 8990,
        image: "/images/caesar-salad.jpg",
        category: "Salad",
        modifiers: [],
      },
    ],
    subtotal: 46970,
    tax: 3758,
    deliveryFee: 3000,
    total: 53728,
    orderDate: "2024-01-15T18:30:00Z",
    estimatedDeliveryTime: "2024-01-15T19:30:00Z",
    actualDeliveryTime: "2024-01-15T19:25:00Z",
    specialInstructions: "Extra cheese on pizza, please ring doorbell",
    deliveryAddress: "123 Main St, Kigali, Rwanda",
  },
  {
    id: "order_002",
    orderNumber: "ORD-2024-002",
    restaurantName: "Kigali Delights",
    orderType: "dine_in",
    status: "completed",
    paymentStatus: "paid",
    items: [
      {
        id: "item_003",
        name: "Grilled Chicken",
        description: "Tender grilled chicken breast with herbs",
        price: 25990,
        quantity: 1,
        totalPrice: 25990,
        image: "/images/grilled-chicken.jpg",
        category: "Main Course",
        modifiers: [
          { id: "mod_003", name: "Garlic Sauce", price: 1000, quantity: 1 },
        ],
      },
      {
        id: "item_004",
        name: "French Fries",
        description: "Crispy golden fries",
        price: 5990,
        quantity: 1,
        totalPrice: 5990,
        image: "/images/french-fries.jpg",
        category: "Side",
        modifiers: [],
      },
      {
        id: "item_005",
        name: "Coca Cola",
        description: "Refreshing soft drink",
        price: 1990,
        quantity: 2,
        totalPrice: 3980,
        image: "/images/coca-cola.jpg",
        category: "Beverages",
        modifiers: [],
      },
    ],
    subtotal: 35960,
    tax: 2877,
    deliveryFee: 0,
    total: 38837,
    orderDate: "2024-01-10T19:00:00Z",
    tableNumber: "Table 12",
    specialInstructions: "Chicken well done, fries extra crispy",
  },
  {
    id: "order_003",
    orderNumber: "ORD-2024-003",
    restaurantName: "Kigali Delights",
    orderType: "take_away",
    status: "ready",
    paymentStatus: "paid",
    items: [
      {
        id: "item_006",
        name: "Chocolate Cake",
        description: "Rich chocolate layer cake",
        price: 8990,
        quantity: 1,
        totalPrice: 8990,
        image: "/images/chocolate-cake.jpg",
        category: "Dessert",
        modifiers: [],
      },
      {
        id: "item_007",
        name: "Coffee",
        description: "Freshly brewed coffee",
        price: 2990,
        quantity: 1,
        totalPrice: 2990,
        image: "/images/coffee.jpg",
        category: "Beverages",
        modifiers: [
          { id: "mod_004", name: "Extra Shot", price: 1000, quantity: 1 },
        ],
      },
    ],
    subtotal: 11980,
    tax: 958,
    deliveryFee: 0,
    total: 12938,
    orderDate: "2024-01-20T14:00:00Z",
    estimatedDeliveryTime: "2024-01-20T14:30:00Z",
    specialInstructions: "Cake to go, coffee for here",
  },
  {
    id: "order_004",
    orderNumber: "ORD-2024-004",
    restaurantName: "Kigali Delights",
    orderType: "delivery",
    status: "out_for_delivery",
    paymentStatus: "paid",
    items: [
      {
        id: "item_008",
        name: "Fish & Chips",
        description: "Beer battered fish with crispy fries",
        price: 22990,
        quantity: 1,
        totalPrice: 22990,
        image: "/images/fish-chips.jpg",
        category: "Main Course",
        modifiers: [
          { id: "mod_005", name: "Tartar Sauce", price: 500, quantity: 1 },
        ],
      },
      {
        id: "item_009",
        name: "Onion Rings",
        description: "Crispy onion rings",
        price: 7990,
        quantity: 1,
        totalPrice: 7990,
        image: "/images/onion-rings.jpg",
        category: "Side",
        modifiers: [],
      },
    ],
    subtotal: 30980,
    tax: 2478,
    deliveryFee: 3000,
    total: 36458,
    orderDate: "2024-01-22T12:00:00Z",
    estimatedDeliveryTime: "2024-01-22T13:00:00Z",
    specialInstructions: "Fish extra crispy, no salt on fries",
    deliveryAddress: "456 Oak Ave, Gasabo, Rwanda",
  },
  {
    id: "order_005",
    orderNumber: "ORD-2024-005",
    restaurantName: "Kigali Delights",
    orderType: "dine_in",
    status: "preparing",
    paymentStatus: "paid",
    items: [
      {
        id: "item_010",
        name: "Beef Burger",
        description: "Juicy beef patty with fresh vegetables",
        price: 18990,
        quantity: 2,
        totalPrice: 37980,
        image: "/images/beef-burger.jpg",
        category: "Main Course",
        modifiers: [
          { id: "mod_006", name: "Bacon", price: 3000, quantity: 2 },
          { id: "mod_007", name: "Cheese", price: 1500, quantity: 2 },
        ],
      },
      {
        id: "item_011",
        name: "Milkshake",
        description: "Creamy vanilla milkshake",
        price: 5990,
        quantity: 1,
        totalPrice: 5990,
        image: "/images/milkshake.jpg",
        category: "Beverages",
        modifiers: [],
      },
    ],
    subtotal: 43970,
    tax: 3518,
    deliveryFee: 0,
    total: 47488,
    orderDate: "2024-01-22T18:30:00Z",
    tableNumber: "Table 8",
    specialInstructions: "Burgers medium rare, milkshake extra thick",
  },
];

// Utility functions
export const getStatusColor = (status: CustomerOrder["status"]): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "confirmed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "preparing":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "ready":
      return "bg-green-100 text-green-800 border-green-200";
    case "out_for_delivery":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "delivered":
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPaymentStatusColor = (
  status: CustomerOrder["paymentStatus"]
): string => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "failed":
      return "bg-red-100 text-red-800 border-red-200";
    case "refunded":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getOrderTypeIcon = (type: CustomerOrder["orderType"]): string => {
  switch (type) {
    case "dine_in":
      return "🍽️";
    case "take_away":
      return "🛍️";
    case "delivery":
      return "🚚";
    default:
      return "📋";
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-RW", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
