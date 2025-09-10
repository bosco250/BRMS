import React, { useState } from "react";
import {
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus,
  Zap,
  Crown,
  Star,
  Award,
  Trophy,
} from "lucide-react";

export default function StrategicDecisions() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("quarter");
  const [selectedRestaurant, setSelectedRestaurant] = useState("all");

  // Mock data for strategic decisions
  const kpis = [
    {
      name: "Revenue Growth",
      value: 15.2,
      unit: "%",
      target: 12.0,
      trend: "up",
      change: 3.2,
      status: "excellent",
      icon: TrendingUp,
    },
    {
      name: "Customer Satisfaction",
      value: 4.6,
      unit: "/5",
      target: 4.5,
      trend: "up",
      change: 0.1,
      status: "good",
      icon: Star,
    },
    {
      name: "Market Share",
      value: 23.5,
      unit: "%",
      target: 25.0,
      trend: "up",
      change: 1.2,
      status: "good",
      icon: Target,
    },
    {
      name: "Employee Retention",
      value: 87.3,
      unit: "%",
      target: 85.0,
      trend: "up",
      change: 2.3,
      status: "excellent",
      icon: Users,
    },
  ];

  const strategicInitiatives = [
    {
      id: 1,
      name: "Digital Transformation",
      description: "Implement new POS system and mobile ordering",
      status: "in_progress",
      priority: "high",
      budget: 50000,
      spent: 32000,
      progress: 64,
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      owner: "John Smith",
      impact: "high",
    },
    {
      id: 2,
      name: "Market Expansion",
      description: "Open new location in downtown area",
      status: "planning",
      priority: "medium",
      budget: 200000,
      spent: 15000,
      progress: 8,
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      owner: "Sarah Johnson",
      impact: "high",
    },
    {
      id: 3,
      name: "Sustainability Program",
      description: "Implement eco-friendly practices and reduce waste",
      status: "completed",
      priority: "low",
      budget: 25000,
      spent: 25000,
      progress: 100,
      startDate: "2023-10-01",
      endDate: "2024-01-31",
      owner: "Mike Wilson",
      impact: "medium",
    },
  ];

  const marketAnalysis = [
    {
      metric: "Market Size",
      current: 2500000,
      projected: 2800000,
      growth: 12.0,
      trend: "up",
    },
    {
      metric: "Competition Level",
      current: 8.5,
      projected: 8.2,
      growth: -3.5,
      trend: "down",
    },
    {
      metric: "Customer Acquisition Cost",
      current: 45,
      projected: 38,
      growth: -15.6,
      trend: "down",
    },
    {
      metric: "Average Order Value",
      current: 12500,
      projected: 13500,
      growth: 8.0,
      trend: "up",
    },
  ];

  const financialProjections = [
    {
      period: "Q1 2024",
      revenue: 2500000,
      expenses: 1800000,
      profit: 700000,
      margin: 28.0,
    },
    {
      period: "Q2 2024",
      revenue: 2800000,
      expenses: 1950000,
      profit: 850000,
      margin: 30.4,
    },
    {
      period: "Q3 2024",
      revenue: 3200000,
      expenses: 2200000,
      profit: 1000000,
      margin: 31.3,
    },
    {
      period: "Q4 2024",
      revenue: 3500000,
      expenses: 2400000,
      profit: 1100000,
      margin: 31.4,
    },
  ];

  const riskAssessment = [
    {
      risk: "Economic Downturn",
      probability: "medium",
      impact: "high",
      mitigation: "Diversify revenue streams, reduce fixed costs",
      status: "monitoring",
    },
    {
      risk: "Supply Chain Disruption",
      probability: "high",
      impact: "medium",
      mitigation: "Multiple supplier relationships, inventory buffer",
      status: "active",
    },
    {
      risk: "Competition Increase",
      probability: "high",
      impact: "medium",
      mitigation: "Focus on differentiation, customer loyalty",
      status: "active",
    },
    {
      risk: "Regulatory Changes",
      probability: "low",
      impact: "high",
      mitigation: "Stay informed, compliance monitoring",
      status: "monitoring",
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
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "monitoring":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
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
              Strategic Decisions
            </h1>
            <p className="text-text-secondary">
              Make data-driven strategic decisions and monitor business
              performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-border-primary rounded-lg text-sm"
            >
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
              Export Report
            </button>
          </div>
        </div>

        {/* Key Performance Indicators */}
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
                    {kpi.value}
                    {kpi.unit}
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                  <kpi.icon className="w-6 h-6 text-brand" />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center text-xs">
                  {getTrendIcon(kpi.trend)}
                  <span
                    className={`ml-1 ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.change > 0 ? "+" : ""}
                    {kpi.change}
                    {kpi.unit}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                    kpi.status
                  )}`}
                >
                  {kpi.status}
                </span>
              </div>
              <div className="mt-2 text-xs text-text-secondary">
                Target: {kpi.target}
                {kpi.unit}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-border-primary">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Strategic Overview", icon: Target },
              {
                id: "initiatives",
                label: "Strategic Initiatives",
                icon: Activity,
              },
              { id: "market", label: "Market Analysis", icon: BarChart3 },
              {
                id: "financial",
                label: "Financial Projections",
                icon: DollarSign,
              },
              { id: "risks", label: "Risk Assessment", icon: AlertTriangle },
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
          {/* Strategic Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Business Performance
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-border-primary">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">
                        Revenue Growth
                      </span>
                      <span className="text-green-600 font-bold">+15.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      Exceeding target by 3.2%
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-border-primary">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">
                        Customer Satisfaction
                      </span>
                      <span className="text-blue-600 font-bold">4.6/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">
                      Above industry average
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Strategic Priorities
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-red-800">
                        Digital Transformation
                      </p>
                      <p className="text-sm text-red-600">
                        High priority initiative
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-yellow-800">
                        Market Expansion
                      </p>
                      <p className="text-sm text-yellow-600">
                        Medium priority initiative
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">
                        Sustainability Program
                      </p>
                      <p className="text-sm text-green-600">
                        Completed successfully
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Strategic Initiatives */}
          {activeTab === "initiatives" && (
            <div className="space-y-6">
              <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Strategic Initiatives
                  </h3>
                  <button className="flex items-center gap-2 px-3 py-1 bg-brand text-white text-sm rounded hover:bg-brand-dark transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Initiative
                  </button>
                </div>
                <div className="space-y-4">
                  {strategicInitiatives.map((initiative) => (
                    <div
                      key={initiative.id}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-brand" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {initiative.name}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {initiative.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                              initiative.priority
                            )}`}
                          >
                            {initiative.priority}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              initiative.status
                            )}`}
                          >
                            {initiative.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-text-secondary">Budget</p>
                          <p className="font-medium text-text-primary">
                            {formatCurrency(initiative.budget)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Spent</p>
                          <p className="font-medium text-text-primary">
                            {formatCurrency(initiative.spent)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Owner</p>
                          <p className="font-medium text-text-primary">
                            {initiative.owner}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Impact</p>
                          <p className="font-medium text-text-primary">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getImpactColor(
                                initiative.impact
                              )}`}
                            >
                              {initiative.impact}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-text-secondary">
                            Progress
                          </span>
                          <span className="text-sm font-medium">
                            {initiative.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-brand h-2 rounded-full"
                            style={{ width: `${initiative.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-text-secondary">
                          {initiative.startDate} - {initiative.endDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Eye className="w-4 h-4" />
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

          {/* Market Analysis */}
          {activeTab === "market" && (
            <div className="space-y-6">
              <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Market Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marketAnalysis.map((analysis, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-text-primary">
                          {analysis.metric}
                        </h4>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(analysis.trend)}
                          <span
                            className={`text-sm ${
                              analysis.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {analysis.growth > 0 ? "+" : ""}
                            {analysis.growth}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">
                            Current
                          </span>
                          <span className="font-medium text-text-primary">
                            {typeof analysis.current === "number" &&
                            analysis.current > 1000
                              ? formatCurrency(analysis.current)
                              : analysis.current}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">
                            Projected
                          </span>
                          <span className="font-medium text-text-primary">
                            {typeof analysis.projected === "number" &&
                            analysis.projected > 1000
                              ? formatCurrency(analysis.projected)
                              : analysis.projected}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Financial Projections */}
          {activeTab === "financial" && (
            <div className="space-y-6">
              <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Financial Projections
                </h3>
                <div className="space-y-4">
                  {financialProjections.map((projection, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-text-primary">
                          {projection.period}
                        </h4>
                        <span className="text-sm font-medium text-brand">
                          {projection.margin}% margin
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-text-secondary">Revenue</p>
                          <p className="font-medium text-text-primary">
                            {formatCurrency(projection.revenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">
                            Expenses
                          </p>
                          <p className="font-medium text-text-primary">
                            {formatCurrency(projection.expenses)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Profit</p>
                          <p className="font-medium text-green-600">
                            {formatCurrency(projection.profit)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Risk Assessment */}
          {activeTab === "risks" && (
            <div className="space-y-6">
              <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Risk Assessment
                </h3>
                <div className="space-y-4">
                  {riskAssessment.map((risk, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-text-primary">
                          {risk.risk}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                              risk.probability
                            )}`}
                          >
                            {risk.probability} probability
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getImpactColor(
                              risk.impact
                            )}`}
                          >
                            {risk.impact} impact
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              risk.status
                            )}`}
                          >
                            {risk.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary mb-3">
                        {risk.mitigation}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span>
                            Risk Level: {risk.probability} × {risk.impact}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                            Update Mitigation
                          </button>
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Eye className="w-4 h-4" />
                          </button>
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
    </div>
  );
}
