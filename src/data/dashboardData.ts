// Mock data for BRMS Dashboard Components

export interface Business {
  id: string;
  name: string;
  type: "restaurant" | "bar" | "cafe";
  status: "active" | "suspended" | "expired" | "trial";
  subscription: "Basic" | "Premium" | "Enterprise";
  location: string;
  revenue: number;
  customers: number;
  orders: number;
  createdAt: string;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Owner" | "Manager" | "Accountant" | "Waiter" | "Customer";
  businessId?: string;
  status: "active" | "inactive";
  lastLogin: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: "food" | "beverage" | "alcohol" | "dessert";
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  status: "active" | "inactive" | "out_of_stock";
  businessId: string;
}

export interface Order {
  id: string;
  businessId: string;
  customerId?: string;
  waiterId?: string;
  tableNumber?: number;
  type: "dine_in" | "takeaway" | "delivery";
  status: "pending" | "preparing" | "ready" | "served" | "paid" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: "cash" | "card" | "mobile_money";
  paymentStatus: "pending" | "partial" | "paid" | "refunded";
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  businessId: string;
  loyaltyPoints: number;
  totalVisits: number;
  totalSpent: number;
  preferences?: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface FinancialData {
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  date: string;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  type: "in" | "out" | "adjustment" | "waste";
  quantity: number;
  reason: string;
  date: string;
}

// Mock Data
export const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Le Petit Bistro",
    type: "restaurant",
    status: "active",
    subscription: "Premium",
    location: "Kigali, Rwanda",
    revenue: 1250000,
    customers: 450,
    orders: 1200,
    createdAt: "2024-01-15",
    expiresAt: "2024-12-15",
  },
  {
    id: "2",
    name: "Sky Bar Lounge",
    type: "bar",
    status: "active",
    subscription: "Enterprise",
    location: "Kigali, Rwanda",
    revenue: 890000,
    customers: 320,
    orders: 850,
    createdAt: "2024-02-20",
    expiresAt: "2024-11-20",
  },
  {
    id: "3",
    name: "Café du Matin",
    type: "cafe",
    status: "trial",
    subscription: "Basic",
    location: "Kigali, Rwanda",
    revenue: 320000,
    customers: 180,
    orders: 420,
    createdAt: "2024-03-10",
    expiresAt: "2024-04-10",
  },
  {
    id: "4",
    name: "Riverside Restaurant",
    type: "restaurant",
    status: "suspended",
    subscription: "Premium",
    location: "Kigali, Rwanda",
    revenue: 0,
    customers: 0,
    orders: 0,
    createdAt: "2024-01-05",
    expiresAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Night Owl Bar",
    type: "bar",
    status: "active",
    subscription: "Basic",
    location: "Kigali, Rwanda",
    revenue: 650000,
    customers: 280,
    orders: 720,
    createdAt: "2024-02-15",
    expiresAt: "2024-12-15",
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@brms.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@lepetitbistro.com",
    role: "Owner",
    businessId: "1",
    status: "active",
    lastLogin: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@lepetitbistro.com",
    role: "Manager",
    businessId: "1",
    status: "active",
    lastLogin: "2024-01-15T08:45:00Z",
  },
  {
    id: "4",
    name: "Mike Wilson",
    email: "mike@lepetitbistro.com",
    role: "Accountant",
    businessId: "1",
    status: "active",
    lastLogin: "2024-01-15T07:30:00Z",
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@lepetitbistro.com",
    role: "Waiter",
    businessId: "1",
    status: "active",
    lastLogin: "2024-01-15T06:20:00Z",
  },
  {
    id: "6",
    name: "Customer User",
    email: "customer@example.com",
    role: "Customer",
    businessId: "1",
    status: "active",
    lastLogin: "2024-01-15T12:00:00Z",
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Grilled Salmon",
    category: "food",
    price: 2500,
    cost: 1200,
    stock: 15,
    minStock: 5,
    status: "active",
    businessId: "1",
  },
  {
    id: "2",
    name: "Beef Steak",
    category: "food",
    price: 3000,
    cost: 1800,
    stock: 8,
    minStock: 10,
    status: "active",
    businessId: "1",
  },
  {
    id: "3",
    name: "Red Wine",
    category: "alcohol",
    price: 1200,
    cost: 600,
    stock: 25,
    minStock: 8,
    status: "active",
    businessId: "1",
  },
  {
    id: "4",
    name: "Coffee",
    category: "beverage",
    price: 500,
    cost: 150,
    stock: 50,
    minStock: 20,
    status: "active",
    businessId: "1",
  },
  {
    id: "5",
    name: "Chocolate Cake",
    category: "dessert",
    price: 800,
    cost: 300,
    stock: 12,
    minStock: 5,
    status: "active",
    businessId: "1",
  },
];

