import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string | undefined;

export type RegisterBusinessPayload = {
  business_name: string;
  business_type: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  cuisine?: string;
  website?: string;
  accept_reservations: boolean;
  business_logo?: string;
};

export type AddMenuItemPayload = {
  item_name: string;
  description: string;
  price: number;
  is_available: boolean;
  imageUrl: string;
  ingredients: string;
  currency: string;
  business_id: number;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status?: number;
  details?: any;
  //others fields can be added here
  [key: string]: any;
};

export async function registerBusiness(
  businessData: RegisterBusinessPayload
): Promise<ApiResponse> {
  try {
    if (!BACKEND_URL)
      throw new Error("Missing VITE_BACKEND_URL in environment");

    const token = localStorage.getItem("access_token");

    if (!token) {
      return {
        success: false,
        error: "Not authenticated. Please log in.",
        status: 401,
      };
    }

    const normalizeType = (value: string) =>
      value
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : value;

    const payload: RegisterBusinessPayload = {
      business_name: businessData.business_name,
      business_type: normalizeType(String(businessData.business_type || "")),
      address: businessData.address,
      phone: businessData.phone,
      email: businessData.email,
      description: businessData.description,
      cuisine: businessData.cuisine,
      website: businessData.website,
      accept_reservations: Boolean(businessData.accept_reservations),
      business_logo: businessData.business_logo,
    };

    const response = await axios.post(
      `${BACKEND_URL}/business/create`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data,
      message: "Business created successfully",
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const serverMessage =
      error?.response?.data?.message || error?.response?.data?.error;
    const errorMessage =
      serverMessage ||
      (status === 401
        ? "Not authenticated. Please log in."
        : status === 403
        ? "Forbidden"
        : status === 409
        ? "Business already exists"
        : status === 422
        ? "Invalid business data"
        : status === 500
        ? "Internal server error"
        : error?.message || "Request failed");

    if (status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
    }

    return {
      success: false,
      error: errorMessage,
      status: status,
      details: error?.response?.data ?? null,
    };
  }
}

export function canCreateBusiness(): boolean {
  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    JSON.parse(localStorage.getItem("brms_user") || "{}")?.access_token;
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = String(payload.role || payload.userRole || "").toUpperCase();
    return role === "ADMIN" || role === "BUSINESS_OWNER";
  } catch {
    return false;
  }
}

// Types for user businesses
export type UserBusiness = {
  id: string;
  name: string;
  business_name?: string; // Backend field
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
  business_logo?: string; // Backend field
  description: string;
  capacity: number;
  acceptsReservations: boolean;
  paymentMethods: string[];
  amenities: string[];
  averageWaitTime: string;
  priceRange: string;
  type: string;
  owners: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    ownershipPercentage: number;
  }>;
  menu: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string | null;
    available: boolean;
  }>;
};

// Get businesses for logged-in user
export async function getUserBusinesses(
  userId: string
): Promise<ApiResponse<UserBusiness[]>> {
  try {
    if (!BACKEND_URL)
      throw new Error("Missing VITE_BACKEND_URL in environment");

    const token = localStorage.getItem("access_token");

    if (!token) {
      return {
        success: false,
        error: "Not authenticated. Please log in.",
        status: 401,
      };
    }

    const response = await axios.get(`${BACKEND_URL}/business/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return {
      success: true,
      data: response.data,
      message: "Businesses retrieved successfully",
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const serverMessage =
      error?.response?.data?.message || error?.response?.data?.error;
    const errorMessage =
      serverMessage ||
      (status === 401
        ? "Not authenticated. Please log in."
        : status === 403
        ? "Forbidden"
        : status === 404
        ? "No businesses found"
        : status === 500
        ? "Internal server error"
        : error?.message || "Request failed");

    if (status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
    }

    return {
      success: false,
      error: errorMessage,
      status: status,
      details: error?.response?.data ?? null,
    };
  }
}

// Get business menu by business ID
// NOTE: getBusinessMenu removed. Menu data is obtained directly from getUserBusinesses

// Add menu item to business
export async function addMenuItem(
  menuData: AddMenuItemPayload
): Promise<ApiResponse> {
  try {
    if (!BACKEND_URL)
      throw new Error("Missing VITE_BACKEND_URL in environment");

    const token = localStorage.getItem("access_token");

    if (!token) {
      return {
        success: false,
        error: "Not authenticated. Please log in.",
        status: 401,
      };
    }

    const payload: AddMenuItemPayload = {
      item_name: menuData.item_name,
      description: menuData.description,
      price: Number(menuData.price),
      is_available: Boolean(menuData.is_available),
      imageUrl: menuData.imageUrl,
      ingredients: menuData.ingredients,
      currency: menuData.currency || "RWF",
      business_id: Number(menuData.business_id),
    };

    const response = await axios.post(`${BACKEND_URL}/menu/add`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return {
      success: true,
      data: response.data,
      message: "Menu item added successfully",
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const serverMessage =
      error?.response?.data?.message || error?.response?.data?.error;
    const errorMessage =
      serverMessage ||
      (status === 401
        ? "Not authenticated. Please log in."
        : status === 403
        ? "Forbidden - You don't have permission to add menu items"
        : status === 404
        ? "Business not found"
        : status === 422
        ? "Invalid menu item data"
        : status === 500
        ? "Internal server error"
        : error?.message || "Request failed");

    if (status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
    }

    return {
      success: false,
      error: errorMessage,
      status: status,
      details: error?.response?.data ?? null,
    };
  }
}
