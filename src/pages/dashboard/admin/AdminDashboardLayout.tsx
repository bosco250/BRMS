import { useState } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { withRoleGuard } from "../../../auth/roleGuard";
import { AdminDashboardProvider, useAdminDashboard } from "./context";
import {
  Shield,
  Building2,
  CreditCard,
  Users,
  BarChart3,
  FileText,
  Settings,
  X,
  LogOut,
  MoreVertical,
  ShoppingCart,
  Server,
} from "lucide-react";
import AdminNotificationMenu from "./AdminNotificationMenu";
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
      to: "/dashboard/admin",
      label: "Dashboard",
      icon: Shield,
      end: true,
    },
    {
      to: "/dashboard/admin/businesses",
      label: "Businesses",
      icon: Building2,
    },
    {
      to: "/dashboard/admin/subscriptions",
      label: "Subscriptions",
      icon: CreditCard,
    },
    {
      to: "/dashboard/admin/users",
      label: "User Management",
      icon: Users,
    },
    {
      to: "/dashboard/admin/analytics",
      label: "System Analytics",
      icon: BarChart3,
    },
    {
      to: "/dashboard/admin/logs",
      label: "Audit Logs",
      icon: FileText,
    },
    {
      to: "/dashboard/admin/orders",
      label: "Order Management",
      icon: ShoppingCart,
    },
    {
      to: "/dashboard/admin/technical-infrastructure",
      label: "Technical Infrastructure",
      icon: Server,
    },
    {
      to: "/dashboard/admin/system-administration",
      label: "System Administration",
      icon: Shield,
    },
    {
      to: "/dashboard/admin/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-0 z-20 w-64 h-screen overflow-y-auto border-r border-border-primary transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-surface-card`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border-primary">
          <Link to="/" className="flex items-center">
            <Shield className="w-8 h-8 text-brand mr-2" />
            <span className="text-lg font-semibold text-text-primary">
              BRMS Admin
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
          <HeaderActions setSidebarOpen={setSidebarOpen} />
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
  const { admin } = useAdminDashboard();
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
          <p className="text-sm font-medium text-text-primary">{admin.name}</p>
          <p className="text-xs text-text-secondary">{admin.role}</p>
          <p className="text-xs text-text-muted mt-1">Admin Dashboard</p>
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
              <Settings className="w-4 h-4 text-text-secondary" />
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

function HeaderActions({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const { admin, auditLogs } = useAdminDashboard();

  // Calculate system health based on recent activity
  const recentLogs = auditLogs.slice(0, 10);
  const systemHealth = recentLogs.length > 0 ? "healthy" : "unknown";

  return (
    <header className="bg-surface-card border-b border-border-primary px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            {admin.name}
          </h1>
          <p className="text-sm text-text-secondary">
            System Administrator Dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* System Health */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-text-secondary">System Status</p>
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    systemHealth === "healthy"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                />
                <p className="text-sm font-medium text-text-primary capitalize">
                  {systemHealth}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <AdminNotificationMenu />

          {/* Admin Info */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-sm font-medium text-text-primary">
                {admin.name}
              </p>
              <p className="text-xs text-text-secondary">{admin.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-brand" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

const GuardedLayout = withRoleGuard(Layout, "Admin");

export default function AdminDashboardLayout() {
  return (
    <AdminDashboardProvider>
      <GuardedLayout />
    </AdminDashboardProvider>
  );
}
