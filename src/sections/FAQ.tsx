const faqs = [
  {
    q: "Do I need an account to browse menus?",
    a: "No. You can explore restaurants and menus without signing up.",
  },
  {
    q: "Is payment secure?",
    a: "Yes. We use trusted processors and never store full card details.",
  },
  {
    q: "Can I pick up instead of delivery?",
    a: "Absolutely. Choose pickup at checkout and we’ll notify you when it’s ready.",
  },
  {
    q: "How do I track my order?",
    a: "You’ll see real-time status from the kitchen to your table or door.",
  },
  {
    q: "What if something goes wrong?",
    a: "Our support can help with order issues, refunds, or adjustments.",
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
