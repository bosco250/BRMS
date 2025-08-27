import React, { createContext, useContext, useMemo, useState } from "react";

export type Product = {
  id: number;
  name: string;
  category: "food" | "beverages" | "alcohol" | "desserts";
  price: number;
  image: string | null;
  favorite: boolean;
  rating: number;
  description: string;
};

const mockCustomer = {
  id: 1,
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+250 788 123 456",
  loyaltyPoints: 750,
  totalVisits: 12,
  totalSpent: 456.5,
  tier: "Silver",
  joinDate: "2024-01-15",
  preferences: ["Vegetarian", "No Nuts"],
  avatar: null as string | null,
};

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Grilled Chicken",
    category: "food",
    price: 18.99,
    image: null,
    favorite: true,
    rating: 4.5,
    description: "Tender grilled chicken breast with herbs",
  },
  {
    id: 2,
    name: "Caesar Salad",
    category: "food",
    price: 12.99,
    image: null,
    favorite: false,
    rating: 4.2,
    description: "Fresh romaine lettuce with caesar dressing",
  },
  {
    id: 3,
    name: "Coffee",
    category: "beverages",
    price: 3.99,
    image: null,
    favorite: true,
    rating: 4.8,
    description: "Freshly brewed coffee",
  },
  {
    id: 4,
    name: "Red Wine",
    category: "alcohol",
    price: 25.99,
    image: null,
    favorite: false,
    rating: 4.6,
    description: "Premium red wine",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "desserts",
    price: 8.99,
    image: null,
    favorite: true,
    rating: 4.9,
    description: "Rich chocolate layer cake",
  },
  {
    id: 6,
    name: "Fish & Chips",
    category: "food",
    price: 16.99,
    image: null,
    favorite: false,
    rating: 4.3,
    description: "Beer battered fish with crispy fries",
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
    date: "2024-08-25",
    time: "19:00",
    guests: 4,
    status: "confirmed",
    table: "Table 12",
  },
  {
    id: 2,
    date: "2024-08-30",
    time: "20:30",
    guests: 2,
    status: "pending",
    table: "Table 8",
  },
];

type DashboardContextType = {
  customer: typeof mockCustomer;
  setCustomer: React.Dispatch<React.SetStateAction<typeof mockCustomer>>;
  products: Product[];
  rewards: typeof mockRewards;
  reservations: typeof mockReservations;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
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

  const value: DashboardContextType = {
    customer,
    setCustomer,
    products,
    rewards: mockRewards,
    reservations: mockReservations,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
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
