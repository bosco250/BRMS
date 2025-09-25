import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2 } from "lucide-react";
import type { BusinessFormData } from "../../../../types/business";
import BusinessForm from "./BusinessForm";

interface BusinessModalProps {
  isOpen: boolean;
  formData: BusinessFormData;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: Partial<BusinessFormData>) => void;
  onClose: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export default function BusinessModal({
  isOpen,
  formData,
  onSubmit,
  onChange,
  onClose,
  isSubmitting,
  isEditing,
}: BusinessModalProps) {
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
            className="bg-surface-primary rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-brand to-brand-hover rounded-xl">
                  <Building2 className="w-6 h-6 text-text-inverted" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    {isEditing ? "Edit Business" : "Add New Business"}
                  </h3>
                  <p className="text-text-secondary">
                    {isEditing
                      ? "Update business information"
                      : "Create a new business location"}
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

            <BusinessForm
              formData={formData}
              onSubmit={onSubmit}
              onChange={onChange}
              isSubmitting={isSubmitting}
              isEditing={isEditing}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
