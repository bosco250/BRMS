import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MarketingPanel from "../../components/auth/MarketingPanel";

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "customer", // "customer" or "business"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user type from URL parameters
  useEffect(() => {
    const userType = searchParams.get("type");

    if (userType && ["customer", "business"].includes(userType)) {
      setFormData((prev) => ({ ...prev, userType }));
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store user data in localStorage (in a real app, this would be handled by the backend)
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.userType === "business" ? "owner" : "customer",
        userType: formData.userType,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      // Redirect based on user type
      if (formData.userType === "business") {
        navigate("/dashboard/owner");
      } else {
        navigate("/dashboard/customer");
      }
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  return (
    <section className="py-12 sm:py-16 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="hidden lg:block">
            <MarketingPanel
              badgeText="Get started"
              title="Everything you need to run your business"
              subtitle="From orders to payments to analytics—built for speed, reliability, and growth."
              benefits={[
                {
                  title: "Role-based dashboards",
                  description: "Tailored experiences for every team member.",
                  badgeClass: "bg-brand/15 text-brand",
                },
                {
                  title: "Order flow from menu to payment",
                  description:
                    "Seamless dine-in, takeaway and delivery support.",
                  badgeClass: "bg-success/15 text-success",
                },
                {
                  title: "Insightful analytics",
                  description: "Track sales, inventory and customer loyalty.",
                  badgeClass: "bg-info/15 text-info",
                },
              ]}
              stats={[
                { label: "Setup Time", value: "~5m" },
                { label: "Supported Roles", value: "6" },
                { label: "Orders/day", value: "1k+" },
              ]}
              gradientFromClass="from-brand/10"
              gradientToClass="to-accent/10"
            />
          </div>

          <div className="max-w-md w-full mx-auto lg:mx-0">
            <h1 className="text-3xl font-bold text-text-primary text-left">
              Create account
            </h1>
            <p className="mt-2 text-text-secondary">Start your BRMS journey.</p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-2xl bg-surface-card p-6 ring-1 ring-border-secondary shadow-md"
            >
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              <div className="grid gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ${
                      errors.name
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-border-subtle focus:ring-brand/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="Jane Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="relative flex cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="customer"
                        checked={formData.userType === "customer"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`flex-1 rounded-lg border-2 p-4 text-center transition-colors ${
                          formData.userType === "customer"
                            ? "border-brand bg-brand/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-semibold text-text-primary">
                          Customer
                        </div>
                        <div className="text-sm text-text-secondary">
                          Order food & drinks
                        </div>
                      </div>
                    </label>
                    <label className="relative flex cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="business"
                        checked={formData.userType === "business"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`flex-1 rounded-lg border-2 p-4 text-center transition-colors ${
                          formData.userType === "business"
                            ? "border-brand bg-brand/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-semibold text-text-primary">
                          Business Owner
                        </div>
                        <div className="text-sm text-text-secondary">
                          Manage restaurant
                        </div>
                      </div>
                    </label>
                  </div>
                  {errors.userType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.userType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ${
                      errors.email
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-border-subtle focus:ring-brand/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ${
                      errors.phone
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-border-subtle focus:ring-brand/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="+250 7xx xxx xxx"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ${
                      errors.password
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-border-subtle focus:ring-brand/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ${
                      errors.confirmPassword
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-border-subtle focus:ring-brand/30"
                    } focus:outline-none focus:ring-2`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-brand-hover shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </div>
              <p className="mt-6 text-center text-sm text-text-secondary border-t border-border-subtle pt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-brand hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}