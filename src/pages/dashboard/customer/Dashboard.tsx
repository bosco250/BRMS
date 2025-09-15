import {
  Clock,
  CheckCircle,
  TrendingUp,
  Star,
  ShoppingBag,
  Receipt,
  MapPin,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCustomerDashboard } from "./context";
import {
  formatCurrency,
  getOrderTypeIcon,
} from "../../../data/customerOrderData";

export default function Dashboard() {
  const { customer, orders } = useCustomerDashboard();

  // Calculate dashboard statistics
  const totalOrders = orders.length;
  const recentOrders = orders.slice(0, 3);
  const pendingOrders = orders.filter((order) =>
    ["pending", "confirmed", "preparing", "out_for_delivery"].includes(
      order.status
    )
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  // Calculate total spent from orders
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  // Note: reservations panel removed for a simplified dashboard

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-surface-card border border-border-primary rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-text-primary">
              Welcome back, {customer.name || "Customer"}! 👋
            </h1>
            <p className="text-text-secondary">
              Track your orders, manage reservations, and explore rewards
            </p>
          </div>
          <div className="text-right">
           
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dashboard border border-border-primary rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Orders</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Spent</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalSpent)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Loyalty Points</p>
              <p className="text-2xl font-bold text-text-primary">
                {customer.loyaltyPoints}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Visits</p>
              <p className="text-2xl font-bold text-text-primary">
                {customer.totalVisits}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center border border-purple-200">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders - Moved Up */}
      <div className="bg-dashboard border border-border-primary rounded-lg">
        <div className="p-4 border-b border-border-primary">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">
              Recent Orders
            </h2>
            <Link
              to="/dashboard/customer/orders"
              className="text-brand hover:text-brand-dark text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-4">
          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg border border-border-secondary"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-surface-primary rounded-lg flex items-center justify-center">
                      {getOrderTypeIcon(order.deliveryMethod)}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">
                        {order.orderNumber}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {order.restaurantName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text-primary">
                      {formatCurrency(order.total)}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Receipt className="w-16 h-16 text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No Orders Yet
              </h3>
              <p className="text-text-secondary">
                Start ordering to see your history here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-dashboard border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/dashboard/customer/menu"
                className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary"
              >
                <ShoppingBag className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Browse Menu</span>
              </Link>
              <Link
                to="/dashboard/customer/profile"
                className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary"
              >
                <Heart className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Order Status Overview - Moved to right side */}
        <div className="lg:col-span-2">
          <div className="bg-dashboard border border-border-primary rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Order Status Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-warning/10 border border-warning rounded-lg">
                <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-medium text-text-primary">
                  {pendingOrders}
                </h3>
                <p className="text-sm text-text-secondary">Active Orders</p>
              </div>
              <div className="text-center p-4 bg-success/10 border border-success rounded-lg">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <h3 className="font-medium text-text-primary">
                  {completedOrders}
                </h3>
                <p className="text-sm text-text-secondary">Completed</p>
              </div>
              <div className="text-center p-4 bg-info/10 border border-info rounded-lg">
                <TrendingUp className="w-8 h-8 text-info mx-auto mb-2" />
                <h3 className="font-medium text-text-primary">{totalOrders}</h3>
                <p className="text-sm text-text-secondary">Total Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
