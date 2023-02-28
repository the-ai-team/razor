import { Meta, Story } from '@storybook/react';

import { Description } from '../../molecules';

import { Panel, PanelProps } from './Panel.component';

export default {
  title: 'Molecules/Panel',
  component: Panel,
  args: {
    title: 'Panel Title',
  },
} as Meta<PanelProps>;

const Template: Story<PanelProps> = args => <Panel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: [
    <>
      <Description
        title='Subtitle1'
        image='https://via.placeholder.com/200x100'>
        Ullamco id occaecat voluptate et laboris ex fugiat cillum elit adx
        nostrud magna.,
      </Description>
      <Description
        title='Subtitle2'
        image='https://via.placeholder.com/200x100'>
        Do labore laborum in adipisicing anim veniam fugiat do voluptate quis
        anim.,
      </Description>
      <Description
        title='Subtitle3'
        image='https://via.placeholder.com/200x100'>
        Sit nulla exercitation velit magna commodo et qui mollit.,
      </Description>
    </>,
  ],
};
