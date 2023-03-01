import { TextSizeRemValue, TextVariant } from '../models';

export const TEXT_MAP = new Map<TextVariant, TextSizeRemValue>([
  // Display
  ['Display.Large', '6rem'],
  ['Display.Medium', '4.5rem'],
  ['Display.Small', '2.81rem'],
  // Title
  ['Title.Large', '2rem'],
  ['Title.Medium', '1.5rem'],
  ['Title.Small', '1rem'],
  ['Title.XSmall', '.75rem'],
  ['Title.2XSmall', '.5rem'],
  // Label
  ['Label.Medium', '1.63rem'],
  ['Label.Small', '1.25rem'],
  // Heading
  ['Heading.Large', '3rem'],
  ['Heading.Medium', '2rem'],
  // Paragraph
  ['Paragraph.Medium', '1.63rem'],
  ['Paragraph.Small', '1.13rem'],
]);
