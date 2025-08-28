import React, { useState } from "react";
import {
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  Smartphone,
} from "lucide-react";

interface PaymentDetails {
  paymentMethod: "card" | "mtn-momo" | "airtel-money" | "m-pesa";
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  saveCard: boolean;
  mobileNumber: string;
  mobileMoneyProvider: string;
}

interface PaymentStepProps {
  onNext: (paymentDetails: PaymentDetails) => void;
  onBack: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ onNext, onBack }) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: "card",
    cardNumber: "",
    cardHolderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    saveCard: false,
    mobileNumber: "",
    mobileMoneyProvider: "",
  });

  const [errors, setErrors] = useState<Partial<PaymentDetails>>({});

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return year.toString();
  });

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
      popular: true,
    },
    {
      id: "mtn-momo",
      name: "MTN Mobile Money",
      description: "Pay with MTN Mobile Money",
      icon: Smartphone,
      popular: true,
    },
    {
      id: "airtel-money",
      name: "Airtel Money",
      description: "Pay with Airtel Money",
      icon: Smartphone,
    },
    {
      id: "m-pesa",
      name: "M-Pesa",
      description: "Pay with M-Pesa",
      icon: Smartphone,
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentDetails> = {};

    if (paymentDetails.paymentMethod === "card") {
      if (!paymentDetails.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (paymentDetails.cardNumber.replace(/\s/g, "").length < 13) {
        newErrors.cardNumber = "Please enter a valid card number";
      }

      if (!paymentDetails.cardHolderName.trim()) {
        newErrors.cardHolderName = "Cardholder name is required";
      }

      if (!paymentDetails.expiryMonth) {
        newErrors.expiryMonth = "Expiry month is required";
      }

      if (!paymentDetails.expiryYear) {
        newErrors.expiryYear = "Expiry year is required";
      }

      if (!paymentDetails.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (paymentDetails.cvv.length < 3) {
        newErrors.cvv = "Please enter a valid CVV";
      }
    }

    // Validate mobile money fields
    if (
      ["mtn-momo", "airtel-money", "m-pesa"].includes(
        paymentDetails.paymentMethod
      )
    ) {
      if (!paymentDetails.mobileNumber.trim()) {
        newErrors.mobileNumber = "Mobile number is required";
      } else if (
        !/^(\+250|250)?7[0-9]{8}$/.test(
          paymentDetails.mobileNumber.replace(/\s/g, "")
        )
      ) {
        newErrors.mobileNumber = "Please enter a valid Rwandan mobile number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(paymentDetails);
    }
  };

  const handleInputChange = (
    field: keyof PaymentDetails,
    value: string | boolean
  ) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    handleInputChange("cardNumber", formatted);
  };

  const formatMobileNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // Format as +250 7XX XXX XXX
    if (cleaned.length >= 9) {
      const countryCode = cleaned.startsWith("250") ? "250" : "250";
      const number = cleaned.startsWith("250") ? cleaned.slice(3) : cleaned;
      return `+${countryCode} ${number.slice(0, 3)} ${number.slice(
        3,
        6
      )} ${number.slice(6, 9)}`;
    }

    return value;
  };

  const handleMobileNumberChange = (value: string) => {
    const formatted = formatMobileNumber(value);
    handleInputChange("mobileNumber", formatted);
  };

  const isMobileMoney = ["mtn-momo", "airtel-money", "m-pesa"].includes(
    paymentDetails.paymentMethod
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Payment Method
        </h3>
        <p className="text-text-secondary">
          Choose your preferred payment method and enter your payment details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-4">
            Select Payment Method
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentDetails.paymentMethod === method.id
                      ? "border-brand bg-brand/5"
                      : "border-border-primary hover:border-brand/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentDetails.paymentMethod === method.id}
                    onChange={(e) =>
                      handleInputChange("paymentMethod", e.target.value as any)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className="w-5 h-5 text-brand" />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary flex items-center gap-2">
                        {method.name}
                        {method.popular && (
                          <span className="text-xs bg-brand text-white px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {method.description}
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Credit Card Form - Only show if card is selected */}
        {paymentDetails.paymentMethod === "card" && (
          <div className="bg-surface-secondary rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-text-primary mb-4">Card Details</h4>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Card Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  className={`w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.cardNumber
                      ? "border-red-300"
                      : "border-border-primary"
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                value={paymentDetails.cardHolderName}
                onChange={(e) =>
                  handleInputChange("cardHolderName", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                  errors.cardHolderName
                    ? "border-red-300"
                    : "border-border-primary"
                }`}
                placeholder="Enter cardholder name"
              />
              {errors.cardHolderName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cardHolderName}
                </p>
              )}
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Expiry Month *
                </label>
                <select
                  value={paymentDetails.expiryMonth}
                  onChange={(e) =>
                    handleInputChange("expiryMonth", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.expiryMonth
                      ? "border-red-300"
                      : "border-border-primary"
                  }`}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {errors.expiryMonth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expiryMonth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Expiry Year *
                </label>
                <select
                  value={paymentDetails.expiryYear}
                  onChange={(e) =>
                    handleInputChange("expiryYear", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.expiryYear
                      ? "border-red-300"
                      : "border-border-primary"
                  }`}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.expiryYear && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expiryYear}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.cvv ? "border-red-300" : "border-border-primary"
                  }`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Save Card Option */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="saveCard"
                checked={paymentDetails.saveCard}
                onChange={(e) =>
                  handleInputChange("saveCard", e.target.checked)
                }
                className="w-4 h-4 text-brand focus:ring-brand border-border-primary rounded"
              />
              <label htmlFor="saveCard" className="text-sm text-text-primary">
                Save this card for future purchases
              </label>
            </div>
          </div>
        )}

        {/* Mobile Money Form - Show for mobile money methods */}
        {isMobileMoney && (
          <div className="bg-surface-secondary rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-text-primary mb-4">
              {
                paymentMethods.find(
                  (m) => m.id === paymentDetails.paymentMethod
                )?.name
              }{" "}
              Details
            </h4>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mobile Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={paymentDetails.mobileNumber}
                  onChange={(e) => handleMobileNumberChange(e.target.value)}
                  className={`w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.mobileNumber
                      ? "border-red-300"
                      : "border-border-primary"
                  }`}
                  placeholder="+250 7XX XXX XXX"
                  maxLength={16}
                />
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              </div>
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber}
                </p>
              )}
              <p className="text-xs text-text-tertiary mt-1">
                Enter the mobile number registered with{" "}
                {
                  paymentMethods.find(
                    (m) => m.id === paymentDetails.paymentMethod
                  )?.name
                }
              </p>
            </div>

            {/* Mobile Money Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <h5 className="font-medium text-blue-800 mb-1">
                    How it works:
                  </h5>
                  <ol className="text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Enter your mobile number above</li>
                    <li>You'll receive a payment request on your phone</li>
                    <li>Enter your PIN to confirm the payment</li>
                    <li>Payment will be processed instantly</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alternative Payment Methods Info */}
        {!isMobileMoney && paymentDetails.paymentMethod !== "card" && (
          <div className="bg-brand/5 border border-brand/20 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-brand" />
              <h4 className="font-medium text-text-primary">
                {
                  paymentMethods.find(
                    (m) => m.id === paymentDetails.paymentMethod
                  )?.name
                }
              </h4>
            </div>
            <p className="text-sm text-text-secondary">
              You will be redirected to complete your payment securely.
            </p>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-brand mt-0.5" />
            <div>
              <h4 className="font-medium text-text-primary mb-1">
                Secure Payment
              </h4>
              <p className="text-sm text-text-secondary">
                Your payment information is encrypted and secure. We use
                industry-standard SSL encryption to protect your data.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition-colors"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentStep;
