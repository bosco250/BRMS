const faqs = [
  {
    q: "Can I use BRMS across multiple locations?",
    a: "Yes. Premium supports up to 3, and Enterprise supports unlimited locations.",
  },
  {
    q: "Do you support thermal printing?",
    a: "Yes. We support ESC/POS-compatible printers for invoices and receipts.",
  },
  {
    q: "What payment types are supported?",
    a: "Cash, mobile money, and other processors depending on your region.",
  },
  {
    q: "Is there an API?",
    a: "Premium and Enterprise include OAuth2 APIs with rate limiting and webhooks.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-20 bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
          Frequently asked questions
        </h2>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-xl bg-surface-card p-6 ring-1 ring-border-subtle"
            >
              <dt className="font-semibold text-text-primary">{f.q}</dt>
              <dd className="mt-2 text-sm text-text-secondary">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
