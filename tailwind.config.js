module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      borderRadius: {
        '16px': '16px',
        '32px': '32px',
      },
      boxShadow: {
        DEFAULT: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        gray: {
          light: 'rgba(106, 106, 106, 0.5)',
          DEFAULT: '#6A6A6A',
        },
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
      height: {
        '56px': '56px',
      },
      margin: {
        '8px': '8px',
        '16px': '16px',
        '56px': '56px',
      },
      opacity: {
        50: '0.5',
      },
      padding: {
        '8px': '8px',
        '16px': '16px',
        '24px': '24px',
        '32px': '32px',
        '40px': '40px',
        '48px': '48px',
        '56px': '56px',
        '64px': '64px',
        '72px': '72px',
        '88px': '88px',
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
