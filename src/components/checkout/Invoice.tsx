import React from "react";
import { formatCurrency } from "../../data/checkoutData";
import {
  Receipt,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Printer,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

interface InvoiceProps {
  orderData: {
    items: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      quantity: number;
      totalPrice: number;
      image?: string;
    }>;
    shippingDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address?: string;
      district?: string;
      location?: string;
      deliveryMethod: "dine_in" | "take_away" | "delivery_1hour";
    };
    billingDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address?: string;
      district?: string;
      location?: string;
      country: string;
    };
    subtotal: number;
    tax: number;
    serviceCharge: number;
    discount: number;
    deliveryFee: number;
    total: number;
  };
}

const Invoice: React.FC<InvoiceProps> = ({ orderData }) => {
  const {
    items,
    shippingDetails,
    billingDetails,
    subtotal,
    tax,
    serviceCharge,
    discount,
    deliveryFee,
    total,
  } = orderData;

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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text version of the invoice for download
    const invoiceText = `
ORDER INVOICE
Restaurant BRMS System
Date: ${new Date().toLocaleDateString()}

CUSTOMER INFORMATION:
Name: ${shippingDetails.firstName} ${shippingDetails.lastName}
Email: ${shippingDetails.email}
Phone: ${shippingDetails.phone}

ORDER METHOD:
${getDeliveryMethodName(shippingDetails.deliveryMethod)}
${
  shippingDetails.deliveryMethod === "delivery_1hour"
    ? `Delivery Address: ${shippingDetails.address}, ${shippingDetails.district}, ${shippingDetails.location}`
    : ""
}

BILLING INFORMATION:
Name: ${billingDetails.firstName} ${billingDetails.lastName}
Email: ${billingDetails.email}
Phone: ${billingDetails.phone}
Country: ${billingDetails.country}

ORDER ITEMS:
${items
  .map(
    (item) =>
      `${item.name} - ${item.quantity}x ${formatCurrency(
        item.price
      )} = ${formatCurrency(item.totalPrice)}`
  )
  .join("\n")}

ORDER SUMMARY:
Subtotal: ${formatCurrency(subtotal)}
Tax (8%): ${formatCurrency(tax)}
${deliveryFee > 0 ? `Delivery Fee: ${formatCurrency(deliveryFee)}` : ""}
Total: ${formatCurrency(total)}

Thank you for your order!
    `;

    const blob = new Blob([invoiceText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="bg-white rounded-lg border border-border-primary shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Invoice Header */}
      <motion.div
        className="bg-brand text-white p-6 rounded-t-lg"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Receipt className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Order Invoice</h2>
              <p className="text-brand-light">Restaurant BRMS System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-brand-light">Order Date</p>
              <p className="font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={handlePrint}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                title="Print Invoice"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Printer className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleDownload}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                title="Download Invoice"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Customer Information */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <motion.div
            className="bg-surface-secondary p-4 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Information
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {shippingDetails.firstName} {shippingDetails.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {shippingDetails.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {shippingDetails.phone}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-surface-secondary p-4 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Order Method
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                {getDeliveryMethodName(shippingDetails.deliveryMethod)}
              </p>
              {shippingDetails.deliveryMethod === "delivery_1hour" && (
                <motion.div
                  className="mt-2 p-2 bg-blue-50 rounded border border-blue-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-blue-800 text-xs">
                    <strong>Delivery Address:</strong>
                    <br />
                    {shippingDetails.address}
                    <br />
                    {shippingDetails.district}, {shippingDetails.location}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Billing Information */}
        <motion.div
          className="bg-surface-secondary p-4 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Billing Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {billingDetails.firstName} {billingDetails.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {billingDetails.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {billingDetails.phone}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Country:</span>{" "}
                {billingDetails.country}
              </p>
              {billingDetails.address && (
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {billingDetails.address}
                </p>
              )}
              {billingDetails.district && (
                <p>
                  <span className="font-medium">District:</span>{" "}
                  {billingDetails.district}
                </p>
              )}
              {billingDetails.location && (
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {billingDetails.location}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          className="bg-surface-secondary p-4 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-text-primary mb-3">Order Items</h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-3 bg-white rounded border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <div className="flex items-center gap-3 flex-1">
                  {item.image && (
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">
                      {item.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {item.description}
                    </p>
                    <p className="text-sm text-text-tertiary">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-primary">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          className="bg-surface-secondary p-4 rounded-lg"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-text-primary mb-3">
            Order Summary
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({items.length} items):</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            {serviceCharge > 0 && (
              <div className="flex justify-between">
                <span>Service Charge:</span>
                <span className="font-medium">
                  {formatCurrency(serviceCharge)}
                </span>
              </div>
            )}
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span className="font-medium">
                  {formatCurrency(deliveryFee)}
                </span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span className="font-medium">-{formatCurrency(discount)}</span>
              </div>
            )}
            <motion.div
              className="border-t pt-2 mt-2"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-between text-lg font-bold text-text-primary">
                <span>Total Amount:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-yellow-800 mb-2">
            Important Information
          </h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Orders are typically processed within 24 hours</li>
            <li>
              •{" "}
              {shippingDetails.deliveryMethod === "delivery_1hour"
                ? "Delivery will be completed within 1 hour"
                : "Pickup times will be communicated via SMS/Email"}
            </li>
            <li>• You will receive confirmation once your order is placed</li>
            <li>
              • Please ensure all information is correct before proceeding
            </li>
            <li>• For questions, contact us at +250 700 000 000</li>
          </ul>
        </motion.div>

        {/* Payment Instructions */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-blue-800 mb-2">
            Payment Instructions
          </h3>
          <p className="text-blue-700 text-sm">
            Please complete your payment on the next step. You can choose
            between credit card or mobile money payment methods. All prices are
            in Rwandan Francs (RWF).
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Invoice;
