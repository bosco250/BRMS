export const colors = {
  // Brand colors - Using CSS variables from index.css
  brand: {
    primary: "var(--color-brand)", // Warm orange
    hover: "var(--color-brand-dark)", // Darker orange
    active: "#c0392b", // Deep red-orange
    light: "var(--color-brand-light)", // Light cream
    dark: "#a93226", // Dark red
  },

  // Business type colors
  business: {
    restaurant: "var(--color-brand)", // Warm orange
    bar: "#8b5cf6", // Purple
    cafe: "#22c55e", // Green
  },

  // Status colors
  status: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Order status colors
  order: {
    pending: "#f59e0b",
    preparing: "#3b82f6",
    ready: "#10b981",
    served: "#6b7280",
    cancelled: "#ef4444",
  },

  // Priority colors
  priority: {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#6b7280",
  },

  // Finance colors
  finance: {
    positive: "#10b981",
    negative: "#ef4444",
    neutral: "#6b7280",
  },
} as const;

// Utility functions
export function getBusinessTypeColor(
  type: "restaurant" | "bar" | "cafe"
): string {
  return colors.business[type];
}

export function getOrderStatusColor(
  status: "pending" | "preparing" | "ready" | "served" | "cancelled"
): string {
  return colors.order[status];
}

export function getStatusColor(
  status: "success" | "warning" | "error" | "info"
): string {
  return colors.status[status];
}

export function getPriorityColor(priority: "high" | "medium" | "low"): string {
  return colors.priority[priority];
}

export function getFinanceColor(
  type: "positive" | "negative" | "neutral"
): string {
  return colors.finance[type];
}
