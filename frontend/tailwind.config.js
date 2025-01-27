/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primarydark: 'theme("colors.cyan.800")',
        primary: 'theme("colors.cyan.500")',
        primarylight: 'theme("colors.cyan.400")',
      },
    },
  },
  plugins: [],
};
