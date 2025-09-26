import React, { createContext, useContext, useMemo, useState } from "react";

export type KitchenStaff = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: "active" | "offline" | "busy";
  station: "hot" | "cold" | "grill" | "pastry" | "beverages";
  shiftStart: string;
  shiftEnd: string;
  ordersCompleted: number;
  averagePrepTime: number; // in minutes
};

export type KitchenOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  tableNumber?: number;
  orderType: "dine_in" | "takeaway" | "delivery";
  priority: "normal" | "rush" | "urgent";
  status: "pending" | "preparing" | "ready" | "served" | "cancelled";
  items: KitchenOrderItem[];
  specialInstructions?: string;
  estimatedPrepTime: number; // in minutes
  createdAt: string;
  updatedAt: string;
  assignedTo?: number; // kitchen staff ID
  paymentStatus: "pending" | "paid" | "failed";
};

export type KitchenOrderItem = {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  category: "appetizer" | "main" | "dessert" | "beverage" | "salad" | "soup";
  preparationTime: number; // in minutes
  status: "pending" | "preparing" | "ready";
  specialInstructions?: string;
  allergens?: string[];
  station: "hot" | "cold" | "grill" | "pastry" | "beverages";
  price: number;
};

export type KitchenStation = {
  id: string;
  name: string;
  type: "hot" | "cold" | "grill" | "pastry" | "beverages";
  status: "active" | "maintenance" | "offline";
  currentOrders: number;
  capacity: number;
  staffAssigned: number[];
};

export type KitchenNotification = {
  id: string;
  type:
    | "new_order"
    | "order_ready"
    | "order_cancelled"
    | "urgent_order"
    | "station_alert";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionRequired: boolean;
  orderId?: string;
  stationId?: string;
  priority: "low" | "medium" | "high" | "urgent";
};

export type KitchenStats = {
  totalOrders: number;
  ordersCompleted: number;
  averagePrepTime: number;
  onTimeDelivery: number; // percentage
  stationUtilization: {
    hot: number;
    cold: number;
    grill: number;
    pastry: number;
    beverages: number;
  };
  topItems: Array<{
    name: string;
    quantity: number;
    avgPrepTime: number;
  }>;
};

interface KitchenDashboardContextType {
  // Staff Management
  staff: KitchenStaff[];
  currentStaff: KitchenStaff | null;
  updateStaffStatus: (staffId: number, status: KitchenStaff["status"]) => void;

  // Order Management
  orders: KitchenOrder[];
  addOrder: (order: KitchenOrder) => void;
  updateOrderStatus: (orderId: string, status: KitchenOrder["status"]) => void;
  updateItemStatus: (
    orderId: string,
    itemId: string,
    status: KitchenOrderItem["status"]
  ) => void;
  assignOrderToStaff: (orderId: string, staffId: number) => void;
  getOrdersByStatus: (status: KitchenOrder["status"]) => KitchenOrder[];
  getOrdersByPriority: (priority: KitchenOrder["priority"]) => KitchenOrder[];

  // Station Management
  stations: KitchenStation[];
  updateStationStatus: (
    stationId: string,
    status: KitchenStation["status"]
  ) => void;
  getStationOrders: (stationId: string) => KitchenOrder[];

  // Notifications
  notifications: KitchenNotification[];
  addNotification: (
    notification: Omit<KitchenNotification, "id" | "createdAt">
  ) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearNotifications: () => void;

  // Statistics
  stats: KitchenStats;
  updateStats: () => void;

  // Real-time Updates
  isConnected: boolean;
  reconnect: () => void;
}

const KitchenDashboardContext = createContext<
  KitchenDashboardContextType | undefined
>(undefined);

