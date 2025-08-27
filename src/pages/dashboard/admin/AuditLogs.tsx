import { useState } from "react";
import { useAdminDashboard } from "./context";
import {
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Shield,
  Users,
  Building2,
} from "lucide-react";

export default function AuditLogs() {
  const { auditLogs, users, businesses } = useAdminDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  // Filter audit logs based on search and filters
  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || log.severity === severityFilter;
    const matchesAction =
      actionFilter === "all" ||
      log.action.toLowerCase().includes(actionFilter.toLowerCase());
    const matchesUser = userFilter === "all" || log.userId === userFilter;

    return matchesSearch && matchesSeverity && matchesAction && matchesUser;
  });

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

  const getActionIcon = (action: string) => {
    if (action.toLowerCase().includes("login")) return Users;
    if (action.toLowerCase().includes("security")) return Shield;
    if (action.toLowerCase().includes("backup")) return CheckCircle;
    if (action.toLowerCase().includes("error")) return AlertTriangle;
    return FileText;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get unique actions for filter
  const uniqueActions = [...new Set(auditLogs.map((log) => log.action))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Audit Logs</h1>
        <p className="text-text-secondary">
          Monitor system activities and security events
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Logs</p>
              <p className="text-2xl font-bold text-text-primary">
                {auditLogs.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Low Severity</p>
              <p className="text-2xl font-bold text-text-primary">
                {auditLogs.filter((log) => log.severity === "low").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Medium Severity</p>
              <p className="text-2xl font-bold text-text-primary">
                {auditLogs.filter((log) => log.severity === "medium").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">High Severity</p>
              <p className="text-2xl font-bold text-text-primary">
                {auditLogs.filter((log) => log.severity === "high").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search logs by action, description, or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>

            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="px-4 py-2 border border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Export and Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-secondary/80 transition-colors">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
        </div>
        <div className="text-sm text-text-secondary">
          Showing {filteredAuditLogs.length} of {auditLogs.length} logs
        </div>
      </div>

      {/* Audit Logs List */}
      <div className="bg-surface-card rounded-lg border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary border-b border-border-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border-secondary">
              {filteredAuditLogs.map((log) => {
                const ActionIcon = getActionIcon(log.action);

                return (
                  <tr key={log.id} className="hover:bg-surface-secondary/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                          <ActionIcon className="w-4 h-4 text-brand" />
                        </div>
                        <span className="text-sm font-medium text-text-primary">
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-text-primary">
                          {log.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-brand">
                            {log.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-text-primary">
                          {log.userName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                          log.severity
                        )}`}
                      >
                        {log.severity.charAt(0).toUpperCase() +
                          log.severity.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-text-primary">
                          {formatDate(log.timestamp)}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {getTimeAgo(log.timestamp)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-text-secondary hover:text-brand transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-text-secondary hover:text-brand transition-colors">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-text-secondary hover:text-text-primary disabled:opacity-50">
            Previous
          </button>
          <span className="px-3 py-2 text-text-primary">Page 1 of 1</span>
          <button className="px-3 py-2 text-text-secondary hover:text-text-primary disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
