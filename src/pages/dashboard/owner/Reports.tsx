import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Filter,
  Search,
  FileText,
  Eye,
  BarChart2,
  LineChart as LineChartIcon,
} from "lucide-react";
import { useOwnerDashboard } from "./context";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

export default function Reports() {
  const { financialData, restaurants, orders, staff } = useOwnerDashboard();
  const [selectedDateRange, setSelectedDateRange] = useState("3M");
  const [selectedChartType, setSelectedChartType] = useState("line");
  const [selectedRestaurant, setSelectedRestaurant] = useState("all");
  const [showCustomerAnalysis, setShowCustomerAnalysis] = useState(false);

  const dateRanges = [
    { value: "1M", label: "1 Month" },
    { value: "3M", label: "3 Months" },
    { value: "6M", label: "6 Months" },
    { value: "1Y", label: "1 Year" },
  ];

  const chartTypes = [
    { value: "line", label: "Line Chart", icon: LineChartIcon },
    { value: "bar", label: "Bar Chart", icon: BarChart2 },
    { value: "area", label: "Area Chart", icon: Activity },
    { value: "pie", label: "Pie Chart", icon: PieChartIcon },
  ];

  const filteredData = useMemo(() => {
    if (selectedDateRange === "1M") return financialData.slice(0, 1);
    if (selectedDateRange === "3M") return financialData.slice(0, 3);
    if (selectedDateRange === "6M") return financialData.slice(0, 6);
    return financialData;
  }, [financialData, selectedDateRange]);

  // Calculate key metrics
  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const totalExpenses = filteredData.reduce(
    (sum, item) => sum + item.expenses,
    0
  );
  const totalProfit = filteredData.reduce((sum, item) => sum + item.profit, 0);
  const totalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = filteredData.reduce(
    (sum, item) => sum + item.customers,
    0
  );

  const profitMargin =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const revenueGrowth =
    filteredData.length > 1
      ? ((filteredData[0].revenue -
          filteredData[filteredData.length - 1].revenue) /
          filteredData[filteredData.length - 1].revenue) *
        100
      : 0;

  // Customer behavior data
  const customerBehavior = [
    { category: "New Customers", value: 45, color: "#00C49F" },
    { category: "Returning Customers", value: 35, color: "#0088FE" },
    { category: "Loyal Customers", value: 20, color: "#FFBB28" },
  ];

  // Peak hours data
  const peakHours = [
    { hour: "6-9 AM", orders: 45, revenue: 180000 },
    { hour: "9-12 PM", orders: 120, revenue: 480000 },
    { hour: "12-3 PM", orders: 280, revenue: 1120000 },
    { hour: "3-6 PM", orders: 95, revenue: 380000 },
    { hour: "6-9 PM", orders: 320, revenue: 1280000 },
    { hour: "9-12 AM", orders: 60, revenue: 240000 },
  ];

  // Restaurant comparison data
  const restaurantComparison = restaurants.map((restaurant) => ({
    name: restaurant.name,
    revenue: restaurant.revenue,
    staffCount: restaurant.staffCount,
    rating: restaurant.rating,
    efficiency: restaurant.revenue / restaurant.staffCount,
  }));

  // Revenue forecasting data
  const revenueForecast = [
    { month: "Sep 2024", actual: 950000, forecast: 980000, confidence: 85 },
    { month: "Oct 2024", actual: null, forecast: 1020000, confidence: 80 },
    { month: "Nov 2024", actual: null, forecast: 1080000, confidence: 75 },
    { month: "Dec 2024", actual: null, forecast: 1200000, confidence: 70 },
  ];

  const handleExportReport = (type: "pdf" | "excel" | "csv") => {
    // Simulate export functionality
    const link = document.createElement("a");
    link.download = `analytics-report-${selectedDateRange}-${
      new Date().toISOString().split("T")[0]
    }.${type}`;
    link.href = "#";
    link.click();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-RW").format(num);
  };

  const renderChart = () => {
    const data = filteredData;

    switch (selectedChartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), ""]}
                labelStyle={{ color: "#1F2937" }}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Expenses"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), ""]}
                labelStyle={{ color: "#1F2937" }}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
              <Bar dataKey="expenses" fill="#F59E0B" name="Expenses" />
              <Bar dataKey="profit" fill="#3B82F6" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), ""]}
                labelStyle={{ color: "#1F2937" }}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.6}
                name="Expenses"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ month, revenue }) =>
                  `${month}\n${formatCurrency(revenue)}`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="revenue"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), ""]}
                labelStyle={{ color: "#1F2937" }}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative space-y-8 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Reports & Analytics
            </h1>
            <p className="text-text-secondary">
              Generate comprehensive business reports and analytics
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExportReport("pdf")}
              className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button
              onClick={() => handleExportReport("excel")}
              className="px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-surface-card p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total Revenue</p>
                <p className="text-2xl font-bold text-text-primary">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              <div
                className={`p-2 rounded-full ${
                  revenueGrowth >= 0 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <TrendingUp
                  className={`w-5 h-5 ${
                    revenueGrowth >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                />
              </div>
            </div>
            <p
              className={`text-sm ${
                revenueGrowth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {revenueGrowth >= 0 ? "+" : ""}
              {revenueGrowth.toFixed(1)}% growth
            </p>
          </div>

          <div className="bg-surface-card p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total Orders</p>
                <p className="text-2xl font-bold text-text-primary">
                  {formatNumber(totalOrders)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              {formatNumber(totalCustomers)} customers
            </p>
          </div>

          <div className="bg-surface-card p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Profit Margin</p>
                <p className="text-2xl font-bold text-text-primary">
                  {profitMargin.toFixed(1)}%
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              {formatCurrency(totalProfit)} profit
            </p>
          </div>

          <div className="bg-surface-card p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Avg. Order Value</p>
                <p className="text-2xl font-bold text-text-primary">
                  {formatCurrency(totalRevenue / totalOrders)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-text-secondary">Per order</p>
          </div>

          <div className="bg-surface-card p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Staff Efficiency</p>
                <p className="text-2xl font-bold text-text-primary">
                  {formatCurrency(totalRevenue / staff.length)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-orange-100">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-text-secondary">Revenue per staff</p>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex gap-2">
              {chartTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedChartType(type.value)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    selectedChartType === type.value
                      ? "bg-brand text-white"
                      : "bg-surface-secondary text-text-primary hover:bg-surface-card"
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </button>
              ))}
            </div>

            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
            >
              <option value="all">All Restaurants</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-surface-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Financial Performance Overview
          </h3>
          {renderChart()}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Behavior Analysis */}
          <div className="bg-surface-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Customer Behavior Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerBehavior}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category}\n${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerBehavior.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, ""]}
                  labelStyle={{ color: "#1F2937" }}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Peak Hours Analysis */}
          <div className="bg-surface-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Peak Hours Analysis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "orders" ? value : formatCurrency(value),
                    name === "orders" ? "Orders" : "Revenue",
                  ]}
                  labelStyle={{ color: "#1F2937" }}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="orders"
                  fill="#3B82F6"
                  name="Orders"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Revenue"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Restaurant Comparison */}
        <div className="bg-surface-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Restaurant Performance Comparison
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={restaurantComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === "efficiency"
                    ? formatCurrency(value)
                    : name === "rating"
                    ? value.toFixed(1)
                    : name === "staffCount"
                    ? value
                    : formatCurrency(value),
                  name === "efficiency"
                    ? "Revenue per Staff"
                    : name === "rating"
                    ? "Rating"
                    : name === "staffCount"
                    ? "Staff Count"
                    : "Revenue",
                ]}
                labelStyle={{ color: "#1F2937" }}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
              <Bar
                dataKey="efficiency"
                fill="#3B82F6"
                name="Revenue per Staff"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Forecasting */}
        <div className="bg-surface-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Revenue Forecasting
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={revenueForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === "actual" ? "Actual" : "Forecast",
                ]}
                labelStyle={{ color: "#1F2937" }}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Legend />
              <Bar dataKey="actual" fill="#10B981" name="Actual Revenue" />
              <Bar
                dataKey="forecast"
                fill="#3B82F6"
                name="Forecasted Revenue"
              />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#F59E0B"
                strokeWidth={2}
                name="Confidence %"
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-surface-secondary rounded-lg">
              <p className="text-sm text-text-secondary">Forecast Accuracy</p>
              <p className="text-lg font-semibold text-text-primary">85%</p>
            </div>
            <div className="text-center p-3 bg-surface-secondary rounded-lg">
              <p className="text-sm text-text-secondary">
                Next Month Projection
              </p>
              <p className="text-lg font-semibold text-text-primary">
                {formatCurrency(1020000)}
              </p>
            </div>
            <div className="text-center p-3 bg-surface-secondary rounded-lg">
              <p className="text-sm text-text-secondary">Growth Trend</p>
              <p className="text-lg font-semibold text-green-600">+5.2%</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="p-4 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors text-center">
              <FileText className="w-8 h-8 text-brand mx-auto mb-2" />
              <p className="font-medium text-text-primary">Generate Report</p>
              <p className="text-sm text-text-secondary">
                Create custom report
              </p>
            </button>

            <button className="p-4 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors text-center">
              <Eye className="w-8 h-8 text-brand mx-auto mb-2" />
              <p className="font-medium text-text-primary">View Details</p>
              <p className="text-sm text-text-secondary">Detailed analytics</p>
            </button>

            <button className="p-4 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors text-center">
              <TrendingUp className="w-8 h-8 text-brand mx-auto mb-2" />
              <p className="font-medium text-text-primary">Trend Analysis</p>
              <p className="text-sm text-text-secondary">Identify patterns</p>
            </button>

            <button className="p-4 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors text-center">
              <Download className="w-8 h-8 text-brand mx-auto mb-2" />
              <p className="font-medium text-text-primary">Export Data</p>
              <p className="text-sm text-text-secondary">Download reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
