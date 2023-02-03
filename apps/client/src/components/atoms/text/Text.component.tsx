import { ReactElement } from 'react';
import cs from 'classnames';
// Interfaces
import { TextSizeTag, TextTypeTag, TextVariant } from '../../../models';
// Constants
import { TextStyles } from '../../../constants';
// Styles
import './text.css';

interface TextProps {
  type: TextTypeTag;
  size: TextSizeTag;
  colorClass?: string;
  className?: string;
  children: string;
}

export function Text({
  type,
  size,
  colorClass,
  className,
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
    if (size === 'Medium') {
      return (
        <p style={style} className={`${className} font-medium text-indent`}>
          {children}
        </p>
      );
    } else {
      return (
        <p style={style} className={className}>
          {children}
        </p>
      );
    }
  };

  /** Related text size to the text variant */
  const textSizeValue = TextStyles.TEXT_MAP.get(textVariant);
  const classNames = (colorClass || 'text-neutral-90') + ' ' + className;

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
