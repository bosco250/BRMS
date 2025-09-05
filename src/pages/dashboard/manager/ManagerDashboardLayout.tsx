import { useState } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { withRoleGuard } from "../../../auth/roleGuard";
import { ManagerDashboardProvider, useManagerDashboard } from "./context";
import {
  Shield,
  BarChart3,
  Users,
  Utensils,
  Database,
  LogOut,
  MoreVertical,
  Menu,
  TrendingUp,
  User,
  Settings,
  X,
  ShoppingCart,
  Activity,
  DollarSign,
} from "lucide-react";
import ManagerNotificationMenu from "../../../components/ManagerNotificationMenu";
import {
  Menu as MUIMenu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = [
    {
      to: "/dashboard/manager",
      label: "Dashboard",
      icon: BarChart3,
      end: true,
    },
    {
      to: "/dashboard/manager/daily-operations",
      label: "Daily Operations",
      icon: Activity,
    },
    {
      to: "/dashboard/manager/financial-monitoring",
      label: "Financial Monitoring",
      icon: DollarSign,
    },
    {
      to: "/dashboard/manager/business-operations",
      label: "Business Operations",
      icon: Menu,
    },
    {
      to: "/dashboard/manager/system-administration",
      label: "System Administration",
      icon: Shield,
    },
    { to: "/dashboard/manager/tables", label: "Table Management", icon: Users },
    { to: "/dashboard/manager/staff", label: "Staff Management", icon: Users },
    { to: "/dashboard/manager/inventory", label: "Inventory", icon: Database },
    { to: "/dashboard/manager/menu", label: "Menu Management", icon: Menu },
    {
      to: "/dashboard/manager/reports",
      label: "Reports & Analytics",
      icon: TrendingUp,
    },
    {
      to: "/dashboard/manager/customers",
      label: "Customer Management",
      icon: User,
    },
    {
      to: "/dashboard/manager/orders",
      label: "Order Management",
      icon: ShoppingCart,
    },
    { to: "/dashboard/manager/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-0 z-20 w-64 h-screen overflow-y-auto border-r border-border-primary transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-dashboard`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border-primary">
          <Link to="/" className="flex items-center">
            <Utensils className="w-8 h-8 text-brand mr-2" />
            <span className="text-lg font-semibold text-text-primary">
              BRMS Manager
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-text-secondary hover:text-text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <SidebarNav nav={nav} onNavigate={() => setSidebarOpen(false)} />
        <SidebarFooter />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <div className="fixed top-0 right-0 left-0 lg:left-64 z-30">
          <HeaderActions />
        </div>
        <main className="p-6 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarNav({
  nav,
  onNavigate,
}: {
  nav: any[];
  onNavigate: () => void;
}) {
  return (
    <nav className="flex-1 px-4 py-6">
      <ul className="space-y-2">
        {nav.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={onNavigate}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand text-white shadow-lg"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SidebarFooter() {
  const { manager } = useManagerDashboard();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="px-4 py-4 border-t border-border-primary">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 mx-auto bg-brand/10 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-brand" />
          </div>
          <button
            onClick={handleClick}
            className="p-1 text-text-secondary hover:text-text-primary hover:bg-surface-primary rounded-full transition-colors"
            aria-label="Account options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">
            {manager.name}
          </p>
          <p className="text-xs text-text-secondary">{manager.role}</p>
          <p className="text-xs text-text-muted mt-1">Manager Dashboard</p>
        </div>

        <MUIMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          PaperProps={{
            className: "mt-2 shadow-lg border border-border-primary",
            style: {
              minWidth: "200px",
            },
          }}
        >
          <MenuItem
            onClick={handleClose}
            className="text-text-primary hover:bg-surface-secondary"
          >
            <ListItemIcon>
              <Shield className="w-4 h-4 text-text-secondary" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            className="text-text-primary hover:bg-surface-secondary"
          >
            <ListItemIcon>
              <Database className="w-4 h-4 text-text-secondary" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogout}
            className="text-error hover:bg-error/10"
          >
            <ListItemIcon>
              <LogOut className="w-4 h-4 text-error" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MUIMenu>
      </div>
    </div>
  );
}

function HeaderActions() {
  const { manager } = useManagerDashboard();

  return (
    <header className="bg-dashboard border-b border-border-primary px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            Manager Dashboard
          </h1>
          <p className="text-sm text-text-secondary">
            Welcome back, {manager.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ManagerNotificationMenu />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-brand" />
            </div>
            <span className="text-sm font-medium text-text-primary">
              {manager.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

const GuardedLayout = withRoleGuard(Layout, "Manager");

export default function ManagerDashboardLayout() {
  return (
    <ManagerDashboardProvider>
      <GuardedLayout />
    </ManagerDashboardProvider>
  );
}
