import { Meta } from '@storybook/react';

import { InputState } from '../../molecules';

import {
  ButtonWithInput,
  ButtonWithInputProps,
} from './ButtonWithInput.component';

export default {
  title: 'Organisms/ButtonWithInput',
  component: ButtonWithInput,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  args: {
    isDisabled: false,
    children: 'ButtonWithInput',
    inputPlaceholder: 'Type Here',
    inputSize: 8,
    maxInputLength: 8,
    inputState: InputState.Neutral,
  },
} as Meta<ButtonWithInputProps>;

export const Default = {};

export const Disabled = {
  args: {
    isDisabled: true,
  },
};
