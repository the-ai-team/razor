import '../src/styles.css';
import '../src/i18n';

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#201A1A',
      },
    ],
  },
  paddings: {
    values: [
      { name: 'Small', value: '16px' },
      { name: 'Medium', value: '64px' },
      { name: 'Large', value: '128px' },
      { name: 'Extra Large', value: '256px' },
    ],
    default: 'Medium',
  },
};
