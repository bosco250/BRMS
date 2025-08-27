import { useAdminDashboard } from "./context";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Server,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Users,
  Building2,
} from "lucide-react";

export default function SystemAnalytics() {
  const { systemMetrics, businesses, users, auditLogs } = useAdminDashboard();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Calculate additional metrics
  const totalRevenue = businesses.reduce((sum, b) => sum + b.revenue, 0);
  const activeBusinesses = businesses.filter(
    (b) => b.status === "active"
  ).length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const recentAuditLogs = auditLogs.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">
          System Analytics
        </h1>
        <p className="text-text-secondary">
          Monitor system performance, health, and key metrics
        </p>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-surface-card p-6 rounded-lg border border-border-primary"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-brand" />
              </div>
              <div
                className={`w-2 h-2 rounded-full ${
                  metric.trend === "up"
                    ? "bg-green-500"
                    : metric.trend === "down"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              />
            </div>
            <h3 className="text-sm font-medium text-text-secondary mb-2">
              {metric.name}
            </h3>
            <p className="text-2xl font-bold text-text-primary mb-2">
              {metric.value}
              {metric.unit}
            </p>
            <div className="flex items-center gap-2">
              {metric.changeType === "increase" ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  metric.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {metric.change}
                {metric.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Business Performance Metrics */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Business Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {businesses.length}
            </p>
            <p className="text-sm text-text-secondary">Total Businesses</p>
            <div className="mt-2">
              <span className="text-xs text-green-600 font-medium">
                {activeBusinesses} active
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {users.length}
            </p>
            <p className="text-sm text-text-secondary">Total Users</p>
            <div className="mt-2">
              <span className="text-xs text-green-600 font-medium">
                {activeUsers} active
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-text-primary">
              ${(totalRevenue / 1000).toFixed(0)}K
            </p>
            <p className="text-sm text-text-secondary">Total Revenue</p>
            <div className="mt-2">
              <span className="text-xs text-green-600 font-medium">
                All businesses
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Components */}
        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            System Components
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Server className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Web Server
                  </p>
                  <p className="text-xs text-text-secondary">Apache/Nginx</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">
                  Online
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Database
                  </p>
                  <p className="text-xs text-text-secondary">PostgreSQL</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">
                  Online
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Security
                  </p>
                  <p className="text-xs text-text-secondary">Firewall & SSL</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">
                  Secure
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Backup System
                  </p>
                  <p className="text-xs text-text-secondary">Daily backups</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentAuditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border-secondary"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    log.severity === "high"
                      ? "bg-red-500"
                      : log.severity === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {log.action}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {log.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-text-secondary">
                      {log.userName}
                    </span>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-text-secondary">
                      {getTimeAgo(log.timestamp)}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                    log.severity
                  )}`}
                >
                  {log.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Charts Placeholder */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Performance Trends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-border-secondary">
            <h3 className="text-sm font-medium text-text-primary mb-3">
              System Load (24h)
            </h3>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-sm text-text-secondary">Chart placeholder</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-border-secondary">
            <h3 className="text-sm font-medium text-text-primary mb-3">
              User Activity (7d)
            </h3>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-sm text-text-secondary">Chart placeholder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Activity className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-text-primary">
              Generate Report
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Shield className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-text-primary">
              Security Scan
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Database className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-text-primary">
              Backup Now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
