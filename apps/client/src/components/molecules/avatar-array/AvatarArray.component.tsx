import { ReactElement } from 'react';
import cs from 'classnames';
import { times } from 'lodash';

export interface AvatarArrayProps {
  avatars: string[];
  maxAvatars?: number;
}

/**
 *
 * @param avatars - Array of avatar URLs
 * @param [maxAvatars=3] - Maximum number of avatars to be displayed
 */
export function AvatarArray({
  avatars,
  maxAvatars = 3,
}: AvatarArrayProps): ReactElement {
  const avatarsToDisplay = avatars.slice(0, maxAvatars);

  return (
    <div
      className={cs(
        'absolute top-0 -left-28',
        'flex items-center justify-end',
      )}>
      {times(maxAvatars + 1, index => {
        const reversedIndex = maxAvatars - index;
        const isMoreThanMaxAvatars = avatars.length > maxAvatars;
        return (
          <div
            key={reversedIndex}
            id={`avatar-${reversedIndex}`}
            className={cs(
              'w-8 h-8 rounded-full  border-2 border-neutral-20',
              'flex items-center justify-center',
              {
                '-ml-2': index !== 0,
                'bg-neutral-50':
                  avatarsToDisplay.length > reversedIndex ||
                  isMoreThanMaxAvatars,
              },
            )}
            style={{
              backgroundImage:
                avatarsToDisplay.length > reversedIndex
                  ? `url(${avatarsToDisplay[reversedIndex]})`
                  : '',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            {isMoreThanMaxAvatars && index === 0 ? (
              <span className={cs('text-md font-extralight text-neutral-90')}>
                +
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
