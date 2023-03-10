import { ReactElement } from 'react';
import { Trans } from 'react-i18next';
import { Text } from '../../';
import { TextSize, TextType } from '../../../models';

export interface DescriptionProps {
  title: string;
  image?: string;
  children: string | ReactElement<typeof Trans>;
}

/**
 *
 * @param title - Title of the description
 * @param children - Text content
 * @param [image] - Image to display (optional)
 */
export function Description({
  title,
  image,
  children,
}: DescriptionProps): ReactElement {
  return (
    <div className='w-full'>
      <Text type={TextType.Title} size={TextSize.Medium}>
        {title}
      </Text>
      {image ? (
        <img className='my-4 rounded-md w-full' src={image} alt={title} />
      ) : (
        <div className='bg-neutral-90 my-4 h-60 rounded-md w-full' />
      )}
      <Text type={TextType.Paragraph} size={TextSize.Small}>
        {children}
      </Text>
    </div>
  );
}
