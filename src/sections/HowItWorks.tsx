const steps = [
  {
    step: "1",
    title: "Set up your business",
    desc: "Create locations, add users and configure taxes & currencies.",
  },
  {
    step: "2",
    title: "Load menu & inventory",
    desc: "Import products, set pricing, and configure stock thresholds.",
  },
  {
    step: "3",
    title: "Start selling",
    desc: "Process orders, print invoices, take payments and track stock.",
  },
  {
    step: "4",
    title: "Analyze & optimize",
    desc: "Use reports and dashboards to improve performance.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
          How it works
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
      </div>
    </section>
  );
}
