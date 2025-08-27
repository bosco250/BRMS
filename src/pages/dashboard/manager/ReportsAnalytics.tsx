import { useManagerDashboard } from "./context";

export default function ReportsAnalytics() {
  const { staff, inventory } = useManagerDashboard();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Reports & Analytics</h1>
        <p className="text-text-secondary">View detailed reports and business analytics</p>
      </div>
      
      <div className="bg-dashboard p-6 rounded-lg border border-border-primary">
        <p className="text-text-secondary">Reports & Analytics component coming soon...</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-brand">{staff.length}</p>
            <p className="text-sm text-text-secondary">Staff Members</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand">{inventory.length}</p>
            <p className="text-sm text-text-secondary">Inventory Items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
