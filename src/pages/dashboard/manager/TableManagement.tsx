import { useState } from "react";
import { useManagerDashboard } from "./context";
import {
  Search,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit,
  Eye,
  Plus,
  Calendar,
  MapPin,
  User,
} from "lucide-react";

export default function TableManagement() {
  const { tables, updateTableStatus } = useManagerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");

  // Filter tables
  const filteredTables = tables.filter((table) => {
    const matchesSearch =
      table.number.toString().includes(searchQuery) ||
      (table.waiter &&
        table.waiter.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" || table.status === statusFilter;

    let matchesCapacity = true;
    if (capacityFilter === "small") {
      matchesCapacity = table.capacity <= 2;
    } else if (capacityFilter === "medium") {
      matchesCapacity = table.capacity > 2 && table.capacity <= 4;
    } else if (capacityFilter === "large") {
      matchesCapacity = table.capacity > 4;
    }

    return matchesSearch && matchesStatus && matchesCapacity;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-red-100 text-red-800";
      case "reserved":
        return "bg-blue-100 text-blue-800";
      case "cleaning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity <= 2) return "bg-blue-100 text-blue-800";
    if (capacity <= 4) return "bg-green-100 text-green-800";
    return "bg-purple-100 text-purple-800";
  };

  const getCapacityLabel = (capacity: number) => {
    if (capacity <= 2) return "Small";
    if (capacity <= 4) return "Medium";
    return "Large";
  };

  const getTimeElapsed = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Calculate totals
  const totalTables = tables.length;
  const availableTables = tables.filter(
    (table) => table.status === "available"
  ).length;
  const occupiedTables = tables.filter(
    (table) => table.status === "occupied"
  ).length;
  const reservedTables = tables.filter(
    (table) => table.status === "reserved"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Table Management
          </h1>
          <p className="text-text-secondary">
            Monitor table status and manage reservations
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors">
          <Plus className="w-4 h-4" />
          Add Table
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Tables</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalTables}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Available</p>
              <p className="text-2xl font-bold text-text-primary">
                {availableTables}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Occupied</p>
              <p className="text-2xl font-bold text-text-primary">
                {occupiedTables}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Reserved</p>
              <p className="text-2xl font-bold text-text-primary">
                {reservedTables}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search tables by number or waiter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="cleaning">Cleaning</option>
          </select>

          <select
            value={capacityFilter}
            onChange={(e) => setCapacityFilter(e.target.value)}
            className="px-3 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
          >
            <option value="all">All Capacities</option>
            <option value="small">Small (≤2)</option>
            <option value="medium">Medium (3-4)</option>
            <option value="large">Large (&gt;4)</option>
          </select>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTables.map((table) => {
          return (
            <div
              key={table.id}
              className="bg-dashboard p-4 rounded-lg border border-border-primary hover:shadow-md transition-shadow"
            >
              {/* Table Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Table {table.number}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCapacityColor(
                        table.capacity
                      )}`}
                    >
                      {getCapacityLabel(table.capacity)} ({table.capacity}{" "}
                      seats)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    table.status
                  )}`}
                >
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </span>
              </div>

              {/* Current Order Info */}
              {/* Removed order reference */}

              {/* Reservation Info */}
              {table.reservationTime && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    Reservation
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1 text-blue-700">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(table.reservationTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Waiter Info */}
              {table.waiter && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-text-muted" />
                  <span className="text-text-secondary">Waiter:</span>
                  <span className="text-text-primary">{table.waiter}</span>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-text-secondary border border-border-secondary rounded-lg hover:bg-surface-secondary transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors">
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTables.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto mb-4 text-text-muted opacity-50" />
          <p className="text-lg font-medium text-text-primary">
            No tables found
          </p>
          <p className="text-text-secondary">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
}
