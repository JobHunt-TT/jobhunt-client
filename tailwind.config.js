/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        politectico: "#6D0D2E",
        facebook: "#3b5998",
        "x-twitter": "#14171A",
        instagram: "#C13584",
      },
      backgroundImage: {
        'frase': "url('./../img/Frase.jpg')"
      },
      transitionProperty: {
        'label-form': 'top, font-size, line-height',
        'rotate': 'rotate',
        'width-step': 'width',
        'border-step': 'border-color',
        'color-step': 'color',
        'display': 'display'
      },
      height: {
        'screen-menu': 'calc(100vh - 3.5rem)'
      },
      boxShadow: {
        'float': '0px 0px 6px 1px rgba(0,0,0,0.25);'
      }
    },
  },
  plugins: [],
};
