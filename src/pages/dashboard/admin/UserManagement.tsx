import { useState } from "react";
import { useAdminDashboard } from "./context";
import { Users, Building2, Mail, Calendar, Shield, Search, Filter, Eye, Edit, Trash2, MoreHorizontal, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export default function UserManagement() {
  const { users, businesses, updateUserStatus } = useAdminDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [businessFilter, setBusinessFilter] = useState("all");

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesBusiness = businessFilter === "all" || user.businessId === businessFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesBusiness;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Owner": return "bg-purple-100 text-purple-800";
      case "Manager": return "bg-blue-100 text-blue-800";
      case "Waiter": return "bg-green-100 text-green-800";
      case "Accountant": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getBusinessName = (businessId: string) => {
    const business = businesses.find(b => b.id === businessId);
    return business ? business.name : "Unknown Business";
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
        <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
        <p className="text-text-secondary">
          Manage users across all business accounts
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Users</p>
              <p className="text-2xl font-bold text-text-primary">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Active Users</p>
              <p className="text-2xl font-bold text-text-primary">
                {users.filter(u => u.status === "active").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Business Owners</p>
              <p className="text-2xl font-bold text-text-primary">
                {users.filter(u => u.role === "Owner").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Recently Active</p>
              <p className="text-2xl font-bold text-text-primary">
                {users.filter(u => {
                  const lastLogin = new Date(u.lastLogin);
                  const now = new Date();
                  const diffHours = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);
                  return diffHours < 24;
                }).length}
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
                placeholder="Search users by name or email..."
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
            </select>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="Owner">Owner</option>
              <option value="Manager">Manager</option>
              <option value="Waiter">Waiter</option>
              <option value="Accountant">Accountant</option>
            </select>

            <select
              value={businessFilter}
              onChange={(e) => setBusinessFilter(e.target.value)}
              className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Businesses</option>
              {businesses.map(business => (
                <option key={business.id} value={business.id}>{business.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-surface-card rounded-lg border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary border-b border-border-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Last Login
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-secondary/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-brand">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">{user.name}</div>
                        <div className="text-sm text-text-secondary">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-text-secondary" />
                      <span className="text-sm text-text-primary">{getBusinessName(user.businessId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <span>{getTimeAgo(user.lastLogin)}</span>
                      {new Date(user.lastLogin) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {formatDate(user.createdAt)}
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
                      <button className="p-1 text-text-secondary hover:text-text-primary transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
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
