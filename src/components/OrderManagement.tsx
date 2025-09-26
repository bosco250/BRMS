import React, { useState } from "react";
import { Clock, CheckCircle, X, Eye, Filter } from "lucide-react";
import { formatCurrency } from "../data/checkoutTypes";

interface OrderManagementProps {
  userRole?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled";
  createdAt: string;
  deliveryMethod: "dine_in" | "take_away" | "delivery_1hour";
  paymentMethod: "cash_on_delivery" | "mobile_money";
}

const OrderManagement: React.FC<OrderManagementProps> = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-1703123456789-001",
      customerName: "John Doe",
      items: [
        { name: "Chicken Burger", quantity: 2, price: 5000 },
        { name: "French Fries", quantity: 1, price: 2000 },
      ],
      total: 12000,
      status: "pending",
      createdAt: "2024-01-15T10:30:00Z",
      deliveryMethod: "dine_in",
      paymentMethod: "cash_on_delivery",
    },
    {
      id: "2",
      orderNumber: "ORD-1703123456789-002",
      customerName: "Jane Smith",
      items: [
        { name: "Pizza Margherita", quantity: 1, price: 8000 },
        { name: "Coca Cola", quantity: 2, price: 1500 },
      ],
      total: 11000,
      status: "preparing",
      createdAt: "2024-01-15T11:15:00Z",
      deliveryMethod: "delivery_1hour",
      paymentMethod: "mobile_money",
    },
    {
      id: "3",
      orderNumber: "ORD-1703123456789-003",
      customerName: "Mike Johnson",
      items: [
        { name: "Beef Steak", quantity: 1, price: 12000 },
        { name: "Salad", quantity: 1, price: 3000 },
      ],
      total: 15000,
      status: "ready",
      createdAt: "2024-01-15T12:00:00Z",
      deliveryMethod: "take_away",
      paymentMethod: "cash_on_delivery",
    },
  ]);

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "preparing":
        return <Clock className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getDeliveryIcon = (method: string) => {
    switch (method) {
      case "dine_in":
        return "🍽️";
      case "take_away":
        return "🛍️";
      case "delivery_1hour":
        return "🚚";
      default:
        return "🍽️";
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // In a real app, this would update the order status via API
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Manage and track all orders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.customerName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.map((item) => item.name).join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(order.total)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getDeliveryIcon(order.deliveryMethod)}
                      </span>
                      <div className="text-sm text-gray-900">
                        {order.deliveryMethod === "dine_in" && "Dine In"}
                        {order.deliveryMethod === "take_away" && "Take Away"}
                        {order.deliveryMethod === "delivery_1hour" &&
                          "Fast Delivery"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      {order.status === "pending" && (
                        <button
                          onClick={() =>
                            handleStatusChange(order.id, "confirmed")
                          }
                          className="text-green-600 hover:text-green-900"
                        >
                          Confirm
                        </button>
                      )}
                      {order.status === "confirmed" && (
                        <button
                          onClick={() =>
                            handleStatusChange(order.id, "preparing")
                          }
                          className="text-orange-600 hover:text-orange-900"
                        >
                          Start Prep
                        </button>
                      )}
                      {order.status === "preparing" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "ready")}
                          className="text-green-600 hover:text-green-900"
                        >
                          Mark Ready
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📦</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-600">
            {selectedStatus === "all"
              ? "No orders have been placed yet."
              : `No orders with status "${selectedStatus}" found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
