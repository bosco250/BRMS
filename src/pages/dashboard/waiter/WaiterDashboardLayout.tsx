import { useState } from "react";
import {
  Outlet,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { withRoleGuard } from "../../../auth/roleGuard";
import { WaiterDashboardProvider, useWaiterDashboard } from "./context";
import {
  Coffee,
  Table,
  Utensils,
  Calendar,
  Settings,
  X,
  Clock,
  DollarSign,
  Star,
  Users,
  MapPin,
  LogOut,
  MoreVertical,
  ShoppingCart,
} from "lucide-react";
import WaiterNotificationMenu from "../../../components/WaiterNotificationMenu";
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
      to: "/dashboard/waiter",
      label: "Dashboard",
      icon: Coffee,
      end: true,
    },
    {
      to: "/dashboard/waiter/order-taking",
      label: "Take Orders",
      icon: Utensils,
    },
    {
      to: "/dashboard/waiter/payment-processing",
      label: "Payment Processing",
      icon: DollarSign,
    },
    {
      to: "/dashboard/waiter/orders",
      label: "Order Management",
      icon: ShoppingCart,
    },
    { to: "/dashboard/waiter/tables", label: "Table Management", icon: Table },
    {
      to: "/dashboard/waiter/reservations",
      label: "Reservations",
      icon: Calendar,
    },
    { to: "/dashboard/waiter/settings", label: "Settings", icon: Settings },
  ];

  const current = nav.find((n) =>
    n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)
  );
  const currentTitle = current?.label ?? "Waiter";

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
            <Coffee className="w-8 h-8 text-brand mr-2" />
            <span className="text-lg font-semibold text-text-primary">
              BRMS Waiter
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
  const { waiter } = useWaiterDashboard();
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
            <Utensils className="w-5 h-5 text-brand" />
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
          <p className="text-sm font-medium text-text-primary">{waiter.name}</p>
          <p className="text-xs text-text-secondary">{waiter.role}</p>
          <p className="text-xs text-text-muted mt-1">Waiter Dashboard</p>
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
              <Utensils className="w-4 h-4 text-text-secondary" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            className="text-text-primary hover:bg-surface-secondary"
          >
            <ListItemIcon>
              <MapPin className="w-4 h-4 text-text-secondary" />
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
  const { waiter, notifications } = useWaiterDashboard();
  const [showNotifications, setShowNotifications] = useState(false);

  // Calculate unread notifications
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  // Calculate shift progress
  const now = new Date();
  const shiftStart = new Date(waiter.shiftStart);
  const shiftEnd = new Date(waiter.shiftEnd);
  const shiftProgress = Math.min(
    100,
    Math.max(
      0,
      ((now.getTime() - shiftStart.getTime()) /
        (shiftEnd.getTime() - shiftStart.getTime())) *
        100
    )
  );

  return (
    <header className="bg-surface-card border-b border-border-primary px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">
            Waiter Dashboard
          </h1>
          <p className="text-sm text-text-secondary">
            Welcome back, {waiter.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Shift Progress */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-text-secondary">Shift Progress</p>
              <p className="text-sm font-medium text-text-primary">
                {shiftProgress.toFixed(0)}%
              </p>
            </div>
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand h-2 rounded-full transition-all duration-300"
                style={{ width: `${shiftProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Notifications */}
          <WaiterNotificationMenu />

          {/* Waiter Info */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-sm font-medium text-text-primary">
                {waiter.name}
              </p>
              <p className="text-xs text-text-secondary">{waiter.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                <Coffee className="w-4 h-4 text-brand" />
              </div>
              <div className="hidden lg:flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-text-primary">
                  {waiter.rating}
                </span>
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

const GuardedLayout = withRoleGuard(Layout, "Waiter");

export default function WaiterDashboardLayout() {
  return (
    <WaiterDashboardProvider>
      <GuardedLayout />
    </WaiterDashboardProvider>
  );
}
