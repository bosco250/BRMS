import { Link } from "react-router-dom";
import MarketingPanel from "../../components/auth/MarketingPanel";

export default function Register() {
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

            <form className="mt-8 rounded-2xl bg-surface-card p-6 ring-1 ring-border-secondary shadow-md">
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
                    type="text"
                    className="mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Jane Doe"
                  />
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
                    type="email"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="you@example.com"
                  />
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
                    type="tel"
                    autoComplete="tel"
                    className="mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="+250 7xx xxx xxx"
                  />
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
                    type="password"
                    autoComplete="new-password"
                    className="mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-brand-hover shadow-sm"
                >
                  Create account
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
