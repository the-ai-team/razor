import { Button, ButtonProps } from './Button.component';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Molecules/Button',
  component: Button,
  args: {
    children: 'Click Me',
    onClick: (): void => console.log('Clicked'),
    isCarVisible: false,
    isDisable: false,
    isButtonDanger: false,
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
  isDisable: true,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Danger Button',
  isButtonDanger: true,
};
