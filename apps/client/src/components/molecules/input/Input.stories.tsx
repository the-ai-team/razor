import { Meta } from '@storybook/react';

import { Input, InputProps, InputState } from './Input.component';

export default {
  title: 'Molecules/Input',
  component: Input,
  args: {
    placeholder: 'Your Handle',
    props: {
      size: 12,
    },
  },
} as Meta<InputProps>;

export const Default = {};

export const Valid = {
  args: {
    state: InputState.Valid,
    value: 'ThisIsValid',
  },
};

export const Invalid = {
  args: {
    state: InputState.Invalid,
    value: '$This1sInval!d',
  },
};

export const Disabled = {
  args: {
    isDisabled: true,
  },
};
