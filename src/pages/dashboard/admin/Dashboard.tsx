import { useAdminDashboard } from "./context";
import {
  Users,
  CreditCard,
  Building2,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  Shield,
} from "lucide-react";

export default function Dashboard() {
  const { admin, businesses, users, subscriptions, systemMetrics } = useAdminDashboard();

  // Calculate metrics
  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter(b => b.status === "active").length;
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const totalRevenue = businesses.reduce((sum, b) => sum + b.revenue, 0);
  const activeSubscriptions = subscriptions.filter(s => s.status === "active").length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "suspended": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case "basic": return "bg-blue-100 text-blue-800";
      case "premium": return "bg-purple-100 text-purple-800";
      case "enterprise": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
        <p className="text-text-secondary">
          Welcome back, {admin.name}. Here's your system overview.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Businesses</p>
              <p className="text-2xl font-bold text-text-primary">{totalBusinesses}</p>
              <p className="text-xs text-text-secondary mt-1">
                {activeBusinesses} active
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Subscriptions</p>
              <p className="text-2xl font-bold text-text-primary">{activeSubscriptions}</p>
              <p className="text-xs text-text-secondary mt-1">
                {subscriptions.length} total
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Users</p>
              <p className="text-2xl font-bold text-text-primary">{totalUsers}</p>
              <p className="text-xs text-text-secondary mt-1">
                {activeUsers} active
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalRevenue)}</p>
              <p className="text-xs text-text-secondary mt-1">
                All businesses
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemMetrics.map((metric) => (
            <div key={metric.id} className="bg-white p-4 rounded-lg border border-border-secondary">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-text-primary">{metric.name}</h3>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === "up" ? "bg-green-500" :
                  metric.trend === "down" ? "bg-red-500" : "bg-yellow-500"
                }`} />
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {metric.value}{metric.unit}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {metric.changeType === "increase" ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-red-600 transform rotate-180" />
                )}
                <span className={`text-xs font-medium ${
                  metric.changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.change}{metric.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Businesses */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Businesses</h2>
        <div className="space-y-3">
          {businesses.slice(0, 5).map((business) => (
            <div key={business.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{business.name}</p>
                  <p className="text-xs text-text-secondary">
                    {business.type} • {business.location} • {business.owner}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(business.status)}`}>
                  {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(business.subscription)}`}>
                  {business.subscription.charAt(0).toUpperCase() + business.subscription.slice(1)}
                </span>
                <span className="text-xs text-text-secondary">{getTimeAgo(business.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-text-primary">Add Business</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Users className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-text-primary">Manage Users</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-text-primary">View Subscriptions</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Shield className="w-6 h-6 text-orange-600" />
            <span className="text-sm font-medium text-text-primary">System Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
