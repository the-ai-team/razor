import React, { ReactElement } from 'react';
import cs from 'classnames';
import { TextSize, TextTag, TextType, TextVariant } from '../../../models';
import { TextStyles } from '../../../constants';
import { Trans } from 'react-i18next';

interface TextContainerProps {
  style: React.CSSProperties;
  className: string;
  tag: TextTag;
  children: string | ReactElement<typeof Trans>;
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

export interface TextProps {
  type: TextType;
  size: TextSize;
  colorClass?: string;
  className?: string;
  isAnimatable?: boolean;
  as?: TextTag;
  // children can be either string or i18next TransComponent
  children: string | ReactElement<typeof Trans>;
}

/**
 *
 * @param type Text type - Display, Title, Paragraph, etc.
 * @param size Text size - Small, Medium, Large, etc.
 * @param children - Inner content (Text or text with links)
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
  const textClasses = cs(
    colorClass,
    { className: className },
    { 'transition-all duration-300': isAnimatable },
    textData?.definedClasses,
  );

  if (!textData) {
    throw new Error(`Text variant ${textVariant} not found`);
  }

  const textContainerProps = {
    style: {
      fontSize: textData.size,
    },
    className: textClasses,
    children,
  };

  if (isAnimatable) {
    const textTag = as || TextTag.Span;
    return React.createElement(textTag, textContainerProps);
  }

  return <TextContainer {...textContainerProps} tag={textTag} />;
}

export interface LinkProps {
  url: string;
  children: string;
}

// Link component (This is a child of Text component)
export function Link({ url, children }: LinkProps): ReactElement {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={url}
      className='text-neutral-40 underline hover:no-underline'>
      {children}
    </a>
  );
}
