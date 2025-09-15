import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKitchenDashboard } from "./context";
import {
  Clock,
  ChefHat,
  CheckCircle,
  Package,
  Play,
  Bell,
  Eye,
  RefreshCw,
  AlertCircle,
  Zap,
} from "lucide-react";

const KitchenOrders: React.FC = () => {
  const { updateOrderStatus, getOrdersByStatus } = useKitchenDashboard();

  const [selectedTab, setSelectedTab] = useState<
    "pending" | "preparing" | "ready"
  >("pending");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter orders by status
  const pendingOrders = getOrdersByStatus("pending");
  const preparingOrders = getOrdersByStatus("preparing");
  const readyOrders = getOrdersByStatus("ready");

  // Auto-refresh every 5 seconds to check for new orders
  useEffect(() => {
    const interval = setInterval(() => {
      const currentPendingCount = getOrdersByStatus("pending").length;
      if (currentPendingCount > newOrdersCount && newOrdersCount > 0) {
        // New orders detected
        setNewOrdersCount(currentPendingCount);
        setLastUpdate(new Date());
      } else if (newOrdersCount === 0) {
        setNewOrdersCount(currentPendingCount);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [getOrdersByStatus, newOrdersCount]);

  // Auto-refresh data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setLastUpdate(new Date());
      }, 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "served":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <ChefHat className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "served":
        return <Package className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);

    // Show notification for ready orders
    if (newStatus === "ready") {
      // In a real app, this would notify the waiter
      console.log(`Order ${orderId} is ready for pickup!`);
    }

    // Update last update time
    setLastUpdate(new Date());
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeElapsed = (dateString: string) => {
    const now = new Date();
    const orderTime = new Date(dateString);
    const diffMs = now.getTime() - orderTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m ago`;
  };

  const currentOrders =
    selectedTab === "pending"
      ? pendingOrders
      : selectedTab === "preparing"
      ? preparingOrders
      : readyOrders;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Auto-refresh */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kitchen Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and track order preparation process
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <div
              className={`w-2 h-2 rounded-full ${
                isRefreshing ? "bg-blue-500 animate-pulse" : "bg-green-500"
              }`}
            ></div>
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            {isRefreshing && <RefreshCw className="w-4 h-4 animate-spin" />}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Orders</span>
          </div>
        </div>
      </div>

      {/* New Orders Alert */}
      {pendingOrders.length > 0 && (
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">
              New Orders Alert
            </span>
          </div>
          <p className="text-blue-700 text-sm">
            {pendingOrders.length} new order
            {pendingOrders.length > 1 ? "s" : ""} waiting to be processed
          </p>
          <button
            onClick={() => setSelectedTab("pending")}
            className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            View Pending Orders
          </button>
        </motion.div>
      )}

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedTab("pending")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingOrders.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          {pendingOrders.length > 0 && (
            <div className="mt-2 text-sm text-red-600 font-medium">
              ⚠️ Requires attention
            </div>
          )}
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedTab("preparing")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {preparingOrders.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center border border-yellow-200">
              <ChefHat className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-yellow-600 font-medium">
            👨‍🍳 Being prepared
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedTab("ready")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ready Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {readyOrders.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          {readyOrders.length > 0 && (
            <div className="mt-2 text-sm text-green-600 font-medium">
              🔔 Ready for pickup
            </div>
          )}
        </motion.div>
      </div>

      {/* Order Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              {
                key: "pending",
                label: "Pending Orders",
                count: pendingOrders.length,
                urgent: pendingOrders.length > 0,
              },
              {
                key: "preparing",
                label: "In Progress",
                count: preparingOrders.length,
                urgent: false,
              },
              {
                key: "ready",
                label: "Ready Orders",
                count: readyOrders.length,
                urgent: readyOrders.length > 0,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  selectedTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label} ({tab.count})
                {tab.urgent && <Zap className="w-4 h-4 text-orange-500" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {/* Order Number */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
                            <span className="text-blue-600 font-bold text-sm">
                              #{order.orderNumber.split("-")[1]}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {order.orderNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              Est. {order.estimatedPrepTime}min
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Table #{Math.floor(Math.random() * 20) + 1}
                        </div>
                      </td>

                      {/* Time */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTime(order.createdAt)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getTimeElapsed(order.createdAt)}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.items.length} item
                          {order.items.length > 1 ? "s" : ""}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}{" "}
                          total
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-sm rounded-full border flex items-center gap-1 w-fit ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {order.status === "pending" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(order.id, "preparing")
                              }
                              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors flex items-center gap-1"
                            >
                              <Play className="w-3 h-3" />
                              Start
                            </button>
                          )}
                          {order.status === "preparing" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(order.id, "ready")
                              }
                              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Ready
                            </button>
                          )}
                          {order.status === "ready" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(order.id, "served")
                              }
                              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                            >
                              <Package className="w-3 h-3" />
                              Served
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            setExpandedOrder(
                              expandedOrder === order.id ? null : order.id
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        {selectedTab === "pending" && (
                          <Clock className="w-16 h-16 text-gray-400 mb-4" />
                        )}
                        {selectedTab === "preparing" && (
                          <ChefHat className="w-16 h-16 text-gray-400 mb-4" />
                        )}
                        {selectedTab === "ready" && (
                          <CheckCircle className="w-16 h-16 text-gray-400 mb-4" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No{" "}
                          {selectedTab === "pending"
                            ? "Pending"
                            : selectedTab === "preparing"
                            ? "In Progress"
                            : "Ready"}{" "}
                          Orders
                        </h3>
                        <p className="text-gray-600">
                          {selectedTab === "pending"
                            ? "All orders are being processed"
                            : selectedTab === "preparing"
                            ? "No orders are currently being prepared"
                            : "No orders are ready for pickup"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Expanded Order Details */}
        <AnimatePresence>
          {expandedOrder && (
            <motion.div
              className="border-t border-gray-200 bg-gray-50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="p-6">
                {(() => {
                  const order = currentOrders.find(
                    (o) => o.id === expandedOrder
                  );
                  if (!order) return null;

                  return (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Details - {order.orderNumber}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Order Items */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-3">
                            Ordered Items
                          </h5>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center border border-blue-200">
                                    <span className="text-blue-600 font-semibold text-xs">
                                      {item.quantity}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {item.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {item.station} • {item.preparationTime}min
                                    </div>
                                  </div>
                                </div>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                                    item.status
                                  )}`}
                                >
                                  {item.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Info */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-3">
                            Order Information
                          </h5>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer:</span>
                              <span className="font-medium">
                                {order.customerName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order Time:</span>
                              <span className="font-medium">
                                {formatTime(order.createdAt)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Elapsed Time:
                              </span>
                              <span className="font-medium">
                                {getTimeElapsed(order.createdAt)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Est. Prep Time:
                              </span>
                              <span className="font-medium">
                                {order.estimatedPrepTime} minutes
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Priority:</span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  order.priority === "urgent"
                                    ? "bg-red-100 text-red-800"
                                    : order.priority === "rush"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {order.priority.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ready Orders Notification */}
        {selectedTab === "ready" && readyOrders.length > 0 && (
          <div className="border-t border-gray-200 bg-green-50 p-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Ready Orders - Notify Waiters for Pickup
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenOrders;
