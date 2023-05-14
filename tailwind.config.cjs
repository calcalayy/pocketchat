/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        calcium: {
            "primary": "#2563eb",
            "secondary": "#1e40af",
            "accent": "#10576D",
            "neutral": "#120C12",
            "base-100": "#20161F",
            "info": "#8DCAC1",
            "success": "#9DB787",
            "warning": "#FFD25F",
            "error": "#FC9581",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};

module.exports = config;
