import React, { useState, useMemo } from "react";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  UserPlus,
  Phone,
  Mail,
  DollarSign,
  Star,
  Clock3,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { useOwnerDashboard } from "./context";

export default function StaffManagement() {
  const { staff, addNotification } = useOwnerDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showHireModal, setShowHireModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [editingStaff, setEditingStaff] = useState<any>(null);

  const roles = ["Manager", "Chef", "Waiter", "Bartender", "Cashier"];
  const statuses = ["active", "inactive", "on_break"];

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || member.status === statusFilter;
      const matchesRole = roleFilter === "all" || member.role === statusFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [staff, searchQuery, statusFilter, roleFilter]);

  const totalStaff = staff.length;
  const activeStaff = staff.filter((s) => s.status === "active").length;
  const totalSalary = staff.reduce((sum, s) => sum + s.salary, 0);
  const avgRating =
    staff.length > 0
      ? staff.reduce((sum, s) => sum + (s.performance?.averageRating ?? 0), 0) /
        staff.length
      : 0;

  const handleHireStaff = (formData: any) => {
    // Simulate hiring new staff
    const newStaff = {
      id: Date.now(),
      ...formData,
      status: "active" as const,
      joinDate: new Date().toISOString().split("T")[0],
      performance: {
        ordersCompleted: 0,
        averageRating: 0,
        totalHours: 0,
      },
    };

    addNotification({
      type: "staff",
      title: "New Staff Hired",
      message: `${formData.name} has been hired as ${formData.role}`,
      priority: "medium",
      actionRequired: false,
    });

    setShowHireModal(false);
  };

  const handleEditStaff = (staffMember: any) => {
    setEditingStaff(staffMember);
    setShowEditModal(true);
  };

  const handleUpdateStaff = (updatedData: any) => {
    // Simulate updating staff
    addNotification({
      type: "staff",
      title: "Staff Updated",
      message: `${updatedData.name}'s information has been updated`,
      priority: "medium",
      actionRequired: false,
    });

    setShowEditModal(false);
    setEditingStaff(null);
  };

  const handleDeleteStaff = (staffId: number) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      addNotification({
        type: "staff",
        title: "Staff Removed",
        message: "Staff member has been removed from the system",
        priority: "high",
        actionRequired: false,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "inactive":
        return "text-red-600 bg-red-100";
      case "on_break":
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
        return <XCircle className="w-4 h-4" />;
      case "on_break":
        return <Clock3 className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Staff Management
          </h1>
          <p className="text-text-secondary">
            Manage staff across all restaurant locations. Business staff
            (waiters, accountants, managers) are added by you as the business
            owner.
          </p>
        </div>
        <button
          onClick={() => setShowHireModal(true)}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Hire New Staff
        </button>
      </div>

      {/* Staff Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Staff</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalStaff}
              </p>
            </div>
            <div className="p-2 rounded-full bg-blue-100">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Staff</p>
              <p className="text-2xl font-bold text-text-primary">
                {activeStaff}
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
              <p className="text-sm text-text-secondary">Total Salary</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalSalary)}
              </p>
            </div>
            <div className="p-2 rounded-full bg-orange-100">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Avg. Rating</p>
              <p className="text-2xl font-bold text-text-primary">
                {avgRating.toFixed(1)}
              </p>
            </div>
            <div className="p-2 rounded-full bg-purple-100">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-surface-card p-4 rounded-lg border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
              <input
                type="text"
                placeholder="Search staff by name or email..."
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
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() +
                    status.slice(1).replace("_", " ")}
                </option>
              ))}
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-surface-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Staff Member
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Performance
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Salary
                </th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Join Date
                </th>
                <th className="text-right py-3 px-4 text-text-secondary font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-border hover:bg-surface-secondary"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white font-medium">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">
                          {member.name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-surface-secondary text-text-primary rounded-full text-sm">
                      {member.role}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        member.status
                      )}`}
                    >
                      {getStatusIcon(member.status)}
                      {member.status.charAt(0).toUpperCase() +
                        member.status.slice(1).replace("_", " ")}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-secondary">Orders:</span>
                        <span className="text-text-primary font-medium">
                          {member.performance?.ordersCompleted || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-text-secondary">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-text-primary font-medium">
                            {member.performance?.averageRating || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-text-primary">
                      {formatCurrency(member.salary)}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-text-secondary text-sm">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedStaff(member);
                          setShowPerformanceModal(true);
                        }}
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                        title="View Performance"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditStaff(member)}
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                        title="Edit Staff"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(member.id)}
                        className="p-1 text-text-secondary hover:text-red-500 transition-colors"
                        title="Remove Staff"
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

        {filteredStaff.length === 0 && (
          <div className="text-center py-8">
            <p className="text-text-secondary">
              No staff members found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Hire Staff Modal */}
      {showHireModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Hire New Staff
              </h3>
              <button
                onClick={() => setShowHireModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleHireStaff({
                  name: formData.get("name"),
                  role: formData.get("role"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  salary: Number(formData.get("salary")),
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Full Name
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
                  Role
                </label>
                <select
                  name="role"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Monthly Salary (RWF)
                </label>
                <input
                  type="number"
                  name="salary"
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowHireModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Hire Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && editingStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Edit Staff Member
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
                handleUpdateStaff({
                  ...editingStaff,
                  name: formData.get("name"),
                  role: formData.get("role"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  salary: Number(formData.get("salary")),
                  status: formData.get("status"),
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingStaff.name}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={editingStaff.role}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={editingStaff.status}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() +
                        status.slice(1).replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingStaff.email}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={editingStaff.phone}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Monthly Salary (RWF)
                </label>
                <input
                  type="number"
                  name="salary"
                  defaultValue={editingStaff.salary}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary hover:bg-surface-card transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Update Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Performance Modal */}
      {showPerformanceModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-card rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Performance Details - {selectedStaff.name}
              </h3>
              <button
                onClick={() => setShowPerformanceModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-text-primary">
                  Performance Metrics
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-surface-secondary rounded-lg">
                    <span className="text-text-secondary">
                      Orders Completed
                    </span>
                    <span className="text-text-primary font-medium">
                      {selectedStaff.performance?.ordersCompleted || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface-secondary rounded-lg">
                    <span className="text-text-secondary">Average Rating</span>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-text-primary font-medium">
                        {selectedStaff.performance?.averageRating || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface-secondary rounded-lg">
                    <span className="text-text-secondary">Total Hours</span>
                    <span className="text-text-primary font-medium">
                      {selectedStaff.performance?.totalHours || 0}h
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-text-primary">
                  Staff Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      {selectedStaff.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      {selectedStaff.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      Joined:{" "}
                      {new Date(selectedStaff.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">
                      Salary: {formatCurrency(selectedStaff.salary)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <button
                onClick={() => setShowPerformanceModal(false)}
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
