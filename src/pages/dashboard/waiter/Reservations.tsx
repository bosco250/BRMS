import { useState } from "react";
import { useWaiterDashboard } from "./context";
import { Calendar, Clock, Users, Phone, Mail, Table, CheckCircle, AlertTriangle, X } from "lucide-react";

export default function Reservations() {
  const { waiter, reservations, tables, updateReservationStatus } = useWaiterDashboard();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);

  // Filter reservations
  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    const matchesDate = reservation.date === dateFilter;
    return matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTableInfo = (tableId: string) => {
    return tables.find(table => table.id === tableId);
  };

  const handleUpdateStatus = (reservationId: string, newStatus: string) => {
    updateReservationStatus(reservationId, newStatus as any);
  };

  // Calculate metrics
  const todayReservations = reservations.filter(res => res.date === dateFilter);
  const confirmedReservations = todayReservations.filter(res => res.status === "confirmed").length;
  const pendingReservations = todayReservations.filter(res => res.status === "pending").length;
  const totalCustomers = todayReservations.reduce((sum, res) => sum + res.partySize, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Reservations</h1>
        <p className="text-text-secondary">
          Manage table reservations and customer bookings
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{todayReservations.length}</p>
              <p className="text-xs text-text-secondary">Today's Reservations</p>
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{confirmedReservations}</p>
              <p className="text-xs text-text-secondary">Confirmed</p>
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{pendingReservations}</p>
              <p className="text-xs text-text-secondary">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{totalCustomers}</p>
              <p className="text-xs text-text-secondary">Total Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dashboard p-4 rounded-lg border border-border-primary">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-text-primary">Date:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-border-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-text-primary">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => {
          const tableInfo = getTableInfo(reservation.tableId);
          
          return (
            <div key={reservation.id} className="bg-dashboard p-6 rounded-lg border border-border-primary">
              {/* Reservation Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{reservation.customerName}</h3>
                    <p className="text-sm text-text-secondary">
                      Table {reservation.tableNumber} • {reservation.partySize} people • {reservation.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </span>
                  <span className="text-sm text-text-secondary">{reservation.date}</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">Phone:</span>
                    <span className="text-text-primary font-medium">{reservation.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">Email:</span>
                    <span className="text-text-primary font-medium">{reservation.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">Time:</span>
                    <span className="text-text-primary font-medium">{reservation.time}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Table className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">Table:</span>
                    <span className="text-text-primary font-medium">{reservation.tableNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">Party Size:</span>
                    <span className="text-text-primary font-medium">{reservation.partySize} people</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-secondary">Date:</span>
                    <span className="text-text-primary font-medium">
                      {new Date(reservation.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {reservation.specialRequests && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Special Requests:</strong> {reservation.specialRequests}
                  </p>
                </div>
              )}

              {/* Table Information */}
              {tableInfo && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Table className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Table Details</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                    <div>
                      <span className="font-medium">Capacity:</span> {tableInfo.capacity} people
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {tableInfo.status}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {reservation.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(reservation.id, "confirmed")}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Confirm Reservation
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(reservation.id, "cancelled")}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Cancel Reservation
                    </button>
                  </>
                )}

                {reservation.status === "confirmed" && (
                  <button
                    onClick={() => handleUpdateStatus(reservation.id, "completed")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Mark as Completed
                  </button>
                )}

                <button className="bg-surface-secondary text-text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-tertiary transition-colors">
                  Edit Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-secondary mb-2">No reservations found</h3>
          <p className="text-text-muted">
            {dateFilter === new Date().toISOString().split('T')[0] 
              ? "No reservations for today. Try selecting a different date."
              : "No reservations for the selected date. Try selecting a different date."
            }
          </p>
        </div>
      )}
    </div>
  );
}
