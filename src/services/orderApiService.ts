import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ==================== TYPES ====================

export interface CreateOrderPayload {
  // Customer Information
  customer_id?: string; // Optional - for logged-in users
  customer_name: string; // First + Last name
  customer_email: string;
  customer_phone: string;
  
  // Business Information
  business_id: string; // Restaurant ID
  
  // Order Items
  items: OrderItemPayload[];
  
  // Delivery Information
  delivery_method: "dine_in" | "take_away" | "delivery";
  delivery_address?: string; // Required if delivery_method = "delivery"
  delivery_contact?: string; // Required if delivery_method = "delivery"
  delivery_instructions?: string;
  
  // Payment Information
  payment_method: "cash_on_delivery" | "mobile_money" | "bank_transfer" | "card";
  payment_details?: {
    // Mobile Money
    mobile_provider?: string; // MTN, AIRTEL, MPESA, etc.
    mobile_number?: string;
    
    // Bank Transfer
    bank_name?: string;
    bank_account?: string;
    account_holder?: string;
    
    // Card
    card_number?: string; // Should be encrypted in production
    card_holder?: string;
    card_expiry?: string;
    card_cvv?: string; // Should be encrypted in production
  };
  
  // Order Totals
  subtotal: number;
  tax: number;
  delivery_fee: number;
  total: number;
  
  // Additional Information
  special_instructions?: string;
  is_guest_order: boolean; // true if customer is not logged in
}

export interface OrderItemPayload {
  menu_item_id: string; // ID from menu table
  name: string;
  quantity: number;
  price: number; // Unit price
  total_price: number; // quantity * price
  modifiers?: OrderItemModifier[];
  special_instructions?: string;
}

export interface OrderItemModifier {
  name: string;
  price: number;
  quantity: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status?: number;
  details?: any;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  business_id: string;
  business_name?: string;
  items: OrderItem[];
  delivery_method: string;
  delivery_address?: string;
  delivery_contact?: string;
  delivery_instructions?: string;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  subtotal: number;
  tax: number;
  delivery_fee: number;
  total: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled";
  special_instructions?: string;
  is_guest_order: boolean;
  created_at: string;
  updated_at: string;
  estimated_delivery_time?: string;
  actual_delivery_time?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  name: string;
  quantity: number;
  price: number;
  total_price: number;
  modifiers?: OrderItemModifier[];
  special_instructions?: string;
}

// ==================== API FUNCTIONS ====================

/**
 * Create a new order
 * POST /orders/create
 */
export async function createOrder(
  orderData: CreateOrderPayload
): Promise<ApiResponse<Order>> {
  try {
    const token = localStorage.getItem("access_token");
    
    const headers: any = {
      "Content-Type": "application/json",
    };
    
    // Add token if user is logged in
    if (token && !orderData.is_guest_order) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(
      `${BACKEND_URL}/orders/create`,
      orderData,
      {
        headers,
        withCredentials: true,
      }
    );

    return {
      success: true,
      data: response.data,
      message: "Order created successfully",
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const serverMessage =
      error?.response?.data?.message || error?.response?.data?.error;
    const errorMessage =
      serverMessage ||
      (status === 400
        ? "Invalid order data"
        : status === 401
        ? "Authentication required"
        : status === 404
        ? "Business or menu items not found"
        : status === 422
        ? "Validation error - please check all fields"
        : status === 500
        ? "Server error - please try again"
        : error?.message || "Failed to create order");

    return {
      success: false,
      error: errorMessage,
      status: status,
      details: error?.response?.data ?? null,
    };
  }
}

/**
 * Get order by ID
 * GET /orders/:id
 */
export async function getOrderById(orderId: string): Promise<ApiResponse<Order>> {
  try {
    const token = localStorage.getItem("access_token");
    
    const headers: any = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(`${BACKEND_URL}/orders/${orderId}`, {
      headers,
      withCredentials: true,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch order";

    return {
      success: false,
      error: errorMessage,
      status: status,
    };
  }
}

/**
 * Get orders for a customer
 * GET /orders/customer/:customerId
 */
export async function getCustomerOrders(
  customerId: string
): Promise<ApiResponse<Order[]>> {
  try {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        status: 401,
      };
    }

    const response = await axios.get(
      `${BACKEND_URL}/orders/customer/${customerId}`,
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
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch orders";

    return {
      success: false,
      error: errorMessage,
      status: status,
    };
  }
}

/**
 * Get orders for a business
 * GET /orders/business/:businessId
 */
export async function getBusinessOrders(
  businessId: string
): Promise<ApiResponse<Order[]>> {
  try {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        status: 401,
      };
    }

    const response = await axios.get(
      `${BACKEND_URL}/orders/business/${businessId}`,
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
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch business orders";

    return {
      success: false,
      error: errorMessage,
      status: status,
    };
  }
}

/**
 * Update order status
 * PATCH /orders/:id/status
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<ApiResponse<Order>> {
  try {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        status: 401,
      };
    }

    const response = await axios.patch(
      `${BACKEND_URL}/orders/${orderId}/status`,
      { status },
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
      message: "Order status updated",
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to update order status";

    return {
      success: false,
      error: errorMessage,
      status: status,
    };
  }
}

/**
 * Update payment status
 * PATCH /orders/:id/payment-status
 */
export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: Order["payment_status"]
): Promise<ApiResponse<Order>> {
  try {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        status: 401,
      };
    }

    const response = await axios.patch(
      `${BACKEND_URL}/orders/${orderId}/payment-status`,
      { payment_status: paymentStatus },
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
      message: "Payment status updated",
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to update payment status";

    return {
      success: false,
      error: errorMessage,
      status: status,
    };
  }
}

/**
 * Cancel order
 * PATCH /orders/:id/cancel
 */
export async function cancelOrder(
  orderId: string,
  reason?: string
): Promise<ApiResponse<Order>> {
  try {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      return {
        success: false,
        error: "Authentication required",
        status: 401,
      };
    }

    const response = await axios.patch(
      `${BACKEND_URL}/orders/${orderId}/cancel`,
      { reason },
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
      message: "Order cancelled",
      status: response.status,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to cancel order";

    return {
      success: false,
      error: errorMessage,
      status: status,
    };
  }
}
