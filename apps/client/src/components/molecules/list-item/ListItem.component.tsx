import React, { ReactElement } from 'react';
import cs from 'classnames';

import { TextSize, TextType } from '../../../models';
import { Text } from '../../';

export interface ListItemProps {
  title: string;
  imgURL?: string;
  rightText?: string;
  number?: number;
  isHighlighted?: boolean;
  isTranslucent?: boolean;
}

/**
 *
 * @param title - Text content
 * @param imgURL - URL of the Image/Icon to be displayed on the left side of the list item (optional)
 * @param rightText - Text to be displayed on the right side of the list item (optional)
 * @param [isTranslucent=false] - Changes the item to translucent (optional)
 * @param [isHighlighted=false] - Changes the item to highlighted (optional)
 * @param [number=-1] - Number to be displayed on the left side of the list item (optional)
 */
export function ListItem({
  title,
  imgURL,
  rightText,
  isTranslucent = false,
  isHighlighted = false,
  number = -1,
}: ListItemProps): ReactElement {
  return (
    <div
      className={cs(
        'flex items-center justify-between',
        'px-10 py-3',
        'bg-neutral-20',
        'rounded-md',
        isHighlighted
          ? 'border-neutral-40 border-4'
          : 'border-neutral-30 border-2',
        { 'opacity-60': isTranslucent },
      )}>
      <div className='flex items-center justify-center gap-4'>
        {number >= 0 ? (
          <Text
            type={TextType.Title}
            size={TextSize.Medium}
            className='text-white'>
            {number.toString()}
          </Text>
        ) : null}
        {imgURL ? (
          <img
            src={imgURL}
            alt=''
            className='w-14 h-14 overflow-hidden bg-neutral-40 rounded-full'
          />
        ) : null}
        <Text type={TextType.Title} size={TextSize.Medium}>
          {title}
        </Text>
      </div>
      {rightText && (
        <Text
          type={TextType.Title}
          size={TextSize.Medium}
          className='text-white'>
          {rightText}
        </Text>
      )}
    </div>
  );
}
