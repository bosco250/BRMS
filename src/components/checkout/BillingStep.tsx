import React, { useState, useEffect } from "react";
import { CreditCard, Building, User } from "lucide-react";
import { getSessionUser } from "../../auth/session";

interface BillingDetails {
  billingType: "same" | "different";
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  district: string;
  location: string;
  country: string;
  taxId: string;
}

interface BillingStepProps {
  onNext: (billingDetails: BillingDetails) => void;
  onBack: () => void;
  shippingDetails?: any;
}

const BillingStep: React.FC<BillingStepProps> = ({
  onNext,
  onBack,
  shippingDetails,
}) => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    billingType: "same",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    district: "",
    location: "",
    country: "Rwanda",
    taxId: "",
  });

  const [errors, setErrors] = useState<Partial<BillingDetails>>({});

  // Get logged in user on component mount
  useEffect(() => {
    const user = getSessionUser();
    if (user) {
      setLoggedInUser(user);
      // Auto-fill user details
      const nameParts = user.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setBillingDetails((prev) => ({
        ...prev,
        firstName,
        lastName,
      }));
    }
  }, []);

  const countries = [
    "Rwanda",
    "Uganda",
    "Kenya",
    "Tanzania",
    "Burundi",
    "Democratic Republic of Congo",
    "Other",
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
    const newErrors: Partial<BillingDetails> = {};

    if (billingDetails.billingType === "different") {
      if (!billingDetails.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!billingDetails.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!billingDetails.address.trim()) {
        newErrors.address = "Address is required";
      }
      if (!billingDetails.district.trim()) {
        newErrors.district = "District is required";
      }
      if (!billingDetails.location.trim()) {
        newErrors.location = "Location is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // If billing is same as shipping, copy shipping details
      if (billingDetails.billingType === "same" && shippingDetails) {
        const updatedBillingDetails = {
          ...billingDetails,
          firstName: shippingDetails.firstName,
          lastName: shippingDetails.lastName,
          address: shippingDetails.address,
          district: shippingDetails.district,
          location: shippingDetails.location,
        };
        onNext(updatedBillingDetails);
      } else {
        onNext(billingDetails);
      }
    }
  };

  const handleInputChange = (field: keyof BillingDetails, value: string) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBillingTypeChange = (type: "same" | "different") => {
    setBillingDetails((prev) => ({ ...prev, billingType: type }));
    // Clear errors when switching billing type
    setErrors({});
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
          Billing Information
        </h3>
        <p className="text-text-secondary">
          Please provide your billing details for this order.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Billing Type Selection */}
        <div className="bg-surface-secondary rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-4">
            Billing Address
          </h4>
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-border-primary rounded-lg cursor-pointer hover:border-brand/50 transition-colors">
              <input
                type="radio"
                name="billingType"
                value="same"
                checked={billingDetails.billingType === "same"}
                onChange={() => handleBillingTypeChange("same")}
                className="mr-3 text-brand focus:ring-brand"
              />
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-brand" />
                <div>
                  <div className="font-medium text-text-primary">
                    Same as shipping address
                  </div>
                  <div className="text-sm text-text-secondary">
                    Use the delivery address for billing
                  </div>
                </div>
              </div>
            </label>

            <label className="flex items-center p-3 border border-border-primary rounded-lg cursor-pointer hover:border-brand/50 transition-colors">
              <input
                type="radio"
                name="billingType"
                value="different"
                checked={billingDetails.billingType === "different"}
                onChange={() => handleBillingTypeChange("different")}
                className="mr-3 text-brand focus:ring-brand"
              />
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-brand" />
                <div>
                  <div className="font-medium text-text-primary">
                    Different billing address
                  </div>
                  <div className="text-sm text-text-secondary">
                    Enter a different address for billing
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Billing Address Form - Only show if different billing */}
        {billingDetails.billingType === "different" && (
          <div className="bg-surface-secondary rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-text-primary mb-4">
              Billing Address Details
            </h4>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={billingDetails.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.firstName
                      ? "border-red-300"
                      : "border-border-primary"
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={billingDetails.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.lastName ? "border-red-300" : "border-border-primary"
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company (Optional)
              </label>
              <input
                type="text"
                value={billingDetails.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Street Address *
              </label>
              <input
                type="text"
                value={billingDetails.address}
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

            {/* District and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  District *
                </label>
                <select
                  value={billingDetails.district}
                  onChange={(e) =>
                    handleInputChange("district", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.district ? "border-red-300" : "border-border-primary"
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
                  <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={billingDetails.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent ${
                    errors.location ? "border-red-300" : "border-border-primary"
                  }`}
                  placeholder="e.g., Kimihurura, Remera, etc."
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Country
              </label>
              <select
                value={billingDetails.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Tax ID */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tax ID / VAT Number (Optional)
              </label>
              <input
                type="text"
                value={billingDetails.taxId}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
                className="w-full px-3 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                placeholder="Enter tax ID or VAT number"
              />
            </div>
          </div>
        )}

        {/* Summary of billing choice */}
        {billingDetails.billingType === "same" && shippingDetails && (
          <div className="bg-brand/5 border border-brand/20 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-brand" />
              <h4 className="font-medium text-text-primary">Billing Address</h4>
            </div>
            <p className="text-sm text-text-secondary">
              {shippingDetails.firstName} {shippingDetails.lastName}
              <br />
              {shippingDetails.address}
              <br />
              {shippingDetails.district}, {shippingDetails.location}
            </p>
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
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingStep;
