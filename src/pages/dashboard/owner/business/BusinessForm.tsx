import React from "react";
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  Settings,
  Camera,
  Upload,
} from "lucide-react";
import type { BusinessFormData } from "../../../../types/business";

interface BusinessFormProps {
  formData: BusinessFormData;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: Partial<BusinessFormData>) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export default function BusinessForm({
  formData,
  onSubmit,
  onChange,
  isSubmitting,
  isEditing,
}: BusinessFormProps) {
  const handleInputChange = (field: keyof BusinessFormData, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Building2 className="w-5 h-5 text-brand" />
          Basic Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter business name"
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Business Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            >
              <option value="restaurant">Restaurant</option>
              <option value="bar">Bar</option>
              <option value="cafe">Cafe</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your business..."
            rows={3}
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Cuisine Type
            </label>
            <input
              type="text"
              value={formData.cuisine}
              onChange={(e) => handleInputChange("cuisine", e.target.value)}
              placeholder="e.g., Italian, Asian, African"
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Price Range
            </label>
            <select
              value={formData.priceRange}
              onChange={(e) => handleInputChange("priceRange", e.target.value)}
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            >
              <option value="$">$ - Budget Friendly</option>
              <option value="$$">$$ - Moderate</option>
              <option value="$$$">$$$ - Expensive</option>
              <option value="$$$$">$$$$ - Very Expensive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand" />
          Location Information
        </h4>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Full Address *
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Enter full address"
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              City *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Enter city"
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Location (Display)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., Kigali, Rwanda"
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Phone className="w-5 h-5 text-brand" />
          Contact Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+250 7xx xxx xxx"
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="business@example.com"
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          />
        </div>
      </div>

      {/* Operating Hours */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand" />
          Operating Hours
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Opening Time
            </label>
            <input
              type="time"
              value={formData.opensAt}
              onChange={(e) => handleInputChange("opensAt", e.target.value)}
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Closing Time
            </label>
            <input
              type="time"
              value={formData.closesAt}
              onChange={(e) => handleInputChange("closesAt", e.target.value)}
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand" />
          Business Settings
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Capacity (Seats)
            </label>
            <input
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) =>
                handleInputChange("capacity", parseInt(e.target.value) || 50)
              }
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Accepts Reservations
            </label>
            <select
              value={formData.acceptsReservations ? "yes" : "no"}
              onChange={(e) =>
                handleInputChange(
                  "acceptsReservations",
                  e.target.value === "yes"
                )
              }
              className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Business Logo */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <Camera className="w-5 h-5 text-brand" />
          Business Logo
        </h4>

        <div className="border-2 border-dashed border-border-subtle rounded-xl p-6 text-center hover:border-brand/50 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleInputChange("logo", e.target.files?.[0] || null)
            }
            className="hidden"
            id="business-logo"
          />
          <label
            htmlFor="business-logo"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            {formData.logo ? (
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-brand/20">
                <img
                  src={URL.createObjectURL(formData.logo)}
                  alt="Logo preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-surface-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-border-subtle">
                <Upload className="w-8 h-8 text-text-muted" />
              </div>
            )}
            <span className="text-sm text-text-secondary font-medium">
              {formData.logo ? "Change Logo" : "Upload Logo"}
            </span>
            <span className="text-xs text-text-muted">PNG, JPG up to 2MB</span>
          </label>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={() => {
            /* Handle cancel */
          }}
          className="flex-1 px-6 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-xl font-semibold transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-text-inverted ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-brand to-brand-hover hover:shadow-lg"
          }`}
        >
          {isSubmitting
            ? "Saving..."
            : isEditing
            ? "Update Business"
            : "Add Business"}
        </button>
      </div>
    </form>
  );
}
