import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Package,
  Eye,
  Star,
} from "lucide-react";
import { sampleOrders, formatCurrency } from "../data/checkoutData";
import type { CheckoutOrder } from "../data/checkoutData";

const CustomerOrderHistory: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<CheckoutOrder | null>(
    null
  );
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Filter orders for current customer (in real app, this would come from auth context)
  const customerOrders = sampleOrders.filter(
    (order) => order.customerId === "customer_001"
  );

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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "pending":
        return "Your order has been received and is being reviewed.";
      case "confirmed":
        return "Your order has been confirmed and will be prepared soon.";
      case "preparing":
        return "Your order is being prepared in our kitchen.";
      case "ready":
        return "Your order is ready for pickup or delivery.";
      case "out_for_delivery":
        return "Your order is on its way to you.";
      case "delivered":
        return "Your order has been delivered. Enjoy your meal!";
      case "cancelled":
        return "Your order has been cancelled.";
      default:
        return "Order status is being updated.";
    }
  };

  const openOrderDetails = (order: CheckoutOrder) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  if (customerOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-text-secondary">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No orders yet
        </h3>
        <p className="text-text-secondary mb-4">
          Start ordering delicious food to see your order history here.
        </p>
        <button className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors">
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Order History
        </h1>
        <p className="text-text-secondary">
          Track your orders and view past purchases
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {customerOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg border border-border-primary p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {/* Order Info */}
              <div className="flex-1 mb-4 lg:mb-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {order.orderNumber}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">
                      {order.status.replace("_", " ")}
                    </span>
                  </span>
                </div>

                {/* Order Items Preview */}
                <div className="mb-3">
                  <p className="text-sm text-text-primary">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""} •{" "}
                    {order.orderType === "delivery" ? "Delivery" : "Takeaway"}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {order.items.map((item) => item.name).join(", ")}
                  </p>
                </div>

                {/* Status Description */}
                <p className="text-sm text-text-secondary">
                  {getStatusDescription(order.status)}
                </p>
              </div>

              {/* Order Total and Actions */}
              <div className="flex flex-col items-end space-y-3">
                <div className="text-right">
                  <p className="text-lg font-semibold text-brand">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {order.paymentStatus === "paid"
                      ? "Paid"
                      : "Payment Pending"}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openOrderDetails(order)}
                    className="flex items-center text-brand hover:text-brand-dark transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>

                  {order.status === "delivered" && (
                    <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
                      <Star className="w-4 h-4 mr-1" />
                      Rate Order
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar for Active Orders */}
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <div className="mt-4 pt-4 border-t border-border-primary">
                <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                  <span>Order Placed</span>
                  <span>Confirmed</span>
                  <span>Preparing</span>
                  <span>
                    {order.orderType === "delivery"
                      ? "Out for Delivery"
                      : "Ready"}
                  </span>
                  <span>Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-brand h-2 rounded-full transition-all duration-500"
                    style={{
                      width:
                        order.status === "pending"
                          ? "20%"
                          : order.status === "confirmed"
                          ? "40%"
                          : order.status === "preparing"
                          ? "60%"
                          : order.status === "ready"
                          ? "80%"
                          : order.status === "out_for_delivery"
                          ? "90%"
                          : "100%",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

              <div className="space-y-6">
                {/* Order Status */}
                <div className="bg-surface-secondary rounded-lg p-4">
                  <h3 className="font-medium text-text-primary mb-3">
                    Order Status
                  </h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1 capitalize">
                        {selectedOrder.status.replace("_", " ")}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {getStatusDescription(selectedOrder.status)}
                  </p>
                  {selectedOrder.estimatedDeliveryTime && (
                    <p className="text-sm text-text-primary mt-2">
                      <strong>Estimated Time:</strong>{" "}
                      {selectedOrder.estimatedDeliveryTime}
                    </p>
                  )}
                </div>

                {/* Order Items */}
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

                {/* Order Summary */}
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

                {/* Delivery Information */}
                <div className="bg-surface-secondary rounded-lg p-4">
                  <h3 className="font-medium text-text-primary mb-3">
                    Delivery Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-text-primary">
                      {selectedOrder.shippingDetails.firstName}{" "}
                      {selectedOrder.shippingDetails.lastName}
                    </p>
                    <p className="text-text-secondary">
                      {selectedOrder.shippingDetails.address}
                    </p>
                    <p className="text-text-secondary">
                      {selectedOrder.shippingDetails.city},{" "}
                      {selectedOrder.shippingDetails.country}
                    </p>
                    <p className="text-text-secondary">
                      {selectedOrder.shippingDetails.phone}
                    </p>
                    {selectedOrder.shippingDetails.deliveryInstructions && (
                      <p className="text-text-tertiary italic mt-2">
                        "{selectedOrder.shippingDetails.deliveryInstructions}"
                      </p>
                    )}
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

export default CustomerOrderHistory;
