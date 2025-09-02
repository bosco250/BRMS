import React, { useState, useMemo } from "react";
import { useManagerDashboard } from "./context";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingBag,
  Clock,
  Calendar,
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

export default function ReportsAnalytics() {
  const { staff, inventory, orders, reservations } = useManagerDashboard();
  const [timeRange, setTimeRange] = useState("week");
  const [reportType, setReportType] = useState("overview");

  // Calculate metrics
  const totalStaff = staff.length;
  const totalInventory = inventory.length;
  const totalOrders = orders?.length || 0;
  const totalReservations = reservations?.length || 0;

  // Mock data for charts (in real app, this would come from API)
  const revenueData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue: Math.floor(Math.random() * 50000) + 10000,
        orders: Math.floor(Math.random() * 20) + 5,
      });
    }
    return data;
  }, []);

  const categoryData = useMemo(() => {
    const categories = ["Food", "Beverages", "Desserts", "Alcohol"];
    return categories.map((category) => ({
      name: category,
      value: Math.floor(Math.random() * 100) + 20,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const currentRevenue = revenueData[revenueData.length - 1]?.revenue || 0;
  const previousRevenue = revenueData[revenueData.length - 2]?.revenue || 0;
  const revenueGrowth = getGrowthRate(currentRevenue, previousRevenue);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Reports & Analytics
          </h1>
          <p className="text-text-secondary">
            View detailed reports and business analytics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-border-primary rounded-lg bg-dashboard text-text-primary"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(currentRevenue)}
              </p>
              <div className="flex items-center mt-2">
                {revenueGrowth >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
                <span
                  className={`text-sm ${
                    revenueGrowth >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Orders</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalOrders}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {revenueData[revenueData.length - 1]?.orders || 0} today
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Staff Members</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalStaff}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {staff.filter((s) => s.status === "active").length} active
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Inventory Items</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalInventory}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {
                  inventory.filter((item) => item.quantity < item.reorderPoint)
                    .length
                }{" "}
                low stock
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">
              Revenue Trend
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-surface-secondary rounded-lg transition-colors">
                <Eye className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary w-16">
                  {data.date}
                </span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-surface-secondary rounded-full h-2">
                    <div
                      className="bg-brand h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (data.revenue /
                            Math.max(...revenueData.map((d) => d.revenue))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-text-primary w-20 text-right">
                  {formatCurrency(data.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary">
              Category Distribution
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-surface-secondary rounded-lg transition-colors">
                <PieChart className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-text-primary">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {category.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Detailed Reports
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setReportType("overview")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                reportType === "overview"
                  ? "bg-brand text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-surface-card"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setReportType("staff")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                reportType === "staff"
                  ? "bg-brand text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-surface-card"
              }`}
            >
              Staff
            </button>
            <button
              onClick={() => setReportType("inventory")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                reportType === "inventory"
                  ? "bg-brand text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-surface-card"
              }`}
            >
              Inventory
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {reportType === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-surface-secondary rounded-lg">
                <Activity className="w-8 h-8 text-brand mx-auto mb-2" />
                <h4 className="font-medium text-text-primary">Performance</h4>
                <p className="text-sm text-text-secondary">Excellent</p>
              </div>
              <div className="text-center p-4 bg-surface-secondary rounded-lg">
                <Clock className="w-8 h-8 text-brand mx-auto mb-2" />
                <h4 className="font-medium text-text-primary">Efficiency</h4>
                <p className="text-sm text-text-secondary">85%</p>
              </div>
              <div className="text-center p-4 bg-surface-secondary rounded-lg">
                <Users className="w-8 h-8 text-brand mx-auto mb-2" />
                <h4 className="font-medium text-text-primary">
                  Customer Satisfaction
                </h4>
                <p className="text-sm text-text-secondary">4.2/5</p>
              </div>
            </div>
          )}

          {reportType === "staff" && (
            <div className="space-y-3">
              {staff.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-surface-primary rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-text-secondary" />
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
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {reportType === "inventory" && (
            <div className="space-y-3">
              {inventory.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-surface-primary rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">
                        {item.name}
                      </p>
                      <p className="text-sm text-text-secondary">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.quantity < item.reorderPoint
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.quantity < item.reorderPoint
                      ? "Low Stock"
                      : "In Stock"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
