import React, { useState, useEffect } from "react";
import {
  MapPin,
  Utensils,
  ShoppingBag,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { getSessionUser } from "../../auth/session";

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  location: string;
  deliveryInstructions: string;
  deliveryMethod: "dine_in" | "take_away" | "delivery_1hour";
}

interface ShippingStepProps {
  onNext: (shippingDetails: ShippingDetails) => void;
  onBack: () => void;
}

const ShippingStep: React.FC<ShippingStepProps> = ({ onNext, onBack }) => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    location: "",
    deliveryInstructions: "",
    deliveryMethod: "dine_in",
  });

  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  // Get logged in user on component mount
  useEffect(() => {
    const user = getSessionUser();
    if (user) {
      setLoggedInUser(user);
      // Auto-fill user details
      const nameParts = user.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setShippingDetails((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: user.email,
        phone: user.phone || "",
      }));
    }
  }, []);

  const deliveryOptions = [
    {
      id: "dine_in",
      name: "Dine In",
      description: "Enjoy your meal at our restaurant",
      price: 0,
      icon: Utensils,
    },
    {
      id: "take_away",
      name: "Take Away",
      description: "Pick up your order at our restaurant",
      price: 0,
      icon: ShoppingBag,
    },
    {
      id: "delivery_1hour",
      name: "Delivery in 1 Hour",
      description: "Fast delivery to your location",
      price: 3000, // 3,000 RWF
      icon: Clock,
    },
  ];

  const districts = [
    "Kigali City",
    "Gasabo",
    "Kicukiro",
    "Nyarugenge",
    "Eastern Province",
    "Bugesera",
    "Gatsibo",
    "Kayonza",
    "Kirehe",
    "Ngoma",
    "Nyagatare",
    "Rwamagana",
    "Northern Province",
    "Burera",
    "Gakenke",
    "Gicumbi",
    "Musanze",
    "Rulindo",
    "Southern Province",
    "Gisagara",
    "Huye",
    "Kamonyi",
    "Muhanga",
    "Nyamagabe",
    "Nyanza",
    "Nyaruguru",
    "Ruhango",
    "Western Province",
    "Karongi",
    "Ngororero",
    "Nyabihu",
    "Nyamasheke",
    "Rubavu",
    "Rusizi",
    "Rutsiro",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingDetails> = {};

    // Only require address fields for delivery
    if (shippingDetails.deliveryMethod === "delivery_1hour") {
      if (!shippingDetails.address.trim()) {
        newErrors.address = "Address is required for delivery";
      }
      if (!shippingDetails.district.trim()) {
        newErrors.district = "District is required for delivery";
      }
      if (!shippingDetails.location.trim()) {
        newErrors.location = "Location is required for delivery";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(shippingDetails);
    }
  };

  const handleInputChange = (field: keyof ShippingDetails, value: string) => {
    setShippingDetails((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // If no user is logged in, show a message
  if (!loggedInUser) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <User className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Please Log In
          </h3>
          <p className="text-yellow-700 mb-4">
            You need to be logged in to proceed with checkout.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Order Information
        </h3>
        <p className="text-text-secondary">
          Please choose your preferred order method and provide delivery details
          if needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Information Display */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-4">
            Account Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border-primary">
              <User className="w-5 h-5 text-brand" />
              <div>
                <p className="text-sm text-text-secondary">Name</p>
                <p className="font-medium text-text-primary">
                  {loggedInUser.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border-primary">
              <Mail className="w-5 h-5 text-brand" />
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <p className="font-medium text-text-primary">
                  {loggedInUser.email}
                </p>
              </div>
            </div>
            {loggedInUser.phone && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border-primary">
                <Phone className="w-5 h-5 text-brand" />
                <div>
                  <p className="text-sm text-text-secondary">Phone</p>
                  <p className="font-medium text-text-primary">
                    {loggedInUser.phone}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Method Selection */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-4">Order Method</h4>
          <div className="space-y-3">
            {deliveryOptions.map((option) => {
              const Icon = option.icon;
              return (
                <label
                  key={option.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    shippingDetails.deliveryMethod === option.id
                      ? "border-brand bg-brand/5"
                      : "border-border-primary hover:border-brand/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={option.id}
                    checked={shippingDetails.deliveryMethod === option.id}
                    onChange={(e) =>
                      handleInputChange("deliveryMethod", e.target.value as any)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className="w-5 h-5 text-brand" />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">
                        {option.name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {option.description}
                      </div>
                    </div>
                    <div className="font-semibold text-brand">
                      {option.price === 0
                        ? "Free"
                        : `${option.price.toLocaleString()} RWF`}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Address Information - Only show for delivery */}
        {shippingDetails.deliveryMethod === "delivery_1hour" && (
          <div className="bg-surface-secondary rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-4">
              Delivery Address
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={shippingDetails.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.address ? "border-red-300" : "border-border-primary"
                  }`}
                  placeholder="Enter street address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    District *
                  </label>
                  <select
                    value={shippingDetails.district}
                    onChange={(e) =>
                      handleInputChange("district", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                      errors.district
                        ? "border-red-300"
                        : "border-border-primary"
                    }`}
                  >
                    <option value="">Select district</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.district}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={shippingDetails.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                      errors.location
                        ? "border-red-300"
                        : "border-border-primary"
                    }`}
                    placeholder="e.g., Kimihurura, Remera, etc."
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  value={shippingDetails.deliveryInstructions}
                  onChange={(e) =>
                    handleInputChange("deliveryInstructions", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  rows={3}
                  placeholder="Any special delivery instructions..."
                />
              </div>
            </div>
          </div>
        )}

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
            Continue to Billing
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingStep;
