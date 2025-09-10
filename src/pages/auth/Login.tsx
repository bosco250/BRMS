import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authenticate } from "../../data/users";
import { setSessionUser } from "../../auth/session";
import { sanitizeInput, validateEmail } from "../../utils/sanitize";
import MarketingPanel from "../../components/auth/MarketingPanel";

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Sanitize inputs
    const sanitizedIdentifier = sanitizeInput(identifier);
    const sanitizedPassword = sanitizeInput(password);

    // Form validation
    if (!sanitizedIdentifier.trim()) {
      setError("Email or phone number is required");
      return;
    }

    if (!sanitizedPassword.trim()) {
      setError("Password is required");
      return;
    }

    if (sanitizedPassword.length < 3) {
      setError("Password must be at least 3 characters");
      return;
    }

    // Validate email format if it looks like an email
    if (
      sanitizedIdentifier.includes("@") &&
      !validateEmail(sanitizedIdentifier)
    ) {
      setError("Please enter a valid email address");
      return;
    }

    const user = authenticate(sanitizedIdentifier, sanitizedPassword);
    if (!user) {
      setError(
        "Invalid credentials. Try the demo users (e.g., admin@brms.dev / admin123)."
      );
      return;
    }
    setSessionUser(user);
    const role = user.role;
    const routeByRole: Record<string, string> = {
      Admin: "/dashboard/admin",
      Owner: "/dashboard/owner",
      Manager: "/dashboard/manager",
      Accountant: "/dashboard/accountant",
      Waiter: "/dashboard/waiter",
      Customer: "/dashboard/customer",
    };
    navigate(routeByRole[role] || "/");
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
                    "Admin, Owner, Manager, Accountant, Waiter, Customer.",
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
                    Email or Phone
                  </label>
                  <input
                    id="email"
                    type="text"
                    autoComplete="username"
                    className="mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="you@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
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
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-primary focus:outline-none"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {error && <div className="text-sm text-error">{error}</div>}
                <button
                  type="submit"
                  className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-brand-hover shadow-sm"
                >
                  Sign in
                </button>
                <div className="text-xs text-text-secondary">
                  Demo users:
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    <li>admin@brms.dev / admin123 (Admin)</li>
                    <li>owner@brms.dev / owner123 (Owner)</li>
                    <li>manager@brms.dev / manager123 (Manager)</li>
                    <li>accountant@brms.dev / account123 (Accountant)</li>
                    <li>waiter@brms.dev / waiter123 (Waiter)</li>
                    <li>customer@brms.dev / customer123 (Customer)</li>
                  </ul>
                </div>
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
