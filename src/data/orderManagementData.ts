// Enhanced Order Management Data for BRMS

export interface OrderSchema {
  id: string;
  businessId: string;
  customerId?: string;
  serverId?: string;
  tableNumber?: number;
  type: "dine_in" | "takeaway" | "delivery";
  status: "pending" | "preparing" | "ready" | "served" | "paid" | "cancelled";
  priority: "normal" | "rush" | "urgent";
  items: OrderItemSchema[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  total: number;
  paymentStatus: "pending" | "partial" | "paid" | "refunded";
  payments: PaymentSchema[];
  specialInstructions?: string;
  estimatedCompletionTime?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  loyaltyPointsEarned: number;
}

export interface OrderItemSchema {
  id: string;
  productId: string;
  productName: string;
  category: "food" | "beverage" | "alcohol" | "dessert";
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  modifiers: OrderItemModifier[];
  prepStatus: "pending" | "preparing" | "ready" | "served";
  notes?: string;
  kitchenNotes?: string;
}

export interface OrderItemModifier {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentSchema {
  id: string;
  orderId: string;
  amount: number;
  method: "cash" | "card" | "mobile_money" | "split";
  reference?: string;
  processedBy: string;
  processedAt: string;
  status: "pending" | "completed" | "failed" | "refunded";
  tip?: number;
}

export interface TableSchema {
  id: string;
  businessId: string;
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  currentOrderId?: string;
  serverId?: string;
  customerCount?: number;
  seatedAt?: string;
  estimatedDeparture?: string;
  location: "indoor" | "outdoor" | "bar" | "vip";
  notes?: string;
}

export interface MenuItemSchema {
  id: string;
  businessId: string;
  name: string;
  description: string;
  category: "food" | "beverage" | "alcohol" | "dessert";
  subcategory: string;
  price: number;
  cost: number;
  image?: string;
  available: boolean;
  stock: number;
  minStock: number;
  preparationTime: number; // in minutes
  allergens: string[];
  modifiers: MenuItemModifier[];
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemModifier {
  id: string;
  name: string;
  price: number;
  required: boolean;
  maxQuantity: number;
  options?: string[];
}

export interface CustomerSchema {
  id: string;
  businessId: string;
  name: string;
  email?: string;
  phone?: string;
  loyaltyPoints: number;
  totalVisits: number;
  totalSpent: number;
  preferences: CustomerPreferences;
  dietaryRestrictions: string[];
  status: "active" | "inactive";
  createdAt: string;
  lastVisit?: string;
}

export interface CustomerPreferences {
  favoriteItems: string[];
  preferredPaymentMethod: "cash" | "card" | "mobile_money";
  seatingPreference: "indoor" | "outdoor" | "bar" | "any";
  specialInstructions?: string;
}

export interface KitchenQueueItem {
  id: string;
  orderId: string;
  itemId: string;
  productName: string;
  category: "food" | "beverage" | "alcohol" | "dessert";
  quantity: number;
  priority: "normal" | "rush" | "urgent";
  status: "pending" | "preparing" | "ready";
  assignedTo?: string;
  startedAt?: string;
  estimatedReadyAt?: string;
  notes?: string;
  modifiers: OrderItemModifier[];
}

// Mock Data

export const mockMenuItems: MenuItemSchema[] = [
  {
    id: "menu-1",
    businessId: "business-1",
    name: "Grilled Chicken Breast",
    description: "Juicy grilled chicken breast with herbs and spices",
    category: "food",
    subcategory: "Main Course",
    price: 18.99,
    cost: 8.5,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
    available: true,
    stock: 25,
    minStock: 5,
    preparationTime: 15,
    allergens: ["none"],
    modifiers: [
      {
        id: "mod-1",
        name: "Extra Sauce",
        price: 2.0,
        required: false,
        maxQuantity: 3,
      },
      {
        id: "mod-2",
        name: "Side Salad",
        price: 3.5,
        required: false,
        maxQuantity: 1,
      },
    ],
    tags: ["popular", "healthy"],
    featured: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "menu-2",
    businessId: "business-1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    category: "food",
    subcategory: "Pizza",
    price: 16.99,
    cost: 7.2,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
    available: true,
    stock: 15,
    minStock: 3,
    preparationTime: 20,
    allergens: ["gluten", "dairy"],
    modifiers: [
      {
        id: "mod-3",
        name: "Extra Cheese",
        price: 2.5,
        required: false,
        maxQuantity: 2,
      },
      {
        id: "mod-4",
        name: "Pepperoni",
        price: 3.0,
        required: false,
        maxQuantity: 1,
      },
    ],
    tags: ["classic", "vegetarian"],
    featured: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "menu-3",
    businessId: "business-1",
    name: "Craft Beer",
    description: "Local craft beer selection",
    category: "alcohol",
    subcategory: "Beer",
    price: 8.99,
    cost: 3.5,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    available: true,
    stock: 50,
    minStock: 10,
    preparationTime: 2,
    allergens: ["gluten"],
    modifiers: [
      {
        id: "mod-5",
        name: "Large Size",
        price: 2.0,
        required: false,
        maxQuantity: 1,
      },
    ],
    tags: ["local", "craft"],
    featured: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "menu-4",
    businessId: "business-1",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
    category: "food",
    subcategory: "Salad",
    price: 12.99,
    cost: 5.2,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    available: true,
    stock: 20,
    minStock: 5,
    preparationTime: 8,
    allergens: ["gluten", "dairy", "eggs"],
    modifiers: [
      {
        id: "mod-6",
        name: "Grilled Chicken",
        price: 4.0,
        required: false,
        maxQuantity: 1,
      },
      {
        id: "mod-7",
        name: "Extra Dressing",
        price: 1.5,
        required: false,
        maxQuantity: 2,
      },
    ],
    tags: ["healthy", "vegetarian"],
    featured: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "menu-5",
    businessId: "business-1",
    name: "Red Wine",
    description: "Premium red wine selection",
    category: "alcohol",
    subcategory: "Wine",
    price: 12.99,
    cost: 6.5,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    available: true,
    stock: 30,
    minStock: 5,
    preparationTime: 1,
    allergens: ["sulfites"],
    modifiers: [
      {
        id: "mod-8",
        name: "Bottle",
        price: 8.0,
        required: false,
        maxQuantity: 1,
      },
    ],
    tags: ["premium", "wine"],
    featured: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

export const mockTables: TableSchema[] = [
  {
    id: "table-1",
    businessId: "business-1",
    number: 1,
    capacity: 4,
    status: "occupied",
    currentOrderId: "order-1",
    serverId: "user-5",
    customerCount: 3,
    seatedAt: "2024-01-15T18:30:00Z",
    estimatedDeparture: "2024-01-15T20:30:00Z",
    location: "indoor",
  },
  {
    id: "table-2",
    businessId: "business-1",
    number: 2,
    capacity: 6,
    status: "available",
    location: "indoor",
  },
  {
    id: "table-3",
    businessId: "business-1",
    number: 3,
    capacity: 2,
    status: "occupied",
    currentOrderId: "order-2",
    serverId: "user-6",
    customerCount: 2,
    seatedAt: "2024-01-15T19:00:00Z",
    estimatedDeparture: "2024-01-15T21:00:00Z",
    location: "outdoor",
  },
  {
    id: "table-4",
    businessId: "business-1",
    number: 4,
    capacity: 8,
    status: "reserved",
    serverId: "user-5",
    seatedAt: "2024-01-15T20:00:00Z",
    estimatedDeparture: "2024-01-15T22:00:00Z",
    location: "indoor",
    notes: "Birthday party reservation",
  },
  {
    id: "table-5",
    businessId: "business-1",
    number: 5,
    capacity: 4,
    status: "cleaning",
    location: "indoor",
  },
];

export const mockCustomers: CustomerSchema[] = [
  {
    id: "customer-1",
    businessId: "business-1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1234567890",
    loyaltyPoints: 450,
    totalVisits: 12,
    totalSpent: 850.5,
    preferences: {
      favoriteItems: ["menu-1", "menu-3"],
      preferredPaymentMethod: "card",
      seatingPreference: "indoor",
      specialInstructions: "Allergic to nuts",
    },
    dietaryRestrictions: ["nuts"],
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    lastVisit: "2024-01-10T19:30:00Z",
  },
  {
    id: "customer-2",
    businessId: "business-1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1234567891",
    loyaltyPoints: 120,
    totalVisits: 5,
    totalSpent: 320.75,
    preferences: {
      favoriteItems: ["menu-4"],
      preferredPaymentMethod: "mobile_money",
      seatingPreference: "outdoor",
    },
    dietaryRestrictions: ["vegetarian"],
    status: "active",
    createdAt: "2024-01-05T00:00:00Z",
    lastVisit: "2024-01-12T20:15:00Z",
  },
];

export const mockOrders: OrderSchema[] = [
  {
    id: "order-1",
    businessId: "business-1",
    customerId: "customer-1",
    serverId: "user-5",
    tableNumber: 1,
    type: "dine_in",
    status: "preparing",
    priority: "normal",
    items: [
      {
        id: "item-1",
        productId: "menu-1",
        productName: "Grilled Chicken Breast",
        category: "food",
        quantity: 2,
        unitPrice: 18.99,
        totalPrice: 37.98,
        modifiers: [
          { id: "mod-1", name: "Extra Sauce", price: 2.0, quantity: 1 },
        ],
        prepStatus: "preparing",
        notes: "Well done",
      },
      {
        id: "item-2",
        productId: "menu-3",
        productName: "Craft Beer",
        category: "alcohol",
        quantity: 3,
        unitPrice: 8.99,
        totalPrice: 26.97,
        modifiers: [],
        prepStatus: "ready",
      },
    ],
    subtotal: 64.95,
    tax: 6.5,
    serviceCharge: 8.0,
    discount: 0,
    total: 79.45,
    paymentStatus: "pending",
    payments: [],
    specialInstructions: "Table 1, near window",
    estimatedCompletionTime: "2024-01-15T19:45:00Z",
    createdAt: "2024-01-15T18:30:00Z",
    updatedAt: "2024-01-15T18:35:00Z",
    loyaltyPointsEarned: 79,
  },
  {
    id: "order-2",
    businessId: "business-1",
    customerId: "customer-2",
    serverId: "user-6",
    tableNumber: 3,
    type: "dine_in",
    status: "pending",
    priority: "rush",
    items: [
      {
        id: "item-3",
        productId: "menu-4",
        productName: "Caesar Salad",
        category: "food",
        quantity: 1,
        unitPrice: 12.99,
        totalPrice: 12.99,
        modifiers: [
          { id: "mod-6", name: "Grilled Chicken", price: 4.0, quantity: 1 },
        ],
        prepStatus: "pending",
        notes: "Dressing on the side",
      },
      {
        id: "item-4",
        productId: "menu-5",
        productName: "Red Wine",
        category: "alcohol",
        quantity: 1,
        unitPrice: 12.99,
        totalPrice: 12.99,
        modifiers: [],
        prepStatus: "ready",
      },
    ],
    subtotal: 25.98,
    tax: 2.6,
    serviceCharge: 3.25,
    discount: 0,
    total: 31.83,
    paymentStatus: "pending",
    payments: [],
    specialInstructions: "Rush order for anniversary",
    estimatedCompletionTime: "2024-01-15T19:15:00Z",
    createdAt: "2024-01-15T19:00:00Z",
    updatedAt: "2024-01-15T19:00:00Z",
    loyaltyPointsEarned: 32,
  },
];

export const mockKitchenQueue: KitchenQueueItem[] = [
  {
    id: "queue-1",
    orderId: "order-1",
    itemId: "item-1",
    productName: "Grilled Chicken Breast",
    category: "food",
    quantity: 2,
    priority: "normal",
    status: "preparing",
    assignedTo: "user-7",
    startedAt: "2024-01-15T18:32:00Z",
    estimatedReadyAt: "2024-01-15T18:47:00Z",
    notes: "Well done",
    modifiers: [{ id: "mod-1", name: "Extra Sauce", price: 2.0, quantity: 1 }],
  },
  {
    id: "queue-2",
    orderId: "order-2",
    itemId: "item-3",
    productName: "Caesar Salad",
    category: "food",
    quantity: 1,
    priority: "rush",
    status: "pending",
    estimatedReadyAt: "2024-01-15T19:08:00Z",
    notes: "Dressing on the side, rush order",
    modifiers: [
      { id: "mod-6", name: "Grilled Chicken", price: 4.0, quantity: 1 },
    ],
  },
];

// Helper functions
export const getOrderById = (orderId: string): OrderSchema | undefined => {
  return mockOrders.find((order) => order.id === orderId);
};

export const getOrdersByStatus = (
  status: OrderSchema["status"]
): OrderSchema[] => {
  return mockOrders.filter((order) => order.status === status);
};

export const getOrdersByTable = (tableNumber: number): OrderSchema[] => {
  return mockOrders.filter((order) => order.tableNumber === tableNumber);
};

export const getKitchenQueueByCategory = (
  category: string
): KitchenQueueItem[] => {
  return mockKitchenQueue.filter((item) => item.category === category);
};

export const getTableByNumber = (number: number): TableSchema | undefined => {
  return mockTables.find((table) => table.number === number);
};

export const getCustomerById = (
  customerId: string
): CustomerSchema | undefined => {
  return mockCustomers.find((customer) => customer.id === customerId);
};

export const getMenuItemById = (
  menuItemId: string
): MenuItemSchema | undefined => {
  return mockMenuItems.find((item) => item.id === menuItemId);
};
