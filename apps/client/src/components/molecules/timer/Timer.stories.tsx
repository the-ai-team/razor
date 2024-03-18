import { Meta } from '@storybook/react';

import { Timer, TimerProps } from './Timer.component';

export default {
  title: 'Molecules/Timer',
  component: Timer,
  args: {
    time: 10,
    showSpeed: false,
    speedValue: '50 WPM',
    speedometerPercentage: 0.25,
    onTimeEnd: () => {
      console.log('Time ended');
    },
  },
} as Meta<TimerProps>;

export const Default = {};
