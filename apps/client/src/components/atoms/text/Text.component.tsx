import { ReactElement } from 'react';
// Interfaces
import { TextSizeTag, TextTypeTag, TextVariant } from '../../../models';
// Constants
import { TextStyles } from '../../../constants';
// Styles
import './text.css';

export interface TextProps {
  type: TextTypeTag;
  size: TextSizeTag;
  // eslint-disable-next-line react/require-default-props
  colorClass?: string;
  children: string;
}

export function Text({
  type,
  size,
  colorClass,
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

  if (!textSizeValue) {
    return <span>{children}</span>;
  } else {
    switch (type) {
      case 'Display':
        return (
          <div
            style={{ fontSize: textSizeValue }}
            className={`variant-display font-sora ${
              colorClass || 'text-text-light'
            }`}>
            {children}
          </div>
        );
      case 'Title':
        return (
          <div
            style={{ fontSize: textSizeValue }}
            className={`variant-title font-sora ${
              colorClass || 'text-text-light'
            }`}>
            {children}
          </div>
        );
      case 'Label':
        return (
          <div
            style={{ fontSize: textSizeValue }}
            className={`variant-label font-major-mono-display ${
              colorClass || 'text-text-light'
            }`}>
            {children}
          </div>
        );
      case 'Heading':
        return (
          <Heading
            size={size}
            style={{ fontSize: textSizeValue }}
            className={`variant-heading font-roboto-mono ${
              colorClass || 'text-text-light'
            }`}>
            {children}
          </Heading>
        );
      case 'Paragraph':
        return (
          <Paragraph
            size={size}
            style={{ fontSize: textSizeValue }}
            className={`variant-paragraph font-roboto-mono ${
              colorClass || 'text-text-light'
            }`}>
            {children}
          </Paragraph>
        );
      // This function never reaches the default case.
      default:
        throw new Error('Unexpected object: ' + type);
    }
  }
}
