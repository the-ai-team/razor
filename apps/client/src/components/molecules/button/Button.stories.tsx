import { Button, ButtonProps } from './Button.component';
import { Story, Meta } from '@storybook/react';

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
    isFillWidth: true,
  },
} as Meta<ButtonProps>;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Default = Template.bind({});

export const Interactive = Template.bind({});
Interactive.args = {
  children: "I'm Interactive",
  isCarVisible: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "You Can't click Me",
  isDisabled: true,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Danger Button',
  isButtonDanger: true,
};
