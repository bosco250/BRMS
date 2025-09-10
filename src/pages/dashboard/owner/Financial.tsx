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
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Download,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useOwnerDashboard } from "./context";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Financial() {
  const { financialData, restaurants, orders } = useOwnerDashboard();
  const [selectedPeriod, setSelectedPeriod] = useState("3M");
  const [selectedRestaurant, setSelectedRestaurant] = useState("all");

  const periods = [
    { value: "1M", label: "1 Month" },
    { value: "3M", label: "3 Months" },
    { value: "6M", label: "6 Months" },
    { value: "1Y", label: "1 Year" },
  ];

  const filteredData = useMemo(() => {
    if (selectedPeriod === "1M") return financialData.slice(0, 1);
    if (selectedPeriod === "3M") return financialData.slice(0, 3);
    if (selectedPeriod === "6M") return financialData.slice(0, 6);
    return financialData;
  }, [financialData, selectedPeriod]);

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

  const paymentMethods = [
    { name: "Mobile Money", value: 45, color: "#00C49F" },
    { name: "Cash", value: 30, color: "#FFBB28" },
    { name: "Card", value: 20, color: "#0088FE" },
    { name: "Bank Transfer", value: 5, color: "#FF8042" },
  ];

  const restaurantPerformance = restaurants.map((restaurant) => ({
    name: restaurant.name,
    revenue: restaurant.revenue,
    staffCount: restaurant.staffCount,
    rating: restaurant.rating,
  }));

  const handleExportReport = (type: "pdf" | "excel") => {
    // Simulate export functionality
    const link = document.createElement("a");
    link.download = `financial-report-${selectedPeriod}-${
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
            Financial Management
          </h1>
          <p className="text-text-secondary">
            Monitor financial performance and manage budgets across all
            restaurants
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface-secondary text-text-primary"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleExportReport("pdf")}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Key Metrics */}
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
            {revenueGrowth.toFixed(1)}% from last period
          </p>
        </div>

        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Expenses</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="p-2 rounded-full bg-orange-100">
              <TrendingDown className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary">
            {((totalExpenses / totalRevenue) * 100).toFixed(1)}% of revenue
          </p>
        </div>

        <div className="bg-surface-card p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Net Profit</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalProfit)}
              </p>
            </div>
            <div className="p-2 rounded-full bg-green-100">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600">
            {profitMargin.toFixed(1)}% margin
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
              <p className="text-sm text-text-secondary">Avg. Order Value</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalRevenue / totalOrders)}
              </p>
            </div>
            <div className="p-2 rounded-full bg-purple-100">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary">Per order</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Trend */}
        <div className="bg-surface-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Revenue vs Expenses Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredData}>
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
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Trend */}
        <div className="bg-surface-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Profit Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
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
                dataKey="profit"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods Distribution */}
        <div className="bg-surface-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Payment Methods Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethods}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent ? (percent * 100).toFixed(0) : "0")}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethods.map((entry, index) => (
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

        {/* Restaurant Performance */}
        <div className="bg-surface-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Restaurant Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={restaurantPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
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
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-surface-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Monthly Financial Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-text-secondary font-medium">
                  Month
                </th>
                <th className="text-right py-3 px-4 text-text-secondary font-medium">
                  Revenue
                </th>
                <th className="text-right py-3 px-4 text-text-secondary font-medium">
                  Expenses
                </th>
                <th className="text-right py-3 px-4 text-text-secondary font-medium">
                  Profit
                </th>
                <th className="text-right py-3 px-4 text-text-secondary font-medium">
                  Margin
                </th>
                <th className="text-right py-3 px-4 text-text-secondary font-medium">
                  Orders
                </th>
                <th className="text-right py-3 px-4 text-text-secondary font-medium">
                  Customers
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border hover:bg-surface-secondary"
                >
                  <td className="py-3 px-4 text-text-primary">{item.month}</td>
                  <td className="py-3 px-4 text-right text-text-primary font-medium">
                    {formatCurrency(item.revenue)}
                  </td>
                  <td className="py-3 px-4 text-right text-text-primary">
                    {formatCurrency(item.expenses)}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-medium ${
                      item.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(item.profit)}
                  </td>
                  <td className="py-3 px-4 text-right text-text-primary">
                    {((item.profit / item.revenue) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-right text-text-primary">
                    {formatNumber(item.orders)}
                  </td>
                  <td className="py-3 px-4 text-right text-text-primary">
                    {formatNumber(item.customers)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Planning Section */}
      <div className="bg-surface-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Budget Planning & Forecasting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">
              Next Month Forecast
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Expected Revenue:</span>
                <span className="text-text-primary font-medium">
                  {formatCurrency(totalRevenue * 1.05)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Budgeted Expenses:</span>
                <span className="text-text-primary font-medium">
                  {formatCurrency(totalExpenses * 1.02)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Projected Profit:</span>
                <span className="text-green-600 font-medium">
                  {formatCurrency(totalRevenue * 1.05 - totalExpenses * 1.02)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Financial Health</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {profitMargin >= 20 ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                )}
                <span className="text-sm text-text-secondary">
                  Profit Margin: {profitMargin.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                {revenueGrowth >= 5 ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                )}
                <span className="text-sm text-text-secondary">
                  Revenue Growth: {revenueGrowth.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors text-sm">
                Set Budget Targets
              </button>
              <button className="w-full px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors text-sm">
                Generate Report
              </button>
              <button className="w-full px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors text-sm">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
