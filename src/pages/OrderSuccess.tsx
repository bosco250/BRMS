import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { formatCurrency } from "../data/checkoutTypes";

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-hover"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "confirmed":
        return "text-blue-600 bg-blue-100";
      case "preparing":
        return "text-orange-600 bg-orange-100";
      case "ready":
        return "text-green-600 bg-green-100";
      case "delivered":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Order Received";
      case "confirmed":
        return "Order Confirmed";
      case "preparing":
        return "Preparing Your Order";
      case "ready":
        return "Ready for Pickup/Delivery";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We'll start preparing it right away.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              Order #{order.orderNumber}
            </p>
            <p className="text-blue-600 text-sm">
              Total: {formatCurrency(order.total)}
            </p>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Status
          </h2>
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusText(order.status)}
            </div>
            {order.estimatedDeliveryTime && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Estimated delivery:{" "}
                  {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Details
          </h2>
          <div className="space-y-3">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Delivery Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">
                  {order.formData?.firstName} {order.formData?.lastName}
                </p>
                <p className="text-sm text-gray-600">{order.formData?.email}</p>
                <p className="text-sm text-gray-600">{order.formData?.phone}</p>
                {order.formData?.address && (
                  <p className="text-sm text-gray-600">
                    {order.formData.address}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                {order.formData?.deliveryMethod === "dine_in" && "🍽️"}
                {order.formData?.deliveryMethod === "take_away" && "🛍️"}
                {order.formData?.deliveryMethod === "delivery_1hour" && "🚚"}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {order.formData?.deliveryMethod === "dine_in" && "Dine In"}
                  {order.formData?.deliveryMethod === "take_away" &&
                    "Take Away"}
                  {order.formData?.deliveryMethod === "delivery_1hour" &&
                    "Fast Delivery"}
                </p>
                <p className="text-sm text-gray-600">
                  {order.formData?.paymentMethod === "cash_on_delivery" &&
                    "Cash on Delivery"}
                  {order.formData?.paymentMethod === "mobile_money" &&
                    "Mobile Money"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">
                {formatCurrency(order.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="text-gray-900">{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">
                {order.deliveryFee === 0
                  ? "Free"
                  : formatCurrency(order.deliveryFee)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand-hover transition-colors flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              navigate("/order-tracking", {
                state: { orderNumber: order.orderNumber, isGuest: true },
              })
            }
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Track Order
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help with your order?
          </p>
          {/* Guest Account Creation Option */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm">👤</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">
                  Want to track future orders easily?
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Create a free account to save your information and track all
                  your orders in one place.
                </p>
                <button className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors">
                  Create Account (Optional)
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+250 7XX XXX XXX</span>
            </div>
            <div className="flex items-center gap-1">
              <span>📧</span>
              <span>support@brms.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
