import React, { createContext, useContext, useMemo, useState } from "react";

export type Manager = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string | null;
  joinDate: string;
  permissions: string[];
};

export type StaffMember = {
  id: number;
  name: string;
  role: "waiter" | "chef" | "bartender" | "host" | "manager";
  email: string;
  phone: string;
  status: "active" | "inactive" | "on_leave";
  joinDate: string;
  avatar?: string;
  performance: {
    rating: number;
    totalOrders: number;
    customerSatisfaction: number;
  };
};

export type Table = {
  id: number;
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  reservationTime?: string;
  waiter?: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  category: "ingredients" | "supplies" | "equipment";
  currentStock: number;
  minStock: number;
  unit: string;
  cost: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
};

export type MenuItem = {
  id: number;
  name: string;
  category: "food" | "beverages" | "alcohol" | "desserts";
  price: number;
  cost: number;
  description: string;
  image: string | null;
  available: boolean;
  ingredients: string[];
  allergens: string[];
  preparationTime: number;
};

export type Notification = {
  id: string;
  type: "order" | "inventory" | "staff" | "system";
  title: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  read: boolean;
  actionRequired: boolean;
};

const mockManager: Manager = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@brms.com",
  phone: "+250 788 123 456",
  role: "Manager",
  avatar: null,
  joinDate: "2023-06-15",
  permissions: ["orders", "staff", "inventory", "reports", "settings"],
};

const mockTables: Table[] = [
  {
    id: 1,
    number: 1,
    capacity: 4,
    status: "occupied",
    waiter: "Alex Chen",
  },
  {
    id: 2,
    number: 2,
    capacity: 2,
    status: "available",
  },
  {
    id: 3,
    number: 3,
    capacity: 6,
    status: "occupied",
    waiter: "Alex Chen",
  },
  {
    id: 4,
    number: 4,
    capacity: 4,
    status: "reserved",
    reservationTime: "2024-08-20T19:00:00Z",
  },
  {
    id: 5,
    number: 5,
    capacity: 8,
    status: "available",
  },
];

const mockStaff: StaffMember[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "waiter",
    email: "alex.chen@brms.com",
    phone: "+250 788 123 456",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinDate: "2024-01-10",
    performance: {
      rating: 4.7,
      totalOrders: 45,
      customerSatisfaction: 95,
    },
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "chef",
    email: "maria.garcia@brms.com",
    phone: "+250 788 234 567",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "2023-11-20",
    performance: {
      rating: 4.9,
      totalOrders: 89,
      customerSatisfaction: 98,
    },
  },
  {
    id: 3,
    name: "David Kim",
    role: "bartender",
    email: "david.kim@brms.com",
    phone: "+250 788 456 789",
    status: "on_leave",
    avatar: undefined,
    joinDate: "2024-02-05",
    performance: {
      rating: 4.6,
      totalOrders: 67,
      customerSatisfaction: 94,
    },
  },
];

const mockInventory: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Chicken Breast",
    category: "ingredients",
    currentStock: 25,
    minStock: 10,
    unit: "kg",
    cost: 8.5,
    supplier: "Fresh Foods Ltd",
    lastRestocked: "2024-08-18",
    expiryDate: "2024-08-25",
  },
  {
    id: "INV-002",
    name: "Tomatoes",
    category: "ingredients",
    currentStock: 8,
    minStock: 15,
    unit: "kg",
    cost: 3.2,
    supplier: "Local Market",
    lastRestocked: "2024-08-19",
    expiryDate: "2024-08-22",
  },
  {
    id: "INV-003",
    name: "Coffee Beans",
    category: "ingredients",
    currentStock: 12,
    minStock: 5,
    unit: "kg",
    cost: 15.0,
    supplier: "Coffee Co",
    lastRestocked: "2024-08-15",
  },
];

const mockMenu: MenuItem[] = [
  {
    id: 1,
    name: "Grilled Chicken",
    category: "food",
    price: 18.99,
    cost: 8.5,
    description: "Tender grilled chicken breast with herbs",
    image: null,
    available: true,
    ingredients: ["Chicken Breast", "Herbs", "Olive Oil", "Salt", "Pepper"],
    allergens: [],
    preparationTime: 20,
  },
  {
    id: 2,
    name: "Caesar Salad",
    category: "food",
    price: 12.99,
    cost: 4.2,
    description: "Fresh romaine lettuce with caesar dressing",
    image: null,
    available: true,
    ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing"],
    allergens: ["Dairy", "Gluten"],
    preparationTime: 10,
  },
  {
    id: 3,
    name: "Coffee",
    category: "beverages",
    price: 3.99,
    cost: 0.8,
    description: "Freshly brewed coffee",
    image: null,
    available: true,
    ingredients: ["Coffee Beans", "Water"],
    allergens: [],
    preparationTime: 5,
  },
];

const mockNotifications: Notification[] = [
  {
    id: "NOT-001",
    type: "inventory",
    title: "Low Stock Alert",
    message: "Tomatoes are running low (8kg remaining)",
    priority: "medium",
    createdAt: "2024-08-20T09:00:00Z",
    read: false,
    actionRequired: true,
  },
  {
    id: "NOT-002",
    type: "order",
    title: "Rush Order",
    message: "Order ORD-002 marked as rush priority",
    priority: "high",
    createdAt: "2024-08-20T10:15:00Z",
    read: false,
    actionRequired: true,
  },
  {
    id: "NOT-003",
    type: "staff",
    title: "Staff Break",
    message: "David Kim is on break",
    priority: "low",
    createdAt: "2024-08-20T10:30:00Z",
    read: true,
    actionRequired: false,
  },
];

interface ManagerDashboardContextType {
  manager: Manager;
  tables: Table[];
  staff: StaffMember[];
  inventory: InventoryItem[];
  menu: MenuItem[];
  notifications: Notification[];
  updateTableStatus: (tableId: number, status: Table["status"]) => void;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const ManagerDashboardContext = createContext<
  ManagerDashboardContextType | undefined
>(undefined);

export function ManagerDashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const updateTableStatus = (tableId: number, status: Table["status"]) => {
    setTables((prev) =>
      prev.map((table) => (table.id === tableId ? { ...table, status } : table))
    );
  };

  const addNotification = (
    notification: Omit<Notification, "id" | "createdAt" | "read">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const value = useMemo(
    () => ({
      manager: mockManager,
      tables,
      staff: mockStaff,
      inventory: mockInventory,
      menu: mockMenu,
      notifications,
      updateTableStatus,
      addNotification,
      markNotificationAsRead,
    }),
    [tables, notifications]
  );

  return (
    <ManagerDashboardContext.Provider value={value}>
      {children}
    </ManagerDashboardContext.Provider>
  );
}

export function useManagerDashboard() {
  const context = useContext(ManagerDashboardContext);
  if (context === undefined) {
    throw new Error(
      "useManagerDashboard must be used within a ManagerDashboardProvider"
    );
  }
  return context;
}
