import React from "react";

type Benefit = {
  title: string;
  description: string;
  badgeClass?: string; // e.g., "bg-success/15 text-success"
};

type Stat = {
  label: string;
  value: string;
};

interface MarketingPanelProps {
  badgeText: string;
  title: string;
  subtitle: string;
  benefits: Benefit[];
  stats: Stat[];
  gradientFromClass?: string; // e.g., "from-brand/10"
  gradientToClass?: string; // e.g., "to-accent/10"
}

export default function MarketingPanel({
  badgeText,
  title,
  subtitle,
  benefits,
  stats,
  gradientFromClass = "from-brand/10",
  gradientToClass = "to-accent/10",
}: MarketingPanelProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-border-secondary shadow-md bg-gradient-to-br via-surface-card"
      style={{}}
    >
      <div
        className={`absolute inset-0 opacity-[0.06] pointer-events-none text-brand`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, currentColor 2px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      ></div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientFromClass} ${gradientToClass} mix-blend-normal pointer-events-none`}
      ></div>
      <div className="relative p-8 flex flex-col h-full">
        <div>
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-brand/10 text-brand ring-1 ring-brand/20">
            {badgeText}
          </span>
          <h2 className="mt-3 text-2xl font-bold text-text-primary">{title}</h2>
          <p className="mt-2 text-text-secondary">{subtitle}</p>
        </div>
        <ul className="mt-6 space-y-3">
          {benefits.map((b, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center text-xs ${
                  b.badgeClass || "bg-success/15 text-success"
                }`}
              >
                ✓
              </span>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {b.title}
                </p>
                <p className="text-xs text-text-secondary">{b.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid grid-cols-3 gap-3 pt-8">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-surface-secondary/80 p-4 ring-1 ring-border-secondary"
            >
              <p className="text-[10px] uppercase tracking-wide text-text-secondary">
                {s.label}
              </p>
              <p className="text-xl font-bold text-text-primary">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
