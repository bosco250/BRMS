import React, { useState, useMemo } from "react";
import { useOwnerDashboard } from "./context";
import {
  Building2,
  MapPin,
  Users,
  Star,
  DollarSign,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Trash2,
  MoreVertical,
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Globe,
  Calendar,
} from "lucide-react";

export default function Restaurants() {
  const { restaurants, updateRestaurantStatus, addNotification } =
    useOwnerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [editingRestaurant, setEditingRestaurant] = useState<any>(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>([]);

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || restaurant.status === statusFilter;
      const matchesType =
        typeFilter === "all" || restaurant.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [restaurants, searchQuery, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <XCircle className="w-4 h-4" />;
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "restaurant":
        return "bg-blue-100 text-blue-800";
      case "bar":
        return "bg-purple-100 text-purple-800";
      case "cafe":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate totals
  const totalRestaurants = restaurants.length;
  const activeRestaurants = restaurants.filter(
    (restaurant) => restaurant.status === "active"
  ).length;
  const totalRevenue = restaurants.reduce(
    (sum, restaurant) => sum + restaurant.revenue,
    0
  );
  const totalStaff = restaurants.reduce(
    (sum, restaurant) => sum + restaurant.staffCount,
    0
  );

  const handleAddRestaurant = (formData: any) => {
    // Simulate adding new restaurant
    const newRestaurant = {
      id: `REST-${Date.now()}`,
      ...formData,
      status: "active",
      revenue: 0,
      staffCount: 0,
      rating: 0,
      lastUpdated: new Date().toISOString(),
    };

    addNotification({
      type: "restaurant",
      title: "Restaurant Added",
      message: `${formData.name} has been added successfully`,
      priority: "medium",
      actionRequired: false,
    });

    setShowAddModal(false);
  };

  const handleEditRestaurant = (restaurant: any) => {
    setEditingRestaurant(restaurant);
    setShowEditModal(true);
  };

  const handleUpdateRestaurant = (updatedData: any) => {
    // Simulate updating restaurant
    addNotification({
      type: "restaurant",
      title: "Restaurant Updated",
      message: `${updatedData.name} has been updated successfully`,
      priority: "medium",
      actionRequired: false,
    });

    setShowEditModal(false);
    setEditingRestaurant(null);
  };

  const handleDeleteRestaurant = (restaurantId: string) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      addNotification({
        type: "restaurant",
        title: "Restaurant Deleted",
        message: "Restaurant has been removed successfully",
        priority: "high",
        actionRequired: false,
      });
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedRestaurants.length === 0) {
      addNotification({
        type: "system",
        title: "No Selection",
        message: "Please select restaurants first",
        priority: "medium",
        actionRequired: false,
      });
      return;
    }

    switch (action) {
      case "activate":
        selectedRestaurants.forEach((id) =>
          updateRestaurantStatus(id, "active")
        );
        addNotification({
          type: "restaurant",
          title: "Bulk Action",
          message: `${selectedRestaurants.length} restaurants activated`,
          priority: "medium",
          actionRequired: false,
        });
        break;
      case "deactivate":
        selectedRestaurants.forEach((id) =>
          updateRestaurantStatus(id, "inactive")
        );
        addNotification({
          type: "restaurant",
          title: "Bulk Action",
          message: `${selectedRestaurants.length} restaurants deactivated`,
          priority: "medium",
          actionRequired: false,
        });
        break;
      case "delete":
        if (
          window.confirm(
            `Are you sure you want to delete ${selectedRestaurants.length} restaurants?`
          )
        ) {
          addNotification({
            type: "restaurant",
            title: "Bulk Action",
            message: `${selectedRestaurants.length} restaurants deleted`,
            priority: "high",
            actionRequired: false,
          });
        }
        break;
    }

    setSelectedRestaurants([]);
  };

  const toggleRestaurantSelection = (restaurantId: string) => {
    setSelectedRestaurants((prev) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const selectAllRestaurants = () => {
    if (selectedRestaurants.length === filteredRestaurants.length) {
      setSelectedRestaurants([]);
    } else {
      setSelectedRestaurants(filteredRestaurants.map((r) => r.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Restaurant Management
          </h1>
          <p className="text-text-secondary">
            Manage your restaurant locations and performance
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Restaurant
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Restaurants</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalRestaurants}
              </p>
            </div>
            <div className="p-2 rounded-full bg-blue-100">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Restaurants</p>
              <p className="text-2xl font-bold text-text-primary">
                {activeRestaurants}
              </p>
            </div>
            <div className="p-2 rounded-full bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="p-2 rounded-full bg-green-100">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Staff</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalStaff}
              </p>
            </div>
            <div className="p-2 rounded-full bg-purple-100">
              <Users className="w-5 h-5 text-purple-600" />
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

          <div className="flex gap-2">
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

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
            >
              <option value="all">All Types</option>
              <option value="restaurant">Restaurant</option>
              <option value="bar">Bar</option>
              <option value="cafe">Cafe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedRestaurants.length > 0 && (
        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <span className="text-text-primary">
              {selectedRestaurants.length} restaurant(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("activate")}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction("deactivate")}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restaurants Table */}
      <div className="bg-surface-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  <input
                    type="checkbox"
                    checked={
                      selectedRestaurants.length ===
                        filteredRestaurants.length &&
                      filteredRestaurants.length > 0
                    }
                    onChange={selectAllRestaurants}
                    className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                  />
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Restaurant
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Type
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
                    <input
                      type="checkbox"
                      checked={selectedRestaurants.includes(restaurant.id)}
                      onChange={() => toggleRestaurantSelection(restaurant.id)}
                      className="w-4 h-4 text-brand border-border rounded focus:ring-brand"
                    />
                  </td>

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
                          ID: {restaurant.id}
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
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        restaurant.type
                      )}`}
                    >
                      {restaurant.type.charAt(0).toUpperCase() +
                        restaurant.type.slice(1)}
                    </span>
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
                        onClick={() => {
                          setSelectedRestaurant(restaurant);
                          setShowDetailsModal(true);
                        }}
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditRestaurant(restaurant)}
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                        title="Edit Restaurant"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRestaurant(restaurant.id)}
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

      {/* Add Restaurant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Add New Restaurant
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddRestaurant({
                  name: formData.get("name"),
                  location: formData.get("location"),
                  type: formData.get("type"),
                  phone: formData.get("phone"),
                  email: formData.get("email"),
                  website: formData.get("website"),
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Type
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="bar">Bar</option>
                  <option value="cafe">Cafe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Add Restaurant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Restaurant Modal */}
      {showEditModal && editingRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Edit Restaurant
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleUpdateRestaurant({
                  ...editingRestaurant,
                  name: formData.get("name"),
                  location: formData.get("location"),
                  type: formData.get("type"),
                  status: formData.get("status"),
                  phone: formData.get("phone"),
                  email: formData.get("email"),
                  website: formData.get("website"),
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingRestaurant.name}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingRestaurant.location}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Type
                </label>
                <select
                  name="type"
                  defaultValue={editingRestaurant.type}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="bar">Bar</option>
                  <option value="cafe">Cafe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={editingRestaurant.status}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={editingRestaurant.phone || ""}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingRestaurant.email || ""}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  defaultValue={editingRestaurant.website || ""}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Update Restaurant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restaurant Details Modal */}
      {showDetailsModal && selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Restaurant Details - {selectedRestaurant.name}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
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
                    <Building2 className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      {selectedRestaurant.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      {selectedRestaurant.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-text-secondary">Type:</span>
                    <span className="text-text-primary capitalize">
                      {selectedRestaurant.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-text-secondary">Status:</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedRestaurant.status
                      )}`}
                    >
                      {getStatusIcon(selectedRestaurant.status)}
                      {selectedRestaurant.status.charAt(0).toUpperCase() +
                        selectedRestaurant.status.slice(1)}
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
                    <span className="text-text-secondary">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-text-primary">
                        {selectedRestaurant.rating} / 5.0
                      </span>
                    </div>
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
                onClick={() => setShowDetailsModal(false)}
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
