import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";
import CartIcon from "./CartIcon";
import { getSessionUser, clearSessionUser } from "../auth/session";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize navigation data to prevent unnecessary re-renders
  const allNavigation = useMemo(
    () => [
      { name: "Home", href: "/", type: "link" },
      { name: "Businesses", href: "/businesses", type: "link" },
      { name: "Features", href: "#features", type: "anchor" },
      { name: "How it Works", href: "#how-it-works", type: "anchor" },
      { name: "Testimonials", href: "#testimonials", type: "anchor" },
      { name: "FAQ", href: "#faq", type: "anchor" },
    ],
    []
  );

  // Memoize dashboard route mapping to prevent recreation on every render
  const dashboardRoutes = useMemo(
    () => ({
      Admin: "/dashboard/admin",
      Owner: "/dashboard/owner",
      Manager: "/dashboard/manager",
      Accountant: "/dashboard/accountant",
      Waiter: "/dashboard/waiter",
      Customer: "/dashboard/customer",
    }),
    []
  );

  // Check for user authentication
  useEffect(() => {
    const sessionUser = getSessionUser();
    setUser(sessionUser);
  }, [location.pathname]); // Re-check when route changes

  // Optimized click outside handler with useCallback
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = event.target as Element;
        if (!target.closest(".user-menu-container")) {
          setIsUserMenuOpen(false);
        }
      }
    },
    [isUserMenuOpen]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Memoized dashboard route getter
  const getDashboardRoute = useCallback(
    (role: string) => {
      return dashboardRoutes[role as keyof typeof dashboardRoutes] || "/";
    },
    [dashboardRoutes]
  );

  // Optimized logout handler
  const handleLogout = useCallback(() => {
    clearSessionUser();
    setUser(null);
    setIsUserMenuOpen(false);
    navigate("/");
  }, [navigate]);

  // Memoize filtered navigation to prevent unnecessary filtering on every render
  const navigation = useMemo(() => {
    return allNavigation.filter((item) => {
      // If we're on home page, show all items
      if (location.pathname === "/") {
        return true;
      }
      // If we're not on home page, only show link items (not anchor items)
      return item.type === "link";
    });
  }, [allNavigation, location.pathname]);

  // Optimized navigation click handler
  const handleNavClick = useCallback(
    (href: string, type: string) => {
      if (type === "anchor") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else if (type === "link") {
        navigate(href);
      }
      setIsMobileMenuOpen(false);
    },
    [navigate]
  );

  // Optimized mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Optimized user menu toggle
  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  // Memoize user avatar initial to prevent recalculation
  const userInitial = useMemo(() => {
    return user?.name?.charAt(0)?.toUpperCase() || "U";
  }, [user?.name]);

  // Memoize user role for performance
  const userRole = useMemo(() => {
    return user?.role || "";
  }, [user?.role]);

  return (
    <header className="sticky top-0 z-50 bg-surface-primary/95 backdrop-blur-md border-b border-border-primary shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-4 font-bold text-text-primary group hover:scale-105 transition-transform duration-200"
          >
            <div className="relative">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:from-brand-hover group-hover:to-brand-active">
                <span className="text-text-inverted font-bold text-xl">B</span>
              </div>
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent border-2 border-white shadow-sm">
                <div className="w-full h-full rounded-full bg-accent-hover animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl leading-none font-bold bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
                BRMS
              </span>
              <span className="text-sm text-text-secondary font-medium">
                Restaurant Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.type)}
                className="relative px-4 py-3 text-sm font-semibold text-text-secondary hover:text-brand hover:bg-brand/5 rounded-xl transition-all duration-200 group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-brand-hover/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-brand to-brand-hover rounded-full transition-all duration-300 group-hover:w-8"></div>
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <CartIcon />

            {user ? (
              /* User Menu */
              <div className="relative user-menu-container">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-text-secondary hover:text-brand hover:bg-brand/5 rounded-xl transition-all duration-200 border border-transparent hover:border-brand/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-hover rounded-full flex items-center justify-center">
                    <span className="text-text-inverted text-sm font-semibold">
                      {userInitial}
                    </span>
                  </div>
                  <span className="hidden sm:block">{user.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-surface-primary rounded-2xl shadow-xl border border-border-primary py-3 z-50">
                    <div className="px-4 py-3 border-b border-border-secondary">
                      <p className="text-sm font-semibold text-text-primary">
                        {user.name}
                      </p>
                      <p className="text-xs text-text-muted">{user.email}</p>
                      <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-brand/10 text-brand rounded-full">
                        {userRole}
                      </span>
                    </div>

                    <div className="py-2">
                      <Link
                        to={getDashboardRoute(userRole)}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-brand/5 transition-colors duration-200 rounded-lg mx-2"
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-brand/5 transition-colors duration-200 rounded-lg mx-2"
                      >
                        <Settings className="w-4 h-4" />
                        Profile Settings
                      </Link>
                    </div>

                    <div className="border-t border-border-secondary pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/5 transition-colors duration-200 w-full rounded-lg mx-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest User CTAs */
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-sm font-semibold text-text-secondary hover:text-brand hover:bg-brand/5 rounded-xl transition-all duration-200 border border-transparent hover:border-brand/20"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-brand to-brand-hover text-text-inverted px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-brand-hover hover:to-brand-active shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <CartIcon />
            <button
              onClick={toggleMobileMenu}
              className="p-3 rounded-xl text-text-muted hover:text-brand hover:bg-brand/5 transition-all duration-200 border border-transparent hover:border-brand/20"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border-primary bg-surface-primary shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Navigation Links */}
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.type)}
                  className="block w-full text-left px-4 py-3 text-base font-semibold text-text-secondary hover:text-brand hover:bg-brand/5 rounded-xl transition-all duration-200 border border-transparent hover:border-brand/20"
                >
                  {item.name}
                </button>
              ))}

              {/* Auth Section */}
              <div className="pt-4 border-t border-border-primary mt-4">
                {user ? (
                  /* Logged-in User Mobile Menu */
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="px-4 py-3 bg-surface-secondary rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-hover rounded-full flex items-center justify-center">
                          <span className="text-text-inverted text-lg font-semibold">
                            {userInitial}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">
                            {user.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            {user.email}
                          </p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-brand/10 text-brand rounded-full">
                            {userRole}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* User Actions */}
                    <Link
                      to={getDashboardRoute(userRole)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-text-secondary hover:text-brand hover:bg-brand/5 rounded-xl transition-all duration-200 border border-transparent hover:border-brand/20"
                    >
                      <User className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-text-secondary hover:text-brand hover:bg-brand/5 rounded-xl transition-all duration-200 border border-transparent hover:border-brand/20"
                    >
                      <Settings className="w-5 h-5" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-error hover:bg-error/5 rounded-xl transition-all duration-200 w-full border border-transparent hover:border-error/20"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  /* Guest User Mobile Menu */
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-4 py-3 text-base font-semibold text-text-secondary hover:text-brand hover:bg-brand/5 rounded-xl transition-all duration-200 border border-border-primary hover:border-brand/20"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center bg-gradient-to-r from-brand to-brand-hover text-text-inverted px-6 py-3 rounded-xl text-base font-semibold hover:from-brand-hover hover:to-brand-active shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
