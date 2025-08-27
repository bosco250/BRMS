import { motion } from "framer-motion";

type Partner = { name: string; monogram: string; kind: "Bar" | "Restaurant" };

const partners: Partner[] = [
  { name: "Urban Bar", monogram: "UB", kind: "Bar" },
  { name: "Cafe One", monogram: "C1", kind: "Restaurant" },
  { name: "Gastro Pub", monogram: "GP", kind: "Bar" },
  { name: "Bistro 24", monogram: "B24", kind: "Restaurant" },
  { name: "Tap & Grill", monogram: "TG", kind: "Bar" },
  { name: "Lumen Hotel", monogram: "LH", kind: "Restaurant" },
];

export default function Partners() {
  return (
    <section className="py-12 bg-surface-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-text-secondary">
            In good company
          </p>
          <h3 className="mt-2 text-lg font-semibold text-text-primary">
            Trusted by teams running busy bars and restaurants
          </h3>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-stretch gap-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              className="flex"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex-1 rounded-xl bg-surface-card ring-1 ring-border-subtle p-4 flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-brand text-text-inverted flex items-center justify-center text-sm font-bold">
                  {p.monogram}
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    {p.name}
                  </div>
                  <div className="mt-1 inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent ring-1 ring-accent/20">
                    {p.kind}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
