import React from "react";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  accentClass?: string; // e.g., "bg-brand/10"
  children?: React.ReactNode;
}

export default function InfoCard({
  title,
  icon,
  accentClass = "bg-surface-secondary",
  children,
}: InfoCardProps) {
  return (
    <div
      className="rounded-2xl p-6 ring-1 ring-border-subtle shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-dashboard"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${accentClass}`}>{icon}</div>
        <div className="flex-1">
          <p className="font-semibold text-text-primary mb-1">{title}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
