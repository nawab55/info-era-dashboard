
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-blue': '#002142',
        'custom-blue': '#002a53',
        'custom-hover-blue': '#003366',
      },
    },
  },
  plugins: [
    import('@tailwindcss/forms'),
  ],
  variants: {
    extend: {
      display: ["focus-group"]
    }
  }
}

