import {
  FaBoxes,
  FaCashRegister,
  FaChartBar,
  FaClipboardList,
  FaUserShield,
  FaBell,
  FaReceipt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  // Customer-first
  {
    title: "Live order tracking",
    description: "See prep and delivery status in real time on any device.",
    icon: FaBell,
  },
  {
    title: "Fast re-order",
    description: "Reorder your favorites in two taps. Save time every visit.",
    icon: FaClipboardList,
  },
  {
    title: "Secure payments",
    description: "Pay with mobile money or card. Your data stays protected.",
    icon: FaReceipt,
  },
  // Team benefits
  {
    title: "Orders & Tables",
    description:
      "Dine-in, takeaway, delivery with table management and kitchen queues.",
    icon: FaClipboardList,
  },
  {
    title: "Inventory & Stock",
    description:
      "Real-time stock tracking, supplier management, alerts, and adjustments.",
    icon: FaBoxes,
  },
  {
    title: "CRM & Loyalty",
    description:
      "Customer profiles, preferences, visit history and loyalty rewards.",
    icon: FaCashRegister,
  },
  {
    title: "Reporting & Analytics",
    description:
      "Sales, inventory and financial reports with export to PDF/Excel.",
    icon: FaChartBar,
  },
  {
    title: "Secure RBAC & Subscriptions",
    description:
      "Role-based access control, MFA, and flexible multi-tenant plans.",
    icon: FaUserShield,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Made for customers. Built for your team.
          </h2>
          <p className="mt-3 text-text-secondary">
            Delight guests with simple ordering and live updates, while your
            team gets powerful tools for smooth operations.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="rounded-xl bg-brand/10 p-6 shadow-sm ring-1 ring-brand/30"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <f.icon />
                </span>
                <h3 className="font-semibold text-text-primary">{f.title}</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