export const mockOrders: Order[] = [
  {
    id: "1",
    businessId: "1",
    customerId: "6",
    waiterId: "5",
    tableNumber: 5,
    type: "dine_in",
    status: "paid",
    items: [
      {
        id: "1",
        productId: "1",
        productName: "Grilled Salmon",
        quantity: 2,
        price: 2500,
        total: 5000,
      },
      {
        id: "2",
        productId: "3",
        productName: "Red Wine",
        quantity: 1,
        price: 1200,
        total: 1200,
      },
    ],
    subtotal: 6200,
    tax: 620,
    total: 6820,
    paymentMethod: "card",
    paymentStatus: "paid",
    createdAt: "2024-01-15T18:30:00Z",
    updatedAt: "2024-01-15T19:15:00Z",
  },
  {
    id: "2",
    businessId: "1",
    customerId: "6",
    waiterId: "5",
    tableNumber: 3,
    type: "dine_in",
    status: "preparing",
    items: [
      {
        id: "3",
        productId: "2",
        productName: "Beef Steak",
        quantity: 1,
        price: 3000,
        total: 3000,
      },
      {
        id: "4",
        productId: "4",
        productName: "Coffee",
        quantity: 2,
        price: 500,
        total: 1000,
      },
    ],
    subtotal: 4000,
    tax: 400,
    total: 4400,
    paymentMethod: "cash",
    paymentStatus: "paid",
    createdAt: "2024-01-15T19:00:00Z",
    updatedAt: "2024-01-15T19:00:00Z",
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+250788123456",
    businessId: "1",
    loyaltyPoints: 450,
    totalVisits: 15,
    totalSpent: 125000,
    preferences: "Vegetarian, No nuts",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+250788654321",
    businessId: "1",
    loyaltyPoints: 280,
    totalVisits: 8,
    totalSpent: 89000,
    preferences: "Spicy food lover",
    status: "active",
    createdAt: "2024-01-05",
  },
];

export const mockFinancialData: FinancialData[] = [
  {
    revenue: 1250000,
    expenses: 750000,
    profit: 500000,
    profitMargin: 40,
    date: "2024-01",
  },
  {
    revenue: 1180000,
    expenses: 720000,
    profit: 460000,
    profitMargin: 39,
    date: "2024-02",
  },
  {
    revenue: 1320000,
    expenses: 780000,
    profit: 540000,
    profitMargin: 41,
    date: "2024-03",
  },
  {
    revenue: 1280000,
    expenses: 760000,
    profit: 520000,
    profitMargin: 40.6,
    date: "2024-04",
  },
  {
    revenue: 1350000,
    expenses: 800000,
    profit: 550000,
    profitMargin: 40.7,
    date: "2024-05",
  },
  {
    revenue: 1420000,
    expenses: 820000,
    profit: 600000,
    profitMargin: 42.3,
    date: "2024-06",
  },
];

export const mockInventoryMovements: InventoryMovement[] = [
  {
    id: "1",
    productId: "1",
    productName: "Grilled Salmon",
    type: "in",
    quantity: 20,
    reason: "Supplier delivery",
    date: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    productId: "1",
    productName: "Grilled Salmon",
    type: "out",
    quantity: 5,
    reason: "Order fulfillment",
    date: "2024-01-15T18:30:00Z",
  },
  {
    id: "3",
    productId: "2",
    productName: "Beef Steak",
    type: "out",
    quantity: 2,
    reason: "Order fulfillment",
    date: "2024-01-15T19:00:00Z",
  },
];

// Helper functions
export const getBusinessById = (id: string) =>
  mockBusinesses.find((b) => b.id === id);
export const getUsersByBusinessId = (businessId: string) =>
  mockUsers.filter((u) => u.businessId === businessId);
export const getProductsByBusinessId = (businessId: string) =>
  mockProducts.filter((p) => p.businessId === businessId);
export const getOrdersByBusinessId = (businessId: string) =>
  mockOrders.filter((o) => o.businessId === businessId);
export const getCustomersByBusinessId = (businessId: string) =>
  mockCustomers.filter((c) => c.businessId === businessId);
