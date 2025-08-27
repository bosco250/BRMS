import React, { createContext, useContext, useMemo, useState } from "react";

export type Owner = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string | null;
  joinDate: string;
  permissions: string[];
  restaurantsOwned: number;
  totalRevenue: number;
};

export type Restaurant = {
  id: string;
  name: string;
  location: string;
  type: "restaurant" | "bar" | "cafe";
  status: "active" | "inactive" | "maintenance";
  revenue: number;
  staffCount: number;
  rating: number;
  lastUpdated: string;
};

export type FinancialData = {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  orders: number;
  customers: number;
};

export type StaffMember = {
  id: number;
  name: string;
  role: "Manager" | "Chef" | "Waiter" | "Bartender" | "Cashier";
  email: string;
  phone: string;
  status: "active" | "inactive" | "on_break";
  avatar: string | null;
  joinDate: string;
  salary: number;
  performance: {
    ordersCompleted: number;
    averageRating: number;
    totalHours: number;
  };
};

export type Order = {
  id: string;
  customerName: string;
  tableNumber?: number;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "served" | "paid" | "cancelled";
  priority: "normal" | "rush" | "urgent";
  type: "dine_in" | "takeaway" | "delivery";
  createdAt: string;
  updatedAt: string;
  estimatedTime: number;
  paymentStatus: "pending" | "paid" | "failed";
  restaurantId: string;
};

export type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
};

export type Notification = {
  id: string;
  type: "financial" | "staff" | "restaurant" | "system";
  title: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  read: boolean;
  actionRequired: boolean;
};

const mockOwner: Owner = {
  id: 1,
  name: "Michael Rodriguez",
  email: "michael.rodriguez@brms.com",
  phone: "+250 788 999 999",
  role: "Owner",
  avatar: null,
  joinDate: "2020-01-15",
  permissions: ["all"],
  restaurantsOwned: 3,
  totalRevenue: 1250000,
};

const mockRestaurants: Restaurant[] = [
  {
    id: "REST-001",
    name: "La Casa Italiana",
    location: "Kigali, Rwanda",
    type: "restaurant",
    status: "active",
    revenue: 450000,
    staffCount: 25,
    rating: 4.8,
    lastUpdated: "2024-08-20T10:00:00Z",
  },
  {
    id: "REST-002",
    name: "Sky Lounge Bar",
    location: "Kigali, Rwanda",
    type: "bar",
    status: "active",
    revenue: 320000,
    staffCount: 18,
    rating: 4.6,
    lastUpdated: "2024-08-20T10:00:00Z",
  },
  {
    id: "REST-003",
    name: "Urban Coffee Co.",
    location: "Kigali, Rwanda",
    type: "cafe",
    status: "active",
    revenue: 180000,
    staffCount: 12,
    rating: 4.4,
    lastUpdated: "2024-08-20T10:00:00Z",
  },
];

const mockFinancialData: FinancialData[] = [
  {
    id: "FIN-001",
    month: "August 2024",
    revenue: 950000,
    expenses: 650000,
    profit: 300000,
    orders: 1250,
    customers: 890,
  },
  {
    id: "FIN-002",
    month: "July 2024",
    revenue: 920000,
    expenses: 620000,
    profit: 300000,
    orders: 1180,
    customers: 850,
  },
  {
    id: "FIN-003",
    month: "June 2024",
    revenue: 880000,
    expenses: 600000,
    profit: 280000,
    orders: 1120,
    customers: 800,
  },
];

