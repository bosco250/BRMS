import { FaCheck, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Plan = {
  name: string;
  price: string;
  cta: string;
  highlight?: boolean;
  allowances: Array<{ label: string; value: string; available?: boolean }>;
  link: string;
};

const plans: Plan[] = [
  {
    name: "Basic",
    price: "29,000 RWF/mo",
    cta: "Start Basic",
    link: "/register?type=business",
    allowances: [
      { label: "Locations", value: "1" },
      { label: "Users", value: "Up to 5" },
      { label: "Inventory", value: "Core tracking" },
      { label: "Orders", value: "Dine-in & Takeaway" },
      { label: "Reporting", value: "Standard sales" },
      { label: "Notifications", value: "Email alerts" },
      { label: "API Access", value: "Not included", available: false },
      { label: "Support", value: "Email support" },
    ],
  },
  {
    name: "Premium",
    price: "79,000 RWF/mo",
    cta: "Start Premium",
    link: "/register?type=business",
    highlight: true,
    allowances: [
      { label: "Locations", value: "Up to 3" },
      { label: "Users", value: "Up to 25" },
      { label: "Inventory", value: "Advanced + Suppliers" },
      { label: "Orders", value: "+ Delivery & KOT" },
      { label: "Reporting", value: "Sales & Inventory" },
      { label: "Notifications", value: "Email & SMS" },
      { label: "API Access", value: "OAuth2 API (rate-limited)" },
      { label: "Support", value: "Priority email & chat" },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cta: "Contact Sales",
    link: "/contact?plan=enterprise",
    allowances: [
      { label: "Locations", value: "Unlimited" },
      { label: "Users", value: "Unlimited" },
      { label: "Inventory", value: "Enterprise + Analytics" },
      { label: "Orders", value: "+ Multi-branch routing" },
      { label: "Reporting", value: "Full, BI-ready export" },
      { label: "Notifications", value: "Email, SMS & Webhooks" },
      { label: "API Access", value: "Full API & Webhooks" },
      { label: "Support", value: "Dedicated success manager" },
    ],
  },
];

export default function Subscriptions() {
  return (
    <section id="subscriptions" className="py-16 sm:py-20 bg-surface-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Flexible plans for every stage
          </h2>
          <p className="mt-3 text-text-secondary">
            Choose a subscription tier that matches your operations and scale as
            you grow.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col shadow-sm ring-1 ${
                plan.highlight
                  ? "bg-accent/10 ring-accent"
                  : "bg-brand/10 ring-brand/30"
              }`}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-text-inverted ring-1 ring-accent/30">
                  Most popular
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-bold text-text-primary">
                    {plan.price}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {plan.allowances.map((a) => (
                  <li key={a.label} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${
                        a.available === false
                          ? "bg-error/10 text-error"
                          : "bg-brand/10 text-brand"
                      }`}
                    >
                      {a.available === false ? <FaMinus /> : <FaCheck />}
                    </span>
                    <div>
                      <p className="font-medium text-text-primary">{a.label}</p>
                      <p className="text-text-secondary">{a.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  to={plan.link}
                  className={`w-full rounded-md px-4 py-2 text-sm font-medium inline-block text-center ${
                    plan.highlight
                      ? "bg-accent text-text-inverted hover:bg-accent-hover active:bg-accent-active"
                      : "bg-brand text-text-inverted hover:bg-brand-hover active:bg-brand-active"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/20`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
