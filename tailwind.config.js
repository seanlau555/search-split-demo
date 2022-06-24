/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],

  theme: {
    extend: {},
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    // Or with a custom prefix:
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
}
