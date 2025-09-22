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
  // Allow future fields without changing signature
  [key: string]: any;
};
export async function registerBusiness(businessData: RegisterBusinessPayload) {
  try {
    if (!BACKEND_URL) {
      throw new Error("Missing VITE_BACKEND_URL in environment");
    }
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      JSON.parse(localStorage.getItem("brms_user") || "{}")?.access_token;
    if (!token) {
      throw new Error("Not authenticated. Please log in.");
    }
    const { data } = await axios.post(
      `${BACKEND_URL}/business/create`,
      businessData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-access-token": token,
          "Authorization-Token": token,
          "X-Auth-Token": token,
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error: any) {
    const status = error?.response?.status;
    const serverMessage =
      error?.response?.data?.message || error?.response?.data?.error;
    const message =
      status === 401
        ? serverMessage || "Not authenticated. Please log in."
        : serverMessage ||
          error?.message ||
          "Network error while registering business.";
    throw new Error(message);
  }
}
