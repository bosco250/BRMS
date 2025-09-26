/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          DEFAULT: "#2D5A5A", // Deep Teal
          hover: "#235555",
          active: "#1A4A4A",
        },
        accent: {
          DEFAULT: "#E67E22", // Warm Amber
          hover: "#D35400",
          active: "#C0752A",
        },

        // Surfaces (Light / Dark)
        surface: {
          primary: "#FFFFFF",
          secondary: "#F8F9FA",
          card: "#FFFFFF",
          sidebar: "#F5F6F7",
          dark: {
            primary: "#1A1D21",
            secondary: "#252831",
            card: "#2A2E35",
            sidebar: "#1F2327",
          },
        },

        // Text (Light / Dark)
        text: {
          primary: "#2C3E50",
          secondary: "#5A6C7D",
          muted: "#8B9DC3",
          inverted: "#FFFFFF",
          dark: {
            primary: "#E2E8F0",
            secondary: "#CBD5E0",
            muted: "#718096",
            inverted: "#1A1D21",
          },
        },

        // Borders (Light / Dark)
        border: {
          primary: "#E1E8ED",
          secondary: "#D0D7DE",
          subtle: "#F1F3F4",
          dark: {
            primary: "#4A5568",
            secondary: "#3A4553",
            subtle: "#2D3748",
          },
        },

        // Status
        success: {
          DEFAULT: "#10B981",
          hover: "#059669",
        },
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",

        // Finance
        finance: {
          positive: "#059669",
          negative: "#DC2626",
          neutral: "#6B7280",
        },

        // Order Status
        order: {
          pending: "#F59E0B",
          preparing: "#3B82F6",
          ready: "#10B981",
          served: "#6B7280",
          cancelled: "#EF4444",
        },

        // Priority
        priority: {
          high: "#DC2626",
          medium: "#F59E0B",
          low: "#6B7280",
        },

        // Dashboard
        dashboard: "#EAEEEF",
      },
    },
  },
  plugins: [],
};
