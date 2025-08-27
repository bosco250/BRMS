import { User } from "lucide-react";
import { useCustomerDashboard } from "./context";

export default function AccountProfile() {
  const { customer, setCustomer } = useCustomerDashboard();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-surface-secondary rounded-full flex items-center justify-center">
            {customer.avatar ? (
              <img
                src={customer.avatar}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-text-secondary" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary">
              {customer.name}
            </h3>
            <p className="text-text-secondary">{customer.tier} Member</p>
            <button className="text-brand hover:text-brand/80 text-sm mt-1">
              Change Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) =>
                setCustomer((c) => ({ ...c, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) =>
                setCustomer((c) => ({ ...c, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) =>
                setCustomer((c) => ({ ...c, phone: e.target.value }))
              }
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-primary text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Member Since
            </label>
            <input
              type="text"
              value={new Date(customer.joinDate).toLocaleDateString()}
              disabled
              className="w-full px-3 py-2 border border-border-primary rounded-lg bg-surface-secondary text-text-muted"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Dietary Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {customer.preferences.map((pref, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                {pref}
              </span>
            ))}
            <button className="px-3 py-1 border border-border-primary rounded-full text-sm text-brand hover:bg-brand/10">
              + Add Preference
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand/90 transition-colors">
            Save Changes
          </button>
          <button className="bg-surface-secondary text-text-primary px-6 py-2 rounded-lg hover:bg-surface-card transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
