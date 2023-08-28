import React, { ReactElement } from 'react';
import cs from 'classnames';

import { TextSize, TextType } from '../../../models';
import { Text } from '../../';

export interface ListItemProps {
  title: string;
  imgURL?: string;
  rightText?: string;
  number?: number;
  isTranslucent?: boolean;
}

/**
 *
 * @param title - Text content
 * @param imgURL - URL of the Image/Icon to be displayed on the left side of the list item (optional)
 * @param rightText - Text to be displayed on the right side of the list item (optional)
 * @param [isTranslucent=false] - Changes the item to translucent (optional)
 * @param [number=-1] - Number to be displayed on the left side of the list item (optional)
 */
export function ListItem({
  title,
  imgURL,
  rightText,
  isTranslucent = false,
  number = -1,
}: ListItemProps): ReactElement {
  return (
    <div
      className={cs(
        'flex items-center justify-between',
        'px-10 py-3',
        'bg-neutral-20',
        'rounded-md',
        'border-[3px] border-neutral-40',
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
          <img src={imgURL} alt='' className='w-14 h-14 overflow-hidden' />
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
