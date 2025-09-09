import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle,
  MapPin,
  CreditCard,
  Truck,
  ArrowRight,
} from "lucide-react";
import { formatCurrency } from "../data/checkoutData";

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderNumber, orderData } = location.state || {};

  // Fallback data if no order data is passed
  const order = orderData || {
    orderNumber: orderNumber || `ORD-${Date.now()}`,
    items: [],
    total: 0,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const getDeliveryMethodName = (method: string) => {
    switch (method) {
      case "standard":
        return "Standard Delivery (3-5 business days)";
      case "express":
        return "Express Delivery (1-2 business days)";
      case "same-day":
        return "Same Day Delivery (Within 4 hours)";
      default:
        return "Standard Delivery";
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card";
      case "paypal":
        return "PayPal";
      case "apple-pay":
        return "Apple Pay";
      case "google-pay":
        return "Google Pay";
      default:
        return "Credit/Debit Card";
    }
  };

  const maskCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "";
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.length < 4) return cardNumber;
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-surface-primary py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-text-secondary">
            Thank you for your order. We've received your request and will begin
            processing it right away.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">
              Order Details
            </h2>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Order Number</p>
              <p className="font-mono font-semibold text-text-primary">
                {order.orderNumber}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Order Summary</h3>
              <div className="space-y-2">
                {order.items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-text-primary">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border-primary pt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-text-primary">Total</span>
                    <span className="text-brand">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Order Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-text-secondary">
                    Order Placed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-text-secondary">
                    Processing
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-text-secondary">Shipped</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-text-secondary">Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        {order.shipping && (
          <div className="bg-white rounded-lg shadow-sm border border-border-primary p-6 mb-8">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Customer Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shipping Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand" />
                  <h3 className="font-medium text-text-primary">
                    Shipping Address
                  </h3>
                </div>
                <div className="text-sm text-text-secondary space-y-1">
                  <p>
                    {order.shipping.firstName} {order.shipping.lastName}
                  </p>
                  <p>{order.shipping.address}</p>
                  <p>
                    {order.shipping.district}, {order.shipping.location}
                  </p>
                  <p>{order.shipping.email}</p>
                  <p>{order.shipping.phone}</p>
                  {order.shipping.deliveryInstructions && (
                    <p className="mt-2">
                      <span className="font-medium">Instructions:</span>{" "}
                      {order.shipping.deliveryInstructions}
                    </p>
                  )}
                </div>
                <div className="pt-2">
                  <p className="text-sm">
                    <span className="font-medium text-text-primary">
                      Delivery Method:
                    </span>
                    <span className="text-text-secondary ml-2">
                      {getDeliveryMethodName(order.shipping.deliveryMethod)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Billing Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-brand" />
                  <h3 className="font-medium text-text-primary">
                    Billing Address
                  </h3>
                </div>
                {order.billing?.billingType === "same" ? (
                  <div className="text-sm text-text-secondary">
                    <p>Same as shipping address</p>
                  </div>
                ) : (
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>
                      {order.billing?.firstName} {order.billing?.lastName}
                    </p>
                    {order.billing?.company && <p>{order.billing.company}</p>}
                    <p>{order.billing?.address}</p>
                    <p>
                      {order.billing?.district}, {order.billing?.location}
                    </p>
                    <p>{order.billing?.country}</p>
                  </div>
                )}
              </div>

              {/* Payment Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-brand" />
                  <h3 className="font-medium text-text-primary">
                    Payment Method
                  </h3>
                </div>
                <div className="text-sm text-text-secondary space-y-1">
                  <p className="font-medium text-text-primary">
                    {getPaymentMethodName(order.payment?.paymentMethod)}
                  </p>
                  {order.payment?.paymentMethod === "card" && (
                    <>
                      <p>{maskCardNumber(order.payment?.cardNumber)}</p>
                      <p>{order.payment?.cardHolderName}</p>
                      <p>
                        Expires: {order.payment?.expiryMonth}/
                        {order.payment?.expiryYear}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            What Happens Next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">
                    Order Confirmation
                  </h4>
                  <p className="text-sm text-blue-700">
                    You'll receive an email confirmation with your order details
                    within the next few minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Processing</h4>
                  <p className="text-sm text-blue-700">
                    Our team will begin processing your order and preparing it
                    for shipment.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">
                    Shipping Updates
                  </h4>
                  <p className="text-sm text-blue-700">
                    You'll receive tracking information and shipping updates via
                    email.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Delivery</h4>
                  <p className="text-sm text-blue-700">
                    Your order will be delivered according to your selected
                    delivery method.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-surface-secondary rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-text-primary mb-2">
                Customer Support
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                Our customer support team is here to help with any questions
                about your order.
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-text-secondary">📧 support@brms.com</p>
                <p className="text-text-secondary">📞 1-800-BRMS-HELP</p>
                <p className="text-text-secondary">🕒 Mon-Fri: 9AM-6PM EST</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-text-primary mb-2">
                Order Tracking
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                Track your order status and get real-time updates on delivery
                progress.
              </p>
              <button
                onClick={() => navigate("/dashboard/customer/orders")}
                className="inline-flex items-center text-brand hover:text-brand-dark transition-colors"
              >
                Track Order
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/businesses")}
            className="px-6 py-3 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/dashboard/customer/orders")}
            className="px-6 py-3 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
