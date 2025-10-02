import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export type ApiMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  img?: string; // image URL from API
  calories?: number;
  allergens?: string;
  prep_time?: number;
  popular?: boolean;
  category?: string | null;
  // Additional fields for display
  image?: string; // alias for img
  preparationTime?: number; // alias for prep_time
  spicy?: boolean;
  vegetarian?: boolean;
};

export type ApiOwner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  ownershipPercentage: number;
};

export type ApiBusiness = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  tags: string[];
  image: string;
  description: string;
  capacity?: number;
  acceptsReservations?: boolean;
  paymentMethods?: string[];
  amenities?: string[];
  menu?: ApiMenuItem[];
};

export type ApiBusinessDetail = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  openNow: boolean;
  opensAt: string;
  closesAt: string;
  tags: string[];
  image: string;
  description: string;
  capacity: number;
  acceptsReservations: boolean;
  paymentMethods: string[];
  amenities: string[];
  averageWaitTime: string;
  priceRange: string;
  type: string;
  owners: ApiOwner[];
  menu: ApiMenuItem[];
};

export async function fetchAllBusinesses(): Promise<ApiBusiness[]> {
  const response = await axios.get(`${backendUrl}/business/all`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data as ApiBusiness[];
}

export async function fetchBusinessById(
  id: string
): Promise<ApiBusinessDetail> {
  const response = await axios.get(`${backendUrl}/business/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data as ApiBusinessDetail;
}
