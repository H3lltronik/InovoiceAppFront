module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      width: {
      },
      screens: {
        xs: '420px',
      },
      colors: {
        'purple-dark': '#7C5DFA',
        'purple-light': '#9277FF',
        'black-light': '#141625',
        'black-dark': '#0C0E16',
        'blue-dark': '#252945',
        'blue-darker': '#1E2139',
        'white-dark': '#DFE3FA',
        'white-light': '#F8F8FB',
        'gray-light': '#888EB0',
        'gray-dark': '#7E88C3',
        'red-dark': '#EC5757',
        'red-light': '#FF9797',
      },
      fontFamily: {
        'primary': "Spartan, sans-serif",
      },
      container: {
        screens: {
          sm: "100%",
          md: "100%",
          lg: "730px",
          xl: "730px",
          '2xl': '730px',
        }
      },
      animation: {
        slideOutLeft: 'slideOutLeft 0.5s ease-in-out forwards',
      },
      keyframes: {
        slideOutLeft: {
          '100%': { 
            transform: 'translateX(-100%)', 
            display: 'none' }
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
