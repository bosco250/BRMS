import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  MoreVertical,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { sampleOrders, formatCurrency } from "../data/checkoutData";
import type { CheckoutOrder } from "../data/checkoutData";

interface OrderManagementProps {
  userRole: "admin" | "manager" | "owner";
}

const OrderManagement: React.FC<OrderManagementProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<CheckoutOrder | null>(
    null
  );
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    return sampleOrders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingDetails.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.shippingDetails.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.shippingDetails.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.shippingDetails.phone.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesType =
        orderTypeFilter === "all" || order.orderType === orderTypeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, orderTypeFilter]);

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
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800";
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
        return <Package className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "out_for_delivery":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // In a real app, this would update the database
    console.log(`Updating order ${orderId} status to ${newStatus}`);
  };

  const openOrderDetails = (order: CheckoutOrder) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Order Management
          </h1>
          <p className="text-text-secondary">
            Manage and track all customer orders
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors">
            Export Orders
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-border-primary p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Order Type Filter */}
          <div>
            <select
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="delivery">Delivery</option>
              <option value="takeaway">Takeaway</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center">
            <span className="text-sm text-text-secondary">
              {filteredOrders.length} orders found
            </span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-secondary">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {order.orderNumber}
                      </div>
                      <div className="text-sm text-text-secondary">
                        #{order.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {order.shippingDetails.firstName}{" "}
                        {order.shippingDetails.lastName}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {order.shippingDetails.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {order.items[0]?.name}
                      {order.items.length > 1 &&
                        ` +${order.items.length - 1} more`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-brand">
                      {formatCurrency(order.total)}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">
                        {order.status.replace("_", " ")}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.orderType === "delivery"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.orderType === "delivery" ? "Delivery" : "Takeaway"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="text-brand hover:text-brand-dark transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(order.id, "confirmed")
                        }
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Update Status"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-text-secondary hover:text-text-primary transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Order Details - {selectedOrder.orderNumber}
                </h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Information */}
                <div className="space-y-4">
                  <div className="bg-surface-secondary rounded-lg p-4">
                    <h3 className="font-medium text-text-primary mb-3">
                      Order Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">
                          Order Number:
                        </span>
                        <span className="text-text-primary font-medium">
                          {selectedOrder.orderNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Status:</span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            selectedOrder.status
                          )}`}
                        >
                          {getStatusIcon(selectedOrder.status)}
                          <span className="ml-1 capitalize">
                            {selectedOrder.status.replace("_", " ")}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Type:</span>
                        <span className="text-text-primary">
                          {selectedOrder.orderType === "delivery"
                            ? "Delivery"
                            : "Takeaway"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">
                          Payment Status:
                        </span>
                        <span className="text-text-primary capitalize">
                          {selectedOrder.paymentStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Created:</span>
                        <span className="text-text-primary">
                          {new Date(selectedOrder.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-surface-secondary rounded-lg p-4">
                    <h3 className="font-medium text-text-primary mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Name:</span>
                        <span className="text-text-primary">
                          {selectedOrder.shippingDetails.firstName}{" "}
                          {selectedOrder.shippingDetails.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Email:</span>
                        <span className="text-text-primary">
                          {selectedOrder.shippingDetails.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Phone:</span>
                        <span className="text-text-primary">
                          {selectedOrder.shippingDetails.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="bg-surface-secondary rounded-lg p-4">
                    <h3 className="font-medium text-text-primary mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Delivery Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="text-text-primary">
                        {selectedOrder.shippingDetails.address}
                      </div>
                      <div className="text-text-secondary">
                        {selectedOrder.shippingDetails.city},{" "}
                        {selectedOrder.shippingDetails.country}
                      </div>
                      {selectedOrder.shippingDetails.deliveryInstructions && (
                        <div className="text-text-tertiary italic">
                          "{selectedOrder.shippingDetails.deliveryInstructions}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items and Totals */}
                <div className="space-y-4">
                  <div className="bg-surface-secondary rounded-lg p-4">
                    <h3 className="font-medium text-text-primary mb-3">
                      Order Items
                    </h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3 p-3 bg-white rounded-lg"
                        >
                          <img
                            src={
                              item.image ||
                              "https://picsum.photos/seed/default/60/60"
                            }
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-text-primary">
                              {item.name}
                            </h4>
                            <p className="text-sm text-text-secondary">
                              Qty: {item.quantity}
                            </p>
                            {item.specialInstructions && (
                              <p className="text-xs text-text-tertiary italic">
                                "{item.specialInstructions}"
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-brand">
                              {formatCurrency(item.totalPrice)}
                            </div>
                            <div className="text-sm text-text-secondary">
                              {formatCurrency(item.price)} each
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Totals */}
                  <div className="bg-surface-secondary rounded-lg p-4">
                    <h3 className="font-medium text-text-primary mb-3">
                      Order Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Subtotal:</span>
                        <span className="text-text-primary">
                          {formatCurrency(selectedOrder.subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Tax:</span>
                        <span className="text-text-primary">
                          {formatCurrency(selectedOrder.tax)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">
                          Service Charge:
                        </span>
                        <span className="text-text-primary">
                          {formatCurrency(selectedOrder.serviceCharge)}
                        </span>
                      </div>
                      {selectedOrder.deliveryFee > 0 && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">
                            Delivery Fee:
                          </span>
                          <span className="text-text-primary">
                            {formatCurrency(selectedOrder.deliveryFee)}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-border-primary pt-2">
                        <div className="flex justify-between font-semibold text-lg">
                          <span className="text-text-primary">Total:</span>
                          <span className="text-brand">
                            {formatCurrency(selectedOrder.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="bg-surface-secondary rounded-lg p-4">
                    <h3 className="font-medium text-text-primary mb-3">
                      Update Status
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "confirmed",
                        "preparing",
                        "ready",
                        "out_for_delivery",
                        "delivered",
                        "cancelled",
                      ].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            handleStatusUpdate(selectedOrder.id, status);
                            setShowOrderDetails(false);
                          }}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            selectedOrder.status === status
                              ? "bg-brand text-white"
                              : "bg-white text-text-primary hover:bg-surface-tertiary"
                          }`}
                        >
                          {status.replace("_", " ").charAt(0).toUpperCase() +
                            status.replace("_", " ").slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
