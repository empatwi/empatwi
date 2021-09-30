module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      borderRadius: {
        '16px': '16px',
      },
      boxShadow: {
        DEFAULT: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        gray: '6A6A6A',
        green: {
          light: '#C3DDAD',
          DEFAULT: '#82BC4B',
        },
        red: '#BC4C4B',
      },
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
      },
      fontSize: {
        '36px': '36px',
      },
      padding: {
        '16px': '16px',
        '24px': '24px',
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
