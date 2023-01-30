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
      white: colors.white,
    },
  },
  plugins: [],
};