const mockStaff: StaffMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Manager",
    email: "sarah.johnson@brms.com",
    phone: "+250 788 123 456",
    status: "active",
    avatar: null,
    joinDate: "2023-06-15",
    salary: 2500,
    performance: {
      ordersCompleted: 156,
      averageRating: 4.8,
      totalHours: 320,
    },
  },
  {
    id: 2,
    name: "Alex Chen",
    role: "Chef",
    email: "alex.chen@brms.com",
    phone: "+250 788 234 567",
    status: "active",
    avatar: null,
    joinDate: "2023-08-20",
    salary: 2200,
    performance: {
      ordersCompleted: 289,
      averageRating: 4.9,
      totalHours: 380,
    },
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Manager",
    email: "maria.garcia@brms.com",
    phone: "+250 788 345 678",
    status: "active",
    avatar: null,
    joinDate: "2023-11-10",
    salary: 2400,
    performance: {
      ordersCompleted: 134,
      averageRating: 4.7,
      totalHours: 300,
    },
  },
];

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    tableNumber: 5,
    items: [
      { id: "1", productName: "Grilled Chicken", quantity: 2, unitPrice: 18.99, totalPrice: 37.98 },
      { id: "2", productName: "Caesar Salad", quantity: 1, unitPrice: 12.99, totalPrice: 12.99 },
    ],
    total: 50.97,
    status: "paid",
    priority: "normal",
    type: "dine_in",
    createdAt: "2024-08-20T10:30:00Z",
    updatedAt: "2024-08-20T11:45:00Z",
    estimatedTime: 25,
    paymentStatus: "paid",
    restaurantId: "REST-001",
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    tableNumber: 3,
    items: [
      { id: "3", productName: "Fish & Chips", quantity: 1, unitPrice: 16.99, totalPrice: 16.99 },
      { id: "4", productName: "Coffee", quantity: 2, unitPrice: 3.99, totalPrice: 7.98 },
    ],
    total: 24.97,
    status: "paid",
    priority: "rush",
    type: "dine_in",
    createdAt: "2024-08-20T10:15:00Z",
    updatedAt: "2024-08-20T10:40:00Z",
    estimatedTime: 20,
    paymentStatus: "paid",
    restaurantId: "REST-001",
  },
];

const mockNotifications: Notification[] = [
  {
    id: "NOT-001",
    type: "financial",
    title: "Monthly Revenue Target Met",
    message: "All restaurants exceeded monthly revenue targets",
    priority: "high",
    createdAt: "2024-08-20T09:00:00Z",
    read: false,
    actionRequired: false,
  },
  {
    id: "NOT-002",
    type: "staff",
    title: "New Manager Hired",
    message: "Sarah Johnson promoted to Manager at La Casa Italiana",
    priority: "medium",
    createdAt: "2024-08-19T14:30:00Z",
    read: false,
    actionRequired: false,
  },
  {
    id: "NOT-003",
    type: "restaurant",
    title: "Maintenance Required",
    message: "Urban Coffee Co. needs equipment maintenance",
    priority: "high",
    createdAt: "2024-08-18T11:00:00Z",
    read: true,
    actionRequired: true,
  },
];

interface OwnerDashboardContextType {
  owner: Owner;
  restaurants: Restaurant[];
  financialData: FinancialData[];
  staff: StaffMember[];
  orders: Order[];
  notifications: Notification[];
  updateRestaurantStatus: (restaurantId: string, status: Restaurant["status"]) => void;
  updateStaffStatus: (staffId: number, status: StaffMember["status"]) => void;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const OwnerDashboardContext = createContext<OwnerDashboardContextType | undefined>(undefined);

export function OwnerDashboardProvider({ children }: { children: React.ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const updateRestaurantStatus = (restaurantId: string, status: Restaurant["status"]) => {
    setRestaurants(prev => prev.map(restaurant => 
      restaurant.id === restaurantId ? { ...restaurant, status } : restaurant
    ));
  };

  const updateStaffStatus = (staffId: number, status: StaffMember["status"]) => {
    setStaff(prev => prev.map(staffMember => 
      staffMember.id === staffId ? { ...staffMember, status } : staffMember
    ));
  };

  const addNotification = (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `NOT-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const value = useMemo(() => ({
    owner: mockOwner,
    restaurants,
    financialData: mockFinancialData,
    staff,
    orders: mockOrders,
    notifications,
    updateRestaurantStatus,
    updateStaffStatus,
    addNotification,
    markNotificationAsRead,
  }), [restaurants, staff, notifications]);

  return (
    <OwnerDashboardContext.Provider value={value}>
      {children}
    </OwnerDashboardContext.Provider>
  );
}

export function useOwnerDashboard() {
  const context = useContext(OwnerDashboardContext);
  if (context === undefined) {
    throw new Error("useOwnerDashboard must be used within an OwnerDashboardProvider");
  }
  return context;
}
