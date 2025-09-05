import {
  Clock,
  CheckCircle,
  TrendingUp,
  Star,
  Calendar,
  ShoppingBag,
  Gift,
  Receipt,
  MapPin,
  Heart,
} from "lucide-react";
import { useCustomerDashboard } from "./context";
// import NotificationDemo from "../../../components/NotificationDemo";
import { formatCurrency } from "../../../data/customerOrderData";

export default function Dashboard() {
  const { customer, orders, reservations } = useCustomerDashboard();

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

  // Get upcoming reservations
  const upcomingReservations = reservations
    .filter((res) => new Date(res.date) > new Date())
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-brand to-brand-dark rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {customer.name || "Customer"}! 👋
            </h1>
            <p className="text-brand-light">
              Track your orders, manage reservations, and explore rewards
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{customer.tier}</div>
            <div className="text-brand-light">Member</div>
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
            <a
              href="/dashboard/customer/orders"
              className="text-brand hover:text-brand-dark text-sm font-medium"
            >
              View All
            </a>
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
                      {order.orderType === "dine_in"
                        ? "🍽️"
                        : order.orderType === "take_away"
                        ? "🛍️"
                        : "🚚"}
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
        {/* Quick Actions & Info */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-dashboard border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <a
                href="/dashboard/customer/menu"
                className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary"
              >
                <ShoppingBag className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Browse Menu</span>
              </a>
              <a
                href="/dashboard/customer/reservations"
                className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary"
              >
                <Calendar className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Make Reservation</span>
              </a>
              <a
                href="/dashboard/customer/loyalty"
                className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary"
              >
                <Gift className="w-5 h-5 text-brand" />
                <span className="text-text-primary">View Rewards</span>
              </a>
              <a
                href="/dashboard/customer/profile"
                className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors border border-border-secondary"
              >
                <Heart className="w-5 h-5 text-brand" />
                <span className="text-text-primary">Edit Profile</span>
              </a>
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div className="bg-dashboard border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Upcoming Reservations
            </h3>
            {upcomingReservations.length > 0 ? (
              <div className="space-y-3">
                {upcomingReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="p-3 bg-surface-secondary rounded-lg border border-border-secondary"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">
                        {reservation.date}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {reservation.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">
                        {reservation.guests} guests
                      </span>
                      <span className="text-brand">{reservation.table}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-2" />
                <p className="text-text-secondary text-sm">
                  No upcoming reservations
                </p>
              </div>
            )}
          </div>

          {/* Loyalty Status */}
          <div className="bg-dashboard border border-border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Loyalty Status
            </h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-1">
                {customer.tier}
              </h4>
              <p className="text-text-secondary text-sm mb-3">Member</p>
              <div className="bg-surface-secondary rounded-full h-2 mb-2 border border-border-secondary">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      (customer.loyaltyPoints / 1000) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-text-secondary">
                {customer.loyaltyPoints} / 1000 points to next tier
              </p>
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
              <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-medium text-text-primary">
                  {pendingOrders}
                </h3>
                <p className="text-sm text-text-secondary">Active Orders</p>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium text-text-primary">
                  {completedOrders}
                </h3>
                <p className="text-sm text-text-secondary">Completed</p>
              </div>
              <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium text-text-primary">{totalOrders}</h3>
                <p className="text-sm text-text-secondary">Total Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification System Demo */}
      <div className="mt-8">{/* <NotificationDemo /> */}</div>
    </div>
  );
}
