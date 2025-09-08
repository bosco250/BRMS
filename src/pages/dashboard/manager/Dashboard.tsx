import { useManagerDashboard } from "./context";
import { Link } from "react-router-dom";
import {
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  Database,
  BarChart3,
  Settings,
  ShoppingCart,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const { staff, tables, inventory, notifications } = useManagerDashboard();

  // Calculate metrics
  const activeStaff = staff.filter(
    (member) => member.status === "active"
  ).length;
  const availableTables = tables.filter(
    (table) => table.status === "available"
  ).length;
  const lowStockItems = inventory.filter(
    (item) => item.currentStock <= item.minStock
  ).length;
  const unreadNotifications = notifications.filter(
    (notif) => !notif.read
  ).length;

  const quickActions = [
    {
      title: "Daily Operations",
      description: "Manage daily operations and staff",
      icon: Activity,
      link: "/dashboard/manager/daily-operations",
      color: "bg-blue-500",
    },
    {
      title: "Financial Monitoring",
      description: "Track sales and costs",
      icon: DollarSign,
      link: "/dashboard/manager/financial-monitoring",
      color: "bg-green-500",
    },
    {
      title: "Order Management",
      description: "Manage orders and payments",
      icon: ShoppingCart,
      link: "/dashboard/manager/orders",
      color: "bg-purple-500",
    },
    {
      title: "Settings",
      description: "Configure system settings",
      icon: Settings,
      link: "/dashboard/manager/settings",
      color: "bg-red-500",
    },
    {
      title: "Table Management",
      description: "View table status",
      icon: Users,
      link: "/dashboard/manager/tables",
      color: "bg-orange-500",
    },
    {
      title: "Staff Overview",
      description: "Monitor staff performance",
      icon: Users,
      link: "/dashboard/manager/staff",
      color: "bg-indigo-500",
    },
    {
      title: "Inventory Check",
      description: "Check stock levels",
      icon: Database,
      link: "/dashboard/manager/inventory",
      color: "bg-yellow-500",
    },
    {
      title: "Reports",
      description: "View analytics",
      icon: BarChart3,
      link: "/dashboard/manager/reports",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">
          Manager Dashboard
        </h1>
        <p className="text-text-secondary">
          Monitor operations and manage your restaurant
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Orders</p>
              <p className="text-2xl font-bold text-text-primary">0</p>{" "}
              {/* Placeholder */}
            </div>
            {/* Removed ShoppingCart icon */}
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {/* Removed order status */}
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Today's Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                ${0.0}
              </p>{" "}
              {/* Placeholder */}
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            +12.5% from yesterday
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Staff</p>
              <p className="text-2xl font-bold text-text-primary">
                {activeStaff}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {staff.length} total staff members
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Available Tables</p>
              <p className="text-2xl font-bold text-text-primary">
                {availableTables}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            {tables.length} total tables
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="p-4 bg-white rounded-lg border border-border-secondary hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    {action.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts & Notifications */}
        <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Alerts & Notifications
          </h2>
          <div className="space-y-3">
            {lowStockItems > 0 && (
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Low Stock Alert</p>
                  <p className="text-sm text-red-600">
                    {lowStockItems} items need restocking
                  </p>
                </div>
              </div>
            )}

            {unreadNotifications > 0 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">New Notifications</p>
                  <p className="text-sm text-blue-600">
                    {unreadNotifications} unread messages
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Settings className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">System Status</p>
                <p className="text-sm text-gray-600">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
