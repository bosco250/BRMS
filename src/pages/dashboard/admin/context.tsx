import React, { createContext, useContext, useMemo, useState } from "react";

export type Admin = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  lastLogin: string;
  permissions: string[];
};

export type Business = {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "suspended" | "pending";
  subscription: "basic" | "premium" | "enterprise";
  location: string;
  owner: string;
  createdAt: string;
  revenue: number;
  users: number;
  tables: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Waiter" | "Accountant";
  businessId: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  createdAt: string;
  permissions: string[];
};

export type Subscription = {
  id: string;
  businessId: string;
  businessName: string;
  plan: "basic" | "premium" | "enterprise";
  status:
    | "active"
    | "expired"
    | "cancelled"
    | "suspended"
    | "trial"
    | "pending";
  startDate: string;
  endDate: string;
  amount: number;
  features: string[];
  billingCycle: "monthly" | "yearly";
  autoRenew: boolean;
  paymentMethod: "card" | "bank_transfer" | "mobile_money";
  lastPaymentDate: string;
  nextBillingDate: string;
  trialEndDate?: string;
  cancellationDate?: string;
  cancellationReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: string[];
  limits: {
    users: number;
    tables: number;
    orders: number;
    storage: string;
  };
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
};

export type Payment = {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: string;
  transactionId: string;
  paidAt: string;
  createdAt: string;
};

export type SubscriptionAnalytics = {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  churnRate: number;
  averageRevenuePerUser: number;
  subscriptionGrowth: number;
  planDistribution: {
    basic: number;
    premium: number;
    enterprise: number;
  };
  revenueByMonth: Array<{
    month: string;
    revenue: number;
  }>;
};

export type SystemMetric = {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: "increase" | "decrease";
  trend: "up" | "down" | "stable";
};

export type AuditLog = {
  id: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  ipAddress: string;
  severity: "low" | "medium" | "high";
};

// Mock data
const mockAdmin: Admin = {
  id: 1,
  name: "System Administrator",
  email: "admin@brms.com",
  role: "System Admin",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  lastLogin: new Date().toISOString(),
  permissions: ["all"],
};

