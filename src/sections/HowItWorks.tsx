const steps = [
  {
    step: "1",
    title: "Browse restaurants",
    desc: "Find nearby places, see menus, reviews, and estimated times.",
  },
  {
    step: "2",
    title: "Place your order",
    desc: "Customize items, apply promos, and pay securely—no account needed.",
  },
  {
    step: "3",
    title: "Track in real time",
    desc: "Watch prep and delivery status from kitchen to your table or door.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
          How ordering works
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-xl bg-surface-card p-6 ring-1 ring-border-subtle"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-text-inverted font-bold">
                  {s.step}
                </span>
                <h3 className="font-semibold text-text-primary">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-text-secondary">
          Secure payments. Easy refunds. Live updates. Support when you need it.
        </p>
      </div>
    </section>
  );
}
