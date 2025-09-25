export interface Business {
  id: string;
  name: string;
  location: string;
  type: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logo?: string | null;
  status: string;
  revenue: number;
  staffCount: number;
  rating: number;
  createdAt: string;
  address?: string;
  city?: string;
  cuisine?: string;
  priceRange?: string;
  opensAt?: string;
  closesAt?: string;
  capacity?: number;
  acceptsReservations?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  availability: string;
  photo?: string | null;
  ingredients: string;
  allergens: string;
  preparationTime: string;
  calories: string;
  restaurantId: string;
  status?: string;
  createdAt: string;
}

export interface BusinessFormData {
  name: string;
  location: string;
  type: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logo: File | null;
  cuisine: string;
  address: string;
  city: string;
  opensAt: string;
  closesAt: string;
  capacity: number;
  priceRange: string;
  acceptsReservations: boolean;
  paymentMethods: string[];
  amenities: string[];
  tags: string[];
}

export interface MenuFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  availability: string;
  photo: File | null;
  ingredients: string;
  allergens: string;
  preparationTime: string;
  calories: string;
}
