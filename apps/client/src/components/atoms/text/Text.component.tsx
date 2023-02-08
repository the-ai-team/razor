import React, { ReactElement } from 'react';
import Linkify from 'react-linkify';
// Interfaces
import { TextSize, TextTag, TextType, TextVariant } from '../../../models';
// Constants
import { TextStyles } from '../../../constants';
// Styles
import './text.css';

interface TextContainerProps {
  style: {
    fontSize: `${number}rem`;
  };
  className: string;
  tag: TextTag;
  children: ReactElement;
}

export function TextContainer({
  style,
  className,
  tag,
  children,
}: TextContainerProps): ReactElement {
  const Element = tag;
  return (
    <Element style={style} className={className}>
      {children}
    </Element>
  );
}

interface TextProps {
  type: TextType;
  size: TextSize;
  colorClass?: string;
  className?: string;
  isAnimatable?: boolean;
  as?: TextTag;
  children: string;
}

/**
 *
 * @param type Text type - Display, Title, Paragraph, etc.
 * @param size Text size - Small, Medium, Large, etc.
 * @param children - Text content
 * @param [colorClass=text-neutral-90] Text color text-neutral-90, text-white, etc. (optional)
 * @param [className] - Additional class names (optional)
 * @param [isAnimatable] - Whether the text should be animatable (optional)
 * @param [as] - HTML tag to render the text as, this is tag will be use explicity if component is animatable.  (optional)
 * @returns
 */
export function Text({
  type,
  size,
  children,
  colorClass = 'text-neutral-90',
  className = '',
  isAnimatable = false,
  as,
}: TextProps): ReactElement {
  const textVariant: TextVariant = `${type}.${size}`;
  const textData = TextStyles.TEXT_MAP.get(textVariant);
  // predefined tag by styles
  const textTag = as || textData?.tag || TextTag.Span;
  const textClasses =
    (colorClass || 'text-neutral-90') +
    ' ' +
    className +
    ' ' +
    (isAnimatable && 'transition-all duration-300') +
    ' ' +
    textData?.definedClasses;

  if (!textData) {
    throw new Error(`Text variant ${textVariant} not found`);
  }

  const textContainerProps = {
    style: {
      fontSize: textData.size,
    },
    className: textClasses,
    children: (
      <Linkify
        componentDecorator={(
          decoratedHref,
          decoratedText,
          key,
        ): ReactElement => (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={decoratedHref}
            key={key}
            className='text-neutral-40 underline hover:no-underline'>
            {decoratedText}
          </a>
        )}>
        {children}
      </Linkify>
    ),
  };

  if (isAnimatable) {
    const textTag = as || TextTag.Span;
    return React.createElement(textTag, textContainerProps);
  }

  return <TextContainer {...textContainerProps} tag={textTag} />;
}
