import { useState } from "react";
import {
  Outlet,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { withRoleGuard } from "../../../auth/roleGuard";
import { AccountantDashboardProvider, useAccountantDashboard } from "./context";
import {
  ReceiptText,
  BarChart3,
  FileText,
  TrendingUp,
  TrendingDown,
  Building2,
  LogOut,
  MoreVertical,
} from "lucide-react";
import {
  Menu as MUIMenu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const nav = [
    {
      to: "/dashboard/accountant",
      label: "Dashboard",
      icon: BarChart3,
      end: true,
    },
    {
      to: "/dashboard/accountant/records",
      label: "Financial Records",
      icon: FileText,
    },
    { to: "/dashboard/accountant/invoices", label: "Invoices", icon: Receipt },
    {
      to: "/dashboard/accountant/taxes",
      label: "Tax Management",
      icon: ReceiptText,
    },
    { to: "/dashboard/accountant/reports", label: "Reports", icon: BarChart3 },
    { to: "/dashboard/accountant/settings", label: "Settings", icon: Settings },
  ];

  const current = nav.find((n) =>
    n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)
  );
  const currentTitle = current?.label ?? "Accountant";

  return (
    <div className="min-h-screen bg-surface-primary flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed left-0 top-0 z-50 w-64 h-screen overflow-y-auto border-r border-border-primary transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-dashboard`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border-primary">
          <Link to="/" className="flex items-center">
            <Calculator className="w-8 h-8 text-brand mr-2" />
            <span className="text-lg font-semibold text-text-primary">
              BRMS Finance
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
        <HeaderActions />
        <main className="p-6">
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
  const { accountant } = useAccountantDashboard();
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
            <ReceiptText className="w-5 h-5 text-brand" />
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
            {accountant.name}
          </p>
          <p className="text-xs text-text-secondary">{accountant.role}</p>
          <p className="text-xs text-text-muted mt-1">Accountant Dashboard</p>
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
              <ReceiptText className="w-4 h-4 text-text-secondary" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            className="text-text-primary hover:bg-surface-secondary"
          >
            <ListItemIcon>
              <FileText className="w-4 h-4 text-text-secondary" />
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
  const { accountant, financialRecords } = useAccountantDashboard();
  const [showNotifications, setShowNotifications] = useState(false);

  // Calculate pending records for notification badge
  const pendingRecords = financialRecords.filter(
    (record) => record.status === "pending"
  ).length;

  return (
    <header className="bg-dashboard border-b border-border-primary px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            Finance Dashboard
          </h1>
          <p className="text-sm text-text-secondary">
            Welcome back, {accountant.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {pendingRecords > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                {pendingRecords}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
              <Calculator className="w-4 h-4 text-brand" />
            </div>
            <span className="text-sm font-medium text-text-primary">
              {accountant.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

const GuardedLayout = withRoleGuard(Layout, "Accountant");

export default function AccountantDashboardLayout() {
  return (
    <AccountantDashboardProvider>
      <GuardedLayout />
    </AccountantDashboardProvider>
  );
}
