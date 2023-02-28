import { Meta, Story } from '@storybook/react';
import { InputState } from '../../molecules';
import {
  ButtonWithInputProps,
  ButtonWithInput,
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

const Template: Story<ButtonWithInputProps> = args => (
  <ButtonWithInput {...args} />
);

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
