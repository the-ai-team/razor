import { Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button.component';

export default {
  title: 'Molecules/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Click Me',
    isCarVisible: false,
    isDisabled: false,
    isButtonDanger: false,
    isFullWidth: true,
  },
} as Meta<ButtonProps>;

export const Default = {};

export const Interactive = {
  args: {
    children: "I'm Interactive",
    isCarVisible: true,
  },
};

export const Disabled = {
  args: {
    children: "You Can't click Me",
    isDisabled: true,
  },
};

export const Danger = {
  args: {
    children: 'Danger Button',
    isButtonDanger: true,
  },
};
