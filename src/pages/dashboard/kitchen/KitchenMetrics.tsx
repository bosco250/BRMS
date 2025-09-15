import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useKitchenDashboard } from "./context";
import {
  Clock,
  ChefHat,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Timer,
  Activity,
} from "lucide-react";

const KitchenMetrics: React.FC = () => {
  const { orders, getOrdersByStatus, stats } = useKitchenDashboard();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [range, setRange] = useState<"1h" | "4h" | "today" | "7d">("today");
  const [performanceData, setPerformanceData] = useState({
    avgPrepTime: 0,
    ordersCompleted: 0,
    ordersPending: 0,
    overdueOrders: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate performance metrics (placeholder respects selected range visually)
    const pendingOrders = getOrdersByStatus("pending");
    const preparingOrders = getOrdersByStatus("preparing");
    const completedOrders = getOrdersByStatus("served");

    // Calculate overdue orders
    const now = new Date();
    const overdueCount = [...pendingOrders, ...preparingOrders].filter(
      (order) => {
        const orderTime = new Date(order.createdAt);
        const diffMs = now.getTime() - orderTime.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        return diffMins > order.estimatedPrepTime;
      }
    ).length;

    setPerformanceData({
      avgPrepTime: stats.averagePrepTime,
      ordersCompleted: completedOrders.length,
      ordersPending: pendingOrders.length + preparingOrders.length,
      overdueOrders: overdueCount,
    });
  }, [orders, getOrdersByStatus, stats, range]);

  const getPerformanceColor = (value: number, threshold: number) => {
    if (value <= threshold) return "text-green-600";
    if (value <= threshold * 1.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceIcon = (value: number, threshold: number) => {
    if (value <= threshold)
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (value <= threshold * 1.5)
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Kitchen Performance
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Real-time kitchen efficiency metrics
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Metrics</span>
            </div>
            <div className="text-sm text-gray-500">
              Current time: {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Range</label>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="1h">Last 1h</option>
            <option value="4h">Last 4h</option>
            <option value="today">Today</option>
            <option value="7d">Last 7d</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Prep Time</p>
              <p
                className={`text-3xl font-bold ${getPerformanceColor(
                  performanceData.avgPrepTime,
                  15
                )}`}
              >
                {performanceData.avgPrepTime}min
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
              <Timer className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className={`${
                  performanceData.avgPrepTime <= 15
                    ? "bg-green-500"
                    : performanceData.avgPrepTime <= 22
                    ? "bg-yellow-500"
                    : "bg-red-500"
                } h-2 rounded-full transition-all`}
                style={{
                  width: `${Math.min(
                    (performanceData.avgPrepTime / 30) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            {getPerformanceIcon(performanceData.avgPrepTime, 15)}
            <span className="text-sm text-gray-600">
              {performanceData.avgPrepTime <= 15
                ? "Excellent"
                : performanceData.avgPrepTime <= 22
                ? "Good"
                : "Needs Improvement"}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Orders Completed</p>
              <p className="text-3xl font-bold text-green-600">
                {performanceData.ordersCompleted}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full bg-green-500 transition-all"
                style={{
                  width: `${Math.min(
                    (performanceData.ordersCompleted /
                      Math.max(
                        performanceData.ordersCompleted +
                          performanceData.ordersPending,
                        1
                      )) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">
              Today's completed orders
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Orders</p>
              <p className="text-3xl font-bold text-blue-600">
                {performanceData.ordersPending}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
              <ChefHat className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all"
                style={{
                  width: `${Math.min(
                    (performanceData.ordersPending /
                      Math.max(
                        performanceData.ordersCompleted +
                          performanceData.ordersPending,
                        1
                      )) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Currently processing</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue Orders</p>
              <p
                className={`text-3xl font-bold ${
                  performanceData.overdueOrders > 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {performanceData.overdueOrders}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                performanceData.overdueOrders > 0
                  ? "bg-red-100 border-red-200"
                  : "bg-green-100 border-green-200"
              }`}
            >
              <AlertTriangle
                className={`w-6 h-6 ${
                  performanceData.overdueOrders > 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full bg-red-500 transition-all"
                style={{
                  width: `${Math.min(
                    (performanceData.overdueOrders /
                      Math.max(
                        performanceData.ordersPending +
                          performanceData.ordersCompleted,
                        1
                      )) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            {performanceData.overdueOrders > 0 ? (
              <>
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-red-600">Requires attention</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600">All on time</span>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {performanceData.ordersCompleted > 0
                ? Math.round(
                    (performanceData.ordersCompleted /
                      (performanceData.ordersCompleted +
                        performanceData.ordersPending)) *
                      100
                  )
                : 0}
              %
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{
                  width: `${Math.min(
                    (performanceData.ordersCompleted /
                      Math.max(
                        performanceData.ordersCompleted +
                          performanceData.ordersPending,
                        1
                      )) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {performanceData.overdueOrders === 0
                ? "100%"
                : Math.round(
                    ((performanceData.ordersPending -
                      performanceData.overdueOrders) /
                      performanceData.ordersPending) *
                      100
                  )}
              %
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-2 rounded-full ${
                  performanceData.overdueOrders === 0
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
                style={{
                  width: `${
                    performanceData.overdueOrders === 0
                      ? 100
                      : Math.max(
                          0,
                          Math.min(
                            ((performanceData.ordersPending -
                              performanceData.overdueOrders) /
                              Math.max(performanceData.ordersPending, 1)) *
                              100,
                            100
                          )
                        )
                  }%`,
                }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">On-Time Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {performanceData.avgPrepTime <= 15
                ? "Excellent"
                : performanceData.avgPrepTime <= 22
                ? "Good"
                : "Poor"}
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`${
                  performanceData.avgPrepTime <= 15
                    ? "bg-green-500"
                    : performanceData.avgPrepTime <= 22
                    ? "bg-yellow-500"
                    : "bg-red-500"
                } h-2 rounded-full`}
                style={{
                  width: `${Math.min(
                    (performanceData.avgPrepTime / 30) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">Efficiency Rating</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-5 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 active:scale-[0.99] transition-all text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-medium text-blue-900">View Queue</div>
            <div className="text-sm text-blue-700">See all orders</div>
          </button>
          <button className="p-5 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 active:scale-[0.99] transition-all text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-medium text-green-900">Mark Ready</div>
            <div className="text-sm text-green-700">Complete orders</div>
          </button>
          <button className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 active:scale-[0.99] transition-all text-center">
            <ChefHat className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="font-medium text-yellow-900">Start Cooking</div>
            <div className="text-sm text-yellow-700">Begin preparation</div>
          </button>
          <button className="p-5 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 active:scale-[0.99] transition-all text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="font-medium text-red-900">Urgent Orders</div>
            <div className="text-sm text-red-700">Priority items</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KitchenMetrics;
