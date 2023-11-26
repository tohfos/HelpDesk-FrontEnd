/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "lofi", // first one will be the default theme
      "black",
      {
        customTheme: {

          "primary": "#ffffff",

          "secondary": "#ffffff",

          "accent": "#ffffff",

          "neutral": "#ffffff",

          "base-100": "#000000",

          "info": "#00ffff",

          "success": "#ffffff",

          "warning": "#ffff00",

          "error": "#ffffff",
        },
      }
    ],
  },
}

