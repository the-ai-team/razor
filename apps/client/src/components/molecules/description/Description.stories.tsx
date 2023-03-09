import { Description, DescriptionProps } from './Description.component';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Molecules/Description',
  component: Description,
  args: {
    title: 'Sample Title',
    image: 'https://via.placeholder.com/200x100',
    children:
      'Nostrud do aliquip irure nisi deserunt dolore enim reprehenderit qui tempor excepteur mollit nulla. Fugiat non Lorem consectetur duis ea excepteur do irure anim. Laborum ea elit cupidatat tempor nostrud pariatur nulla ex in laboris culpa reprehenderit. Veniam et velit aliqua est aute officia sint magna. Ipsum proident esse veniam proident qui enim commodo deserunt in. Minim Lorem occaecat cillum sit esse nostrud laboris est voluptate. Nostrud aliquip excepteur cupidatat voluptate.',
  },
} as Meta<DescriptionProps>;

const Template: Story<DescriptionProps> = args => <Description {...args} />;

export const Default = Template.bind({});
