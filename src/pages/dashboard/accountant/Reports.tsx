import React, { useState, useMemo } from "react";
import { useAccountantDashboard } from "./context";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Download,
  Calendar,
  Filter,
  Eye,
  RefreshCw,
  FileText,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  ShoppingBag,
  Building2,
} from "lucide-react";

export default function Reports() {
  const { financialData, transactions, businesses } = useAccountantDashboard();
  const [timeRange, setTimeRange] = useState("month");
  const [reportType, setReportType] = useState("overview");
  const [businessFilter, setBusinessFilter] = useState("all");

  // Mock financial data for demonstration
  const mockFinancialData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue: Math.floor(Math.random() * 100000) + 50000,
        expenses: Math.floor(Math.random() * 60000) + 30000,
        profit: Math.floor(Math.random() * 40000) + 20000,
        orders: Math.floor(Math.random() * 50) + 20,
        customers: Math.floor(Math.random() * 30) + 15,
      });
    }
    return data;
  }, []);

  const mockBusinessData = useMemo(
    () => [
      {
        id: 1,
        name: "Restaurant A",
        revenue: 2500000,
        expenses: 1800000,
        profit: 700000,
        growth: 12.5,
        status: "active",
      },
      {
        id: 2,
        name: "Restaurant B",
        revenue: 1800000,
        expenses: 1400000,
        profit: 400000,
        growth: -5.2,
        status: "active",
      },
      {
        id: 3,
        name: "Restaurant C",
        revenue: 3200000,
        expenses: 2200000,
        profit: 1000000,
        growth: 18.7,
        status: "active",
      },
    ],
    []
  );

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

  // Calculate totals
  const totalRevenue = mockFinancialData.reduce(
    (sum, day) => sum + day.revenue,
    0
  );
  const totalExpenses = mockFinancialData.reduce(
    (sum, day) => sum + day.expenses,
    0
  );
  const totalProfit = mockFinancialData.reduce(
    (sum, day) => sum + day.profit,
    0
  );
  const totalOrders = mockFinancialData.reduce(
    (sum, day) => sum + day.orders,
    0
  );
  const totalCustomers = mockFinancialData.reduce(
    (sum, day) => sum + day.customers,
    0
  );

  const currentRevenue =
    mockFinancialData[mockFinancialData.length - 1]?.revenue || 0;
  const previousRevenue =
    mockFinancialData[mockFinancialData.length - 2]?.revenue || 0;
  const revenueGrowth = getGrowthRate(currentRevenue, previousRevenue);

  const currentProfit =
    mockFinancialData[mockFinancialData.length - 1]?.profit || 0;
  const previousProfit =
    mockFinancialData[mockFinancialData.length - 2]?.profit || 0;
  const profitGrowth = getGrowthRate(currentProfit, previousProfit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Financial Reports
          </h1>
          <p className="text-text-secondary">
            Generate and view comprehensive financial reports
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
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalRevenue)}
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
              <p className="text-sm text-text-secondary">Total Expenses</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalExpenses)}
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {((totalExpenses / totalRevenue) * 100).toFixed(1)}% of revenue
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Net Profit</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(totalProfit)}
              </p>
              <div className="flex items-center mt-2">
                {profitGrowth >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
                <span
                  className={`text-sm ${
                    profitGrowth >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(profitGrowth).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard border border-border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Profit Margin</p>
              <p className="text-2xl font-bold text-text-primary">
                {((totalProfit / totalRevenue) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-text-secondary mt-2">
                {totalOrders} orders, {totalCustomers} customers
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Report Types
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
              onClick={() => setReportType("business")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                reportType === "business"
                  ? "bg-brand text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-surface-card"
              }`}
            >
              Business Performance
            </button>
            <button
              onClick={() => setReportType("trends")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                reportType === "trends"
                  ? "bg-brand text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-surface-card"
              }`}
            >
              Trends Analysis
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Overview Report */}
          {reportType === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend Chart */}
                <div className="bg-surface-secondary rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">
                    Revenue Trend
                  </h4>
                  <div className="space-y-3">
                    {mockFinancialData.slice(-7).map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-text-secondary w-16">
                          {data.date}
                        </span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-surface-primary rounded-full h-2">
                            <div
                              className="bg-brand h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  (data.revenue /
                                    Math.max(
                                      ...mockFinancialData.map((d) => d.revenue)
                                    )) *
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

                {/* Profit vs Expenses */}
                <div className="bg-surface-secondary rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">
                    Profit vs Expenses
                  </h4>
                  <div className="space-y-3">
                    {mockFinancialData.slice(-7).map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-text-secondary w-16">
                          {data.date}
                        </span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-surface-primary rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  (data.profit /
                                    Math.max(
                                      ...mockFinancialData.map((d) => d.profit)
                                    )) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-600 w-20 text-right">
                          {formatCurrency(data.profit)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-surface-secondary rounded-lg">
                  <FileText className="w-8 h-8 text-brand mx-auto mb-2" />
                  <h4 className="font-medium text-text-primary">
                    Total Transactions
                  </h4>
                  <p className="text-sm text-text-secondary">{totalOrders}</p>
                </div>
                <div className="text-center p-4 bg-surface-secondary rounded-lg">
                  <Users className="w-8 h-8 text-brand mx-auto mb-2" />
                  <h4 className="font-medium text-text-primary">
                    Active Customers
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {totalCustomers}
                  </p>
                </div>
                <div className="text-center p-4 bg-surface-secondary rounded-lg">
                  <Building2 className="w-8 h-8 text-brand mx-auto mb-2" />
                  <h4 className="font-medium text-text-primary">Businesses</h4>
                  <p className="text-sm text-text-secondary">
                    {mockBusinessData.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Business Performance Report */}
          {reportType === "business" && (
            <div className="space-y-6">
              <div className="bg-surface-secondary rounded-lg p-4">
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  Business Performance Comparison
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-primary">
                        <th className="text-left py-2 text-sm font-medium text-text-secondary">
                          Business
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-text-secondary">
                          Revenue
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-text-secondary">
                          Expenses
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-text-secondary">
                          Profit
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-text-secondary">
                          Growth
                        </th>
                        <th className="text-left py-2 text-sm font-medium text-text-secondary">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBusinessData.map((business) => (
                        <tr
                          key={business.id}
                          className="border-b border-border-primary"
                        >
                          <td className="py-2 text-sm font-medium text-text-primary">
                            {business.name}
                          </td>
                          <td className="py-2 text-sm text-text-primary">
                            {formatCurrency(business.revenue)}
                          </td>
                          <td className="py-2 text-sm text-text-primary">
                            {formatCurrency(business.expenses)}
                          </td>
                          <td className="py-2 text-sm text-text-primary">
                            {formatCurrency(business.profit)}
                          </td>
                          <td className="py-2 text-sm">
                            <span
                              className={`${
                                business.growth >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {business.growth >= 0 ? "+" : ""}
                              {business.growth}%
                            </span>
                          </td>
                          <td className="py-2 text-sm">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                business.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {business.status === "active" ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <AlertTriangle className="w-3 h-3 mr-1" />
                              )}
                              {business.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Trends Analysis Report */}
          {reportType === "trends" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Trends */}
                <div className="bg-surface-secondary rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">
                    Weekly Revenue Trends
                  </h4>
                  <div className="space-y-3">
                    {mockFinancialData.slice(-7).map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-text-secondary w-16">
                          {data.date}
                        </span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-surface-primary rounded-full h-2">
                            <div
                              className="bg-brand h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  (data.revenue /
                                    Math.max(
                                      ...mockFinancialData.map((d) => d.revenue)
                                    )) *
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

                {/* Customer Trends */}
                <div className="bg-surface-secondary rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-text-primary mb-4">
                    Customer Activity Trends
                  </h4>
                  <div className="space-y-3">
                    {mockFinancialData.slice(-7).map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-text-secondary w-16">
                          {data.date}
                        </span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-surface-primary rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  (data.customers /
                                    Math.max(
                                      ...mockFinancialData.map(
                                        (d) => d.customers
                                      )
                                    )) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-purple-600 w-20 text-right">
                          {data.customers}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-dashboard border border-border-primary rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">
                  Generate P&L Report
                </h4>
                <p className="text-sm text-text-secondary">
                  Profit & Loss statement
                </p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">
                  Tax Calculation
                </h4>
                <p className="text-sm text-text-secondary">
                  Calculate tax obligations
                </p>
              </div>
            </div>
          </button>

          <button className="p-4 bg-surface-secondary rounded-lg hover:bg-surface-card transition-colors text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">
                  Budget Analysis
                </h4>
                <p className="text-sm text-text-secondary">
                  Compare vs. budget
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
