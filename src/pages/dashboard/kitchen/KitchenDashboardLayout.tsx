import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { withRoleGuard } from "../../../auth/roleGuard";
import { KitchenDashboardProvider, useKitchenDashboard } from "./context";
import {
  ChefHat,
  Clock,
  AlertTriangle,
  X,
  LogOut,
  MoreVertical,
  Activity,
} from "lucide-react";
import KitchenNotificationMenu from "./KitchenNotificationMenu";
// Removed Material-UI imports for better consistency

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const nav = [
    {
      to: "/dashboard/kitchen",
      label: "Kitchen Queue",
      icon: Clock,
      end: true,
    },
    {
      to: "/dashboard/kitchen/orders",
      label: "Order Management",
      icon: ChefHat,
    },
    {
      to: "/dashboard/kitchen/metrics",
      label: "Performance",
      icon: Activity,
    },
    {
      to: "/dashboard/kitchen/alerts",
      label: "Alerts",
      icon: AlertTriangle,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("brms_user");
    navigate("/");
  };

  return (
    <KitchenDashboardProvider>
      <div className="min-h-screen bg-surface-secondary flex">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Fixed Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-border-primary">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-text-primary">Kitchen</h1>
                <p className="text-xs text-text-secondary">Orders</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-brand text-white shadow-sm"
                          : "text-text-secondary hover:text-brand hover:bg-brand/5"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* Kitchen Status */}
          <div className="mt-8 px-3">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">
                  Kitchen Active
                </span>
              </div>
              <p className="text-xs text-green-600">All stations operational</p>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Fixed Top bar */}
          <header className="bg-white shadow-sm border-b border-border-primary sticky top-0 z-30">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-text-primary">
                    Kitchen Orders
                  </h1>
                  <p className="text-sm text-text-secondary">
                    Manage and process customer orders
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Connection Status */}
                <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm border border-success/20">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="font-medium">Connected</span>
                </div>

                {/* Notifications */}
                <KitchenNotificationMenu />

                {/* User Menu */}
                <UserMenu onLogout={handleLogout} />
              </div>
            </div>
          </header>

          {/* Scrollable Page content */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </KitchenDashboardProvider>
  );
}

function UserMenu({ onLogout }: { onLogout: () => void }) {
  const { currentStaff } = useKitchenDashboard();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">
            {currentStaff?.name?.charAt(0) || "K"}
          </span>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-text-primary">
            {currentStaff?.name || "Kitchen Staff"}
          </p>
          <p className="text-xs text-text-secondary">
            {currentStaff?.role || "Kitchen Staff"}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border-primary z-50">
          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                // Handle kitchen status
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
            >
              <Activity className="w-4 h-4" />
              Kitchen Status
            </button>
            <div className="border-t border-border-primary my-1"></div>
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRoleGuard(Layout, "Kitchen");
