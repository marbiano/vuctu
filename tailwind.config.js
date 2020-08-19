module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['Arvo', 'sans-serif'],
    },
    extend: {
      colors: {
        oranged: '#ed4c38',
        'oranged-black': '#181717',
      },
    },
  },
  variants: {},
  plugins: [],
};
