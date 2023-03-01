import { ReactElement } from 'react';
import { Text } from '../../';

interface DescriptionProps {
  title: string;
  image?: string;
  children: string;
}

export function Description({
  title,
  image,
  children,
}: DescriptionProps): ReactElement {
  return (
    <div className='description'>
      <Text type='Title' size='Medium'>
        {title}
      </Text>
      {image ? (
        <img src={image} alt={title} />
      ) : (
        <div className='bg-text-light my-4 h-60 rounded-md w-full' />
      )}
      <Text type='Paragraph' size='Small'>
        {children}
      </Text>
    </div>
  );
}
