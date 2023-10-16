import { Meta } from '@storybook/react';
import { ReactComponent as CarIcon } from 'pixelarticons/svg/car.svg';

import { IconButton, IconButtonProps } from './IconButton.component';

export default {
  title: 'Molecules/IconButton',
  component: IconButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  args: {
    icon: <CarIcon className='w-full h-full text-neutral-90' />,
    label: 'Copy room URL',
    children: 'razor.game/roomID01',
  },
} as Meta<IconButtonProps>;

export const Default = {};
