import React, { useState } from "react";
import {
  Outlet,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { withRoleGuard } from "../../../auth/roleGuard";
import { CustomerDashboardProvider, useCustomerDashboard } from "./context";
import {
  Menu,
  User,
  Gift,
  CreditCard,
  Calendar,
  MessageSquare,
  HelpCircle,
  X,
  Utensils,
  Bell,
  MoreVertical,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Menu as MUIMenu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import NotificationMenu from "../../../components/NotificationMenu";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const nav = [
    {
      to: "/dashboard/customer",
      label: "Dashboard",
      icon: Utensils,
      end: true,
    },
    {
      to: "/dashboard/customer/orders",
      label: "Order History",
      icon: ShoppingCart,
    },
    {
      to: "/dashboard/customer/reservations",
      label: "Reservations",
      icon: Calendar,
    },
    {
      to: "/dashboard/customer/communication",
      label: "Communication",
      icon: MessageSquare,
    },
    { to: "/dashboard/customer/menu", label: "Browse Menu", icon: Menu },
    { to: "/dashboard/customer/profile", label: "Account Profile", icon: User },
    { to: "/dashboard/customer/loyalty", label: "Loyalty Program", icon: Gift },
    {
      to: "/dashboard/customer/help",
      label: "Help & Support",
      icon: HelpCircle,
    },
    { to: "/dashboard/customer/settings", label: "Settings", icon: Settings },
  ];

  const current = nav.find((n) =>
    n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)
  );
  const currentTitle = current?.label ?? "Customer";

  return (
    <CustomerDashboardProvider>
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
                BRMS
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

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
          <header className="fixed top-0 right-0 left-0 lg:left-64 border-b border-border-primary bg-dashboard z-30">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-text-secondary hover:text-text-primary mr-4"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-semibold text-text-primary">
                  {currentTitle}
                </h1>
              </div>
              <HeaderActions />
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto pt-20">
            <Outlet />
          </main>
        </div>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </CustomerDashboardProvider>
  );
}

export default withRoleGuard(Layout, "Customer");

function SidebarNav({
  nav,
  onNavigate,
}: {
  nav: Array<{ to: string; label: string; icon: any; end?: boolean }>;
  onNavigate: () => void;
}) {
  return (
    <nav className="mt-4 px-2">
      {nav.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end as any}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand text-text-inverted"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="flex-1 text-left">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

// Separate component that uses the context
function SidebarFooter() {
  const { customer } = useCustomerDashboard();
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
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="bg-surface-secondary rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-text-inverted" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-text-primary">
                {customer.name}
              </p>
              <p className="text-xs text-text-secondary">
                {customer.tier} Member
              </p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="p-1 text-text-secondary hover:text-text-primary hover:bg-surface-primary rounded-full transition-colors"
            aria-label="Account options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
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
            onClick={() => {
              handleClose();
              navigate("/dashboard/customer/profile");
            }}
            className="text-text-primary hover:bg-surface-secondary"
          >
            <ListItemIcon>
              <User className="w-4 h-4 text-text-secondary" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/dashboard/customer/settings");
            }}
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

function HeaderActions() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <NotificationMenu />
      <button
        onClick={() => navigate("/dashboard/customer/settings")}
        className="text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
}
