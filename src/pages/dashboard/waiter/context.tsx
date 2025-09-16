import React, { createContext, useContext, useMemo, useState } from "react";

export type Waiter = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: "active" | "offline" | "busy";
  currentTable?: string;
  totalTips: number;
  rating: number;
  shiftStart: string;
  shiftEnd: string;
};

export type Table = {
  id: string;
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  waiterId?: number;
  reservationTime?: string;
  customerCount?: number;
  lastActivity: string;
};

export type Reservation = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  tableId: string;
  tableNumber: number;
  partySize: number;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  specialRequests?: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  type: "reservation" | "table" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionRequired: boolean;
  tableId?: string;
};

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  notes?: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  tableNumber?: number;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  orderType: "dine-in" | "takeaway" | "delivery";
  status: "preparing" | "ready" | "served";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  specialRequests?: string;
  createdAt: string;
  estimatedTime?: string;
  waiterId: number;
  waiterName: string;
  notes?: string;
};

// Mock data
const mockWaiter: Waiter = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@brms.com",
  role: "Senior Waiter",
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  status: "active",
  currentTable: "T5",
  totalTips: 89.5,
  rating: 4.8,
  shiftStart: "2024-01-15T08:00:00Z",
  shiftEnd: "2024-01-15T16:00:00Z",
};

const mockTables: Table[] = [
  {
    id: "T1",
    number: 1,
    capacity: 2,
    status: "occupied",
    waiterId: 1,
    customerCount: 2,
    lastActivity: "2024-01-15T14:30:00Z",
  },
  {
    id: "T2",
    number: 2,
    capacity: 4,
    status: "available",
    lastActivity: "2024-01-15T14:25:00Z",
  },
  {
    id: "T3",
    number: 3,
    capacity: 6,
    status: "reserved",
    reservationTime: "2024-01-15T19:00:00Z",
    lastActivity: "2024-01-15T14:20:00Z",
  },
  {
    id: "T4",
    number: 4,
    capacity: 4,
    status: "occupied",
    waiterId: 1,
    customerCount: 3,
    lastActivity: "2024-01-15T14:15:00Z",
  },
  {
    id: "T5",
    number: 5,
    capacity: 8,
    status: "occupied",
    waiterId: 1,
    customerCount: 6,
    lastActivity: "2024-01-15T14:30:00Z",
  },
];

const mockReservations: Reservation[] = [
  {
    id: "RES-001",
    customerName: "John Smith",
    customerPhone: "+1-555-0123",
    customerEmail: "john.smith@email.com",
    tableId: "T3",
    tableNumber: 3,
    partySize: 6,
    date: "2024-01-15",
    time: "19:00",
    status: "confirmed",
    specialRequests: "Anniversary celebration, need high chair",
    createdAt: "2024-01-14T10:00:00Z",
  },
  {
    id: "RES-002",
    customerName: "Emily Davis",
    customerPhone: "+1-555-0456",
    customerEmail: "emily.davis@email.com",
    tableId: "T2",
    tableNumber: 2,
    partySize: 4,
    date: "2024-01-15",
    time: "20:30",
    status: "pending",
    createdAt: "2024-01-15T09:00:00Z",
  },
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "table",
    title: "Table Service Required",
    message: "Table 1 needs attention",
    read: false,
    createdAt: "2024-01-15T14:25:00Z",
    actionRequired: true,
    tableId: "T1",
  },
  {
    id: "2",
    type: "reservation",
    title: "New Reservation",
    message: "New reservation request for Table 2 at 8:30 PM",
    read: false,
    createdAt: "2024-01-15T09:00:00Z",
    actionRequired: true,
    tableId: "T2",
  },
  {
    id: "3",
    type: "table",
    title: "Table Available",
    message: "Table 6 is now available after cleaning",
    read: true,
    createdAt: "2024-01-15T14:15:00Z",
    actionRequired: false,
    tableId: "T6",
  },
];

const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "ORD-001",
    tableNumber: 1,
    customerName: "John Smith",
    customerPhone: "+1-555-0123",
    orderType: "dine-in",
    status: "preparing",
    items: [
      { name: "Grilled Chicken", quantity: 1, price: 15000 },
      { name: "Caesar Salad", quantity: 1, price: 8000 },
    ],
    subtotal: 23000,
    tax: 4140,
    tip: 2300,
    total: 29440,
    createdAt: "2024-01-15T14:00:00Z",
    estimatedTime: "2024-01-15T14:30:00Z",
    waiterId: 1,
    waiterName: "Sarah Johnson",
    notes: "Customer prefers well-done chicken",
  },
  {
    id: "order-2",
    orderNumber: "ORD-002",
    tableNumber: 4,
    customerName: "Emily Davis",
    customerPhone: "+1-555-0456",
    orderType: "dine-in",
    status: "ready",
    items: [
      { name: "Fish & Chips", quantity: 1, price: 18000 },
      { name: "Coffee", quantity: 2, price: 1500 },
    ],
    subtotal: 21000,
    tax: 3780,
    tip: 2100,
    total: 26880,
    createdAt: "2024-01-15T13:45:00Z",
    estimatedTime: "2024-01-15T14:15:00Z",
    waiterId: 1,
    waiterName: "Sarah Johnson",
  },
];

interface WaiterDashboardContextType {
  waiter: Waiter;
  tables: Table[];
  reservations: Reservation[];
  notifications: Notification[];
  orders: Order[];
  updateTableStatus: (tableId: string, status: Table["status"]) => void;
  updateReservationStatus: (
    reservationId: string,
    status: Reservation["status"]
  ) => void;
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt" | "read">
  ) => void;
  markNotificationAsRead: (notificationId: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

const WaiterDashboardContext = createContext<
  WaiterDashboardContextType | undefined
>(undefined);

export function WaiterDashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateTableStatus = (tableId: string, status: Table["status"]) => {
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

  const updateReservationStatus = (
    reservationId: string,
    status: Reservation["status"]
  ) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status }
          : reservation
      )
    );
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const value = useMemo(
    () => ({
      waiter: mockWaiter,
      tables,
      reservations,
      notifications,
      orders,
      updateTableStatus,
      updateReservationStatus,
      addNotification,
      markNotificationAsRead,
      addOrder,
      updateOrderStatus,
    }),
    [tables, reservations, notifications, orders]
  );

  return (
    <WaiterDashboardContext.Provider value={value}>
      {children}
    </WaiterDashboardContext.Provider>
  );
}

export function useWaiterDashboard() {
  const context = useContext(WaiterDashboardContext);
  if (context === undefined) {
    throw new Error(
      "useWaiterDashboard must be used within a WaiterDashboardProvider"
    );
  }
  return context;
}
