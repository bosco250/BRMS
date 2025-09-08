import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { getSessionUser } from "../../../auth/session";
import { customerOrders } from "../../../data/customerOrderData";
import type { Notification } from "../../../types/notification";

export type Product = {
  id: number;
  name: string;
  category: "food" | "beverages" | "alcohol" | "desserts";
  price: number;
  image: string | null;
  favorite: boolean;
  rating: number;
  description: string;
  quantity?: number; // Optional quantity for cart items
};

const mockCustomer = {
  id: "",
  name: "",
  email: "",
  phone: "",
  loyaltyPoints: 0,
  totalVisits: 0,
  totalSpent: 0,
  tier: "Bronze",
  joinDate: new Date().toISOString().split("T")[0],
  preferences: [] as string[],
  avatar: null as string | null,
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Grilled Chicken Breast",
    category: "food",
    price: 18990, // 18,990 RWF
    image: null,
    favorite: true,
    rating: 4.5,
    description:
      "Tender grilled chicken breast with herbs and garlic, served with seasonal vegetables",
  },
  {
    id: 2,
    name: "Caesar Salad",
    category: "food",
    price: 12990, // 12,990 RWF
    image: null,
    favorite: false,
    rating: 4.2,
    description:
      "Fresh romaine lettuce with Caesar dressing, parmesan cheese, and croutons",
  },
  {
    id: 3,
    name: "Fresh Coffee",
    category: "beverages",
    price: 3990, // 3,990 RWF
    image: null,
    favorite: true,
    rating: 4.8,
    description: "Freshly brewed coffee from local Rwandan beans",
  },
  {
    id: 4,
    name: "Premium Red Wine",
    category: "alcohol",
    price: 25990, // 25,990 RWF
    image: null,
    favorite: false,
    rating: 4.6,
    description: "Premium red wine from South African vineyards",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "desserts",
    price: 8990, // 8,990 RWF
    image: null,
    favorite: true,
    rating: 4.9,
    description: "Rich chocolate layer cake with chocolate ganache frosting",
  },
  {
    id: 6,
    name: "Fish & Chips",
    category: "food",
    price: 16990, // 16,990 RWF
    image: null,
    favorite: false,
    rating: 4.3,
    description: "Beer battered fish with crispy golden fries and tartar sauce",
  },
  {
    id: 7,
    name: "Green Tea",
    category: "beverages",
    price: 2990, // 2,990 RWF
    image: null,
    favorite: false,
    rating: 4.1,
    description: "Premium green tea with natural antioxidants",
  },
  {
    id: 8,
    name: "Beef Burger",
    category: "food",
    price: 18990, // 18,990 RWF
    image: null,
    favorite: true,
    rating: 4.7,
    description: "Juicy beef patty with fresh vegetables and special sauce",
  },
  {
    id: 9,
    name: "Ice Cream Sundae",
    category: "desserts",
    price: 6990, // 6,990 RWF
    image: null,
    favorite: false,
    rating: 4.4,
    description: "Vanilla ice cream with chocolate sauce and nuts",
  },
  {
    id: 10,
    name: "Fresh Juice",
    category: "beverages",
    price: 4990, // 4,990 RWF
    image: null,
    favorite: true,
    rating: 4.6,
    description: "Freshly squeezed orange juice with no added sugar",
  },
];

const mockRewards = [
  {
    id: 1,
    name: "Free Coffee",
    points: 100,
    available: true,
    description: "Get a free coffee of your choice",
  },
  {
    id: 2,
    name: "20% Off Meal",
    points: 200,
    available: true,
    description: "20% discount on your next meal",
  },
  {
    id: 3,
    name: "Free Dessert",
    points: 300,
    available: true,
    description: "Free dessert with any main course",
  },
  {
    id: 4,
    name: "VIP Table",
    points: 500,
    available: false,
    description: "Priority table reservation",
  },
];

const mockReservations = [
  {
    id: 1,
    date: "2024-01-25",
    time: "19:00",
    guests: 4,
    status: "confirmed",
    table: "Table 12",
    specialRequests: "Window seat preferred, anniversary dinner",
    tablePreference: "Window seat",
  },
  {
    id: 2,
    date: "2024-01-30",
    time: "20:30",
    guests: 2,
    status: "pending",
    table: "Table 8",
    specialRequests: "Quiet corner if possible",
    tablePreference: "Quiet corner",
  },
  {
    id: 3,
    date: "2024-01-20",
    time: "18:00",
    guests: 6,
    status: "confirmed",
    table: "Table 15",
    specialRequests: "Birthday celebration, need space for cake",
    tablePreference: "Outdoor seating",
  },
  {
    id: 4,
    date: "2024-01-18",
    time: "19:30",
    guests: 3,
    status: "cancelled",
    table: "Table 6",
    specialRequests: "",
    tablePreference: "Any table",
  },
  {
    id: 5,
    date: "2024-01-22",
    time: "12:00",
    guests: 2,
    status: "confirmed",
    table: "Table 4",
    specialRequests: "Lunch meeting, need quiet area",
    tablePreference: "Quiet corner",
  },
];

