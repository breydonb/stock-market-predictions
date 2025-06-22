import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  safelist: [],
  theme: {
    extend: {
      backgroundColor: {
        background: "var(--color-bg)",
        navigation: "var(--color-nav-bg)",
      },
      textColor: {
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
      },
      fontFamily: {
        sans: ['var(--default-font)'],
      },
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".bg-navigation" : { backgroundColor: "var(--color-nav-bg)" },
        ".bg-background" : { backgroundColor: "var(--color-bg)" },
        }, 
        ["responsive", "hover", "dark"])
      }),
    ],
}

