import { Input, InputProps } from './Input.component';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Molecules/Input',
  component: Input,
  args: {
    placeholder: 'Your Handle',
    isValid: false,
    isInvalid: false,
    props: {
      size: 12,
    },
  },
} as Meta<InputProps>;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Default = Template.bind({});

export const Valid = Template.bind({});
Valid.args = {
  isValid: true,
  value: 'ThisIsValid',
};

export const Invalid = Template.bind({});
Invalid.args = {
  isInvalid: true,
  value: '$This1sInval!d',
};
