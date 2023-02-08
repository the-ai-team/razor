import { ReactElement } from 'react';
import cs from 'classnames';
import Linkify from 'react-linkify';
// Interfaces
import { TextSizeTag, TextTypeTag, TextVariant } from '../../../models';
// Constants
import { TextStyles } from '../../../constants';
// Styles
import './text.css';

type allowedTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TextProps {
  type: TextTypeTag;
  size: TextSizeTag;
  colorClass?: string;
  className?: string;
  isAnimatable?: boolean;
  asHeading?: allowedTags;
  children: string;
}

export function Text({
  type,
  size,
  colorClass,
  className,
  isAnimatable,
  asHeading,
  children,
}: TextProps): ReactElement {
  const textVariant: TextVariant = `${type}.${size}`;

  interface SubTextProps {
    size: TextSizeTag;
    style: React.CSSProperties;
    className: string;
    children: string;
  }

  // === Heading ===
  const Heading = ({
    size,
    style,
    className,
    children,
  }: SubTextProps): React.ReactElement => {
    if (size === 'Large') {
      return (
        <h1 style={style} className={className + ' font-medium'}>
          {children}
        </h1>
      );
    } else if (size === 'Medium') {
      return (
        <h2 style={style} className={className}>
          {children}
        </h2>
      );
    } else {
      return (
        <h3 style={style} className={className}>
          {children}
        </h3>
      );
    }
  };

  // === Paragraph ===
  const Paragraph = ({
    size,
    style,
    className,
    children,
  }: SubTextProps): React.ReactElement => {
    const content = (
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
    );

    if (size === 'Medium') {
      return (
        <p style={style} className={`${className} font-medium text-indent`}>
          {content}
        </p>
      );
    } else {
      return (
        <p style={style} className={className}>
          {content}
        </p>
      );
    }
  };

  /** Related text size to the text variant */
  const textSizeValue = TextStyles.TEXT_MAP.get(textVariant);
  const classNames =
    (colorClass || 'text-neutral-90') +
    ' ' +
    className +
    ' ' +
    (isAnimatable && 'transition-all duration-300');

  if (!textSizeValue) {
    return <span>{children}</span>;
  } else {
    switch (type) {
      case 'Display':
        return (
          <div
            style={{ fontSize: textSizeValue }}
            className={cs('font-sora tracking-[-.25px]', classNames)}>
            {children}
          </div>
        );
      case 'Title':
        return (
          <div
            style={{ fontSize: textSizeValue }}
            className={cs('font-sora tracking-[.15px]', classNames)}>
            {children}
          </div>
        );
      case 'Label':
        return (
          <div
            style={{ fontSize: textSizeValue }}
            className={cs('font-major tracking-[.5px]', classNames)}>
            {children}
          </div>
        );
      case 'Heading':
        // If the text is animatable, then we use custom Heading component to avoid rerendering of element.
        if (isAnimatable) {
          const Tag = asHeading || 'h1';
          return (
            <Tag
              style={{ fontSize: textSizeValue }}
              className={cs('font-roboto tracking-[.15px]', classNames)}>
              {children}
            </Tag>
          );
        }
        return (
          <Heading
            size={size}
            style={{ fontSize: textSizeValue }}
            className={cs('font-roboto tracking-[.15px]', classNames)}>
            {children}
          </Heading>
        );
      case 'Paragraph':
        return (
          <Paragraph
            size={size}
            style={{ fontSize: textSizeValue }}
            className={cs('font-roboto', classNames)}>
            {children}
          </Paragraph>
        );
      // This function never reaches the default case.
      default:
        throw new Error('Unexpected object: ' + type);
    }
  }
}