const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Restaurant ABC",
    type: "Fine Dining",
    status: "active",
    subscription: "premium",
    location: "New York, NY",
    owner: "John Smith",
    createdAt: "2024-01-15",
    revenue: 125000,
    users: 12,
    tables: 25,
  },
  {
    id: "2",
    name: "Cafe XYZ",
    type: "Casual Dining",
    status: "active",
    subscription: "basic",
    location: "Los Angeles, CA",
    owner: "Sarah Johnson",
    createdAt: "2024-02-01",
    revenue: 85000,
    users: 8,
    tables: 15,
  },
  {
    id: "3",
    name: "Pizzeria 123",
    type: "Fast Food",
    status: "active",
    subscription: "enterprise",
    location: "Chicago, IL",
    owner: "Mike Wilson",
    createdAt: "2023-12-10",
    revenue: 200000,
    users: 20,
    tables: 30,
  },
  {
    id: "4",
    name: "Bistro Deluxe",
    type: "Fine Dining",
    status: "inactive",
    subscription: "basic",
    location: "Miami, FL",
    owner: "Lisa Brown",
    createdAt: "2024-01-20",
    revenue: 0,
    users: 0,
    tables: 0,
  },
];

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@restaurantabc.com",
    role: "Owner",
    businessId: "1",
    status: "active",
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdAt: "2024-01-15",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@cafexyz.com",
    role: "Owner",
    businessId: "2",
    status: "active",
    lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    createdAt: "2024-02-01",
    permissions: ["all"],
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@pizzeria123.com",
    role: "Owner",
    businessId: "3",
    status: "active",
    lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    createdAt: "2023-12-10",
    permissions: ["all"],
  },
  {
    id: "4",
    name: "Lisa Brown",
    email: "lisa@bistrodeluxe.com",
    role: "Owner",
    businessId: "4",
    status: "inactive",
    lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2024-01-20",
    permissions: ["limited"],
  },
];

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    businessId: "1",
    businessName: "Restaurant ABC",
    plan: "premium",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    amount: 299,
    features: ["Advanced Analytics", "Priority Support", "Custom Branding"],
    billingCycle: "monthly",
    autoRenew: true,
    paymentMethod: "card",
    lastPaymentDate: "2024-12-15",
    nextBillingDate: "2025-01-15",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-15T00:00:00Z",
  },
  {
    id: "2",
    businessId: "2",
    businessName: "Cafe XYZ",
    plan: "basic",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    amount: 99,
    features: ["Basic Features", "Email Support"],
    billingCycle: "monthly",
    autoRenew: true,
    paymentMethod: "mobile_money",
    lastPaymentDate: "2024-12-01",
    nextBillingDate: "2025-01-01",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
  {
    id: "3",
    businessId: "3",
    businessName: "Pizzeria 123",
    plan: "enterprise",
    status: "active",
    startDate: "2023-12-10",
    endDate: "2024-12-10",
    amount: 599,
    features: [
      "All Features",
      "24/7 Support",
      "API Access",
      "Custom Integration",
    ],
    billingCycle: "yearly",
    autoRenew: true,
    paymentMethod: "bank_transfer",
    lastPaymentDate: "2023-12-10",
    nextBillingDate: "2024-12-10",
    createdAt: "2023-12-10T00:00:00Z",
    updatedAt: "2023-12-10T00:00:00Z",
  },
  {
    id: "4",
    businessId: "4",
    businessName: "Bistro Deluxe",
    plan: "basic",
    status: "expired",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    amount: 99,
    features: ["Basic Features", "Email Support"],
    billingCycle: "monthly",
    autoRenew: false,
    paymentMethod: "card",
    lastPaymentDate: "2024-01-20",
    nextBillingDate: "2024-02-20",
    cancellationDate: "2024-02-15",
    cancellationReason: "Business closure",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "5",
    businessId: "5",
    businessName: "Trial Restaurant",
    plan: "premium",
    status: "trial",
    startDate: "2024-12-01",
    endDate: "2025-01-01",
    amount: 0,
    features: ["Advanced Analytics", "Priority Support", "Custom Branding"],
    billingCycle: "monthly",
    autoRenew: true,
    paymentMethod: "card",
    lastPaymentDate: "",
    nextBillingDate: "2025-01-01",
    trialEndDate: "2025-01-01",
    createdAt: "2024-12-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
];

const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Basic Plan",
    description: "Perfect for small restaurants and cafes",
    price: 99,
    billingCycle: "monthly",
    features: [
      "Up to 5 users",
      "Basic inventory management",
      "Order management",
      "Basic reporting",
      "Email support",
      "Mobile app access",
    ],
    limits: {
      users: 5,
      tables: 10,
      orders: 1000,
      storage: "5GB",
    },
    isPopular: false,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Premium Plan",
    description: "Advanced features for growing businesses",
    price: 299,
    billingCycle: "monthly",
    features: [
      "Up to 25 users",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "API access",
      "Advanced reporting",
      "Inventory forecasting",
      "Multi-location support",
    ],
    limits: {
      users: 25,
      tables: 50,
      orders: 10000,
      storage: "50GB",
    },
    isPopular: true,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Enterprise Plan",
    description: "Complete solution for large restaurant chains",
    price: 599,
    billingCycle: "monthly",
    features: [
      "Unlimited users",
      "All features included",
      "24/7 phone support",
      "Custom integrations",
      "White-label solution",
      "Advanced security",
      "Dedicated account manager",
      "Custom training",
    ],
    limits: {
      users: -1,
      tables: -1,
      orders: -1,
      storage: "Unlimited",
    },
    isPopular: false,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

const mockPayments: Payment[] = [
  {
    id: "1",
    subscriptionId: "1",
    amount: 299,
    currency: "RWF",
    status: "completed",
    paymentMethod: "Visa ****1234",
    transactionId: "txn_123456789",
    paidAt: "2024-12-15T10:30:00Z",
    createdAt: "2024-12-15T10:30:00Z",
  },
  {
    id: "2",
    subscriptionId: "2",
    amount: 99,
    currency: "RWF",
    status: "completed",
    paymentMethod: "Mobile Money",
    transactionId: "txn_987654321",
    paidAt: "2024-12-01T14:20:00Z",
    createdAt: "2024-12-01T14:20:00Z",
  },
  {
    id: "3",
    subscriptionId: "3",
    amount: 599,
    currency: "RWF",
    status: "completed",
    paymentMethod: "Bank Transfer",
    transactionId: "txn_456789123",
    paidAt: "2023-12-10T09:15:00Z",
    createdAt: "2023-12-10T09:15:00Z",
  },
  {
    id: "4",
    subscriptionId: "4",
    amount: 99,
    currency: "RWF",
    status: "failed",
    paymentMethod: "Visa ****5678",
    transactionId: "txn_789123456",
    paidAt: "",
    createdAt: "2024-02-20T11:45:00Z",
  },
];

const mockSubscriptionAnalytics: SubscriptionAnalytics = {
  totalRevenue: 125000,
  monthlyRecurringRevenue: 1097,
  churnRate: 5.2,
  averageRevenuePerUser: 156.25,
  subscriptionGrowth: 12.5,
  planDistribution: {
    basic: 40,
    premium: 45,
    enterprise: 15,
  },
  revenueByMonth: [
    { month: "Jan 2024", revenue: 12000 },
    { month: "Feb 2024", revenue: 13500 },
    { month: "Mar 2024", revenue: 14200 },
    { month: "Apr 2024", revenue: 15800 },
    { month: "May 2024", revenue: 16200 },
    { month: "Jun 2024", revenue: 17800 },
    { month: "Jul 2024", revenue: 18500 },
    { month: "Aug 2024", revenue: 19200 },
    { month: "Sep 2024", revenue: 20100 },
    { month: "Oct 2024", revenue: 21500 },
    { month: "Nov 2024", revenue: 22800 },
    { month: "Dec 2024", revenue: 125000 },
  ],
};

const mockSystemMetrics: SystemMetric[] = [
  {
    id: "1",
    name: "System Uptime",
    value: 99.9,
    unit: "%",
    change: 0.1,
    changeType: "increase",
    trend: "up",
  },
  {
    id: "2",
    name: "Active Users",
    value: 1250,
    unit: "",
    change: 15,
    changeType: "increase",
    trend: "up",
  },
  {
    id: "3",
    name: "Data Storage",
    value: 75,
    unit: "%",
    change: 5,
    changeType: "increase",
    trend: "up",
  },
  {
    id: "4",
    name: "API Response Time",
    value: 150,
    unit: "ms",
    change: 10,
    changeType: "decrease",
    trend: "down",
  },
];

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    action: "User Login",
    description: "john.doe@example.com logged in from 192.168.1.100",
    userId: "1",
    userName: "John Doe",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    ipAddress: "192.168.1.100",
    severity: "low",
  },
  {
    id: "2",
    action: "Subscription Updated",
    description: "Restaurant ABC subscription changed to Premium",
    userId: "1",
    userName: "John Doe",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    ipAddress: "192.168.1.100",
    severity: "medium",
  },
  {
    id: "3",
    action: "User Created",
    description: "New waiter account created for Restaurant XYZ",
    userId: "3",
    userName: "Mike Wilson",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    ipAddress: "192.168.1.105",
    severity: "low",
  },
  {
    id: "4",
    action: "System Backup",
    description: "Daily backup completed successfully",
    userId: "system",
    userName: "System",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ipAddress: "127.0.0.1",
    severity: "low",
  },
];

