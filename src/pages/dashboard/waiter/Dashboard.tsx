import { useWaiterDashboard } from "./context";
import {
  Users,
  Clock,
  DollarSign,
  Star,
  Table,
  Utensils,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Coffee,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const { waiter, tables, reservations, notifications } = useWaiterDashboard();

  // Calculate metrics
  const activeTables = tables.filter(
    (table) => table.status === "occupied" && table.waiterId === waiter.id
  ).length;
  const todayReservations = reservations.filter(
    (res) => res.date === new Date().toISOString().split("T")[0]
  ).length;
  const unreadNotifications = notifications.filter(
    (notif) => !notif.read
  ).length;

  // Calculate shift progress
  const now = new Date();
  const shiftStart = new Date(waiter.shiftStart);
  const shiftEnd = new Date(waiter.shiftEnd);
  const shiftProgress = Math.min(
    100,
    Math.max(
      0,
      ((now.getTime() - shiftStart.getTime()) /
        (shiftEnd.getTime() - shiftStart.getTime())) *
        100
    )
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-blue-100 text-blue-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      case "cleaning":
        return "bg-gray-100 text-gray-800";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">
          Waiter Dashboard
        </h1>
        <p className="text-text-secondary">
          Welcome back, {waiter.name}. Here's your shift overview.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Tables</p>
              <p className="text-2xl font-bold text-text-primary">
                {activeTables}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Table className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Pending Orders</p>
              <p className="text-2xl font-bold text-text-primary">0</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            No pending orders
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Ready to Serve</p>
              <p className="text-2xl font-bold text-text-primary">0</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-text-secondary">
            No orders ready
          </div>
        </div>

        <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Today's Tips</p>
              <p className="text-2xl font-bold text-text-primary">
                {formatCurrency(waiter.totalTips)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Shift Progress */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Shift Progress
          </h2>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Clock className="w-4 h-4" />
            <span>
              {shiftStart.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {shiftEnd.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Progress</span>
            <span className="text-text-primary font-medium">
              {shiftProgress.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-brand h-3 rounded-full transition-all duration-300"
              style={{ width: `${shiftProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>
              Started:{" "}
              {shiftStart.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>
              Ends:{" "}
              {shiftEnd.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Table Overview */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Table Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className="bg-white p-4 rounded-lg border border-border-secondary"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Table className="w-5 h-5 text-brand" />
                  <h3 className="font-medium text-text-primary">
                    Table {table.number}
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    table.status
                  )}`}
                >
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Capacity:</span>
                  <span className="text-text-primary">
                    {table.capacity} people
                  </span>
                </div>

                {table.status === "occupied" && table.customerCount && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Current:</span>
                    <span className="text-text-primary">
                      {table.customerCount} people
                    </span>
                  </div>
                )}

                {table.status === "reserved" && table.reservationTime && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Reserved:</span>
                    <span className="text-text-primary">
                      {new Date(table.reservationTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-text-secondary">Last Activity:</span>
                  <span className="text-text-primary">
                    {getTimeAgo(table.lastActivity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Status */}
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Table Status
        </h2>
        <div className="space-y-3">
          {tables
            .filter((table) => table.waiterId === waiter.id)
            .slice(0, 5)
            .map((table) => (
              <div
                key={table.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                    <Table className="w-4 w-4 text-brand" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">
                      Table {table.number}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Capacity: {table.capacity} • {table.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      table.status
                    )}`}
                  >
                    {table.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-4 text-center">
          <NavLink
            to="/dashboard/waiter/tables"
            className="text-sm text-brand hover:text-brand-hover font-medium"
          >
            View All Tables →
          </NavLink>
        </div>
      </div>

      {/* Today's Reservations */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Today's Reservations
        </h2>
        <div className="space-y-3">
          {reservations
            .filter(
              (res) => res.date === new Date().toISOString().split("T")[0]
            )
            .map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-secondary"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {reservation.customerName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Table {reservation.tableNumber} • {reservation.partySize}{" "}
                      people • {reservation.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reservation.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : reservation.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {reservation.status.charAt(0).toUpperCase() +
                      reservation.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface-card p-6 rounded-lg border border-border-primary">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Table className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-text-primary">
              Assign Table
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Utensils className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-text-primary">
              Table Service
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Calendar className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-text-primary">
              Check Reservations
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-border-secondary hover:border-brand hover:shadow-md transition-all">
            <Coffee className="w-6 h-6 text-orange-600" />
            <span className="text-sm font-medium text-text-primary">
              Service Request
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
