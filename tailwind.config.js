module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: '6A6A6A',
        green: {
          light: '#C3DDAD',
          DEFAULT: '#82BC4B',
        },
        red: '#BC4C4B',
      },
      width: {
        '48%': '48%',
        '52%': '52%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
