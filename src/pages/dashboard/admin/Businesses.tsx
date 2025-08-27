import { useState } from "react";
import { useAdminDashboard } from "./context";
import { Building2, MapPin, Users, DollarSign, Calendar, Search, Filter, MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react";

export default function Businesses() {
  const { businesses, updateBusinessStatus } = useAdminDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter businesses based on search and filters
  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || business.status === statusFilter;
    const matchesType = typeFilter === "all" || business.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "suspended": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case "basic": return "bg-blue-100 text-blue-800";
      case "premium": return "bg-purple-100 text-purple-800";
      case "enterprise": return "bg-orange-100 text-orange-800";
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Business Management</h1>
        <p className="text-text-secondary">
          Manage all business accounts and their subscriptions
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Businesses</p>
              <p className="text-2xl font-bold text-text-primary">{businesses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Active</p>
              <p className="text-2xl font-bold text-text-primary">
                {businesses.filter(b => b.status === "active").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Users</p>
              <p className="text-2xl font-bold text-text-primary">
                {businesses.reduce((sum, b) => sum + b.users, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(businesses.reduce((sum, b) => sum + b.revenue, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search businesses, owners, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Fine Dining">Fine Dining</option>
              <option value="Casual Dining">Casual Dining</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Cafe">Cafe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Businesses List */}
      <div className="bg-surface-card rounded-lg border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary border-b border-border-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border-secondary">
              {filteredBusinesses.map((business) => (
                <tr key={business.id} className="hover:bg-surface-secondary/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-brand" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">{business.name}</div>
                        <div className="text-sm text-text-secondary">{business.type}</div>
                        <div className="flex items-center text-xs text-text-secondary">
                          <MapPin className="w-3 h-3 mr-1" />
                          {business.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(business.status)}`}>
                      {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(business.subscription)}`}>
                      {business.subscription.charAt(0).toUpperCase() + business.subscription.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {business.users}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {formatCurrency(business.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {formatDate(business.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-text-secondary hover:text-brand transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-text-secondary hover:text-brand transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-text-secondary hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
