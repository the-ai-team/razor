import { Input, InputProps, InputState } from './Input.component';
import { Story, Meta } from '@storybook/react';

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

const Template: Story<InputProps> = args => <Input {...args} />;

export const Default = Template.bind({});

export const Valid = Template.bind({});
Valid.args = {
  state: InputState.Valid,
  value: 'ThisIsValid',
};

export const Invalid = Template.bind({});
Invalid.args = {
  state: InputState.Invalid,
  value: '$This1sInval!d',
};
