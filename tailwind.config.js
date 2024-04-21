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
        'rotate': 'rotate'
      }
    },
  },
  plugins: [],
};
