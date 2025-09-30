import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Star,
  Eye,
  Edit,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";
import type { Business } from "../../../../types/business";
import { getStatusColor, getStatusIcon } from "../../../../utils/businessUtils";
import { colors, getBusinessTypeColor } from "../../../../utils/colors";

interface BusinessTableProps {
  businesses: Business[];
  selectedBusinesses: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectBusiness: (businessId: string, checked: boolean) => void;
  onViewDetails: (business: Business) => void;
  onEditBusiness: (business: Business) => void;
  onDeleteBusiness: (businessId: string) => void;
  onBulkDelete?: () => void;
  onBulkExport?: () => void;
  onBulkStatusChange?: (status: "active" | "inactive" | "maintenance") => void;
}

export default function BusinessTable({
  businesses,
  selectedBusinesses,
  onSelectAll,
  onSelectBusiness,
  onViewDetails,
  onEditBusiness,
  onDeleteBusiness,
  onBulkDelete,
  onBulkExport,
  onBulkStatusChange,
}: BusinessTableProps) {
  const allSelected =
    selectedBusinesses.length === businesses.length && businesses.length > 0;
  const someSelected =
    selectedBusinesses.length > 0 &&
    selectedBusinesses.length < businesses.length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Selection Info Bar */}
      {selectedBusinesses.length > 0 && (
        <div className="bg-orange-50 border-b border-orange-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  {selectedBusinesses.length} business
                  {selectedBusinesses.length !== 1 ? "es" : ""} selected
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onBulkExport && (
                <button
                  onClick={onBulkExport}
                  className="px-3 py-1 text-xs font-medium text-orange-700 bg-orange-100 hover:bg-orange-200 rounded-md transition-colors"
                >
                  Export CSV
                </button>
              )}
              {onBulkStatusChange && (
                <div className="relative group">
                  <button className="px-3 py-1 text-xs font-medium text-orange-700 bg-orange-100 hover:bg-orange-200 rounded-md transition-colors">
                    Change Status
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <button
                      onClick={() => onBulkStatusChange?.("active")}
                      className="w-full px-3 py-2 text-xs text-left text-green-700 hover:bg-green-50 rounded-t-md"
                    >
                      Set Active
                    </button>
                    <button
                      onClick={() => onBulkStatusChange?.("inactive")}
                      className="w-full px-3 py-2 text-xs text-left text-gray-700 hover:bg-gray-50"
                    >
                      Set Inactive
                    </button>
                    <button
                      onClick={() => onBulkStatusChange?.("maintenance")}
                      className="w-full px-3 py-2 text-xs text-left text-yellow-700 hover:bg-yellow-50 rounded-b-md"
                    >
                      Set Maintenance
                    </button>
                  </div>
                </div>
              )}
              {onBulkDelete && (
                <button
                  onClick={onBulkDelete}
                  className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                >
                  Delete Selected
                </button>
              )}
              <button
                onClick={() => onSelectAll(false)}
                className="text-xs text-orange-600 hover:text-orange-800 font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center">
                  <button
                    onClick={() => onSelectAll(!allSelected)}
                    className="flex items-center justify-center w-5 h-5 rounded border-2 border-gray-300 hover:border-orange-500 transition-colors"
                    style={{
                      backgroundColor: allSelected
                        ? colors.brand.primary
                        : someSelected
                        ? colors.brand.light
                        : "transparent",
                      borderColor:
                        allSelected || someSelected
                          ? colors.brand.primary
                          : undefined,
                    }}
                  >
                    {allSelected && (
                      <CheckSquare className="w-3 h-3 text-white" />
                    )}
                    {someSelected && !allSelected && (
                      <Square className="w-3 h-3 text-orange-600" />
                    )}
                  </button>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Business Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Cuisine
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Capacity
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {businesses.map((business) => {
              const isSelected = selectedBusinesses.includes(
                String(business.id)
              );
              return (
                <motion.tr
                  key={String(business.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "bg-orange-50 border-l-4 border-l-orange-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        onSelectBusiness(String(business.id), !isSelected)
                      }
                      className="flex items-center justify-center w-5 h-5 rounded border-2 border-gray-300 hover:border-orange-500 transition-colors"
                      style={{
                        backgroundColor: isSelected
                          ? colors.brand.primary
                          : "transparent",
                        borderColor: isSelected
                          ? colors.brand.primary
                          : undefined,
                      }}
                    >
                      {isSelected && (
                        <CheckSquare className="w-3 h-3 text-white" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${colors.brand.primary}, ${colors.brand.hover})`,
                        }}
                      >
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
                        <div className="font-bold text-lg text-gray-900">
                          {business.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin
                        className="w-4 h-4"
                        style={{ color: colors.brand.primary }}
                      />
                      <div>
                        <div className="font-medium">{business.location}</div>
                        {(business as any).city && (
                          <div className="text-xs text-gray-500">
                            {(business as any).city}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: `${getBusinessTypeColor(
                          business.type as "restaurant" | "bar" | "cafe"
                        )}20`,
                        borderColor: getBusinessTypeColor(
                          business.type as "restaurant" | "bar" | "cafe"
                        ),
                        color: getBusinessTypeColor(
                          business.type as "restaurant" | "bar" | "cafe"
                        ),
                      }}
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
                    <div className="text-sm text-gray-600">
                      {(business as any).cuisine || "Various"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900">
                        {business.rating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
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
                        className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => onEditBusiness(business)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                        title="Edit Business"
                      >
                        <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => onDeleteBusiness(business.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                        title="Delete Business"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
