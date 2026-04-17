/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#64748b",
        accent: "#10b981",
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        deepblue: {
          "primary": "#3b82f6",       // Vibrant Blue for primary actions
          "primary-content": "#ffffff",
          "secondary": "#1e293b",     // Slate 800
          "accent": "#10b981",        // Emerald
          "neutral": "#0f172a",       // Navy 950
          "base-100": "#0f172a",      // Deep Navy Background
          "base-200": "#1e293b",      // Slate 800 for sections
          "base-300": "#334155",      // Slate 700 for borders
          "base-content": "#f8fafc",  // High contrast text (Slate 50)
          "info": "#3abff8",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
          "--rounded-box": "0.1rem",  // Sharp corners for professional look
          "--rounded-btn": "0.1rem",
        },
      },
      "dark",
    ],
  },
}
