import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKitchenDashboard } from "./context";
import {
  AlertTriangle,
  Bell,
  Clock,
  Zap,
  CheckCircle,
  X,
  Search,
  Eye,
  ChefHat,
  Utensils,
} from "lucide-react";

const KitchenAlerts: React.FC = () => {
  const {
    notifications,
    orders,
    stations,
    markNotificationAsRead,
    clearNotifications,
  } = useKitchenDashboard();

  const [filter, setFilter] = useState<
    "all" | "unread" | "urgent" | "high" | "medium" | "low"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.read) ||
      (filter === "urgent" && notification.priority === "urgent") ||
      (filter === "high" && notification.priority === "high") ||
      (filter === "medium" && notification.priority === "medium") ||
      (filter === "low" && notification.priority === "low");

    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const urgentCount = notifications.filter(
    (n) => n.priority === "urgent" && !n.read
  ).length;
  const highCount = notifications.filter(
    (n) => n.priority === "high" && !n.read
  ).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "low":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_order":
        return <ChefHat className="w-5 h-5" />;
      case "order_ready":
        return <CheckCircle className="w-5 h-5" />;
      case "urgent_order":
        return <Zap className="w-5 h-5" />;
      case "order_cancelled":
        return <X className="w-5 h-5" />;
      case "station_alert":
        return <Utensils className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
  };

  const getOrderDetails = (orderId?: string) => {
    if (!orderId) return null;
    return orders.find((order) => order.id === orderId);
  };

  const getStationDetails = (stationId?: string) => {
    if (!stationId) return null;
    return stations.find((station) => station.id === stationId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Kitchen Alerts
          </h1>
          <p className="text-text-secondary">
            Monitor and manage kitchen notifications and alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
            >
              Mark All Read
            </button>
          )}
          <button
            onClick={clearNotifications}
            className="px-4 py-2 border border-border-primary text-text-secondary rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-xl p-6 border border-border-primary shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Alerts</p>
              <p className="text-2xl font-bold text-text-primary">
                {notifications.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-blue-500" />
              <span className="text-blue-600">{unreadCount} unread</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 border border-border-primary shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Urgent Alerts</p>
              <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-red-600">Requires immediate attention</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 border border-border-primary shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">{highCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-orange-600">Action needed soon</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 border border-border-primary shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {notifications.filter((n) => n.read).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-600">All handled</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-border-primary p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Alerts</option>
              <option value="unread">Unread</option>
              <option value="urgent">Urgent</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.map((notification, index) => {
            const order = getOrderDetails(notification.orderId);
            const station = getStationDetails(notification.stationId);

            return (
              <motion.div
                key={notification.id}
                className={`bg-white rounded-xl border border-border-primary shadow-sm overflow-hidden ${
                  !notification.read ? "ring-2 ring-brand/20" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPriorityColor(
                          notification.priority
                        )}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {notification.title}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                              notification.priority
                            )}`}
                          >
                            {notification.priority.toUpperCase()}
                          </span>
                          {notification.actionRequired && (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              ACTION REQUIRED
                            </span>
                          )}
                          {!notification.read && (
                            <span className="px-2 py-1 text-xs rounded-full bg-brand/10 text-brand">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-text-secondary mb-3">
                          {notification.message}
                        </p>

                        {/* Additional Details */}
                        <div className="flex items-center gap-4 text-sm text-text-muted">
                          <span>{formatTime(notification.createdAt)}</span>
                          {order && (
                            <>
                              <span>•</span>
                              <span>Order: {order.orderNumber}</span>
                            </>
                          )}
                          {station && (
                            <>
                              <span>•</span>
                              <span>Station: {station.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="px-3 py-1 text-sm bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() =>
                          setSelectedAlert(
                            selectedAlert === notification.id
                              ? null
                              : notification.id
                          )
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Alert Details */}
                <AnimatePresence>
                  {selectedAlert === notification.id && (
                    <motion.div
                      className="p-6 bg-gray-50 border-t border-border-primary"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        {/* Order Details */}
                        {order && (
                          <div>
                            <h4 className="font-medium text-text-primary mb-2">
                              Related Order
                            </h4>
                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-text-primary">
                                    {order.orderNumber}
                                  </div>
                                  <div className="text-sm text-text-secondary">
                                    {order.customerName} • {order.items.length}{" "}
                                    items • {order.estimatedPrepTime}m
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div
                                    className={`px-2 py-1 text-xs rounded-full ${
                                      order.priority === "urgent"
                                        ? "bg-red-100 text-red-800"
                                        : order.priority === "rush"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {order.priority}
                                  </div>
                                  <div className="text-xs text-text-muted mt-1">
                                    {order.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Station Details */}
                        {station && (
                          <div>
                            <h4 className="font-medium text-text-primary mb-2">
                              Related Station
                            </h4>
                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-text-primary">
                                    {station.name}
                                  </div>
                                  <div className="text-sm text-text-secondary">
                                    {station.type} Station • Capacity:{" "}
                                    {station.capacity}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div
                                    className={`px-2 py-1 text-xs rounded-full ${
                                      station.status === "active"
                                        ? "bg-green-100 text-green-800"
                                        : station.status === "maintenance"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {station.status}
                                  </div>
                                  <div className="text-xs text-text-muted mt-1">
                                    {station.currentOrders} orders
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Alert Actions */}
                        <div className="flex gap-3 pt-4 border-t border-border-primary">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors"
                            >
                              Mark as Read
                            </button>
                          )}
                          <button className="px-4 py-2 border border-border-primary text-text-secondary rounded-lg hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-border-primary">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No alerts found
            </h3>
            <p className="text-gray-500">
              {searchQuery || filter !== "all"
                ? "Try adjusting your filters or search terms"
                : "No kitchen alerts at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenAlerts;
