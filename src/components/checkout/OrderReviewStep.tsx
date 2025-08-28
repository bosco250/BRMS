import React from "react";
import {
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../data/checkoutData";
import Invoice from "./Invoice";

interface OrderReviewStepProps {
  onPlaceOrder: () => void;
  onBack: () => void;
  shippingDetails: any;
  billingDetails: any;
  paymentDetails: any;
}

const OrderReviewStep: React.FC<OrderReviewStepProps> = ({
  onPlaceOrder,
  onBack,
  shippingDetails,
  billingDetails,
  paymentDetails,
}) => {
  const { state } = useCart();
  const { items } = state;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08; // 8% tax

  // Get delivery fee based on selected method
  const getDeliveryFee = () => {
    switch (shippingDetails?.deliveryMethod) {
      case "delivery_1hour":
        return 3000; // 3,000 RWF
      case "dine_in":
      case "take_away":
      default:
        return 0;
    }
  };

  const deliveryFee = getDeliveryFee();
  const total = subtotal + tax + deliveryFee;

  const getDeliveryMethodName = (method: string) => {
    switch (method) {
      case "dine_in":
        return "Dine In - Enjoy your meal at our restaurant";
      case "take_away":
        return "Take Away - Pick up your order at our restaurant";
      case "delivery_1hour":
        return "Delivery in 1 Hour - Fast delivery to your location";
      default:
        return "Dine In";
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card";
      case "mtn-momo":
        return "MTN Mobile Money";
      case "airtel-money":
        return "Airtel Money";
      case "m-pesa":
        return "M-Pesa";
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

  const isMobileMoney = (method: string) => {
    return ["mtn-momo", "airtel-money", "m-pesa"].includes(method);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Review Your Order
        </h3>
        <p className="text-text-secondary">
          Please review all the details below before placing your order.
        </p>
      </div>

      {/* Invoice Display */}
      <Invoice
        orderData={{
          items,
          shippingDetails,
          billingDetails,
          subtotal,
          tax,
          serviceCharge: 0,
          discount: 0,
          deliveryFee,
          total,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Order Details */}
        <div className="space-y-6">
          {/* Order Items */}
          <div className="bg-surface-secondary rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-4">Order Items</h4>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border-primary"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-text-primary truncate">
                      {item.name}
                    </h5>
                    <p className="text-sm text-text-secondary">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text-primary">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-surface-secondary rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-4">
              Order Summary
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tax (8%)</span>
                <span className="text-text-primary">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Service Fee</span>
                <span className="text-text-primary">
                  {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
                </span>
              </div>
              <div className="border-t border-border-primary pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-text-primary">Total</span>
                  <span className="text-brand">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Payment Details */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="bg-surface-secondary rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-brand" />
              <h4 className="font-medium text-text-primary">
                Shipping Information
              </h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-text-primary">
                {shippingDetails?.firstName} {shippingDetails?.lastName}
              </p>
              <p className="text-text-secondary">{shippingDetails?.email}</p>
              <p className="text-text-secondary">{shippingDetails?.phone}</p>
              <div className="pt-2">
                <p className="text-text-secondary">
                  {shippingDetails?.address}
                </p>
                <p className="text-text-secondary">
                  {shippingDetails?.district}, {shippingDetails?.location}
                </p>
                {shippingDetails?.deliveryInstructions && (
                  <p className="text-text-secondary mt-2">
                    <span className="font-medium">Instructions:</span>{" "}
                    {shippingDetails.deliveryInstructions}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border-primary">
              <p className="text-sm">
                <span className="font-medium text-text-primary">
                  Order Method:
                </span>
                <span className="text-text-secondary ml-2">
                  {getDeliveryMethodName(shippingDetails?.deliveryMethod)}
                </span>
              </p>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-surface-secondary rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-brand" />
              <h4 className="font-medium text-text-primary">
                Billing Information
              </h4>
            </div>
            {billingDetails?.billingType === "same" ? (
              <div className="text-sm text-text-secondary">
                <p>Same as shipping address</p>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p className="font-medium text-text-primary">
                  {billingDetails?.firstName} {billingDetails?.lastName}
                </p>
                {billingDetails?.company && (
                  <p className="text-text-secondary">
                    {billingDetails.company}
                  </p>
                )}
                <p className="text-text-secondary">{billingDetails?.address}</p>
                <p className="text-text-secondary">
                  {billingDetails?.district}, {billingDetails?.location}
                </p>
                <p className="text-text-secondary">{billingDetails?.country}</p>
                {billingDetails?.taxId && (
                  <p className="text-text-secondary">
                    <span className="font-medium">Tax ID:</span>{" "}
                    {billingDetails.taxId}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Payment Information */}
          <div className="bg-surface-secondary rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-brand" />
              <h4 className="font-medium text-text-primary">Payment Method</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-text-primary">
                {getPaymentMethodName(paymentDetails?.paymentMethod)}
              </p>
              {paymentDetails?.paymentMethod === "card" && (
                <>
                  <p className="text-text-secondary">
                    {maskCardNumber(paymentDetails?.cardNumber)}
                  </p>
                  <p className="text-text-secondary">
                    {paymentDetails?.cardHolderName}
                  </p>
                  <p className="text-text-secondary">
                    Expires: {paymentDetails?.expiryMonth}/
                    {paymentDetails?.expiryYear}
                  </p>
                  {paymentDetails?.saveCard && (
                    <p className="text-text-secondary text-xs">
                      ✓ Card will be saved for future purchases
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Important Notices */}
      <div className="space-y-4">
        {/* Terms and Conditions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <h5 className="font-medium text-yellow-800 mb-1">
                Important Information
              </h5>
              <ul className="text-yellow-700 space-y-1">
                <li>• Orders are typically processed within 24 hours</li>
                <li>
                  •{" "}
                  {shippingDetails?.deliveryMethod === "delivery_1hour"
                    ? "Delivery will be completed within 1 hour"
                    : "Pickup times will be communicated via SMS/Email"}
                </li>
                <li>
                  • You will receive confirmation once your order is placed
                </li>
                <li>
                  • Please ensure all information is correct before proceeding
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-green-800 mb-1">
                Secure Checkout
              </h5>
              <p className="text-green-700">
                Your payment information is encrypted and secure. This site is
                protected by SSL encryption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-border-primary">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors"
        >
          Back
        </button>
        <button
          onClick={onPlaceOrder}
          className="px-8 py-3 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition-colors flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderReviewStep;
