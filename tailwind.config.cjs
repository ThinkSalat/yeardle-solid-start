/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'rose-of-sharon': {
          '50': 'oklch(98.69% 0.02 95.28)',
          '100': 'oklch(96.19% 0.06 95.62)',
          '200': 'oklch(92.23% 0.11 95.05)',
          '300': 'oklch(87.61% 0.15 91.40)',
          '400': 'oklch(83.39% 0.16 84.24)',
          '500': 'oklch(76.56% 0.16 69.85)',
          '600': 'oklch(66.29% 0.16 58.02)',
          '700': 'oklch(57.20% 0.15 48.47)',
          '800': 'oklch(47.16% 0.13 45.56)',
          '900': 'oklch(41.21% 0.11 45.10)',
          '950': 'oklch(27.91% 0.07 45.64)',
        },
        'gr': {
          '0': '#94a34a',
          '1': '#e5942e',
          '2': '#964a1c',
          '3': '#78231c',
          '4': '#462e0c',
          '5': '#32271f',
        }
      },
      safelist: [{
        pattern: /(bg|text|border)-gr-(0|1|2|3|4|5)/
      }]
    }
  },
  plugins: []
};
