import React from "react";
import { Menu, Camera } from "lucide-react";
import type { MenuFormData, Business } from "../../../../types/business";

interface MenuFormProps {
  formData: MenuFormData;
  businesses: Business[];
  selectedRestaurant: Business | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: Partial<MenuFormData>) => void;
  onRestaurantChange: (restaurant: Business | null) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export default function MenuForm({
  formData,
  businesses,
  selectedRestaurant,
  onSubmit,
  onChange,
  onRestaurantChange,
  isSubmitting,
  isEditing,
}: MenuFormProps) {
  const handleInputChange = (field: keyof MenuFormData, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Restaurant *
          </label>
          <select
            value={selectedRestaurant ? String(selectedRestaurant.id) : ""}
            onChange={(e) => {
              const selectedId = String(e.target.value);
              const business =
                businesses.find((b) => String(b.id) === selectedId) || null;
              onRestaurantChange(business);
            }}
            required
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          >
            <option value="">Select Restaurant</option>
            {businesses.map((business) => (
              <option key={String(business.id)} value={String(business.id)}>
                {business.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          >
            <option value="main">Main Course</option>
            <option value="appetizer">Appetizer</option>
            <option value="beverage">Beverage</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Item Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Price (RWF) *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            required
            min="0"
            step="100"
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Preparation Time
          </label>
          <input
            type="text"
            value={formData.preparationTime}
            onChange={(e) =>
              handleInputChange("preparationTime", e.target.value)
            }
            placeholder="e.g., 25 minutes"
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Calories
          </label>
          <input
            type="text"
            value={formData.calories}
            onChange={(e) => handleInputChange("calories", e.target.value)}
            placeholder="e.g., 320"
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Availability *
          </label>
          <select
            value={formData.availability}
            onChange={(e) => handleInputChange("availability", e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="limited">Limited</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Allergens
          </label>
          <input
            type="text"
            value={formData.allergens}
            onChange={(e) => handleInputChange("allergens", e.target.value)}
            placeholder="e.g., Fish, Nuts, Dairy"
            className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          Ingredients
        </label>
        <textarea
          value={formData.ingredients}
          onChange={(e) => handleInputChange("ingredients", e.target.value)}
          rows={3}
          placeholder="List ingredients separated by commas"
          className="w-full px-4 py-3 border-2 border-border-subtle rounded-xl bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          Menu Item Photo
        </label>
        <div className="border-2 border-dashed border-border-subtle rounded-xl p-6 text-center hover:border-brand/50 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleInputChange("photo", e.target.files?.[0] || null)
            }
            className="hidden"
            id="menu-photo"
          />
          <label
            htmlFor="menu-photo"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            {formData.photo ? (
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-brand/20">
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Menu preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-surface-secondary rounded-xl flex items-center justify-center border-2 border-dashed border-border-subtle">
                <Camera className="w-8 h-8 text-text-muted" />
              </div>
            )}
            <span className="text-sm text-text-secondary font-medium">
              {formData.photo ? "Change Photo" : "Upload Photo"}
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
          className={`flex-1 px-6 py-3 text-white rounded-xl font-semibold transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg"
          }`}
        >
          {isSubmitting
            ? "Saving..."
            : isEditing
            ? "Update Menu Item"
            : "Add Menu Item"}
        </button>
      </div>
    </form>
  );
}
