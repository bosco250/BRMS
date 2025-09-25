import { motion } from "framer-motion";
import { MapPin, Users, Star, Eye, Edit, Trash2 } from "lucide-react";
import type { Business } from "../../../../types/business";
import {
  getStatusColor,
  getStatusIcon,
  getTypeColor,
} from "../../../../utils/businessUtils";

interface BusinessTableProps {
  businesses: Business[];
  selectedBusinesses: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectBusiness: (businessId: string, checked: boolean) => void;
  onViewDetails: (business: Business) => void;
  onEditBusiness: (business: Business) => void;
  onDeleteBusiness: (businessId: string) => void;
}

export default function BusinessTable({
  businesses,
  selectedBusinesses,
  onSelectAll,
  onSelectBusiness,
  onViewDetails,
  onEditBusiness,
  onDeleteBusiness,
}: BusinessTableProps) {
  return (
    <div className="bg-surface-primary rounded-xl border border-border-subtle overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-secondary/50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedBusinesses.length === businesses.length &&
                    businesses.length > 0
                  }
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-brand rounded border-border-subtle focus:ring-brand/30"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Business Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Cuisine
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Capacity
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {businesses.map((business) => (
              <motion.tr
                key={String(business.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-surface-secondary/30 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedBusinesses.includes(String(business.id))}
                    onChange={(e) =>
                      onSelectBusiness(String(business.id), e.target.checked)
                    }
                    className="w-4 h-4 text-brand rounded border-border-subtle focus:ring-brand/30"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-hover rounded-lg flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      {(business as any).image ? (
                        <img
                          src={(business as any).image}
                          alt={business.name}
                          className="w-full h-full object-cover rounded-lg"
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
                    <div className="flex-1">
                      <div className="font-bold text-lg text-text-primary mb-1">
                        {business.name}
                      </div>
                      <div className="text-sm text-text-muted">
                        {(business as any).cuisine || "Restaurant"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4 text-brand" />
                    <div>
                      <div className="font-medium">{business.location}</div>
                      {(business as any).city && (
                        <div className="text-xs text-text-muted">
                          {(business as any).city}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(
                      business.type
                    )}`}
                  >
                    {business.type.charAt(0).toUpperCase() +
                      business.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      business.status
                    )}`}
                  >
                    {getStatusIcon(business.status)}
                    {business.status.charAt(0).toUpperCase() +
                      business.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-text-secondary">
                    {(business as any).cuisine || "Various"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-text-primary">
                      {business.rating.toFixed(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">
                      {(business as any).capacity || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewDetails(business)}
                      className="p-2 text-text-secondary hover:text-brand hover:bg-brand/10 rounded-lg transition-all duration-200 group"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={() => onEditBusiness(business)}
                      className="p-2 text-text-secondary hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-all duration-200 group"
                      title="Edit Business"
                    >
                      <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={() => onDeleteBusiness(business.id)}
                      className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                      title="Delete Business"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
