export type Role =
  | "Admin"
  | "Owner"
  | "Manager"
  | "Accountant"
  | "Waiter"
  | "Customer"
  | "Kitchen";

export type FakeUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  password: string; // plain for demo only
  // Customer-specific fields
  loyaltyPoints?: number;
  totalVisits?: number;
  totalSpent?: number;
  tier?: string;
  joinDate?: string;
  preferences?: string[];
  avatar?: string | null;
};

export const fakeUsers: FakeUser[] = [
  {
    id: "u1",
    name: "System Admin",
    email: "admin@brms.dev",
    phone: "+250700000001",
    role: "Admin",
    password: "123",
  },
  {
    id: "u2",
    name: "Biz Owner",
    email: "owner@brms.dev",
    phone: "+250700000002",
    role: "Owner",
    password: "123",
  },
  {
    id: "u3",
    name: "Floor Manager",
    email: "manager@brms.dev",
    phone: "+250700000003",
    role: "Manager",
    password: "manager123",
  },
  {
    id: "u4",
    name: "Account Pro",
    email: "accountant@brms.dev",
    phone: "+250700000004",
    role: "Accountant",
    password: "account123",
  },
  {
    id: "u5",
    name: "Waiter One",
    email: "waiter@brms.dev",
    phone: "+250700000005",
    role: "Waiter",
    password: "waiter123",
  },
  {
    id: "u6",
    name: "Jane Customer",
    email: "customer@brms.dev",
    phone: "+250700000006",
    role: "Customer",
    password: "123",
    loyaltyPoints: 750,
    totalVisits: 12,
    totalSpent: 456500, // 456,500 RWF
    tier: "Silver",
    joinDate: "2024-01-15",
    preferences: ["Vegetarian", "No Nuts", "Spicy Food"],
    avatar: null,
  },
  // Kitchen Staff
  {
    id: "u7",
    name: "Chef Maria Rodriguez",
    email: "chef@brms.dev",
    phone: "+250700000007",
    role: "Kitchen",
    password: "123",
  },
  {
    id: "u8",
    name: "Chef James Wilson",
    email: "james@brms.dev",
    phone: "+250700000008",
    role: "Kitchen",
    password: "123",
  },
  {
    id: "u9",
    name: "Pastry Chef Sarah Chen",
    email: "sarah@brms.dev",
    phone: "+250700000009",
    role: "Kitchen",
    password: "123",
  },
];

export function authenticate(
  identifier: string,
  password: string
): FakeUser | null {
  const id = identifier.trim().toLowerCase();
  const match = fakeUsers.find(
    (u) =>
      (u.email.toLowerCase() === id ||
        u.phone.replace(/\s/g, "") === identifier.replace(/\s/g, "")) &&
      u.password === password
  );
  return match || null;
}