export function KitchenDashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock data - in real app, this would come from API
  const [staff] = useState<KitchenStaff[]>([
    {
      id: 1,
      name: "Chef Maria Rodriguez",
      email: "maria@restaurant.com",
      role: "Head Chef",
      avatar: "/avatars/chef1.jpg",
      status: "active",
      station: "hot",
      shiftStart: "08:00",
      shiftEnd: "16:00",
      ordersCompleted: 45,
      averagePrepTime: 12,
    },
    {
      id: 2,
      name: "Chef James Wilson",
      email: "james@restaurant.com",
      role: "Grill Chef",
      avatar: "/avatars/chef2.jpg",
      status: "active",
      station: "grill",
      shiftStart: "10:00",
      shiftEnd: "18:00",
      ordersCompleted: 38,
      averagePrepTime: 15,
    },
    {
      id: 3,
      name: "Pastry Chef Sarah Chen",
      email: "sarah@restaurant.com",
      role: "Pastry Chef",
      avatar: "/avatars/chef3.jpg",
      status: "busy",
      station: "pastry",
      shiftStart: "06:00",
      shiftEnd: "14:00",
      ordersCompleted: 52,
      averagePrepTime: 8,
    },
  ]);

  const [currentStaff] = useState<KitchenStaff | null>(staff[0]);

  const [orders, setOrders] = useState<KitchenOrder[]>([
    {
      id: "order-1",
      orderNumber: "ORD-001",
      customerName: "John Doe",
      tableNumber: 5,
      orderType: "dine_in",
      priority: "normal",
      status: "pending",
      items: [
        {
          id: "item-1",
          productId: "prod-1",
          name: "Grilled Chicken Breast",
          quantity: 1,
          category: "main",
          preparationTime: 15,
          status: "pending",
          station: "grill",
          price: 18990,
        },
        {
          id: "item-2",
          productId: "prod-2",
          name: "Caesar Salad",
          quantity: 1,
          category: "salad",
          preparationTime: 8,
          status: "pending",
          station: "cold",
          price: 12990,
        },
      ],
      estimatedPrepTime: 20,
      createdAt: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
      updatedAt: new Date(Date.now() - 5 * 60000).toISOString(),
      paymentStatus: "paid",
    },
    {
      id: "order-2",
      orderNumber: "ORD-002",
      customerName: "Jane Smith",
      orderType: "takeaway",
      priority: "rush",
      status: "preparing",
      items: [
        {
          id: "item-3",
          productId: "prod-3",
          name: "Beef Burger",
          quantity: 2,
          category: "main",
          preparationTime: 12,
          status: "preparing",
          station: "grill",
          price: 18990,
        },
      ],
      estimatedPrepTime: 12,
      createdAt: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
      updatedAt: new Date(Date.now() - 2 * 60000).toISOString(), // 2 minutes ago
      assignedTo: 2,
      paymentStatus: "paid",
    },
  ]);

  const [stations] = useState<KitchenStation[]>([
    {
      id: "hot-station",
      name: "Hot Station",
      type: "hot",
      status: "active",
      currentOrders: 3,
      capacity: 8,
      staffAssigned: [1],
    },
    {
      id: "cold-station",
      name: "Cold Station",
      type: "cold",
      status: "active",
      currentOrders: 2,
      capacity: 6,
      staffAssigned: [],
    },
    {
      id: "grill-station",
      name: "Grill Station",
      type: "grill",
      status: "active",
      currentOrders: 4,
      capacity: 6,
      staffAssigned: [2],
    },
    {
      id: "pastry-station",
      name: "Pastry Station",
      type: "pastry",
      status: "active",
      currentOrders: 1,
      capacity: 4,
      staffAssigned: [3],
    },
    {
      id: "beverages-station",
      name: "Beverages Station",
      type: "beverages",
      status: "active",
      currentOrders: 0,
      capacity: 3,
      staffAssigned: [],
    },
  ]);

  const [notifications, setNotifications] = useState<KitchenNotification[]>([
    {
      id: "notif-1",
      type: "new_order",
      title: "New Order Received",
      message: "Order ORD-001 has been received and is ready for preparation",
      read: false,
      createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
      actionRequired: true,
      orderId: "order-1",
      priority: "medium",
    },
    {
      id: "notif-2",
      type: "urgent_order",
      title: "Rush Order Alert",
      message: "Order ORD-002 is marked as RUSH - prioritize immediately",
      read: false,
      createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
      actionRequired: true,
      orderId: "order-2",
      priority: "urgent",
    },
  ]);

  const [stats] = useState<KitchenStats>({
    totalOrders: 127,
    ordersCompleted: 98,
    averagePrepTime: 14.5,
    onTimeDelivery: 87.5,
    stationUtilization: {
      hot: 75,
      cold: 60,
      grill: 85,
      pastry: 45,
      beverages: 30,
    },
    topItems: [
      { name: "Grilled Chicken Breast", quantity: 45, avgPrepTime: 15 },
      { name: "Beef Burger", quantity: 38, avgPrepTime: 12 },
      { name: "Caesar Salad", quantity: 32, avgPrepTime: 8 },
    ],
  });

  const [isConnected] = useState(true);

  // Order Management Functions
  const addOrder = (order: KitchenOrder) => {
    setOrders((prev) => [order, ...prev]);

    // Add notification for new order
    addNotification({
      type: "new_order",
      title: "New Order Received",
      message: `Order ${order.orderNumber} has been received and is ready for preparation`,
      read: false,
      actionRequired: true,
      orderId: order.id,
      priority:
        order.priority === "urgent"
          ? "urgent"
          : order.priority === "rush"
          ? "high"
          : "medium",
    });
  };

  const updateOrderStatus = (
    orderId: string,
    status: KitchenOrder["status"]
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              updatedAt: new Date().toISOString(),
            }
          : order
      )
    );

    // Add notification for status change
    if (status === "ready") {
      addNotification({
        type: "order_ready",
        title: "Order Ready",
        message: `Order ${
          orders.find((o) => o.id === orderId)?.orderNumber
        } is ready for pickup`,
        read: false,
        actionRequired: true,
        orderId,
        priority: "medium",
      });
    }
  };

  const updateItemStatus = (
    orderId: string,
    itemId: string,
    status: KitchenOrderItem["status"]
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === itemId ? { ...item, status } : item
              ),
              updatedAt: new Date().toISOString(),
            }
          : order
      )
    );
  };

  const assignOrderToStaff = (orderId: string, staffId: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, assignedTo: staffId } : order
      )
    );
  };

  const getOrdersByStatus = (status: KitchenOrder["status"]) => {
    return orders.filter((order) => order.status === status);
  };

  const getOrdersByPriority = (priority: KitchenOrder["priority"]) => {
    return orders.filter((order) => order.priority === priority);
  };

  const getStationOrders = (stationId: string) => {
    const station = stations.find((s) => s.id === stationId);
    if (!station) return [];

    return orders.filter((order) =>
      order.items.some((item) => item.station === station.type)
    );
  };

  // Notification Functions
  const addNotification = (
    notification: Omit<KitchenNotification, "id" | "createdAt">
  ) => {
    const newNotification: KitchenNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
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

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Staff Management Functions
  const updateStaffStatus = (
    staffId: number,
    status: KitchenStaff["status"]
  ) => {
    // In real app, this would update the staff array
  };

  // Station Management Functions
  const updateStationStatus = (
    stationId: string,
    status: KitchenStation["status"]
  ) => {
    // In real app, this would update the stations array
  };

  // Statistics Functions
  const updateStats = () => {
    // In real app, this would recalculate stats from orders
  };

  // Real-time Functions
  const reconnect = () => {
    // Reconnect to kitchen system
  };

  const value: KitchenDashboardContextType = useMemo(
    () => ({
      // Staff Management
      staff,
      currentStaff,
      updateStaffStatus,

      // Order Management
      orders,
      addOrder,
      updateOrderStatus,
      updateItemStatus,
      assignOrderToStaff,
      getOrdersByStatus,
      getOrdersByPriority,

      // Station Management
      stations,
      updateStationStatus,
      getStationOrders,

      // Notifications
      notifications,
      addNotification,
      markNotificationAsRead,
      clearNotifications,

      // Statistics
      stats,
      updateStats,

      // Real-time Updates
      isConnected,
      reconnect,
    }),
    [orders, notifications, staff, stations, stats, currentStaff, isConnected]
  );

  return (
    <KitchenDashboardContext.Provider value={value}>
      {children}
    </KitchenDashboardContext.Provider>
  );
}

export function useKitchenDashboard() {
  const context = useContext(KitchenDashboardContext);
  if (context === undefined) {
    throw new Error(
      "useKitchenDashboard must be used within a KitchenDashboardProvider"
    );
  }
  return context;
}
