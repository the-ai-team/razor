import { TextSize, TextType } from '../../../models';
import { Text } from './Text.component';

export default {
  title: 'Atoms/Text',
  component: Text,
  args: {
    children: 'Hello Razor!',
    size: TextSize.Medium,
    type: TextType.Display,
  },
};

const Template = args => <Text {...args} />;

export const DisplaySmall = Template.bind({});
DisplaySmall.args = {
  type: TextType.Display,
  size: TextSize.Small,
};

export const DisplayMedium = Template.bind({});
DisplayMedium.args = {
  type: TextType.Display,
  size: TextSize.Medium,
};

export const DisplayLarge = Template.bind({});
DisplayLarge.args = {
  type: TextType.Display,
  size: TextSize.Large,
};

export const TitleSmall = Template.bind({});
TitleSmall.args = {
  type: TextType.Title,
  size: TextSize.Small,
};

export const TitleMedium = Template.bind({});
TitleMedium.args = {
  type: TextType.Title,
  size: TextSize.Medium,
};

export const TitleLarge = Template.bind({});
TitleLarge.args = {
  type: TextType.Title,
  size: TextSize.Large,
};

export const TitleXSmall = Template.bind({});
TitleXSmall.args = {
  type: TextType.Title,
  size: TextSize.ExtraSmall
};

export const Title2XSmall = Template.bind({});
Title2XSmall.args = {
  type: TextType.Title,
  size: TextSize.DoubleExtraSmall,
};

export const LabelSmall = Template.bind({});
LabelSmall.args = {
  type: TextType.Label,
  size: TextSize.Small
};

export const LabelMedium = Template.bind({});
LabelMedium.args = {
  type: TextType.Label,
  size: TextSize.Medium
};

export const HeadingMedium = Template.bind({});
HeadingMedium.args = {
  type: TextType.Heading,
  size: TextSize.Medium
};

export const HeadingLarge = Template.bind({});
HeadingLarge.args = {
  type: TextType.Heading,
  size: TextSize.Large
};

export const ParagraphSmall = Template.bind({});
ParagraphSmall.args = {
  type: TextType.Paragraph,
  size: TextSize.Small,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl.',
};

export const ParagraphMedium = Template.bind({});
ParagraphMedium.args = {
  type: TextType.Paragraph,
  size: TextSize.Medium,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl.',
};
