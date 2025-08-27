import { useManagerDashboard } from "./context";

// Settings component for manager dashboard
export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary">
          Manage restaurant and system settings
        </p>
      </div>

      <div className="bg-surface-card p-6 rounded-lg">
        <p className="text-text-secondary">
          Settings configuration coming soon...
        </p>
      </div>
    </div>
  );
}
