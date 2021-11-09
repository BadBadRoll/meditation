// const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/layouts/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      0: '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      '4/5': '80vh',
      screen: '100vh',
      10: '10rem',
      20: '20rem'
    },
    minWidth: {
      0: '0px',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      10: '100px',
      20: '200px',
      30: '300px',
      40: '400px',
      50: '500px'
    },
    extend: {
      spacing: {
        18: '4.5rem',
        88: '22rem',
        92: '23rem',
        104: '26rem',
        112: '28rem',
        120: '30rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
        168: '42rem',
        240: '60rem',
        256: '64rem'
      },
      colors: {
        // primary: {
        //   light: colors.blue[400],
        //   DEFAULT: colors.blue[500],
        //   hover: colors.blue[600]
        // },
        primary: {
          light: '#373576',
          DEFAULT: '#000000',
          dark: '#00001d',
          hover: '#1d06bd'
        },
        secondary: {
          light: '#fff655',
          DEFAULT: '#fdc414',
          dark: '#c59400'
        }
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '0.75rem' }]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    // require('@tailwindcss/aspect-ratio')
  ],
  important: true
}
