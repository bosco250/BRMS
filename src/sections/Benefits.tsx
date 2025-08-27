import { FaBolt, FaShieldAlt, FaCloud, FaMobileAlt } from "react-icons/fa";

const benefits = [
  {
    title: "Fast & Reliable",
    desc: "99.9% uptime with real-time inventory updates in under 500ms.",
    icon: FaBolt,
  },
  {
    title: "Secure by Design",
    desc: "TLS 1.3, MFA for admins, RBAC and comprehensive audit logs.",
    icon: FaShieldAlt,
  },
  {
    title: "Cloud SaaS",
    desc: "Multi-tenant architecture that scales across locations and teams.",
    icon: FaCloud,
  },
  {
    title: "POS on the go",
    desc: "Responsive, touch-friendly UI optimized for tablets and phones.",
    icon: FaMobileAlt,
  },
];

export default function Benefits() {
  return (
    <section className="py-16 sm:py-20 bg-surface-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-xl bg-brand/10 p-6 ring-1 ring-brand/30"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <b.icon />
                </span>
                <h3 className="font-semibold text-text-primary">{b.title}</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
