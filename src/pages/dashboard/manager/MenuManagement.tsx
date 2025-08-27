import { useManagerDashboard } from "./context";

export default function MenuManagement() {
  const { menu } = useManagerDashboard();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Menu Management</h1>
        <p className="text-text-secondary">Manage restaurant menu items and pricing</p>
      </div>
      
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <p className="text-text-secondary">Menu Management component coming soon...</p>
        <p className="text-sm text-text-muted mt-2">Total menu items: {menu.length}</p>
      </div>
    </div>
  );
}
