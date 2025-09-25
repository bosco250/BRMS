import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import type { MenuFormData, Business } from "../../../../types/business";
import MenuForm from "./MenuForm";

interface MenuModalProps {
  isOpen: boolean;
  formData: MenuFormData;
  businesses: Business[];
  selectedRestaurant: Business | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: Partial<MenuFormData>) => void;
  onRestaurantChange: (restaurant: Business | null) => void;
  onClose: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export default function MenuModal({
  isOpen,
  formData,
  businesses,
  selectedRestaurant,
  onSubmit,
  onChange,
  onRestaurantChange,
  onClose,
  isSubmitting,
  isEditing,
}: MenuModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-surface-primary rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-xl">
                  <Menu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    {isEditing ? "Edit Menu Item" : "Add New Menu Item"}
                  </h3>
                  <p className="text-text-secondary">
                    {isEditing
                      ? "Update menu item information"
                      : "Create a new menu item"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <MenuForm
              formData={formData}
              businesses={businesses}
              selectedRestaurant={selectedRestaurant}
              onSubmit={onSubmit}
              onChange={onChange}
              onRestaurantChange={onRestaurantChange}
              isSubmitting={isSubmitting}
              isEditing={isEditing}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
