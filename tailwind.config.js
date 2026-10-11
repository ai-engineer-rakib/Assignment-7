/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bn: ["var(--font-hind)", "Hind Siliguri", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bazar: {
          // colors taken from the Penpot design tokens
          primary: "#05893e",
          "primary-content": "#f3fbf4",
          secondary: "#1a9951",
          accent: "#1a9951",
          neutral: "#1d271f",
          "neutral-content": "#fafcfa",
          "base-100": "#fafcfa",
          "base-200": "#f0f5f0",
          "base-300": "#e1e8e1",
          "base-content": "#1d271f",
          info: "#0ea5e9",
          success: "#1a9951",
          warning: "#f59e0b",
          error: "#d03739",
          "error-content": "#fff6f5",
        },
      },
    ],
  },
};
