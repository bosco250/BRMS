import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKitchenDashboard } from "./context";
import {
  Clock,
  ChefHat,
  CheckCircle,
  Package,
  AlertTriangle,
  Timer,
  Users,
  Zap,
  Bell,
  Eye,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

const KitchenQueue: React.FC = () => {
  const { orders, updateOrderStatus, getOrdersByStatus, getOrdersByPriority } =
    useKitchenDashboard();

  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "pending" | "preparing" | "ready"
  >("all");
  const [sortBy, setSortBy] = useState<"time" | "priority">("time");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [newOrderCount, setNewOrderCount] = useState(0);

  // Get orders based on filter
  const filteredOrders = React.useMemo(() => {
    let filtered =
      selectedFilter === "all" ? orders : getOrdersByStatus(selectedFilter);

    // Sort orders
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { urgent: 3, rush: 2, normal: 1 };
        const aPriority =
          priorityOrder[a.priority as keyof typeof priorityOrder] || 1;
        const bPriority =
          priorityOrder[b.priority as keyof typeof priorityOrder] || 1;
        return bPriority - aPriority;
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });

    return filtered;
  }, [orders, selectedFilter, sortBy, getOrdersByStatus]);

  // Auto-refresh every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Detect new orders
  useEffect(() => {
    const pendingCount = getOrdersByStatus("pending").length;
    if (pendingCount > newOrderCount && newOrderCount > 0) {
      // New order detected - could trigger notification sound here
      console.log("New order detected!");
    }
    setNewOrderCount(pendingCount);
  }, [getOrdersByStatus, newOrderCount]);

  const getStatusColor = (status: string, priority: string) => {
    if (status === "pending" && priority === "urgent")
      return "bg-red-100 text-red-800 border-red-300";
    if (status === "pending")
      return "bg-gray-100 text-gray-800 border-gray-300";
    if (status === "preparing")
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (status === "ready")
      return "bg-green-100 text-green-800 border-green-300";
    if (status === "served") return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "preparing":
        return <ChefHat className="w-5 h-5" />;
      case "ready":
        return <CheckCircle className="w-5 h-5" />;
      case "served":
        return <Package className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "rush":
        return <Zap className="w-4 h-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getElapsedTime = (dateString: string) => {
    const now = new Date();
    const orderTime = new Date(dateString);
    const diffMs = now.getTime() - orderTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "0m";
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m`;
  };

  const isOverdue = (dateString: string, estimatedTime: number) => {
    const now = new Date();
    const orderTime = new Date(dateString);
    const diffMs = now.getTime() - orderTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins > estimatedTime;
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    setLastUpdate(new Date());

    // Notify server if order is ready
    if (newStatus === "ready") {
      console.log(`Order ${orderId} is ready for pickup!`);
      // In real implementation, this would send notification to server
    }
  };

  const OrderCard: React.FC<{ order: any; index: number }> = ({
    order,
    index,
  }) => {
    const overdue = isOverdue(order.createdAt, order.estimatedPrepTime);

    return (
      <motion.div
        className={`bg-white rounded-lg border-2 shadow-lg hover:shadow-xl transition-all duration-200 ${
          overdue
            ? "border-red-300 bg-red-50"
            : order.priority === "urgent"
            ? "border-red-200"
            : order.priority === "rush"
            ? "border-orange-200"
            : "border-gray-200"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Order Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${
                  overdue
                    ? "bg-red-100 border-red-300"
                    : order.priority === "urgent"
                    ? "bg-red-100 border-red-200"
                    : order.priority === "rush"
                    ? "bg-orange-100 border-orange-200"
                    : "bg-blue-100 border-blue-200"
                }`}
              >
                <span
                  className={`font-bold text-lg ${
                    overdue
                      ? "text-red-700"
                      : order.priority === "urgent"
                      ? "text-red-600"
                      : order.priority === "rush"
                      ? "text-orange-600"
                      : "text-blue-600"
                  }`}
                >
                  #{order.orderNumber.split("-")[1]}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {order.orderNumber}
                  </h3>
                  {getPriorityIcon(order.priority)}
                  {overdue && (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Table #{Math.floor(Math.random() * 20) + 1}</span>
                  <span>{order.customerName}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`text-2xl font-bold ${
                  overdue ? "text-red-600" : "text-gray-900"
                }`}
              >
                {getElapsedTime(order.createdAt)}
              </div>
              <div className="text-sm text-gray-500">
                Est. {order.estimatedPrepTime}min
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center border border-blue-200">
                    <span className="text-blue-600 font-bold text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-600">{item.station}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {item.preparationTime}min
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 text-sm rounded-full border-2 flex items-center gap-1 ${getStatusColor(
                  order.status,
                  order.priority
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              {overdue && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full border border-red-200">
                  OVERDUE
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {order.status === "pending" && (
                <button
                  onClick={() => handleStatusUpdate(order.id, "preparing")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <Play className="w-4 h-4" />
                  Start Cooking
                </button>
              )}
              {order.status === "preparing" && (
                <button
                  onClick={() => handleStatusUpdate(order.id, "ready")}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Ready
                </button>
              )}
              {order.status === "ready" && (
                <button
                  onClick={() => handleStatusUpdate(order.id, "served")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <Package className="w-4 h-4" />
                  Mark Served
                </button>
              )}
              <button
                onClick={() =>
                  setSelectedOrder(selectedOrder === order.id ? null : order.id)
                }
                className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Kitchen Queue</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Real-time order management for kitchen staff
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {filteredOrders.length}
            </div>
            <div className="text-sm text-gray-600">Active Orders</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex gap-2">
            {[
              { key: "all", label: "All Orders", count: orders.length },
              {
                key: "pending",
                label: "Pending",
                count: getOrdersByStatus("pending").length,
              },
              {
                key: "preparing",
                label: "Preparing",
                count: getOrdersByStatus("preparing").length,
              },
              {
                key: "ready",
                label: "Ready",
                count: getOrdersByStatus("ready").length,
              },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === filter.key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setSortBy("time")}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "time"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              Time
            </button>
            <button
              onClick={() => setSortBy("priority")}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "priority"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Zap className="w-4 h-4 inline mr-1" />
              Priority
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 sticky top-0 z-10 bg-white/90 backdrop-blur">
          <h3 className="text-lg font-semibold text-gray-900">Active Orders</h3>
          <p className="text-gray-600 text-sm mt-1">
            Prioritized queue of kitchen orders
          </p>
        </div>
        <div className="overflow-x-auto">
          <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Elapsed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 [&_tr]:odd:bg-gray-50/40">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => {
                    const overdue = isOverdue(
                      order.createdAt,
                      order.estimatedPrepTime
                    );
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={`${
                          overdue ? "bg-red-50/60" : ""
                        } hover:bg-gray-50 transition-colors`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                                overdue
                                  ? "bg-red-100 border-red-200"
                                  : order.priority === "urgent"
                                  ? "bg-red-100 border-red-200"
                                  : order.priority === "rush"
                                  ? "bg-orange-100 border-orange-200"
                                  : "bg-blue-100 border-blue-200"
                              }`}
                            >
                              <span
                                className={`text-sm font-bold ${
                                  overdue
                                    ? "text-red-700"
                                    : order.priority === "urgent"
                                    ? "text-red-600"
                                    : order.priority === "rush"
                                    ? "text-orange-600"
                                    : "text-blue-600"
                                }`}
                              >
                                #{order.orderNumber.split("-")[1]}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {order.orderNumber}
                              </div>
                              <div className="text-xs text-gray-500">
                                Est. {order.estimatedPrepTime}min
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.customerName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{Math.floor(Math.random() * 20) + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTime(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`px-2 py-1 text-xs rounded-full font-semibold ${
                              overdue
                                ? "text-red-600 bg-red-100"
                                : "text-gray-700 bg-gray-100"
                            } ${overdue ? "animate-pulse" : ""}`}
                          >
                            {getElapsedTime(order.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.items.reduce(
                            (sum: number, i: any) => sum + i.quantity,
                            0
                          )}{" "}
                          items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-sm rounded-full border inline-flex items-center gap-2 ${getStatusColor(
                              order.status,
                              order.priority
                            )}`}
                          >
                            {order.status === "pending" && (
                              <Clock className="w-3.5 h-3.5" />
                            )}
                            {order.status === "preparing" && (
                              <ChefHat className="w-3.5 h-3.5" />
                            )}
                            {order.status === "ready" && (
                              <CheckCircle className="w-3.5 h-3.5" />
                            )}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
                              order.priority === "urgent"
                                ? "bg-red-100 text-red-800"
                                : order.priority === "rush"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.status === "pending" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order.id, "preparing")
                                }
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 active:scale-[0.99] transition-all flex items-center gap-2"
                              >
                                <Play className="w-4 h-4" /> Start
                              </button>
                            )}
                            {order.status === "preparing" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order.id, "ready")
                                }
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-[0.99] transition-all flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" /> Ready
                              </button>
                            )}
                            {order.status === "ready" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order.id, "served")
                                }
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-[0.99] transition-all flex items-center gap-2"
                              >
                                <Package className="w-4 h-4" /> Served
                              </button>
                            )}
                            <button
                              onClick={() =>
                                setSelectedOrder(
                                  selectedOrder === order.id ? null : order.id
                                )
                              }
                              className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 active:scale-[0.99] transition-all"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <ChefHat className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No Orders Found
                        </h3>
                        <p className="text-gray-600">
                          {selectedFilter === "all"
                            ? "No orders in the system"
                            : `No ${selectedFilter} orders at the moment`}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const order = orders.find((o) => o.id === selectedOrder);
                if (!order) return null;

                return (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Order Details - {order.orderNumber}
                      </h2>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Package className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Order Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Customer
                          </label>
                          <div className="text-lg font-semibold">
                            {order.customerName}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Table
                          </label>
                          <div className="text-lg font-semibold">
                            #{Math.floor(Math.random() * 20) + 1}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Order Time
                          </label>
                          <div className="text-lg font-semibold">
                            {formatTime(order.createdAt)}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            Elapsed Time
                          </label>
                          <div className="text-lg font-semibold">
                            {getElapsedTime(order.createdAt)}
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Order Items
                        </h3>
                        <div className="space-y-2">
                          {order.items.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center border border-blue-200">
                                  <span className="text-blue-600 font-bold">
                                    {item.quantity}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {item.station}
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.preparationTime}min
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KitchenQueue;
