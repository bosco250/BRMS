import { useState } from "react";
import { useManagerDashboard } from "./context";
import {
  Search,
  Filter,
  Users,
  Clock,
  Star,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function StaffManagement() {
  const { staff } = useManagerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter staff
  const filteredStaff = staff.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "on_break": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Manager": return "bg-purple-100 text-purple-800";
      case "Chef": return "bg-orange-100 text-orange-800";
      case "Waiter": return "bg-blue-100 text-blue-800";
      case "Bartender": return "bg-indigo-100 text-indigo-800";
      case "Cashier": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Staff Management</h1>
          <p className="text-text-secondary">Monitor staff performance and manage team</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors">
          <Plus className="w-4 h-4" />
          Add Staff Member
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Staff</p>
              <p className="text-2xl font-bold text-text-primary">{staff.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Staff</p>
              <p className="text-2xl font-bold text-text-primary">
                {staff.filter(m => m.status === "active").length}
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
              <p className="text-sm text-text-secondary">On Break</p>
              <p className="text-2xl font-bold text-text-primary">
                {staff.filter(m => m.status === "on_break").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Avg Rating</p>
              <p className="text-2xl font-bold text-text-primary">
                {(staff.reduce((sum, m) => sum + m.performance.averageRating, 0) / staff.length).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
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
                placeholder="Search staff by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
              />
            </div>
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="Manager">Manager</option>
            <option value="Chef">Chef</option>
            <option value="Waiter">Waiter</option>
            <option value="Bartender">Bartender</option>
            <option value="Cashier">Cashier</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border-secondary rounded-lg focus:border-brand focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_break">On Break</option>
          </select>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-dashboard p-4 rounded-lg border border-border-primary hover:shadow-md transition-shadow">
            {/* Staff Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{member.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role}
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
                <button className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-secondary rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">Email:</span>
                <span className="text-text-primary">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">Phone:</span>
                <span className="text-text-primary">{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white p-3 rounded-lg border border-border-secondary">
              <h4 className="text-sm font-medium text-text-primary mb-2">Performance</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <p className="text-text-secondary">Orders</p>
                  <p className="font-semibold text-text-primary">{member.performance.ordersCompleted}</p>
                </div>
                <div className="text-center">
                  <p className="text-text-secondary">Rating</p>
                  <p className={`font-semibold ${getPerformanceColor(member.performance.averageRating)}`}>
                    {member.performance.averageRating}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-text-secondary">Hours</p>
                  <p className="font-semibold text-text-primary">{member.performance.totalHours}</p>
                </div>
              </div>
            </div>

            {/* Join Date */}
            <div className="mt-3 text-xs text-text-muted">
              Joined: {new Date(member.joinDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto mb-4 text-text-muted opacity-50" />
          <p className="text-lg font-medium text-text-primary">No staff members found</p>
          <p className="text-text-secondary">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
}
