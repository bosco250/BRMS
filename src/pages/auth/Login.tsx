import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { sanitizeInput, validateEmail } from "../../utils/sanitize";
import MarketingPanel from "../../components/auth/MarketingPanel";
import { loginUser } from "./apiService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!sanitizedEmail.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!sanitizedPassword.trim()) {
      toast.error("Password is required");
      return;
    }

    if (sanitizedPassword.length < 3) {
      toast.error("Password must be at least 3 characters");
      return;
    }

    if (sanitizedEmail.includes("@") && !validateEmail(sanitizedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      // Use API call for authentication
      const user = await loginUser(sanitizedEmail, sanitizedPassword);

      if (!user || !user.access_token) {
        toast.error("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // Store access token
      localStorage.setItem("access_token", user.access_token);

      let role = "";
      if (user.role) {
        // Handle role as object with role_name property
        if (typeof user.role === "object" && user.role.role_name) {
          role = String(user.role.role_name || "")
            .toLowerCase()
            .trim();
        } else {
          role = String(user.role || "")
            .toLowerCase()
            .trim();
        }
      } else {
        // Try to decode JWT to get role
        try {
          const payload = JSON.parse(atob(user.access_token.split(".")[1]));
          role = String(payload.role || "")
            .toLowerCase()
            .trim();
        } catch (e) {
          role = "";
        }
      }

      // Set up session user data for role-based routing
      const sessionUser = {
        id: user.user_id || user.userId || "1",
        role: role, // Use the extracted role
        name: user.name || "Admin User",
        email: sanitizedEmail,
        phone: user.phone || "",
        expiresAt: Date.now() + 12 * 60 * 60 * 1000, // 12 hours
      };
      localStorage.setItem("brms_user", JSON.stringify(sessionUser));

      const routeByRole: Record<string, string> = {
        admin: "/dashboard/admin",
        business_owner: "/dashboard/owner",
        manager: "/dashboard/manager",
        accountant: "/dashboard/accountant",
        waiter: "/dashboard/waiter",
        customer: "/dashboard/customer",
        kitchen: "/dashboard/kitchen",
        cook: "/dashboard/kitchen",
        chef: "/dashboard/kitchen", // Added chef mapping
      };

      const targetRoute = routeByRole[role] || "/dashboard";

      // Validate that we have a role before proceeding
      if (!role) {
        console.error("No role found for user");
        toast.error("Unable to determine user role. Please contact support.");
        setLoading(false);
        return;
      }

      // Show success message
      toast.success("Login successful! Redirecting...");

      // Navigate immediately without delay
      try {
        navigate(targetRoute, { replace: true });
      } catch (navError) {
        console.error("Navigation failed:", navError);
        // Fallback navigation
        window.location.href = targetRoute;
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12 sm:py-16 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="hidden lg:block">
            <MarketingPanel
              badgeText="BRMS"
              title="Manage your bar & restaurant with confidence"
              subtitle="Fast, secure, multi-tenant platform with role-based dashboards, real-time orders, and analytics."
              benefits={[
                {
                  title: "Secure by default",
                  description: "MFA-ready, TLS 1.3, RBAC with audit logs.",
                  badgeClass: "bg-success/15 text-success",
                },
                {
                  title: "Lightning fast",
                  description: "Under 2s page loads, smooth interactions.",
                  badgeClass: "bg-info/15 text-info",
                },
                {
                  title: "All roles supported",
                  description:
                    "Admin, Owner, Manager, Accountant, Waiter, Customer, Kitchen.",
                  badgeClass: "bg-accent/15 text-accent",
                },
              ]}
              stats={[
                { label: "Uptime", value: "99.9%" },
                { label: "Avg. Order Time", value: "~12m" },
                { label: "Regions", value: "+20" },
              ]}
              gradientFromClass="from-brand/10"
              gradientToClass="to-accent/10"
            />
          </div>
          <div className="max-w-md w-full mx-auto lg:mx-0">
            <h1 className="text-3xl font-bold text-text-primary">Sign in</h1>
            <p className="mt-2 text-text-secondary">
              Welcome back. Please enter your credentials.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-8 rounded-2xl bg-surface-card p-6 ring-1 ring-border-secondary shadow-md"
            >
              <div className="grid gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    className="mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-text-primary"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot"
                      className="text-xs text-brand hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative mt-1">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-surface-primary px-3 py-2 pr-10 text-sm text-text-primary placeholder:text-text-muted ring-1 ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/30"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-primary focus:outline-none"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-brand-hover shadow-sm"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-text-secondary border-t border-border-subtle pt-4">
                New here?{" "}
                <Link to="/register" className="text-brand hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
