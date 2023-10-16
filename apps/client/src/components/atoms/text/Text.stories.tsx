import { Meta } from '@storybook/react';

import { TextSize, TextType } from '../../../models';

import { Text, TextProps } from './Text.component';

export default {
  title: 'Atoms/Text',
  component: Text,
  args: {
    children: 'Hello Razor!',
    size: TextSize.Medium,
    type: TextType.Display,
  },
} as Meta<TextProps>;

export const DisplaySmall = {
  args: {
    type: TextType.Display,
    size: TextSize.Small,
  },
};

export const DisplayMedium = {
  args: {
    type: TextType.Display,
    size: TextSize.Medium,
  },
};

export const DisplayLarge = {
  args: {
    type: TextType.Display,
    size: TextSize.Large,
  },
};

export const TitleSmall = {
  args: {
    type: TextType.Title,
    size: TextSize.Small,
  },
};

export const TitleMedium = {
  args: {
    type: TextType.Title,
    size: TextSize.Medium,
  },
};

export const TitleLarge = {
  args: {
    type: TextType.Title,
    size: TextSize.Large,
  },
};

export const TitleXSmall = {
  args: {
    type: TextType.Title,
    size: TextSize.ExtraSmall,
  },
};

export const Title2XSmall = {
  args: {
    type: TextType.Title,
    size: TextSize.DoubleExtraSmall,
  },
};

export const LabelSmall = {
  args: {
    type: TextType.Label,
    size: TextSize.Small,
  },
};

export const LabelMedium = {
  args: {
    type: TextType.Label,
    size: TextSize.Medium,
  },
};

export const HeadingMedium = {
  args: {
    type: TextType.Heading,
    size: TextSize.Medium,
  },
};

export const HeadingLarge = {
  args: {
    type: TextType.Heading,
    size: TextSize.Large,
  },
};

export const ParagraphSmall = {
  args: {
    type: TextType.Paragraph,
    size: TextSize.Small,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl.',
  },
};

export const ParagraphMedium = {
  args: {
    type: TextType.Paragraph,
    size: TextSize.Medium,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl vel nisl.',
  },
};
