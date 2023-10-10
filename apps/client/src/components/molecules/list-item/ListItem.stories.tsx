import { Meta, Story } from '@storybook/react';

import { ListItem, ListItemProps } from './ListItem.component';

export default {
  title: 'Molecules/ListItem',
  component: ListItem,
  args: {
    imgURL: 'https://avatars.dicebear.com/api/open-peeps/737373.svg?scale=80',
    title: 'JohnDoe',
    number: 1,
    rightText: '64 wpm',
  },
} as Meta<ListItemProps>;

const Template: Story<ListItemProps> = args => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  isTranslucent: false,
};

export const Translucent = Template.bind({});
Translucent.args = {
  isTranslucent: true,
};