const mockNotifications: Notification[] = [
  {
    id: "notif_001",
    type: "order",
    title: "Order Confirmed",
    description:
      "Your order #ORD-2024-001 has been confirmed and is being prepared",
    timestamp: "2024-01-22T10:30:00Z",
    isRead: false,
    actionUrl: "/dashboard/customer/orders",
    icon: "📦",
    priority: "high",
  },
  {
    id: "notif_002",
    type: "reservation",
    title: "Reservation Updated",
    description: "Your reservation for Table 12 has been moved to 7:30 PM",
    timestamp: "2024-01-22T09:15:00Z",
    isRead: false,
    actionUrl: "/dashboard/customer/reservations",
    icon: "📅",
    priority: "medium",
  },
  {
    id: "notif_003",
    type: "payment",
    title: "Payment Successful",
    description:
      "Payment of 53,728 RWF for order #ORD-2024-001 has been processed",
    timestamp: "2024-01-22T08:45:00Z",
    isRead: true,
    actionUrl: "/dashboard/customer/orders",
    icon: "💳",
    priority: "medium",
  },
  {
    id: "notif_004",
    type: "loyalty",
    title: "Loyalty Points Earned",
    description: "You earned 150 loyalty points for your recent order!",
    timestamp: "2024-01-21T18:20:00Z",
    isRead: true,
    actionUrl: "/dashboard/customer/loyalty",
    icon: "⭐",
    priority: "low",
  },
  {
    id: "notif_005",
    type: "account",
    title: "Profile Updated",
    description: "Your account profile has been successfully updated",
    timestamp: "2024-01-21T14:10:00Z",
    isRead: true,
    actionUrl: "/dashboard/customer/profile",
    icon: "👤",
    priority: "low",
  },
  {
    id: "notif_006",
    type: "system",
    title: "Welcome to BRMS!",
    description: "Thank you for joining our restaurant management system",
    timestamp: "2024-01-20T10:00:00Z",
    isRead: true,
    icon: "🎉",
    priority: "low",
  },
  {
    id: "notif_007",
    type: "order",
    title: "Order Ready for Pickup",
    description: "Your takeaway order #ORD-2024-003 is ready for pickup",
    timestamp: "2024-01-22T11:00:00Z",
    isRead: false,
    actionUrl: "/dashboard/customer/orders",
    icon: "✅",
    priority: "high",
  },
  {
    id: "notif_008",
    type: "reservation",
    title: "Reservation Reminder",
    description:
      "Don't forget your reservation tomorrow at 7:00 PM for 4 guests",
    timestamp: "2024-01-21T16:30:00Z",
    isRead: false,
    actionUrl: "/dashboard/customer/reservations",
    icon: "⏰",
    priority: "medium",
  },
];

type DashboardContextType = {
  customer: typeof mockCustomer;
  setCustomer: React.Dispatch<React.SetStateAction<typeof mockCustomer>>;
  products: Product[];
  rewards: typeof mockRewards;
  reservations: typeof mockReservations;
  orders: typeof customerOrders;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  cartItems: Product[];
  cartTotal: number;
  // Notification functions
  notifications: Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">
  ) => void;
  unreadCount: number;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function CustomerDashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [customer, setCustomer] = useState(mockCustomer);
  const [products] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  useEffect(() => {
    const user = getSessionUser();
    if (user && user.role === "Customer") {
      setCustomer({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        loyaltyPoints: user.loyaltyPoints || 0,
        totalVisits: user.totalVisits || 0,
        totalSpent: user.totalSpent || 0,
        tier: user.tier || "Bronze",
        joinDate: user.joinDate || new Date().toISOString().split("T")[0],
        preferences: user.preferences || [],
        avatar: user.avatar || null,
      });
    } else if (user && user.role !== "Customer") {
      // User is not a customer
      // Redirect or show appropriate message for non-customer users
    } else {
      // No user logged in
      // Keep default empty customer state
    }
  }, []);

  // Cart functions
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Notification functions
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const value: DashboardContextType = {
    customer,
    setCustomer,
    products,
    rewards: mockRewards,
    reservations: mockReservations,
    orders: customerOrders,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    cartItems,
    cartTotal,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    addNotification,
    unreadCount,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useCustomerDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error(
      "useCustomerDashboard must be used within CustomerDashboardProvider"
    );
  return ctx;
}
