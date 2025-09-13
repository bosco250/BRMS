import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import {
  formatCurrency,
  generateOrderNumber,
  calculateOrderTotals,
} from "../data/checkoutTypes";
import { toast } from "react-toastify";
import { getSessionUser } from "../auth/session";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { items } = state;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    deliveryMethod: "dine_in",
    paymentMethod: "cash_on_delivery",
    // Payment information
    mobileProvider: "",
    mobileNumber: "",
    bankAccount: "",
    bankName: "",
    accountHolder: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardHolder: "",
    // Delivery information
    deliveryAddress: "",
    deliveryInstructions: "",
    deliveryContact: "",
    useDifferentAddress: false,
  });

  // Check if user is logged in and auto-fill information
  useEffect(() => {
    const sessionUser = getSessionUser();
    if (sessionUser) {
      setIsLoggedIn(true);
      setUserInfo(sessionUser);

      // Auto-fill user information
      const nameParts = sessionUser.name.split(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: sessionUser.email || "",
        phone: sessionUser.phone || "",
        deliveryContact: sessionUser.phone || "",
      }));
    }
  }, []);

  const deliveryFee = formData.deliveryMethod === "delivery_1hour" ? 3000 : 0;
  const { subtotal, tax, total } = calculateOrderTotals(items, deliveryFee);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛒</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-6">
            Add some delicious items to your cart to continue.
          </p>
          <button
            onClick={() => navigate("/businesses")}
            className="bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-hover transition-colors"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      toast.error("Please fill in all required contact fields");
      return;
    }

    // Delivery method specific validation
    if (formData.deliveryMethod === "delivery_1hour") {
      if (!formData.deliveryAddress || !formData.deliveryContact) {
        toast.error("Please fill in all delivery information");
        return;
      }
    }

    // Payment method specific validation
    if (formData.paymentMethod === "mobile_money") {
      if (!formData.mobileProvider || !formData.mobileNumber) {
        toast.error("Please fill in all mobile money information");
        return;
      }
    }

    if (formData.paymentMethod === "bank_transfer") {
      if (
        !formData.bankName ||
        !formData.bankAccount ||
        !formData.accountHolder
      ) {
        toast.error("Please fill in all bank transfer information");
        return;
      }
    }

    if (formData.paymentMethod === "card") {
      if (
        !formData.cardNumber ||
        !formData.cardExpiry ||
        !formData.cardCvv ||
        !formData.cardHolder
      ) {
        toast.error("Please fill in all card information");
        return;
      }
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const order = {
      id: `order_${Date.now()}`,
      orderNumber: generateOrderNumber(),
      items: [...items],
      formData: { ...formData },
      subtotal,
      tax,
      deliveryFee,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    toast.success(`Order Placed Successfully! Order #${order.orderNumber}`);
    clearCart();
    navigate("/order-success", { state: { order, isGuest: !isLoggedIn } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-brand transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Back to Cart
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Checkout
              </h1>
              <div className="flex items-center justify-center gap-2">
                {isLoggedIn ? (
                  <>
                    <span className="text-sm text-brand font-medium flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Welcome back, {userInfo?.name}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {items.length} items
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-brand font-medium">
                      ✓ Guest Checkout Available
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {items.length} items
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                    <span className="text-brand text-sm">👤</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    isLoggedIn
                      ? "bg-green-100 text-green-800"
                      : "bg-brand/10 text-brand"
                  }`}
                >
                  {isLoggedIn ? "✓ Logged In" : "Guest Checkout"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {isLoggedIn
                  ? "Your information has been automatically filled from your account. You can modify it if needed."
                  : "No account required! Just fill in your details to place your order."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    placeholder="+250 7XX XXX XXX"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                  <span className="text-brand text-sm">🚚</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Method
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.deliveryMethod === "dine_in"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="dine_in"
                    checked={formData.deliveryMethod === "dine_in"}
                    onChange={(e) =>
                      handleInputChange("deliveryMethod", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">🍽️</span>
                    <div>
                      <div className="font-medium">Dine In</div>
                      <div className="text-sm text-gray-600">
                        Enjoy at restaurant
                      </div>
                    </div>
                    <div className="text-sm font-medium text-brand">Free</div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.deliveryMethod === "take_away"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="take_away"
                    checked={formData.deliveryMethod === "take_away"}
                    onChange={(e) =>
                      handleInputChange("deliveryMethod", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">🛍️</span>
                    <div>
                      <div className="font-medium">Take Away</div>
                      <div className="text-sm text-gray-600">Pick up order</div>
                    </div>
                    <div className="text-sm font-medium text-brand">Free</div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.deliveryMethod === "delivery_1hour"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery_1hour"
                    checked={formData.deliveryMethod === "delivery_1hour"}
                    onChange={(e) =>
                      handleInputChange("deliveryMethod", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <div className="font-medium">Fast Delivery</div>
                      <div className="text-sm text-gray-600">
                        1 hour delivery
                      </div>
                    </div>
                    <div className="text-sm font-medium text-brand">
                      {formatCurrency(3000)}
                    </div>
                  </div>
                </label>
              </div>

              {/* Fast Delivery Information Form */}
              {formData.deliveryMethod === "delivery_1hour" && (
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <h3 className="font-semibold text-orange-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">🚚</span>
                    Fast Delivery Information
                  </h3>
                  <div className="space-y-4">
                    {/* Different Address Option for Logged-in Users */}
                    {isLoggedIn && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          id="useDifferentAddress"
                          checked={formData.useDifferentAddress}
                          onChange={(e) =>
                            handleInputChange(
                              "useDifferentAddress",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-brand focus:ring-brand border-gray-300 rounded"
                        />
                        <label
                          htmlFor="useDifferentAddress"
                          className="text-sm text-gray-700"
                        >
                          Use a different address for delivery
                        </label>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address *
                      </label>
                      {isLoggedIn && !formData.useDifferentAddress ? (
                        <div className="space-y-2">
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">
                              Using your account address
                            </p>
                            <p className="text-sm text-green-700">
                              {userInfo?.name} • {userInfo?.email} •{" "}
                              {userInfo?.phone}
                            </p>
                          </div>
                          <input
                            type="text"
                            value={formData.deliveryAddress}
                            onChange={(e) =>
                              handleInputChange(
                                "deliveryAddress",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                            placeholder="Enter complete delivery address"
                            required
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={formData.deliveryAddress}
                          onChange={(e) =>
                            handleInputChange("deliveryAddress", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                          placeholder="Enter complete delivery address"
                          required
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Contact Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.deliveryContact}
                        onChange={(e) =>
                          handleInputChange("deliveryContact", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="+250 7XX XXX XXX"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Instructions (Optional)
                      </label>
                      <textarea
                        value={formData.deliveryInstructions}
                        onChange={(e) =>
                          handleInputChange(
                            "deliveryInstructions",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors resize-none"
                        placeholder="Any special instructions for delivery (e.g., gate code, landmarks, etc.)"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Fast Delivery:</strong> Your order will be
                      delivered within 1 hour. Please ensure someone is
                      available at the delivery address to receive the order.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                  <span className="text-brand text-sm">💳</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Payment Method
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === "cash_on_delivery"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === "cash_on_delivery"}
                    onChange={(e) =>
                      handleInputChange("paymentMethod", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">💰</span>
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">
                        Pay when order arrives
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === "mobile_money"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mobile_money"
                    checked={formData.paymentMethod === "mobile_money"}
                    onChange={(e) =>
                      handleInputChange("paymentMethod", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-medium">Mobile Money</div>
                      <div className="text-sm text-gray-600">
                        MTN, Airtel, M-Pesa
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === "bank_transfer"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === "bank_transfer"}
                    onChange={(e) =>
                      handleInputChange("paymentMethod", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">🏦</span>
                    <div>
                      <div className="font-medium">Bank Transfer</div>
                      <div className="text-sm text-gray-600">
                        Direct bank transfer
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === "card"
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={(e) =>
                      handleInputChange("paymentMethod", e.target.value)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">
                        Visa, Mastercard, Amex
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Mobile Money Payment Form */}
              {formData.paymentMethod === "mobile_money" && (
                <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <h3 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    Mobile Money Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Money Provider *
                      </label>
                      <select
                        value={formData.mobileProvider}
                        onChange={(e) =>
                          handleInputChange("mobileProvider", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        required
                      >
                        <option value="">Select Provider</option>
                        <option value="MTN">MTN Mobile Money</option>
                        <option value="AIRTEL">Airtel Money</option>
                        <option value="MPESA">M-Pesa</option>
                        <option value="EQUITY">Equity Mobile Banking</option>
                        <option value="BK">BK Mobile Banking</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          handleInputChange("mobileNumber", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="+250 7XX XXX XXX"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Payment Instructions:</strong> After placing your
                      order, you will receive a payment request on your mobile
                      money account. Please confirm the payment to complete your
                      order.
                    </p>
                  </div>
                </div>
              )}

              {/* Bank Transfer Payment Form */}
              {formData.paymentMethod === "bank_transfer" && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">🏦</span>
                    Bank Transfer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name *
                      </label>
                      <select
                        value={formData.bankName}
                        onChange={(e) =>
                          handleInputChange("bankName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        required
                      >
                        <option value="">Select Bank</option>
                        <option value="BNR">Bank of Rwanda (BNR)</option>
                        <option value="BK">Bank of Kigali (BK)</option>
                        <option value="GT">Guaranty Trust Bank</option>
                        <option value="ACCESS">Access Bank Rwanda</option>
                        <option value="EQUITY">Equity Bank Rwanda</option>
                        <option value="COGEBANQUE">Cogebanque</option>
                        <option value="BPR">Banque Populaire du Rwanda</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        value={formData.bankAccount}
                        onChange={(e) =>
                          handleInputChange("bankAccount", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="Enter account number"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.accountHolder}
                        onChange={(e) =>
                          handleInputChange("accountHolder", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="Enter account holder name"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Payment Instructions:</strong> After placing your
                      order, you will receive bank transfer details. Please
                      complete the transfer within 24 hours to confirm your
                      order.
                    </p>
                  </div>
                </div>
              )}

              {/* Card Payment Form */}
              {formData.paymentMethod === "card" && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">💳</span>
                    Card Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={formData.cardExpiry}
                        onChange={(e) =>
                          handleInputChange("cardExpiry", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={formData.cardCvv}
                        onChange={(e) =>
                          handleInputChange("cardCvv", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.cardHolder}
                        onChange={(e) =>
                          handleInputChange("cardHolder", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="Enter cardholder name"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Security:</strong> Your card information is
                      encrypted and secure. We accept Visa, Mastercard, and
                      American Express.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sticky top-24">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
              {/* Order Summary Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                    <span className="text-brand text-sm">📋</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h3>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200 max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🍽️</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brand">
                          {formatCurrency(item.totalPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="p-6 border-b border-gray-200">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({items.length} items)
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(tax)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-gray-900">
                      {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-brand">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="p-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-brand text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-hover disabled:bg-brand/50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Place Order
                      <span className="text-xl">→</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  ✓ Secure checkout • ✓ Guest checkout available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
