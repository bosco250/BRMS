import { Gift, User, Award, Menu, Calendar } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCustomerDashboard } from "./context";

export default function Dashboard() {
  const { customer } = useCustomerDashboard();

  const Stat = ({
    title,
    value,
    Icon,
    color,
  }: {
    title: string;
    value: string | number;
    Icon: any;
    color: string;
  }) => (
    <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}/10`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p className="text-sm text-text-secondary">{title}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat
          title="Loyalty Points"
          value={customer.loyaltyPoints}
          Icon={Gift}
          color="accent"
        />
        <Stat
          title="Total Visits"
          value={customer.totalVisits}
          Icon={User}
          color="brand"
        />
        <Stat
          title="Total Spent"
          value={`$${customer.totalSpent}`}
          Icon={User}
          color="success"
        />
        <Stat
          title="Current Tier"
          value={customer.tier}
          Icon={Award}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Account Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Member Since
                </p>
                <p className="text-xs text-text-secondary">
                  {customer.joinDate}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  {customer.tier}
                </p>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-brand/10 text-brand">
                  Active
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Preferences
                </p>
                <p className="text-xs text-text-secondary">
                  {customer.preferences.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-border-primary bg-dashboard">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <NavLink
              to="/dashboard/customer/menu"
              className="p-4 bg-brand/10 text-brand rounded-lg hover:bg-brand/20 transition-colors"
            >
              <Menu className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Browse Menu</span>
            </NavLink>
            <NavLink
              to="/dashboard/customer/reservations"
              className="p-4 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
            >
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Reserve Table</span>
            </NavLink>
            <NavLink
              to="/dashboard/customer/loyalty"
              className="p-4 bg-success/10 text-success rounded-lg hover:bg-success/20 transition-colors"
            >
              <Gift className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Redeem Points</span>
            </NavLink>
            <NavLink
              to="/dashboard/customer/profile"
              className="p-4 bg-info/10 text-info rounded-lg hover:bg-info/20 transition-colors"
            >
              <User className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">View Profile</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
