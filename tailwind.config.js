/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': {'max': '480px'},
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1300px',
    },
    colors: {
      'textBlue': '#458DB5',
      'borderGray': '#9A9090',
      'backgroundBlue': '#E9F8FF',
      'backgroundGray': '#F9F7F7',
      'gray': '#9e9c96',
      'white': '#fff',
      'black': '#3c4043',
      'googleBorderGray': '#dadce0',
      'hoverBlue': '#ebf4fa',
      'hoverGoogle': '#aee0fc',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}

