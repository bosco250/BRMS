import React, { useState } from "react";
import { useManagerDashboard } from "./context";
import {
  Package,
  Users,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  Download,
  Upload,
  BarChart3,
  Calendar,
  DollarSign,
  Activity,
  Zap,
  Target,
  AlertCircle,
  CheckSquare,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  RotateCcw,
} from "lucide-react";

export default function DailyOperations() {
  const { staff, inventory, notifications } = useManagerDashboard();
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for daily operations
  const lowStockItems = inventory.filter(
    (item) => item.currentStock <= item.minStock
  );
  const recentDeliveries = [
    {
      id: "DEL-001",
      supplier: "Fresh Foods Ltd",
      items: 15,
      totalValue: 125000,
      status: "received",
      timestamp: "2024-01-15T09:30:00Z",
      deliveryItems: [
        { name: "Tomatoes", quantity: 50, unit: "kg", price: 2000 },
        { name: "Onions", quantity: 30, unit: "kg", price: 1500 },
        { name: "Lettuce", quantity: 20, unit: "heads", price: 800 },
      ],
    },
    {
      id: "DEL-002",
      supplier: "Beverage Co",
      items: 8,
      totalValue: 85000,
      status: "pending",
      timestamp: "2024-01-15T14:00:00Z",
      deliveryItems: [
        { name: "Coca Cola", quantity: 24, unit: "bottles", price: 1200 },
        { name: "Orange Juice", quantity: 12, unit: "bottles", price: 2500 },
      ],
    },
  ];

  const staffPerformance = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Waiter",
      ordersServed: 24,
      totalSales: 125000,
      rating: 4.8,
      status: "active",
      shiftStart: "08:00",
      shiftEnd: "16:00",
      efficiency: 92,
    },
    {
      id: 2,
      name: "Mike Wilson",
      role: "Waiter",
      ordersServed: 18,
      totalSales: 98000,
      rating: 4.6,
      status: "active",
      shiftStart: "12:00",
      shiftEnd: "20:00",
      efficiency: 88,
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Cashier",
      ordersServed: 32,
      totalSales: 156000,
      rating: 4.9,
      status: "break",
      shiftStart: "10:00",
      shiftEnd: "18:00",
      efficiency: 95,
    },
  ];

  const orderFlow = [
    {
      id: "ORD-001",
      table: 5,
      items: 3,
      total: 45000,
      status: "preparing",
      timeElapsed: "12m",
      assignedTo: "Sarah Johnson",
      priority: "normal",
    },
    {
      id: "ORD-002",
      table: 2,
      items: 2,
      total: 28000,
      status: "ready",
      timeElapsed: "8m",
      assignedTo: "Mike Wilson",
      priority: "high",
    },
    {
      id: "ORD-003",
      table: 7,
      items: 4,
      total: 62000,
      status: "served",
      timeElapsed: "15m",
      assignedTo: "Emma Davis",
      priority: "normal",
    },
  ];

  const customerComplaints = [
    {
      id: "COMP-001",
      customer: "John Smith",
      table: 3,
      issue: "Cold food",
      severity: "medium",
      status: "resolved",
      timestamp: "2024-01-15T13:30:00Z",
      resolution: "Reheated food and offered complimentary dessert",
    },
    {
      id: "COMP-002",
      customer: "Jane Doe",
      table: 8,
      issue: "Slow service",
      severity: "low",
      status: "pending",
      timestamp: "2024-01-15T14:15:00Z",
      resolution: null,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "break":
        return "bg-yellow-100 text-yellow-800";
      case "off":
        return "bg-gray-100 text-gray-800";
      case "received":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "served":
        return "bg-gray-100 text-gray-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Daily Operations
          </h1>
          <p className="text-text-secondary">
            Manage daily restaurant operations and monitor performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600">
                {lowStockItems.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {lowStockItems.length > 0
              ? "Action required"
              : "All items in stock"}
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Staff</p>
              <p className="text-2xl font-bold text-green-600">
                {staffPerformance.filter((s) => s.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {staffPerformance.length} total staff members
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Orders in Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {orderFlow.filter((o) => o.status === "preparing").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {orderFlow.length} total orders today
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Pending Complaints</p>
              <p className="text-2xl font-bold text-yellow-600">
                {
                  customerComplaints.filter((c) => c.status === "pending")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {customerComplaints.length} total complaints today
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="flex space-x-8">
          {[
            { id: "inventory", label: "Inventory Control", icon: Package },
            { id: "staff", label: "Staff Oversight", icon: Users },
            { id: "orders", label: "Order Management", icon: ShoppingCart },
            { id: "complaints", label: "Customer Service", icon: AlertCircle },
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
        {/* Inventory Control */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            {/* Low Stock Alerts */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Low Stock Alerts
                </h3>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {lowStockItems.length} items
                </span>
              </div>
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-text-primary">
                          {item.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          Current: {item.currentStock} {item.unit} | Min:{" "}
                          {item.minStock} {item.unit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                        Reorder
                      </button>
                      <button className="p-1 text-text-secondary hover:text-text-primary">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Deliveries */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Recent Deliveries
                </h3>
                <button className="flex items-center gap-2 px-3 py-1 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Delivery
                </button>
              </div>
              <div className="space-y-4">
                {recentDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-text-primary">
                          {delivery.supplier}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {delivery.items.length} items •{" "}
                          {formatCurrency(delivery.totalValue)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            delivery.status
                          )}`}
                        >
                          {delivery.status}
                        </span>
                        <button className="p-1 text-text-secondary hover:text-text-primary">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {delivery.deliveryItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-text-primary">{item.name}</span>
                          <span className="text-text-secondary">
                            {item.quantity} {item.unit} •{" "}
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Staff Oversight */}
        {activeTab === "staff" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Staff Performance
                </h3>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-text-secondary" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-sm border border-border-primary rounded px-2 py-1"
                  >
                    <option value="all">All Staff</option>
                    <option value="active">Active</option>
                    <option value="break">On Break</option>
                    <option value="off">Off Duty</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                {staffPerformance
                  .filter(
                    (staff) =>
                      filterStatus === "all" || staff.status === filterStatus
                  )
                  .map((member) => (
                    <div
                      key={member.id}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-brand" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {member.name}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              member.status
                            )}`}
                          >
                            {member.status}
                          </span>
                          <div className="text-right">
                            <p className="text-sm font-medium text-text-primary">
                              {member.efficiency}%
                            </p>
                            <p className="text-xs text-text-secondary">
                              Efficiency
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-text-secondary">Orders Served</p>
                          <p className="font-medium text-text-primary">
                            {member.ordersServed}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Total Sales</p>
                          <p className="font-medium text-text-primary">
                            {formatCurrency(member.totalSales)}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Rating</p>
                          <p className="font-medium text-text-primary">
                            {member.rating}/5
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Shift</p>
                          <p className="font-medium text-text-primary">
                            {member.shiftStart} - {member.shiftEnd}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Order Management */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Order Flow
                </h3>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm border border-border-primary rounded px-3 py-1"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {orderFlow
                  .filter(
                    (order) =>
                      searchQuery === "" ||
                      order.id
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      order.table.toString().includes(searchQuery)
                  )
                  .map((order) => (
                    <div
                      key={order.id}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {order.id}
                            </p>
                            <p className="text-sm text-text-secondary">
                              Table {order.table} • {order.items} items
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                              order.priority
                            )}`}
                          >
                            {order.priority}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <p className="text-text-secondary">Total</p>
                            <p className="font-medium text-text-primary">
                              {formatCurrency(order.total)}
                            </p>
                          </div>
                          <div>
                            <p className="text-text-secondary">Time</p>
                            <p className="font-medium text-text-primary">
                              {order.timeElapsed}
                            </p>
                          </div>
                          <div>
                            <p className="text-text-secondary">Assigned to</p>
                            <p className="font-medium text-text-primary">
                              {order.assignedTo}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Customer Service */}
        {activeTab === "complaints" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Customer Complaints
                </h3>
                <button className="flex items-center gap-2 px-3 py-1 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Complaint
                </button>
              </div>
              <div className="space-y-4">
                {customerComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-text-primary">
                          {complaint.customer}
                        </p>
                        <p className="text-sm text-text-secondary">
                          Table {complaint.table} • {complaint.issue}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(
                            complaint.severity
                          )}`}
                        >
                          {complaint.severity}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            complaint.status
                          )}`}
                        >
                          {complaint.status}
                        </span>
                      </div>
                    </div>
                    {complaint.resolution && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800">
                          <strong>Resolution:</strong> {complaint.resolution}
                        </p>
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        {new Date(complaint.timestamp).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                          Resolve
                        </button>
                        <button className="p-1 text-text-secondary hover:text-text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
