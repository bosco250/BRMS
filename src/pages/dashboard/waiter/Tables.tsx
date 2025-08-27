import { useState } from "react";
import { useWaiterDashboard } from "./context";
import { Table, Users, Clock, MapPin, CheckCircle, AlertTriangle, Coffee, Utensils } from "lucide-react";

export default function Tables() {
  const { waiter, tables, updateTableStatus } = useWaiterDashboard();
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter tables based on status
  const filteredTables = tables.filter(table => {
    if (statusFilter === "all") return true;
    if (statusFilter === "assigned") return table.waiterId === waiter.id;
    if (statusFilter === "available") return table.status === "available";
    return table.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "occupied": return "bg-blue-100 text-blue-800";
      case "reserved": return "bg-yellow-100 text-yellow-800";
      case "cleaning": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleAssignTable = (tableId: string) => {
    updateTableStatus(tableId, "occupied");
  };

  const handleReleaseTable = (tableId: string) => {
    updateTableStatus(tableId, "available");
  };

  const handleViewDetails = (tableId: string) => {
    // This function is no longer used for orders, but kept for potential future use or if other details are added.
    // For now, it's a placeholder.
    console.log("Viewing details for table:", tableId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Table Management</h1>
        <p className="text-text-secondary">
          Manage your assigned tables and monitor their status
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Table className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {tables.filter(t => t.waiterId === waiter.id).length}
              </p>
              <p className="text-xs text-text-secondary">Assigned Tables</p>
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {tables.filter(t => t.status === "occupied" && t.waiterId === waiter.id).length}
              </p>
              <p className="text-xs text-text-secondary">Active Tables</p>
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                0
              </p>
              <p className="text-xs text-text-secondary">Ready Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {tables
                  .filter(t => t.status === "occupied" && t.waiterId === waiter.id)
                  .reduce((sum, t) => sum + (t.customerCount || 0), 0)}
              </p>
              <p className="text-xs text-text-secondary">Total Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-text-primary">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
          >
            <option value="all">All Tables</option>
            <option value="assigned">My Assigned Tables</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="cleaning">Cleaning</option>
          </select>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTables.map((table) => {
          const isAssigned = table.waiterId === waiter.id;
          
          return (
            <div
              key={table.id}
              className={`bg-dashboard p-6 rounded-lg border border-border-primary ${
                isAssigned ? "ring-2 ring-brand/20" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Table {table.number}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Capacity: {table.capacity} people
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    table.status
                  )}`}
                >
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Status:</span>
                  <span className="font-medium text-text-primary">
                    {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                  </span>
                </div>
                
                {table.customerCount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Customers:</span>
                    <span className="font-medium text-text-primary">
                      {table.customerCount}
                    </span>
                  </div>
                )}
                
                {table.lastActivity && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Last Activity:</span>
                    <span className="font-medium text-text-primary">
                      {getTimeAgo(table.lastActivity)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {table.status === "available" && !isAssigned && (
                  <button
                    onClick={() => handleAssignTable(table.id)}
                    className="flex-1 bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors"
                  >
                    Assign to Me
                  </button>
                )}
                
                {isAssigned && table.status === "occupied" && (
                  <button
                    onClick={() => handleReleaseTable(table.id)}
                    className="flex-1 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
                  >
                    Release Table
                  </button>
                )}
                
                {isAssigned && (
                  <button
                    onClick={() => handleViewDetails(table.id)}
                    className="flex-1 bg-surface-secondary text-text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-primary transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTables.length === 0 && (
        <div className="text-center py-12">
          <Table className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-secondary mb-2">No tables found</h3>
          <p className="text-text-muted">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
}
