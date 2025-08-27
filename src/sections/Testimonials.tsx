const testimonials = [
  {
    name: "Alice K.",
    role: "Restaurant Owner",
    quote:
      "Premium plan paid for itself in two weeks. Orders are faster and stock is finally under control.",
  },
  {
    name: "Jonas M.",
    role: "Bar Manager",
    quote:
      "Love the kitchen queue and delivery features. The reports make weekly planning easy.",
  },
  {
    name: "Sarah D.",
    role: "Accountant",
    quote:
      "Invoicing, receipts and exports save me hours. Reconciliation is straightforward now.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-surface-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
          What customers say
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-xl bg-surface-card p-6 ring-1 ring-border-subtle"
            >
              <blockquote className="text-text-primary">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">
                  {t.name}
                </span>{" "}
                — {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
