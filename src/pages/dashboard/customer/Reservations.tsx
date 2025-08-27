import { Calendar } from "lucide-react";
import { useCustomerDashboard } from "./context";

export default function Reservations() {
  const { reservations } = useCustomerDashboard();
  return (
    <div className="space-y-6">
             <div
         className="p-6 rounded-lg border border-border-primary bg-dashboard"
       >
         <h3 className="text-lg font-semibold text-text-primary mb-4">
           Make a Reservation
         </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Time
            </label>
            <select className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary">
              <option>18:00</option>
              <option>18:30</option>
              <option>19:00</option>
              <option>19:30</option>
              <option>20:00</option>
              <option>20:30</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Number of Guests
            </label>
            <select className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Preferred Section
            </label>
            <select className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary">
              <option>No Preference</option>
              <option>Window Seating</option>
              <option>Quiet Area</option>
              <option>Bar Area</option>
              <option>Terrace</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Special Requests
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary"
            rows={3}
            placeholder="Anniversary dinner, dietary requirements, etc."
          />
        </div>
        <button className="mt-4 bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand/90 transition-colors">
          Make Reservation
        </button>
      </div>

             <div
         className="p-6 rounded-lg border border-border-primary bg-dashboard"
       >
         <h3 className="text-lg font-semibold text-text-primary mb-4">
           Your Reservations
         </h3>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {new Date(reservation.date).toLocaleDateString()} at{" "}
                    {reservation.time}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {reservation.guests} guests • {reservation.table}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    reservation.status === "confirmed"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {reservation.status}
                </span>
                <button className="text-brand hover:text-brand/80 text-sm">
                  Modify
                </button>
                <button className="text-error hover:text-error/80 text-sm">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
