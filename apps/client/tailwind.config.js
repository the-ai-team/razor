const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const colors = require('tailwindcss/colors');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec)(.tsx|.ts)'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      neutral: {
        20: '#3B2D2C',
        40: '#6B5A59',
        90: '#F4DDDB',
      },
      primary: {
        30: '#8F0E1C',
        40: '#B12A30',
        50: '#D34446',
      },
      error: {
        60: '#FF5449',
      },
      white: colors.white,
      surface: '#201A1A',
    },
    fontFamily: {
      sora: ['"Sora"', 'sans-serif'],
      roboto: ['"Roboto Mono"', 'monospace'],
      major: ['"Major Mono Display"', 'monospace'],
    },
  },
  plugins: [],
};
