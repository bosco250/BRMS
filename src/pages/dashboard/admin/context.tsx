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
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  amount: number;
  features: string[];
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
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
    features: ["All Features", "24/7 Support", "API Access", "Custom Integration"],
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
  },
];

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
  systemMetrics: SystemMetric[];
  auditLogs: AuditLog[];
  updateBusinessStatus: (businessId: string, status: Business["status"]) => void;
  updateUserStatus: (userId: string, status: User["status"]) => void;
  updateSubscriptionStatus: (subscriptionId: string, status: Subscription["status"]) => void;
  addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => void;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export function AdminDashboardProvider({ children }: { children: React.ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  const updateBusinessStatus = (businessId: string, status: Business["status"]) => {
    setBusinesses(prev => prev.map(business => 
      business.id === businessId ? { ...business, status } : business
    ));
  };

  const updateUserStatus = (userId: string, status: User["status"]) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status } : user
    ));
  };

  const updateSubscriptionStatus = (subscriptionId: string, status: Subscription["status"]) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === subscriptionId ? { ...sub, status } : sub
    ));
  };

  const addAuditLog = (log: Omit<AuditLog, "id" | "timestamp">) => {
    const newLog: AuditLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const value = useMemo(() => ({
    admin: mockAdmin,
    businesses,
    users,
    subscriptions,
    systemMetrics: mockSystemMetrics,
    auditLogs,
    updateBusinessStatus,
    updateUserStatus,
    updateSubscriptionStatus,
    addAuditLog,
  }), [businesses, users, subscriptions, auditLogs]);

  return (
    <AdminDashboardContext.Provider value={value}>
      {children}
    </AdminDashboardContext.Provider>
  );
}

export function useAdminDashboard() {
  const context = useContext(AdminDashboardContext);
  if (context === undefined) {
    throw new Error("useAdminDashboard must be used within an AdminDashboardProvider");
  }
  return context;
}
