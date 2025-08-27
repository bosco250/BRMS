import { useManagerDashboard } from "./context";

export default function CustomerManagement() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Customer Management</h1>
        <p className="text-text-secondary">Manage customer relationships and data</p>
      </div>
      
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <p className="text-text-secondary">Customer Management component coming soon...</p>
        <p className="text-sm text-text-muted mt-2">This will include customer profiles, preferences, and history.</p>
      </div>
    </div>
  );
}
