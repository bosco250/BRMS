import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle, 
  AlertCircle,
  Search,
  X,
} from "lucide-react";
import { useCustomerDashboard } from "./context";
import { toast } from "react-toastify";

interface ReservationFormData {
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  tablePreference: string;
}

export default function Reservations() {
  const { reservations } = useCustomerDashboard();
  // const [showForm, setShowForm] = useState(false);
  const [editingReservation, setEditingReservation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFormModal, setShowFormModal] = useState(false);

  const [formData, setFormData] = useState<ReservationFormData>({
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
    tablePreference: "",
  });

  // Available time slots
  const timeSlots = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];

  // Table preferences
  const tablePreferences = [
    "Window seat",
    "Outdoor seating",
    "Quiet corner",
    "Near kitchen",
    "Any table",
  ];

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <AlertCircle className="w-4 h-4" />,
        };
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <XCircle className="w-4 h-4" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <AlertCircle className="w-4 h-4" />,
        };
    }
  };

  // Filter reservations
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.table.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingReservation) {
      // Update existing reservation
      toast.success("Reservation updated successfully!");

      // Generate notification for reservation update
      const { addNotification } = useCustomerDashboard();
      if (addNotification) {
        addNotification({
          type: "reservation",
          title: "Reservation Updated",
          description: `Your reservation has been updated to ${formData.date} at ${formData.time}`,
          priority: "medium",
          isRead: false,
          icon: "📅",
        });
      }

      setEditingReservation(null);
    } else {
      // Create new reservation
      toast.success("Reservation created successfully!");

      // Generate notification for new reservation
      const { addNotification } = useCustomerDashboard();
      if (addNotification) {
        addNotification({
          type: "reservation",
          title: "Reservation Confirmed",
          description: `Your reservation for ${formData.date} at ${formData.time} has been confirmed`,
          priority: "medium",
          isRead: false,
          icon: "✅",
        });
      }
    }

    // Reset form
    setFormData({
      date: "",
      time: "",
      guests: 2,
      specialRequests: "",
      tablePreference: "",
    });
    setShowFormModal(false);
  };

  // Handle edit reservation
  const handleEdit = (reservation: any) => {
    setEditingReservation(reservation);
    setFormData({
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      specialRequests: reservation.specialRequests || "",
      tablePreference: reservation.tablePreference || "",
    });
    setShowFormModal(true);
  };

  // Handle cancel reservation
  const handleCancel = (_reservationId: number) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      toast.success("Reservation cancelled successfully!");
    }
  };

  // Handle delete reservation
  const handleDelete = (_reservationId: number) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      toast.success("Reservation deleted successfully!");
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  // Get upcoming and past reservations
  const upcomingReservations = filteredReservations.filter(
    (res) => new Date(res.date) > new Date()
  );
  const pastReservations = filteredReservations.filter(
    (res) => new Date(res.date) <= new Date()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Reservations</h2>
          <p className="text-text-secondary">Manage your table reservations</p>
        </div>
        <button
          onClick={() => setShowFormModal(true)}
          className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Reservation
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-dashboard border border-border-primary rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div>
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-card transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Reservations */}
      {upcomingReservations.length > 0 && (
        <div className="bg-dashboard border border-border-primary rounded-lg">
          <div className="p-4 border-b border-border-primary">
            <h3 className="text-lg font-semibold text-text-primary">
              Upcoming Reservations
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingReservations.map((reservation) => {
                const statusInfo = getStatusInfo(reservation.status);
                return (
                  <div
                    key={reservation.id}
                    className="bg-surface-secondary rounded-lg p-4 border border-border-secondary"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}
                      >
                        {statusInfo.icon}
                        <span className="ml-1">
                          {reservation.status.charAt(0).toUpperCase() +
                            reservation.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(reservation)}
                          className="p-1 text-text-secondary hover:text-text-primary hover:bg-surface-primary rounded border border-transparent hover:border-border-secondary"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCancel(reservation.id)}
                          className="p-1 text-text-secondary hover:text-error hover:bg-error/10 rounded border border-transparent hover:border-error/20"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm font-medium text-text-primary">
                          {reservation.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-secondary">
                          {reservation.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-secondary">
                          {reservation.guests} guests
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-brand">
                          {reservation.table}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Past Reservations */}
      {pastReservations.length > 0 && (
        <div className="bg-dashboard border border-border-primary rounded-lg">
          <div className="p-4 border-b border-border-primary">
            <h3 className="text-lg font-semibold text-text-primary">
              Past Reservations
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastReservations.map((reservation) => {
                const statusInfo = getStatusInfo(reservation.status);
                return (
                  <div
                    key={reservation.id}
                    className="bg-surface-secondary rounded-lg p-4 border border-border-secondary opacity-75"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}
                      >
                        {statusInfo.icon}
                        <span className="ml-1">
                          {reservation.status.charAt(0).toUpperCase() +
                            reservation.status.slice(1)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(reservation.id)}
                        className="p-1 text-text-secondary hover:text-error hover:bg-error/10 rounded border border-transparent hover:border-error/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm font-medium text-text-primary">
                          {reservation.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-secondary">
                          {reservation.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-text-secondary">
                          {reservation.guests} guests
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm text-brand">
                          {reservation.table}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No Reservations Found
          </h3>
          <p className="text-text-secondary">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters or search terms"
              : "You haven't made any reservations yet"}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <button
              onClick={() => setShowFormModal(true)}
              className="mt-4 bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-dark transition-colors"
            >
              Make Your First Reservation
            </button>
          )}
        </div>
      )}

      {/* Reservation Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto border border-border-primary">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {editingReservation
                      ? "Edit Reservation"
                      : "New Reservation"}
                  </h3>
                  <p className="text-text-secondary">
                    {editingReservation
                      ? "Update your reservation details"
                      : "Book a table for your dining experience"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowFormModal(false);
                    setEditingReservation(null);
                    setFormData({
                      date: "",
                      time: "",
                      guests: 2,
                      specialRequests: "",
                      tablePreference: "",
                    });
                  }}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Number of Guests *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Table Preference */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Table Preference
                  </label>
                  <select
                    value={formData.tablePreference}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tablePreference: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">No preference</option>
                    {tablePreferences.map((pref) => (
                      <option key={pref} value={pref}>
                        {pref}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialRequests: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Any special requests or dietary requirements?"
                    className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-brand text-white py-2 px-4 rounded-lg font-medium hover:bg-brand-dark transition-colors"
                  >
                    {editingReservation
                      ? "Update Reservation"
                      : "Book Reservation"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowFormModal(false);
                      setEditingReservation(null);
                      setFormData({
                        date: "",
                        time: "",
                        guests: 2,
                        specialRequests: "",
                        tablePreference: "",
                      });
                    }}
                    className="flex-1 bg-surface-secondary text-text-primary py-2 px-4 rounded-lg font-medium hover:bg-surface-card transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
