import { useState } from "react";
import {
  Users,
  Shield,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  Download,
  Key,
  UserPlus,
  Zap,
} from "lucide-react";

export default function SystemAdministration() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Mock data for user management
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@restaurant.com",
      role: "waiter",
      status: "active",
      lastLogin: "2024-01-15T09:30:00Z",
      permissions: ["orders", "tables", "customers"],
      createdAt: "2024-01-01",
      loginCount: 45,
      lastActivity: "2024-01-15T14:30:00Z",
    },
    {
      id: 2,
      name: "Mike Wilson",
      email: "mike.wilson@restaurant.com",
      role: "waiter",
      status: "active",
      lastLogin: "2024-01-15T08:15:00Z",
      permissions: ["orders", "tables", "customers"],
      createdAt: "2024-01-05",
      loginCount: 38,
      lastActivity: "2024-01-15T13:45:00Z",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@restaurant.com",
      role: "cashier",
      status: "active",
      lastLogin: "2024-01-15T10:00:00Z",
      permissions: ["orders", "payments", "customers"],
      createdAt: "2024-01-03",
      loginCount: 52,
      lastActivity: "2024-01-15T15:20:00Z",
    },
    {
      id: 4,
      name: "John Smith",
      email: "john.smith@restaurant.com",
      role: "accountant",
      status: "inactive",
      lastLogin: "2024-01-10T16:30:00Z",
      permissions: ["reports", "financial", "inventory"],
      createdAt: "2023-12-15",
      loginCount: 28,
      lastActivity: "2024-01-10T16:30:00Z",
    },
  ];

  const roles = [
    { id: "admin", name: "Administrator", permissions: ["all"] },
    {
      id: "manager",
      name: "Manager",
      permissions: ["orders", "staff", "inventory", "reports", "customers"],
    },
    {
      id: "waiter",
      name: "Waiter",
      permissions: ["orders", "tables", "customers"],
    },
    {
      id: "cashier",
      name: "Cashier",
      permissions: ["orders", "payments", "customers"],
    },
    {
      id: "accountant",
      name: "Accountant",
      permissions: ["reports", "financial", "inventory"],
    },
  ];

  const activityLogs = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "Logged in",
      timestamp: "2024-01-15T14:30:00Z",
      ip: "192.168.1.100",
      status: "success",
      details: "Successful login from Chrome browser",
    },
    {
      id: 2,
      user: "Mike Wilson",
      action: "Updated order status",
      timestamp: "2024-01-15T14:25:00Z",
      ip: "192.168.1.101",
      status: "success",
      details: "Changed order ORD-001 status to 'served'",
    },
    {
      id: 3,
      user: "Emma Davis",
      action: "Failed login attempt",
      timestamp: "2024-01-15T14:20:00Z",
      ip: "192.168.1.102",
      status: "failed",
      details: "Invalid password entered",
    },
    {
      id: 4,
      user: "John Smith",
      action: "Generated financial report",
      timestamp: "2024-01-15T14:15:00Z",
      ip: "192.168.1.103",
      status: "success",
      details: "Exported monthly sales report",
    },
  ];

  const systemHealth = {
    status: "healthy",
    uptime: "99.9%",
    responseTime: "120ms",
    cpuUsage: 45,
    memoryUsage: 68,
    diskUsage: 32,
    databaseConnections: 12,
    activeUsers: 8,
    lastBackup: "2024-01-15T02:00:00Z",
    nextBackup: "2024-01-16T02:00:00Z",
  };

  const securityAlerts = [
    {
      id: 1,
      type: "failed_login",
      severity: "medium",
      message: "Multiple failed login attempts detected",
      timestamp: "2024-01-15T14:20:00Z",
      status: "active",
      user: "Unknown",
      ip: "192.168.1.105",
    },
    {
      id: 2,
      type: "permission_change",
      severity: "low",
      message: "User permissions modified",
      timestamp: "2024-01-15T13:45:00Z",
      status: "resolved",
      user: "Admin",
      ip: "192.168.1.100",
    },
    {
      id: 3,
      type: "data_export",
      severity: "high",
      message: "Large data export initiated",
      timestamp: "2024-01-15T12:30:00Z",
      status: "active",
      user: "John Smith",
      ip: "192.168.1.103",
    },
  ];

  const businessProfile = {
    name: "Kigali City Restaurant",
    address: "KN 4 Ave, Kigali, Rwanda",
    phone: "+250 788 123 456",
    email: "info@kigalicityrestaurant.com",
    website: "www.kigalicityrestaurant.com",
    license: "REST-2024-001",
    taxId: "TAX-123456789",
    manager: "Jean Paul Nkurunziza",
    established: "2020-01-01",
    capacity: 120,
    operatingHours: "06:00 - 22:00",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "success":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "healthy":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-600 bg-red-50";
      case "manager":
        return "text-purple-600 bg-purple-50";
      case "waiter":
        return "text-blue-600 bg-blue-50";
      case "cashier":
        return "text-green-600 bg-green-50";
      case "accountant":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            System Administration
          </h1>
          <p className="text-text-secondary">
            Manage users, security, and system settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">System Status</p>
              <p className="text-2xl font-bold text-green-600">Healthy</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            Uptime: {systemHealth.uptime}
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Users</p>
              <p className="text-2xl font-bold text-blue-600">
                {systemHealth.activeUsers}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {users.filter((u) => u.status === "active").length} total users
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Response Time</p>
              <p className="text-2xl font-bold text-purple-600">
                {systemHealth.responseTime}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            Average response time
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Security Alerts</p>
              <p className="text-2xl font-bold text-red-600">
                {securityAlerts.filter((a) => a.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {securityAlerts.length} total alerts
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="flex space-x-8">
          {[
            { id: "users", label: "User Management", icon: Users },
            { id: "security", label: "Security & Logs", icon: Shield },
            { id: "system", label: "System Health", icon: Activity },
            { id: "profile", label: "Business Profile", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* User Management */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  User Accounts
                </h3>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm border border-border-primary rounded px-3 py-1"
                  />
                  <Filter className="w-4 h-4 text-text-secondary" />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="text-sm border border-border-primary rounded px-2 py-1"
                  >
                    <option value="all">All Roles</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-2 px-3 py-1 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {users
                  .filter(
                    (user) =>
                      (searchQuery === "" ||
                        user.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        user.email
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())) &&
                      (filterRole === "all" || user.role === filterRole)
                  )
                  .map((user) => (
                    <div
                      key={user.id}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-brand" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {user.name}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getRoleColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-text-secondary">Last Login</p>
                          <p className="font-medium text-text-primary">
                            {formatDate(user.lastLogin)}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Login Count</p>
                          <p className="font-medium text-text-primary">
                            {user.loginCount}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Created</p>
                          <p className="font-medium text-text-primary">
                            {user.createdAt}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Last Activity</p>
                          <p className="font-medium text-text-primary">
                            {formatDate(user.lastActivity)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary">
                            Permissions: {user.permissions.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-text-secondary hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Key className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Security & Logs */}
        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Security Alerts */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Security Alerts
              </h3>
              <div className="space-y-3">
                {securityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {alert.message}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {alert.user} • {alert.ip} •{" "}
                            {formatDate(alert.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {alert.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        Type: {alert.type}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                          Resolve
                        </button>
                        <button className="p-1 text-text-secondary hover:text-text-primary">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Activity Logs
              </h3>
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {log.user}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {log.action}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            log.status
                          )}`}
                        >
                          {log.status}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {log.ip}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        {log.details}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {formatDate(log.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* System Health */}
        {activeTab === "system" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                System Performance
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-primary">
                      CPU Usage
                    </span>
                    <span className="text-sm text-text-secondary">
                      {systemHealth.cpuUsage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${systemHealth.cpuUsage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-primary">
                      Memory Usage
                    </span>
                    <span className="text-sm text-text-secondary">
                      {systemHealth.memoryUsage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${systemHealth.memoryUsage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-primary">
                      Disk Usage
                    </span>
                    <span className="text-sm text-text-secondary">
                      {systemHealth.diskUsage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${systemHealth.diskUsage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                System Information
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">
                      Database Connections
                    </span>
                    <span className="text-sm text-text-secondary">
                      {systemHealth.databaseConnections}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">
                      Last Backup
                    </span>
                    <span className="text-sm text-text-secondary">
                      {formatDate(systemHealth.lastBackup)}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">
                      Next Backup
                    </span>
                    <span className="text-sm text-text-secondary">
                      {formatDate(systemHealth.nextBackup)}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">
                      System Uptime
                    </span>
                    <span className="text-sm text-text-secondary">
                      {systemHealth.uptime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Profile */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      value={businessProfile.name}
                      className="w-full px-3 py-2 border border-border-primary rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={businessProfile.address}
                      className="w-full px-3 py-2 border border-border-primary rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={businessProfile.phone}
                      className="w-full px-3 py-2 border border-border-primary rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={businessProfile.email}
                      className="w-full px-3 py-2 border border-border-primary rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      value={businessProfile.website}
                      className="w-full px-3 py-2 border border-border-primary rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={businessProfile.license}
                      className="w-full px-3 py-2 border border-border-primary rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Tax ID
                    </label>
                    <input
                      type="text"
                      value={businessProfile.taxId}
                      className="w-full px-3 py-2 border border-border-primary rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Manager
                    </label>
                    <input
                      type="text"
                      value={businessProfile.manager}
                      className="w-full px-3 py-2 border border-border-primary rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button className="px-4 py-2 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
