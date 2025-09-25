import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  Globe,
  Users,
  Clock,
  CreditCard,
  CheckCircle,
  XCircle,
  Tag,
  Utensils,
  Calendar,
  DollarSign,
} from "lucide-react";
import type { Business } from "../../../../types/business";
import { formatCurrency } from "../../../../utils/businessUtils";

interface BusinessDetailsModalProps {
  isOpen: boolean;
  business: Business | null;
  onClose: () => void;
  onEdit: (business: Business) => void;
}

export default function BusinessDetailsModal({
  isOpen,
  business,
  onClose,
  onEdit,
}: BusinessDetailsModalProps) {
  if (!business) return null;

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
            className="bg-surface-primary rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-border-subtle/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-hover rounded-2xl flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
                  {(business as any).image ? (
                    <img
                      src={(business as any).image}
                      alt={business.name}
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      (business as any).image ? "hidden" : "flex"
                    }`}
                  >
                    {business.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    {business.name}
                  </h3>
                  <p className="text-text-secondary">
                    {(business as any).cuisine ||
                      business.type.charAt(0).toUpperCase() +
                        business.type.slice(1)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-text-primary">
                      {business.rating.toFixed(1)} / 5.0
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded-full transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-brand" />
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                    <MapPin className="w-5 h-5 text-brand" />
                    <div>
                      <p className="text-sm text-text-secondary">Address</p>
                      <p className="font-semibold text-text-primary">
                        {business.location}
                      </p>
                      {(business as any).city && (
                        <p className="text-xs text-text-muted">
                          {(business as any).city}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                    <Phone className="w-5 h-5 text-brand" />
                    <div>
                      <p className="text-sm text-text-secondary">Phone</p>
                      <p className="font-semibold text-text-primary">
                        {business.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                    <Mail className="w-5 h-5 text-brand" />
                    <div>
                      <p className="text-sm text-text-secondary">Email</p>
                      <p className="font-semibold text-text-primary">
                        {business.email}
                      </p>
                    </div>
                  </div>
                  {(business as any).website && (
                    <div className="flex items-center gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                      <Globe className="w-5 h-5 text-brand" />
                      <div>
                        <p className="text-sm text-text-secondary">Website</p>
                        <a
                          href={(business as any).website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-brand hover:underline"
                        >
                          {(business as any).website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Business Details */}
              <div>
                <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                  <Utensils className="w-5 h-5 text-brand" />
                  Business Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                    <Tag className="w-5 h-5 text-brand" />
                    <div>
                      <p className="text-sm text-text-secondary">Cuisine</p>
                      <p className="font-semibold text-text-primary">
                        {(business as any).cuisine || "Various"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                    <Users className="w-5 h-5 text-brand" />
                    <div>
                      <p className="text-sm text-text-secondary">Capacity</p>
                      <p className="font-semibold text-text-primary">
                        {(business as any).capacity || 0} people
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                    <Calendar className="w-5 h-5 text-brand" />
                    <div>
                      <p className="text-sm text-text-secondary">
                        Reservations
                      </p>
                      <div className="flex items-center gap-2">
                        {(business as any).acceptsReservations ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <p className="font-semibold text-text-primary">
                          {(business as any).acceptsReservations
                            ? "Accepted"
                            : "Not Accepted"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary/30 rounded-lg">
                    <Star className="w-5 h-5 text-brand" />
                    <div>
                      <p className="text-sm text-text-secondary">Rating</p>
                      <p className="font-semibold text-text-primary">
                        {business.rating.toFixed(1)} / 5.0
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              {(business as any).paymentMethods &&
                (business as any).paymentMethods.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                      <CreditCard className="w-5 h-5 text-brand" />
                      Payment Methods
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(business as any).paymentMethods.map(
                        (method: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-brand/10 text-brand rounded-full text-sm font-medium"
                          >
                            {method}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Amenities */}
              {(business as any).amenities &&
                (business as any).amenities.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-brand" />
                      Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(business as any).amenities.map(
                        (amenity: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium"
                          >
                            {amenity}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Tags */}
              {(business as any).tags && (business as any).tags.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-brand" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(business as any).tags.map(
                      (tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {(business as any).description && (
                <div>
                  <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-brand" />
                    Description
                  </h4>
                  <div className="p-4 bg-surface-secondary/30 rounded-lg">
                    <p className="text-text-primary leading-relaxed">
                      {(business as any).description}
                    </p>
                  </div>
                </div>
              )}

              {/* Menu Items Count */}
              <div>
                <h4 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
                  <Utensils className="w-5 h-5 text-brand" />
                  Menu
                </h4>
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-medium">
                      Menu Items
                    </span>
                    <span className="text-2xl font-bold text-purple-600">
                      {(business as any).menu?.length || 0} items
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-xl font-semibold transition-all duration-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onEdit(business);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-brand to-brand-hover text-text-inverted rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Edit Business
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
