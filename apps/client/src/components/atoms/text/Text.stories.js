import { Text } from './Text.component';

export default {
  title: 'Atoms/Text',
  component: Text,
  args: {
    children: 'Hello Razor!',
    size: 'Medium',
    type: 'Display',
  },
};

const Template = args => <Text {...args} />;

export const DisplaySmall = Template.bind({});
DisplaySmall.args = {
  type: 'Display',
  size: 'Small',
};

export const DisplayMedium = Template.bind({});
DisplayMedium.args = {
  type: 'Display',
  size: 'Medium',
};

export const DisplayLarge = Template.bind({});
DisplayLarge.args = {
  type: 'Display',
  size: 'Large',
};

export const TitleSmall = Template.bind({});
TitleSmall.args = {
  type: 'Title',
  size: 'Small',
};

export const TitleMedium = Template.bind({});
TitleMedium.args = {
  type: 'Title',
  size: 'Medium',
};

export const TitleLarge = Template.bind({});
TitleLarge.args = {
  type: 'Title',
  size: 'Large',
};

export const TitleXSmall = Template.bind({});
TitleXSmall.args = {
  type: 'Title',
  size: 'XSmall',
};

export const Title2XSmall = Template.bind({});
Title2XSmall.args = {
  type: 'Title',
  size: '2XSmall',
};

export const LabelSmall = Template.bind({});
LabelSmall.args = {
  type: 'Label',
  size: 'Small',
};

export const LabelMedium = Template.bind({});
LabelMedium.args = {
  type: 'Label',
  size: 'Medium',
};

export const HeadingMedium = Template.bind({});
HeadingMedium.args = {
  type: 'Heading',
  size: 'Medium',
};

export const HeadingLarge = Template.bind({});
HeadingLarge.args = {
  type: 'Heading',
  size: 'Large',
};

export const ParagraphSmall = Template.bind({});
ParagraphSmall.args = {
  type: 'Paragraph',
  size: 'Small',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl.',
};

export const ParagraphMedium = Template.bind({});
ParagraphMedium.args = {
  type: 'Paragraph',
  size: 'Medium',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl.',
};
