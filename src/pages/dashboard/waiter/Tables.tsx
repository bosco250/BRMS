import { useState } from "react";
import { useWaiterDashboard } from "./context";
import {
  Table,
  Users,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Coffee,
  Utensils,
  Plus,
  Eye,
  Edit,
  Trash2,
  Bell,
  Phone,
  Calendar,
  Star,
  DollarSign,
  ShoppingCart,
  ChefHat,
  RefreshCw,
  X,
  Save,
  Minus,
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  UserMinus,
  Timer,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import { toast } from "react-toastify";

// Table service types
type ServiceType =
  | "food"
  | "beverages"
  | "cleaning"
  | "assistance"
  | "bill"
  | "other";

interface TableService {
  id: string;
  tableId: string;
  type: ServiceType;
  description: string;
  status: "pending" | "in-progress" | "completed";
  requestedAt: string;
  completedAt?: string;
  waiterId: number;
  priority: "low" | "medium" | "high";
}

interface TableOrder {
  id: string;
  tableId: string;
  orderNumber: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    status: "pending" | "preparing" | "ready" | "served";
  }>;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "served"
    | "cancelled";
  createdAt: string;
  estimatedTime?: string;
}

export default function Tables() {
  const { waiter, tables, updateTableStatus, addNotification } =
    useWaiterDashboard();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showTableDetails, setShowTableDetails] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data for table services and orders
  const [tableServices, setTableServices] = useState<TableService[]>([]);
  const [tableOrders, setTableOrders] = useState<TableOrder[]>([]);

  // New service form
  const [newService, setNewService] = useState({
    type: "food" as ServiceType,
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  });

  // Filter tables based on status and search
  const filteredTables = tables.filter((table) => {
    const matchesSearch =
      table.number.toString().includes(searchQuery) ||
      table.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "assigned")
      return table.waiterId === waiter.id && matchesSearch;
    if (statusFilter === "available")
      return table.status === "available" && matchesSearch;
    return table.status === statusFilter && matchesSearch;
  });

  // Get service type icon
  const getServiceTypeIcon = (type: ServiceType) => {
    switch (type) {
      case "food":
        return <Utensils className="w-4 h-4" />;
      case "beverages":
        return <Coffee className="w-4 h-4" />;
      case "cleaning":
        return <Shield className="w-4 h-4" />;
      case "assistance":
        return <Bell className="w-4 h-4" />;
      case "bill":
        return <DollarSign className="w-4 h-4" />;
      default:
        return <MoreVertical className="w-4 h-4" />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get service status color
  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-blue-100 text-blue-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      case "cleaning":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Handle table assignment
  const handleAssignTable = (tableId: string) => {
    updateTableStatus(tableId, "occupied");
    toast.success("Table assigned successfully");

    addNotification({
      type: "table",
      title: "Table Assigned",
      message: `Table ${
        tables.find((t) => t.id === tableId)?.number
      } has been assigned to you`,
      actionRequired: false,
      tableId,
    });
  };

  // Handle table release
  const handleReleaseTable = (tableId: string) => {
    updateTableStatus(tableId, "available");
    toast.success("Table released successfully");
  };

  // Handle view table details
  const handleViewDetails = (table: any) => {
    setSelectedTable(table);
    setShowTableDetails(true);
  };

  // Handle add service request
  const handleAddService = (tableId: string) => {
    setSelectedTable(tables.find((t) => t.id === tableId));
    setShowServiceModal(true);
  };

  // Handle create service
  const handleCreateService = () => {
    if (!newService.description.trim()) {
      toast.error("Please enter service description");
      return;
    }

    const service: TableService = {
      id: `service-${Date.now()}`,
      tableId: selectedTable.id,
      type: newService.type,
      description: newService.description,
      status: "pending",
      requestedAt: new Date().toISOString(),
      waiterId: waiter.id,
      priority: newService.priority,
    };

    setTableServices((prev) => [service, ...prev]);

    // Reset form
    setNewService({
      type: "food",
      description: "",
      priority: "medium",
    });

    setShowServiceModal(false);
    toast.success("Service request created successfully");

    addNotification({
      type: "table",
      title: "Service Request",
      message: `New ${newService.type} service requested for Table ${selectedTable.number}`,
      actionRequired: true,
      tableId: selectedTable.id,
    });
  };

  // Handle service status update
  const handleServiceStatusUpdate = (
    serviceId: string,
    status: "pending" | "in-progress" | "completed"
  ) => {
    setTableServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              status,
              completedAt:
                status === "completed" ? new Date().toISOString() : undefined,
            }
          : service
      )
    );

    const service = tableServices.find((s) => s.id === serviceId);
    if (service) {
      toast.success(`Service ${status} successfully`);
    }
  };

  // Handle customer count update
  const handleCustomerCountUpdate = (tableId: string, count: number) => {
    // This would typically update the table data
    toast.success(`Customer count updated to ${count}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Table Management
          </h1>
          <p className="text-text-secondary">
            Manage your assigned tables and monitor their status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors border border-border-secondary"
          >
            {viewMode === "grid" ? (
              <Eye className="w-4 h-4" />
            ) : (
              <Table className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors border border-border-secondary"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
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
                {tables.filter((t) => t.waiterId === waiter.id).length}
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
                {
                  tables.filter(
                    (t) => t.status === "occupied" && t.waiterId === waiter.id
                  ).length
                }
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
              <p className="text-sm font-medium text-text-primary">0</p>
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
                  .filter(
                    (t) => t.status === "occupied" && t.waiterId === waiter.id
                  )
                  .reduce((sum, t) => sum + (t.customerCount || 0), 0)}
              </p>
              <p className="text-xs text-text-secondary">Total Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-border-primary p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
              <input
                type="text"
                placeholder="Search tables by number or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="all">All Tables</option>
              <option value="assigned">My Assigned Tables</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="cleaning">Cleaning</option>
            </select>
            <button className="px-3 py-2 border border-border-secondary rounded-lg hover:bg-surface-secondary transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tables Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredTables.map((table) => {
          const isAssigned = table.waiterId === waiter.id;
          const tableServicesCount = tableServices.filter(
            (s) => s.tableId === table.id
          ).length;
          const pendingServices = tableServices.filter(
            (s) => s.tableId === table.id && s.status === "pending"
          ).length;
          const tableOrdersCount = tableOrders.filter(
            (o) => o.tableId === table.id
          ).length;

          if (viewMode === "list") {
            return (
              <div
                key={table.id}
                className={`bg-white rounded-lg border border-border-primary p-6 hover:shadow-lg transition-shadow ${
                  isAssigned ? "ring-2 ring-brand/20" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                      <Table className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        Table {table.number}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Capacity: {table.capacity} people
                        {table.customerCount &&
                          ` • ${table.customerCount} seated`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            table.status
                          )}`}
                        >
                          {table.status.charAt(0).toUpperCase() +
                            table.status.slice(1)}
                        </span>
                        {pendingServices > 0 && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
                            {pendingServices} pending
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted">
                        {getTimeAgo(table.lastActivity)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(table)}
                        className="p-2 text-text-secondary hover:text-brand hover:bg-brand/10 rounded-lg transition-colors border border-transparent hover:border-brand/20"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAddService(table.id)}
                        className="p-2 text-text-secondary hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={table.id}
              className={`bg-white rounded-lg border border-border-primary p-6 hover:shadow-lg transition-shadow ${
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
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      table.status
                    )}`}
                  >
                    {table.status.charAt(0).toUpperCase() +
                      table.status.slice(1)}
                  </span>
                  {pendingServices > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
                      {pendingServices} pending
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Status:</span>
                  <span className="font-medium text-text-primary">
                    {table.status.charAt(0).toUpperCase() +
                      table.status.slice(1)}
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

                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Services:</span>
                  <span className="font-medium text-text-primary">
                    {tableServicesCount} total
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Orders:</span>
                  <span className="font-medium text-text-primary">
                    {tableOrdersCount}
                  </span>
                </div>

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
                    className="flex-1 bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors border border-brand-dark"
                  >
                    Assign to Me
                  </button>
                )}

                {isAssigned && table.status === "occupied" && (
                  <button
                    onClick={() => handleReleaseTable(table.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors border border-red-700"
                  >
                    Release Table
                  </button>
                )}

                {isAssigned && (
                  <>
                    <button
                      onClick={() => handleViewDetails(table)}
                      className="flex-1 bg-surface-secondary text-text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-primary transition-colors border border-border-secondary"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddService(table.id)}
                      className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors border border-green-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTables.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-border-primary">
          <Table className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-secondary mb-2">
            No tables found
          </h3>
          <p className="text-text-muted">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}

      {/* Service Request Modal */}
      {showServiceModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="sticky top-0 bg-white border-b border-border-primary p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                Add Service Request - Table {selectedTable.number}
              </h2>
              <button
                onClick={() => setShowServiceModal(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Service Type
                </label>
                <select
                  value={newService.type}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      type: e.target.value as ServiceType,
                    }))
                  }
                  className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  <option value="food">Food Service</option>
                  <option value="beverages">Beverages</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="assistance">Customer Assistance</option>
                  <option value="bill">Bill Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Priority
                </label>
                <select
                  value={newService.priority}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      priority: e.target.value as "low" | "medium" | "high",
                    }))
                  }
                  className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description *
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20"
                  rows={3}
                  placeholder="Describe the service request..."
                />
              </div>

              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors border border-border-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateService}
                  className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2 border border-brand-dark"
                >
                  <Save className="w-4 h-4" />
                  Create Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Details Modal */}
      {showTableDetails && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border-primary p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">
                Table {selectedTable.number} Details
              </h2>
              <button
                onClick={() => setShowTableDetails(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Table Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-secondary rounded-lg p-4 border border-border-secondary">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Table Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Table Number:</span>
                      <span className="font-medium text-text-primary">
                        {selectedTable.number}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Capacity:</span>
                      <span className="font-medium text-text-primary">
                        {selectedTable.capacity} people
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedTable.status
                        )}`}
                      >
                        {selectedTable.status.charAt(0).toUpperCase() +
                          selectedTable.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">
                        Last Activity:
                      </span>
                      <span className="font-medium text-text-primary">
                        {getTimeAgo(selectedTable.lastActivity)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-secondary rounded-lg p-4 border border-border-secondary">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddService(selectedTable.id)}
                      className="w-full flex items-center gap-2 p-2 text-left hover:bg-surface-primary rounded-lg transition-colors border border-transparent hover:border-border-secondary"
                    >
                      <Plus className="w-4 h-4 text-green-600" />
                      <span>Add Service Request</span>
                    </button>
                    <button
                      onClick={() =>
                        handleCustomerCountUpdate(selectedTable.id, 1)
                      }
                      className="w-full flex items-center gap-2 p-2 text-left hover:bg-surface-primary rounded-lg transition-colors border border-transparent hover:border-border-secondary"
                    >
                      <UserPlus className="w-4 h-4 text-blue-600" />
                      <span>Update Customer Count</span>
                    </button>
                    <button
                      onClick={() => handleAssignTable(selectedTable.id)}
                      className="w-full flex items-center gap-2 p-2 text-left hover:bg-surface-primary rounded-lg transition-colors border border-transparent hover:border-border-secondary"
                    >
                      <Table className="w-4 h-4 text-brand" />
                      <span>Assign to Me</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Service Requests
                </h3>
                {tableServices.filter((s) => s.tableId === selectedTable.id)
                  .length === 0 ? (
                  <div className="text-center py-8 bg-surface-secondary rounded-lg border border-border-secondary">
                    <Bell className="w-12 h-12 text-text-muted mx-auto mb-2" />
                    <p className="text-text-secondary">
                      No service requests for this table
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tableServices
                      .filter((s) => s.tableId === selectedTable.id)
                      .map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary"
                        >
                          <div className="flex items-center gap-3">
                            {getServiceTypeIcon(service.type)}
                            <div>
                              <p className="font-medium text-text-primary">
                                {service.description}
                              </p>
                              <p className="text-sm text-text-secondary">
                                {service.type} •{" "}
                                {getTimeAgo(service.requestedAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                                service.priority
                              )}`}
                            >
                              {service.priority}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getServiceStatusColor(
                                service.status
                              )}`}
                            >
                              {service.status}
                            </span>
                            {service.status === "pending" && (
                              <button
                                onClick={() =>
                                  handleServiceStatusUpdate(
                                    service.id,
                                    "in-progress"
                                  )
                                }
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium hover:bg-blue-200 transition-colors border border-blue-200"
                              >
                                Start
                              </button>
                            )}
                            {service.status === "in-progress" && (
                              <button
                                onClick={() =>
                                  handleServiceStatusUpdate(
                                    service.id,
                                    "completed"
                                  )
                                }
                                className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium hover:bg-green-200 transition-colors border border-green-200"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Orders */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Recent Orders
                </h3>
                {tableOrders.filter((o) => o.tableId === selectedTable.id)
                  .length === 0 ? (
                  <div className="text-center py-8 bg-surface-secondary rounded-lg border border-border-secondary">
                    <ShoppingCart className="w-12 h-12 text-text-muted mx-auto mb-2" />
                    <p className="text-text-secondary">
                      No orders for this table
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tableOrders
                      .filter((o) => o.tableId === selectedTable.id)
                      .slice(0, 5)
                      .map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary"
                        >
                          <div>
                            <p className="font-medium text-text-primary">
                              {order.orderNumber}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {order.items.length} items •{" "}
                              {formatCurrency(order.total)}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getServiceStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
