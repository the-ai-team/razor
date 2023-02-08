import {
  TextSize,
  TextSizeRemValue,
  TextTag,
  TextType,
  TextVariant,
} from '../models';

export const TEXT_MAP = new Map<
  TextVariant,
  { size: TextSizeRemValue; tag: TextTag; definedClasses: string }
>([
  // Display
  [
    `${TextType.Display}.${TextSize.Large}`,
    {
      size: '6rem',
      tag: TextTag.Div,
      definedClasses: 'font-sora tracking-[-.25px]',
    },
  ],
  [
    `${TextType.Display}.${TextSize.Medium}`,
    {
      size: '4.5rem',
      tag: TextTag.Div,
      definedClasses: 'font-sora tracking-[-.25px]',
    },
  ],
  [
    `${TextType.Display}.${TextSize.Small}`,
    {
      size: '2.81rem',
      tag: TextTag.Div,
      definedClasses: 'font-sora tracking-[-.25px]',
    },
  ],
  // Title
  [
    `${TextType.Title}.${TextSize.Large}`,
    {
      size: '2rem',
      tag: TextTag.Div,
      definedClasses: 'font-sora tracking-[.15px]',
    },
  ],
  [
    `${TextType.Title}.${TextSize.Medium}`,
    {
      size: '1.5rem',
      tag: TextTag.Div,
      definedClasses: 'font-sora tracking-[.15px]',
    },
  ],
  [
    `${TextType.Title}.${TextSize.Small}`,
    {
      size: '1rem',
      tag: TextTag.Div,
      definedClasses: 'font-sora tracking-[.15px]',
    },
  ],
  [
    `${TextType.Title}.${TextSize.ExtraSmall}`,
    {
      size: '.75rem',
      tag: TextTag.Div,
      definedClasses: 'font-sora tracking-[.15px]',
    },
  ],
  [
    `${TextType.Title}.${TextSize.DoubleExtraSmall}`,
    {
      size: '.5rem',
      tag: TextTag.Div,
      definedClasses: 'font-sora tracking-[.15px]',
    },
  ],
  // Label
  [
    `${TextType.Label}.${TextSize.Medium}`,
    {
      size: '1.63rem',
      tag: TextTag.Span,
      definedClasses: 'font-major tracking-[.5px]',
    },
  ],
  [
    `${TextType.Label}.${TextSize.Small}`,
    {
      size: '1.25rem',
      tag: TextTag.Span,
      definedClasses: 'font-major tracking-[.5px]',
    },
  ],
  // Heading
  [
    `${TextType.Heading}.${TextSize.Large}`,
    {
      size: '3rem',
      tag: TextTag.HeadingLarge,
      definedClasses: 'font-roboto tracking-[.15px] font-medium',
    },
  ],
  [
    `${TextType.Heading}.${TextSize.Medium}`,
    {
      size: '2rem',
      tag: TextTag.HeadingMedium,
      definedClasses: 'font-roboto tracking-[.15px]',
    },
  ],
  // Paragraph
  [
    `${TextType.Paragraph}.${TextSize.Medium}`,
    {
      size: '1.63rem',
      tag: TextTag.Paragraph,
      definedClasses: 'font-roboto font-medium text-indent',
    },
  ],
  [
    `${TextType.Paragraph}.${TextSize.Small}`,
    { size: '1.13rem', tag: TextTag.Paragraph, definedClasses: 'font-roboto' },
  ],
]);
