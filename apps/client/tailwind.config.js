const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const colors = require('tailwindcss/colors')
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).tsx'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      text: {
        light: '#F4DDDB',
      },
      bg:{
        brown: '#3B2D2C',
        'brown-100': '#6B5A59',
      },
      white: colors.white,
    },
  },
  plugins: [],
};
