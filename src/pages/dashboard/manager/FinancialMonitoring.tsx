import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  Eye,
  RefreshCw,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  ShoppingBag,
  CreditCard,
  Banknote,
  Calculator,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus,
  Activity,
  Zap,
} from "lucide-react";

export default function FinancialMonitoring() {
  const [timeRange, setTimeRange] = useState("week");
  const [viewMode, setViewMode] = useState("overview");

  // Mock financial data
  const salesData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        revenue: Math.floor(Math.random() * 50000) + 10000,
        orders: Math.floor(Math.random() * 20) + 5,
        customers: Math.floor(Math.random() * 15) + 3,
        avgOrderValue: Math.floor(Math.random() * 5000) + 2000,
      });
    }
    return data;
  }, []);

  const categoryData = [
    { name: "Food", value: 65, amount: 450000, color: "bg-blue-500" },
    { name: "Beverages", value: 20, amount: 140000, color: "bg-green-500" },
    { name: "Desserts", value: 10, amount: 70000, color: "bg-yellow-500" },
    { name: "Alcohol", value: 5, amount: 35000, color: "bg-red-500" },
  ];

  const paymentMethods = [
    { method: "Cash", amount: 180000, percentage: 25, transactions: 45 },
    { method: "Card", amount: 360000, percentage: 50, transactions: 90 },
    { method: "Mobile Money", amount: 180000, percentage: 25, transactions: 35 },
  ];

  const costAnalysis = [
    { category: "Food Cost", amount: 280000, percentage: 40, target: 35, status: "over" },
    { category: "Labor Cost", amount: 150000, percentage: 21, target: 25, status: "good" },
    { category: "Utilities", amount: 70000, percentage: 10, target: 12, status: "good" },
    { category: "Rent", amount: 100000, percentage: 14, target: 15, status: "good" },
    { category: "Other", amount: 100000, percentage: 15, target: 13, status: "over" },
  ];

  const supplierPerformance = [
    {
      name: "Fresh Foods Ltd",
      totalSpent: 250000,
      orders: 12,
      avgDeliveryTime: 2.5,
      quality: 4.8,
      reliability: 95,
      lastOrder: "2024-01-14",
    },
    {
      name: "Beverage Co",
      totalSpent: 180000,
      orders: 8,
      avgDeliveryTime: 1.8,
      quality: 4.6,
      reliability: 92,
      lastOrder: "2024-01-13",
    },
    {
      name: "Meat Suppliers",
      totalSpent: 320000,
      orders: 15,
      avgDeliveryTime: 3.2,
      quality: 4.9,
      reliability: 98,
      lastOrder: "2024-01-15",
    },
  ];

  const wasteAnalysis = [
    { item: "Tomatoes", wasted: 5, cost: 10000, reason: "Overripe" },
    { item: "Lettuce", wasted: 3, cost: 6000, reason: "Wilted" },
    { item: "Bread", wasted: 8, cost: 4000, reason: "Stale" },
    { item: "Milk", wasted: 2, cost: 3000, reason: "Expired" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "over": return "text-red-600 bg-red-50";
      case "good": return "text-green-600 bg-green-50";
      case "warning": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "over": return <TrendingUp className="w-4 h-4" />;
      case "good": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertTriangle className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Financial Monitoring</h1>
          <p className="text-text-secondary">Track sales, costs, and financial performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-border-primary rounded-lg text-sm"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border-primary text-text-primary rounded-lg hover:bg-surface-secondary transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(695000)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12.5% from last week
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Orders</p>
              <p className="text-2xl font-bold text-text-primary">127</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            +8.2% from last week
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Avg Order Value</p>
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(5472)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-red-600">
            <TrendingDown className="w-3 h-3 mr-1" />
            -2.1% from last week
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Profit Margin</p>
              <p className="text-2xl font-bold text-text-primary">28.5%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            +1.2% from last week
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="flex space-x-8">
          {[
            { id: "sales", label: "Sales Analysis", icon: BarChart3 },
            { id: "costs", label: "Cost Management", icon: Calculator },
            { id: "payments", label: "Payment Methods", icon: CreditCard },
            { id: "suppliers", label: "Supplier Performance", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                viewMode === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Sales Analysis */}
        {viewMode === "sales" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue Trend</h3>
              <div className="space-y-4">
                {salesData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-brand" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{day.date}</p>
                        <p className="text-sm text-text-secondary">{day.orders} orders • {day.customers} customers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-text-primary">{formatCurrency(day.revenue)}</p>
                      <p className="text-sm text-text-secondary">Avg: {formatCurrency(day.avgOrderValue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Sales by Category</h3>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary">{category.name}</span>
                      <span className="text-text-secondary">{formatCurrency(category.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-text-secondary">{category.value}% of total sales</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cost Management */}
        {viewMode === "costs" && (
          <div className="space-y-6">
            {/* Cost Analysis */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Cost Analysis</h3>
              <div className="space-y-4">
                {costAnalysis.map((cost, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-border-primary">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-text-primary">{cost.category}</p>
                        <p className="text-sm text-text-secondary">
                          {formatCurrency(cost.amount)} • {cost.percentage}% of total
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusColor(cost.status)}`}>
                          {getStatusIcon(cost.status)}
                          {cost.status}
                        </span>
                        <span className="text-sm text-text-secondary">Target: {cost.target}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          cost.percentage > cost.target ? "bg-red-500" : "bg-green-500"
                        }`}
                        style={{ width: `${cost.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Waste Analysis */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Waste Analysis</h3>
              <div className="space-y-3">
                {wasteAnalysis.map((waste, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium text-text-primary">{waste.item}</p>
                      <p className="text-sm text-text-secondary">{waste.wasted} units • {waste.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">{formatCurrency(waste.cost)}</p>
                      <p className="text-sm text-text-secondary">Loss</p>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">Total Waste Cost</span>
                    <span className="font-bold text-red-600">{formatCurrency(23000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        {viewMode === "payments" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Methods</h3>
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-border-primary">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{method.method}</p>
                          <p className="text-sm text-text-secondary">{method.transactions} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-text-primary">{formatCurrency(method.amount)}</p>
                        <p className="text-sm text-text-secondary">{method.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${method.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Transaction Summary</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-green-800">Successful Transactions</span>
                    <span className="font-bold text-green-600">98.5%</span>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-yellow-800">Failed Transactions</span>
                    <span className="font-bold text-yellow-600">1.5%</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-800">Refunds Processed</span>
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supplier Performance */}
        {viewMode === "suppliers" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Supplier Performance</h3>
              <div className="space-y-4">
                {supplierPerformance.map((supplier, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-border-primary">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-text-primary">{supplier.name}</p>
                        <p className="text-sm text-text-secondary">
                          {supplier.orders} orders • Last: {supplier.lastOrder}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-text-primary">{formatCurrency(supplier.totalSpent)}</p>
                        <p className="text-sm text-text-secondary">Total Spent</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">Avg Delivery Time</p>
                        <p className="font-medium text-text-primary">{supplier.avgDeliveryTime} days</p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Quality Rating</p>
                        <p className="font-medium text-text-primary">{supplier.quality}/5</p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Reliability</p>
                        <p className="font-medium text-text-primary">{supplier.reliability}%</p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Status</p>
                        <p className="font-medium text-green-600">Active</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
