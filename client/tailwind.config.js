/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#002B42",
        "light-white": "rgba(255,255,255,0.17)",
        "blue": "#005A8B",
        "light-blue": "#1489C8",
        "black": "#171717",
        "paleblue": "#F0FAFF",
        "gray": "#5E6265",
        "lighter-blue": "#D9F2FF",
      },
      fontFamily: {
        sans: ['Inter'],
      },
    },
  },
  plugins: [],
}