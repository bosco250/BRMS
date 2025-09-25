import { useState } from "react";
import {
  Menu,
  DollarSign,
  Users,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  TrendingUp,
  TrendingDown, 
  Filter,
  Search,
  Download,
  RefreshCw,
  Gift,
} from "lucide-react";

export default function BusinessOperations() {
  const [activeTab, setActiveTab] = useState("menu");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for menu management
  const menuItems = [
    {
      id: 1,
      name: "Grilled Chicken",
      category: "Main Course",
      price: 15000,
      cost: 8000,
      margin: 46.7,
      availability: "available",
      popularity: 4.8,
      orders: 45,
      description: "Tender grilled chicken with herbs and spices",
      ingredients: ["Chicken breast", "Herbs", "Spices", "Olive oil"],
      allergens: ["None"],
      prepTime: 20,
      calories: 350,
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Salad",
      price: 8000,
      cost: 3000,
      margin: 62.5,
      availability: "available",
      popularity: 4.5,
      orders: 32,
      description: "Fresh romaine lettuce with caesar dressing",
      ingredients: [
        "Romaine lettuce",
        "Parmesan",
        "Croutons",
        "Caesar dressing",
      ],
      allergens: ["Dairy", "Gluten"],
      prepTime: 10,
      calories: 250,
    },
    {
      id: 3,
      name: "Chocolate Cake",
      category: "Dessert",
      price: 6000,
      cost: 2000,
      margin: 66.7,
      availability: "unavailable",
      popularity: 4.9,
      orders: 28,
      description: "Rich chocolate cake with ganache",
      ingredients: ["Flour", "Cocoa", "Sugar", "Eggs", "Butter"],
      allergens: ["Gluten", "Dairy", "Eggs"],
      prepTime: 30,
      calories: 450,
    },
  ];

  const pricingStrategies = [
    {
      id: 1,
      name: "Happy Hour",
      type: "time_based",
      discount: 20,
      startTime: "15:00",
      endTime: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      items: ["Beverages", "Appetizers"],
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    {
      id: 2,
      name: "Lunch Special",
      type: "time_based",
      discount: 15,
      startTime: "11:30",
      endTime: "14:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      items: ["Main Course"],
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    {
      id: 3,
      name: "Weekend Brunch",
      type: "time_based",
      discount: 10,
      startTime: "09:00",
      endTime: "12:00",
      days: ["Saturday", "Sunday"],
      items: ["All Items"],
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  ];

  const customerFeedback = [
    {
      id: 1,
      customer: "John Smith",
      rating: 5,
      comment: "Excellent food and service! Will definitely come back.",
      date: "2024-01-15",
      category: "Food Quality",
      status: "resolved",
      response:
        "Thank you for your feedback! We're glad you enjoyed your experience.",
    },
    {
      id: 2,
      customer: "Jane Doe",
      rating: 3,
      comment:
        "Food was good but service was slow. Had to wait 30 minutes for our order.",
      date: "2024-01-14",
      category: "Service Speed",
      status: "pending",
      response: null,
    },
    {
      id: 3,
      customer: "Mike Johnson",
      rating: 4,
      comment: "Great atmosphere and friendly staff. Food was delicious.",
      date: "2024-01-13",
      category: "Overall Experience",
      status: "resolved",
      response:
        "We appreciate your kind words! Looking forward to serving you again.",
    },
  ];

  const loyaltyProgram = {
    totalMembers: 1250,
    activeMembers: 890,
    pointsIssued: 45600,
    pointsRedeemed: 23400,
    averagePointsPerCustomer: 36.5,
    topRewards: [
      { name: "Free Dessert", points: 100, redemptions: 45 },
      { name: "10% Discount", points: 200, redemptions: 32 },
      { name: "Free Appetizer", points: 150, redemptions: 28 },
      { name: "20% Discount", points: 500, redemptions: 15 },
    ],
  };

  const kpis = [
    {
      name: "Customer Satisfaction",
      value: 4.6,
      target: 4.5,
      trend: "up",
      change: "+0.1",
      icon: Star,
      color: "text-green-600",
    },
    {
      name: "Average Order Value",
      value: 12500,
      target: 12000,
      trend: "up",
      change: "+500",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      name: "Table Turnover Rate",
      value: 2.8,
      target: 3.0,
      trend: "down",
      change: "-0.2",
      icon: RefreshCw,
      color: "text-red-600",
    },
    {
      name: "Repeat Customer Rate",
      value: 68,
      target: 70,
      trend: "down",
      change: "-2",
      icon: Users,
      color: "text-red-600",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "unavailable":
        return "bg-red-100 text-red-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 text-gray-600">-</div>;
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Business Operations
          </h1>
          <p className="text-text-secondary">
            Manage menu, pricing, customers, and business performance
          </p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="bg-dashboard p-4 rounded-lg border border-border-primary"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">{kpi.name}</p>
                <p className="text-2xl font-bold text-text-primary">
                  {typeof kpi.value === "number" && kpi.name.includes("Value")
                    ? formatCurrency(kpi.value)
                    : kpi.value}
                </p>
              </div>
              <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              {getTrendIcon(kpi.trend)}
              <span className={`ml-1 ${kpi.color}`}>
                {kpi.change} from target
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="flex space-x-8">
          {[
            { id: "menu", label: "Menu & Pricing", icon: Menu },
            { id: "customers", label: "Customer Service", icon: Users },
            { id: "loyalty", label: "Loyalty Program", icon: Gift },
            { id: "reports", label: "Business Reports", icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
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
        {/* Menu & Pricing */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            {/* Menu Items */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Menu Items
                </h3>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm border border-border-primary rounded px-3 py-1"
                  />
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-2 px-3 py-1 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {menuItems
                  .filter(
                    (item) =>
                      searchQuery === "" ||
                      item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      item.category
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                            <Menu className="w-6 h-6 text-brand" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {item.name}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {item.category} • {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              item.availability
                            )}`}
                          >
                            {item.availability}
                          </span>
                          <div className="text-right">
                            <p className="font-medium text-text-primary">
                              {formatCurrency(item.price)}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {item.margin}% margin
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-text-secondary">Cost</p>
                          <p className="font-medium text-text-primary">
                            {formatCurrency(item.cost)}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Orders</p>
                          <p className="font-medium text-text-primary">
                            {item.orders}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Rating</p>
                          <p className="font-medium text-text-primary">
                            {item.popularity}/5
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Prep Time</p>
                          <p className="font-medium text-text-primary">
                            {item.prepTime} min
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-text-secondary hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary">
                            Allergens: {item.allergens.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Pricing Strategies */}
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Pricing Strategies
                </h3>
                <button
                  onClick={() => {}}
                  className="flex items-center gap-2 px-3 py-1 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Promotion
                </button>
              </div>
              <div className="space-y-4">
                {pricingStrategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-text-primary">
                          {strategy.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {strategy.discount}% off • {strategy.startTime} -{" "}
                          {strategy.endTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            strategy.status
                          )}`}
                        >
                          {strategy.status}
                        </span>
                        <button className="p-1 text-text-secondary hover:text-text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">Days</p>
                        <p className="font-medium text-text-primary">
                          {strategy.days.join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Items</p>
                        <p className="font-medium text-text-primary">
                          {strategy.items.join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Start Date</p>
                        <p className="font-medium text-text-primary">
                          {strategy.startDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">End Date</p>
                        <p className="font-medium text-text-primary">
                          {strategy.endDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Customer Service */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Customer Feedback
                </h3>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-text-secondary" />
                  <select className="text-sm border border-border-primary rounded px-2 py-1">
                    <option value="all">All Feedback</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                {customerFeedback.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {feedback.customer}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {feedback.category} • {feedback.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            feedback.status
                          )}`}
                        >
                          {feedback.status}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-text-primary">{feedback.comment}</p>
                    </div>
                    {feedback.response && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800">
                          <strong>Response:</strong> {feedback.response}
                        </p>
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        {new Date(feedback.date).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                          Respond
                        </button>
                        <button className="p-1 text-text-secondary hover:text-text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loyalty Program */}
        {activeTab === "loyalty" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Program Overview
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">
                      Total Members
                    </span>
                    <span className="text-2xl font-bold text-brand">
                      {loyaltyProgram.totalMembers}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">
                      Active Members
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {loyaltyProgram.activeMembers}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">
                      Points Issued
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {loyaltyProgram.pointsIssued.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text-primary">
                      Points Redeemed
                    </span>
                    <span className="text-2xl font-bold text-purple-600">
                      {loyaltyProgram.pointsRedeemed.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Top Rewards
              </h3>
              <div className="space-y-3">
                {loyaltyProgram.topRewards.map((reward, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-text-primary">
                          {reward.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {reward.points} points
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-text-primary">
                          {reward.redemptions}
                        </p>
                        <p className="text-sm text-text-secondary">
                          redemptions
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Business Reports */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Business Performance Reports
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-6 h-6 text-brand" />
                    <h4 className="font-medium text-text-primary">
                      Sales Report
                    </h4>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    Daily, weekly, and monthly sales analysis
                  </p>
                  <button className="w-full px-3 py-2 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors">
                    Generate Report
                  </button>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-brand" />
                    <h4 className="font-medium text-text-primary">
                      Customer Report
                    </h4>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    Customer demographics and behavior analysis
                  </p>
                  <button className="w-full px-3 py-2 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors">
                    Generate Report
                  </button>
                </div>
                <div className="p-4 bg-white rounded-lg border border-border-primary">
                  <div className="flex items-center gap-3 mb-3">
                    <Menu className="w-6 h-6 text-brand" />
                    <h4 className="font-medium text-text-primary">
                      Menu Performance
                    </h4>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    Menu item popularity and profitability
                  </p>
                  <button className="w-full px-3 py-2 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
