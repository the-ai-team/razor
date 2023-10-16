import { Meta } from '@storybook/react';

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

export const Default = {
  args: {
    isTranslucent: false,
  },
};

export const Translucent = {
  args: {
    isTranslucent: true,
  },
};
