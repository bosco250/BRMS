import { useState } from "react";
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
} from "lucide-react";

export default function Restaurants() {
  const { restaurants, updateRestaurantStatus } = useOwnerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || restaurant.status === statusFilter;
    const matchesType = typeFilter === "all" || restaurant.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "restaurant": return "bg-blue-100 text-blue-800";
      case "bar": return "bg-purple-100 text-purple-800";
      case "cafe": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate totals
  const totalRestaurants = restaurants.length;
  const activeRestaurants = restaurants.filter(restaurant => restaurant.status === "active").length;
  const totalRevenue = restaurants.reduce((sum, restaurant) => sum + restaurant.revenue, 0);
  const totalStaff = restaurants.reduce((sum, restaurant) => sum + restaurant.staffCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Restaurant Management</h1>
          <p className="text-text-secondary">Manage your restaurant locations and performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors">
          <Plus className="w-4 h-4" />
          Add Restaurant
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Restaurants</p>
              <p className="text-2xl font-bold text-text-primary">{totalRestaurants}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active</p>
              <p className="text-2xl font-bold text-text-primary">{activeRestaurants}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Staff</p>
              <p className="text-2xl font-bold text-text-primary">{totalStaff}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
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
                placeholder="Search restaurants by name or location..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="restaurant">Restaurant</option>
            <option value="bar">Bar</option>
            <option value="cafe">Cafe</option>
          </select>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-dashboard p-6 rounded-lg border border-border-primary hover:shadow-md transition-shadow">
            {/* Restaurant Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{restaurant.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4" />
                    {restaurant.location}
                  </div>
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

            {/* Status and Type */}
            <div className="flex gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(restaurant.status)}`}>
                {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(restaurant.type)}`}>
                {restaurant.type.charAt(0).toUpperCase() + restaurant.type.slice(1)}
              </span>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Revenue</span>
                <span className="text-lg font-semibold text-text-primary">{formatCurrency(restaurant.revenue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Staff</span>
                <span className="text-sm font-medium text-text-primary">{restaurant.staffCount} employees</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-text-primary">{restaurant.rating}/5.0</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm font-medium text-text-secondary border border-border-secondary rounded-lg hover:bg-surface-secondary transition-colors">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-text-muted opacity-50" />
          <p className="text-lg font-medium text-text-primary">No restaurants found</p>
          <p className="text-text-secondary">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
}
