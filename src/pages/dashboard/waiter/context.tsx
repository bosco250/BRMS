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

interface WaiterDashboardContextType {
  waiter: Waiter;
  tables: Table[];
  reservations: Reservation[];
  notifications: Notification[];
  updateTableStatus: (tableId: string, status: Table["status"]) => void;
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt" | "read">
  ) => void;
  markNotificationAsRead: (notificationId: string) => void;
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

  const value = useMemo(
    () => ({
      waiter: mockWaiter,
      tables,
      reservations,
      notifications,
      updateTableStatus,
      addNotification,
      markNotificationAsRead,
    }),
    [tables, reservations, notifications]
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
