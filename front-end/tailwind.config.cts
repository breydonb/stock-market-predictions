/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html, svelte, ts}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
      },
    },
  },
  plugins: [],
}

