import React, { useState, useMemo } from "react";
import { useOwnerDashboard } from "./context";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  RefreshCw,
  Filter,
  Search,
  Clock,
  MapPin,
  Phone,
  Mail,
  MoreVertical,
  Edit,
  Trash2,
  X,
} from "lucide-react";

export default function Dashboard() {
  const {
    owner,
    restaurants,
    financialData,
    staff,
    notifications,
    addNotification,
  } = useOwnerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);

  // Calculate totals
  const totalRevenue = restaurants.reduce(
    (sum, restaurant) => sum + restaurant.revenue,
    0
  );
  const totalStaff = staff.length;
  const averageRating =
    restaurants.reduce((sum, restaurant) => sum + restaurant.rating, 0) /
    restaurants.length;
  const activeRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "active"
  ).length;
  const urgentNotifications = notifications.filter(
    (notification) =>
      notification.priority === "urgent" || notification.priority === "high"
  ).length;

  // Filtered data
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || restaurant.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [restaurants, searchQuery, statusFilter]);

  const recentFinancialData = financialData.slice(0, 3);
  const revenueGrowth =
    recentFinancialData.length > 1
      ? ((recentFinancialData[0].revenue -
          recentFinancialData[recentFinancialData.length - 1].revenue) /
          recentFinancialData[recentFinancialData.length - 1].revenue) *
        100
      : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "inactive":
        return "text-red-600 bg-red-100";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <X className="w-4 h-4" />;
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // DEBUG: handleQuickAction should trigger navigation for some actions, not just notifications.
  // For "hire_staff", "view_reports", and "manage_finances", let's redirect to the appropriate dashboard pages.
  // We'll use window.location.hash for navigation in this SPA context.

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "add_restaurant":
        setShowQuickActions(false);
        setShowRestaurantModal(true);
        break;
      case "hire_staff":
        addNotification({
          type: "staff",
          title: "Quick Action",
          message: "Redirecting to Staff Management...",
          priority: "medium",
          actionRequired: false,
        });
        window.location.hash = "#/dashboard/owner/staff";
        break;
      case "view_reports":
        addNotification({
          type: "system",
          title: "Quick Action",
          message: "Redirecting to Reports & Analytics...",
          priority: "medium",
          actionRequired: false,
        });
        window.location.hash = "#/dashboard/owner/reports";
        break;
      case "manage_finances":
        addNotification({
          type: "financial",
          title: "Quick Action",
          message: "Redirecting to Financial Management...",
          priority: "medium",
          actionRequired: false,
        });
        window.location.hash = "#/dashboard/owner/financial";
        break;
      default:
        // Optionally handle unknown actions
        break;
    }
  };

  // DEBUG: Add missing actionRequired property to notifications to fix type error.
  const handleRestaurantAction = (restaurant: any, action: string) => {
    switch (action) {
      case "view":
        setSelectedRestaurant(restaurant);
        break;
      case "edit":
        addNotification({
          type: "restaurant",
          title: "Edit Restaurant",
          message: `Editing ${restaurant.name}...`,
          priority: "medium",
          actionRequired: false,
        });
        break;
      case "delete":
        if (
          window.confirm(`Are you sure you want to delete ${restaurant.name}?`)
        ) {
          addNotification({
            type: "restaurant",
            title: "Restaurant Deleted",
            message: `${restaurant.name} has been removed`,
            priority: "high",
            actionRequired: false,
          });
        }
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Owner Dashboard
          </h1>
          <p className="text-text-secondary">
            Welcome back, {owner.name}. Here's an overview of your business
            empire.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Quick Actions
          </button>
          <button className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions Dropdown */}
      {showQuickActions && (
        <div className="absolute right-0 top-20 bg-surface-card border border-border rounded-lg shadow-lg z-10 min-w-[200px]">
          <div className="p-2 space-y-1">
            <button
              onClick={() => handleQuickAction("add_restaurant")}
              className="w-full text-left px-3 py-2 text-text-primary hover:bg-surface-secondary rounded-md flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Add Restaurant
            </button>
            <button
              onClick={() => handleQuickAction("hire_staff")}
              className="w-full text-left px-3 py-2 text-text-primary hover:bg-surface-secondary rounded-md flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Hire Staff
            </button>
            <button
              onClick={() => handleQuickAction("view_reports")}
              className="w-full text-left px-3 py-2 text-text-primary hover:bg-surface-secondary rounded-md flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              View Reports
            </button>
            <button
              onClick={() => handleQuickAction("manage_finances")}
              className="w-full text-left px-3 py-2 text-text-primary hover:bg-surface-secondary rounded-md flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Manage Finances
            </button>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalRevenue)}
              </p>
              <p
                className={`text-sm ${
                  revenueGrowth >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {revenueGrowth >= 0 ? "+" : ""}
                {revenueGrowth.toFixed(1)}% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Restaurants</p>
              <p className="text-2xl font-bold text-text-primary">
                {restaurants.length}
              </p>
              <p className="text-xs text-text-secondary">
                {activeRestaurants} active
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Staff</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalStaff}
              </p>
              <p className="text-xs text-text-secondary">
                Across all locations
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Avg Rating</p>
              <p className="text-2xl font-bold text-text-primary">
                {averageRating.toFixed(1)}
              </p>
              <p className="text-xs text-text-secondary">
                Customer satisfaction
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface-card p-4 rounded-lg border border-border">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="bg-surface-card p-6 rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Financial Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentFinancialData.map((data) => (
            <div key={data.id} className="p-4 bg-surface-secondary rounded-lg">
              <p className="text-sm text-text-secondary">{data.month}</p>
              <p className="text-xl font-bold text-text-primary">
                {formatCurrency(data.revenue)}
              </p>
              <p className="text-sm text-text-secondary">
                Profit: {formatCurrency(data.profit)} | Orders: {data.orders}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurants Overview */}
      <div className="bg-surface-card rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">
            Restaurants Overview
          </h2>
          <p className="text-text-secondary">
            Manage your restaurant locations and monitor their performance
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Restaurant
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Revenue
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Staff
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Rating
                </th>
                <th className="text-right py-3 px-4 text-text-secondary font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants.map((restaurant) => (
                <tr
                  key={restaurant.id}
                  className="border-b border-border hover:bg-surface-secondary"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center text-white font-medium">
                        {restaurant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">
                          {restaurant.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {restaurant.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <MapPin className="w-3 h-3" />
                      {restaurant.location}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        restaurant.status
                      )}`}
                    >
                      {getStatusIcon(restaurant.status)}
                      {restaurant.status.charAt(0).toUpperCase() +
                        restaurant.status.slice(1)}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-text-primary">
                      {formatCurrency(restaurant.revenue)}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-text-primary">
                      {restaurant.staffCount}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-text-primary">
                        {restaurant.rating}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          handleRestaurantAction(restaurant, "view")
                        }
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleRestaurantAction(restaurant, "edit")
                        }
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                        title="Edit Restaurant"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleRestaurantAction(restaurant, "delete")
                        }
                        className="p-1 text-text-secondary hover:text-red-500 transition-colors"
                        title="Delete Restaurant"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-8">
            <p className="text-text-secondary">
              No restaurants found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Recent Notifications */}
      <div className="bg-surface-card p-6 rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Recent Notifications
        </h2>
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  notification.priority === "urgent"
                    ? "bg-red-500"
                    : notification.priority === "high"
                    ? "bg-orange-500"
                    : notification.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              />
              <div className="flex-1">
                <p className="font-medium text-text-primary">
                  {notification.title}
                </p>
                <p className="text-sm text-text-secondary">
                  {notification.message}
                </p>
              </div>
              <span className="text-xs text-text-secondary">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant Details Modal */}
      {showRestaurantModal && selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Restaurant Details - {selectedRestaurant.name}
              </h3>
              <button
                onClick={() => setShowRestaurantModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-text-primary">
                  Basic Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      {selectedRestaurant.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      {selectedRestaurant.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      {selectedRestaurant.rating} / 5.0
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-text-primary">
                  Performance Metrics
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-surface-secondary rounded-lg">
                    <span className="text-text-secondary">Revenue</span>
                    <span className="font-medium text-text-primary">
                      {formatCurrency(selectedRestaurant.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface-secondary rounded-lg">
                    <span className="text-text-secondary">Staff Count</span>
                    <span className="font-medium text-text-primary">
                      {selectedRestaurant.staffCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface-secondary rounded-lg">
                    <span className="text-text-secondary">Last Updated</span>
                    <span className="font-medium text-text-primary">
                      {new Date(
                        selectedRestaurant.lastUpdated
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <button
                onClick={() => setShowRestaurantModal(false)}
                className="w-full px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
