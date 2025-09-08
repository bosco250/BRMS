import React, { useState } from "react";
import {
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  Monitor,
  Cloud,
  Zap,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Download,
  Upload,
  Plus,
  Trash2,
  Search,
  Filter,
} from "lucide-react";

export default function TechnicalInfrastructure() {
  const [activeTab, setActiveTab] = useState("servers");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for technical infrastructure
  const servers = [
    {
      id: "SRV-001",
      name: "Web Server 1",
      status: "online",
      cpu: 45,
      memory: 68,
      disk: 32,
      uptime: "99.9%",
      lastBackup: "2024-01-15T02:00:00Z",
      location: "Data Center A",
      ip: "192.168.1.10",
      os: "Ubuntu 20.04",
      services: ["Apache", "MySQL", "Redis"],
    },
    {
      id: "SRV-002",
      name: "Database Server",
      status: "online",
      cpu: 78,
      memory: 85,
      disk: 45,
      uptime: "99.8%",
      lastBackup: "2024-01-15T01:30:00Z",
      location: "Data Center A",
      ip: "192.168.1.11",
      os: "Ubuntu 20.04",
      services: ["PostgreSQL", "MongoDB"],
    },
    {
      id: "SRV-003",
      name: "API Server",
      status: "warning",
      cpu: 92,
      memory: 95,
      disk: 78,
      uptime: "98.5%",
      lastBackup: "2024-01-14T23:00:00Z",
      location: "Data Center B",
      ip: "192.168.1.12",
      os: "Ubuntu 20.04",
      services: ["Node.js", "Express", "PM2"],
    },
  ];

  const databases = [
    {
      id: "DB-001",
      name: "main_database",
      type: "PostgreSQL",
      status: "online",
      size: "2.5 GB",
      connections: 45,
      lastBackup: "2024-01-15T02:00:00Z",
      version: "13.7",
      tables: 156,
      indexes: 89,
    },
    {
      id: "DB-002",
      name: "analytics_db",
      type: "MongoDB",
      status: "online",
      size: "1.8 GB",
      connections: 23,
      lastBackup: "2024-01-15T01:30:00Z",
      version: "5.0",
      collections: 45,
      documents: 125000,
    },
  ];

  const systemMetrics = [
    {
      name: "System Uptime",
      value: 99.9,
      unit: "%",
      trend: "up",
      change: 0.1,
      status: "good",
    },
    {
      name: "Response Time",
      value: 120,
      unit: "ms",
      trend: "down",
      change: -15,
      status: "good",
    },
    {
      name: "Error Rate",
      value: 0.2,
      unit: "%",
      trend: "down",
      change: -0.1,
      status: "good",
    },
    {
      name: "Active Users",
      value: 1250,
      unit: "",
      trend: "up",
      change: 15,
      status: "good",
    },
  ];

  const securityAlerts = [
    {
      id: "SEC-001",
      type: "Failed Login Attempts",
      severity: "medium",
      message: "Multiple failed login attempts detected from IP 192.168.1.100",
      timestamp: "2024-01-15T14:30:00Z",
      status: "active",
    },
    {
      id: "SEC-002",
      type: "SSL Certificate Expiry",
      severity: "high",
      message: "SSL certificate expires in 15 days",
      timestamp: "2024-01-15T10:00:00Z",
      status: "active",
    },
    {
      id: "SEC-003",
      type: "Suspicious Activity",
      severity: "low",
      message: "Unusual data access pattern detected",
      timestamp: "2024-01-15T09:15:00Z",
      status: "resolved",
    },
  ];

  const backupStatus = [
    {
      id: "BK-001",
      name: "Database Backup",
      type: "Full",
      status: "completed",
      size: "2.5 GB",
      duration: "15 min",
      timestamp: "2024-01-15T02:00:00Z",
      nextScheduled: "2024-01-16T02:00:00Z",
    },
    {
      id: "BK-002",
      name: "File System Backup",
      type: "Incremental",
      status: "in_progress",
      size: "1.2 GB",
      duration: "8 min",
      timestamp: "2024-01-15T14:30:00Z",
      nextScheduled: "2024-01-15T20:00:00Z",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800";
      case "offline":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "maintenance":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "active":
        return "bg-red-100 text-red-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Technical Infrastructure
          </h1>
          <p className="text-text-secondary">
            Monitor servers, databases, and system performance
          </p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-dashboard p-4 rounded-lg border border-border-primary"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">{metric.name}</p>
                <p className="text-2xl font-bold text-text-primary">
                  {metric.value}
                  {metric.unit}
                </p>
              </div>
              <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                {getTrendIcon(metric.trend)}
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <span
                className={`${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change > 0 ? "+" : ""}
                {metric.change}
                {metric.unit}
              </span>
              <span className="ml-1 text-text-secondary">from last hour</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary">
        <nav className="flex space-x-8">
          {[
            { id: "servers", label: "Servers", icon: Server },
            { id: "databases", label: "Databases", icon: Database },
            { id: "security", label: "Security", icon: Shield },
            { id: "backups", label: "Backups", icon: HardDrive },
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
        {/* Servers */}
        {activeTab === "servers" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Server Status
                </h3>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search servers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm border border-border-primary rounded px-3 py-1"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {servers
                  .filter(
                    (server) =>
                      searchQuery === "" ||
                      server.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      server.ip.includes(searchQuery)
                  )
                  .map((server) => (
                    <div
                      key={server.id}
                      className="p-4 bg-white rounded-lg border border-border-primary"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                            <Server className="w-6 h-6 text-brand" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {server.name}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {server.ip} • {server.location} • {server.os}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              server.status
                            )}`}
                          >
                            {server.status}
                          </span>
                          <span className="text-sm text-text-secondary">
                            Uptime: {server.uptime}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-text-secondary">
                              CPU Usage
                            </span>
                            <span className="text-sm font-medium">
                              {server.cpu}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                server.cpu > 80
                                  ? "bg-red-500"
                                  : server.cpu > 60
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${server.cpu}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-text-secondary">
                              Memory Usage
                            </span>
                            <span className="text-sm font-medium">
                              {server.memory}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                server.memory > 80
                                  ? "bg-red-500"
                                  : server.memory > 60
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${server.memory}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-text-secondary">
                              Disk Usage
                            </span>
                            <span className="text-sm font-medium">
                              {server.disk}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                server.disk > 80
                                  ? "bg-red-500"
                                  : server.disk > 60
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${server.disk}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span>Services: {server.services.join(", ")}</span>
                          <span>
                            Last Backup: {formatDate(server.lastBackup)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-text-secondary hover:text-text-primary">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Databases */}
        {activeTab === "databases" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Database Status
              </h3>
              <div className="space-y-4">
                {databases.map((db) => (
                  <div
                    key={db.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Database className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {db.name}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {db.type} {db.version} • {db.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            db.status
                          )}`}
                        >
                          {db.status}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {db.connections} connections
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">
                          Tables/Collections
                        </p>
                        <p className="font-medium text-text-primary">
                          {db.tables || db.collections}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Indexes</p>
                        <p className="font-medium text-text-primary">
                          {db.indexes || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Documents</p>
                        <p className="font-medium text-text-primary">
                          {db.documents || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">Last Backup</p>
                        <p className="font-medium text-text-primary">
                          {formatDate(db.lastBackup)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Security Alerts
              </h3>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {alert.type}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {alert.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        {formatDate(alert.timestamp)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                          Resolve
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

        {/* Backups */}
        {activeTab === "backups" && (
          <div className="space-y-6">
            <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Backup Status
              </h3>
              <div className="space-y-4">
                {backupStatus.map((backup) => (
                  <div
                    key={backup.id}
                    className="p-4 bg-white rounded-lg border border-border-primary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <HardDrive className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {backup.name}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {backup.type} • {backup.size} • {backup.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            backup.status
                          )}`}
                        >
                          {backup.status}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {formatDate(backup.timestamp)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-text-secondary">
                        Next: {formatDate(backup.nextScheduled)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          Run Now
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
  );
}