interface AdminDashboardContextType {
  admin: Admin;
  businesses: Business[];
  users: User[];
  subscriptions: Subscription[];
  subscriptionPlans: SubscriptionPlan[];
  payments: Payment[];
  subscriptionAnalytics: SubscriptionAnalytics;
  systemMetrics: SystemMetric[];
  auditLogs: AuditLog[];
  updateBusinessStatus: (
    businessId: string,
    status: Business["status"]
  ) => void;
  updateUserStatus: (userId: string, status: User["status"]) => void;
  updateSubscriptionStatus: (
    subscriptionId: string,
    status: Subscription["status"]
  ) => void;
  updateSubscriptionPlan: (
    subscriptionId: string,
    plan: Subscription["plan"]
  ) => void;
  cancelSubscription: (subscriptionId: string, reason: string) => void;
  suspendSubscription: (subscriptionId: string, reason: string) => void;
  reactivateSubscription: (subscriptionId: string) => void;
  createSubscription: (
    subscription: Omit<Subscription, "id" | "createdAt" | "updatedAt">
  ) => void;
  addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => void;
}

const AdminDashboardContext = createContext<
  AdminDashboardContextType | undefined
>(undefined);

export function AdminDashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(mockSubscriptions);
  const [subscriptionPlans] = useState<SubscriptionPlan[]>(
    mockSubscriptionPlans
  );
  const [payments] = useState<Payment[]>(mockPayments);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  const updateBusinessStatus = (
    businessId: string,
    status: Business["status"]
  ) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === businessId ? { ...business, status } : business
      )
    );
  };

  const updateUserStatus = (userId: string, status: User["status"]) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, status } : user))
    );
  };

  const updateSubscriptionStatus = (
    subscriptionId: string,
    status: Subscription["status"]
  ) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? { ...sub, status, updatedAt: new Date().toISOString() }
          : sub
      )
    );
  };

  const updateSubscriptionPlan = (
    subscriptionId: string,
    plan: Subscription["plan"]
  ) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? { ...sub, plan, updatedAt: new Date().toISOString() }
          : sub
      )
    );
  };

  const cancelSubscription = (subscriptionId: string, reason: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? {
              ...sub,
              status: "cancelled",
              cancellationDate: new Date().toISOString(),
              cancellationReason: reason,
              updatedAt: new Date().toISOString(),
            }
          : sub
      )
    );
  };

  const suspendSubscription = (subscriptionId: string, reason: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? {
              ...sub,
              status: "suspended",
              notes: reason,
              updatedAt: new Date().toISOString(),
            }
          : sub
      )
    );
  };

  const reactivateSubscription = (subscriptionId: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? {
              ...sub,
              status: "active",
              notes: undefined,
              updatedAt: new Date().toISOString(),
            }
          : sub
      )
    );
  };

  const createSubscription = (
    subscription: Omit<Subscription, "id" | "createdAt" | "updatedAt">
  ) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: (subscriptions.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSubscriptions((prev) => [...prev, newSubscription]);
  };

  const addAuditLog = (log: Omit<AuditLog, "id" | "timestamp">) => {
    const newLog: AuditLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const value = useMemo(
    () => ({
      admin: mockAdmin,
      businesses,
      users,
      subscriptions,
      subscriptionPlans,
      payments,
      subscriptionAnalytics: mockSubscriptionAnalytics,
      systemMetrics: mockSystemMetrics,
      auditLogs,
      updateBusinessStatus,
      updateUserStatus,
      updateSubscriptionStatus,
      updateSubscriptionPlan,
      cancelSubscription,
      suspendSubscription,
      reactivateSubscription,
      createSubscription,
      addAuditLog,
    }),
    [businesses, users, subscriptions, subscriptionPlans, payments, auditLogs]
  );

  return (
    <AdminDashboardContext.Provider value={value}>
      {children}
    </AdminDashboardContext.Provider>
  );
}

export function useAdminDashboard() {
  const context = useContext(AdminDashboardContext);
  if (context === undefined) {
    throw new Error(
      "useAdminDashboard must be used within an AdminDashboardProvider"
    );
  }
  return context;
}
