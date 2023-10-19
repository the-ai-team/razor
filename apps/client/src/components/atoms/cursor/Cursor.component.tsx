import { ReactElement } from 'react';
import cs from 'classnames';
import { ReactComponent as LockIcon } from 'pixelarticons/svg/lock.svg';

export interface CursorProps {
  isDebug?: boolean;
  isAtSpace?: boolean;
  isInvalidCursor?: boolean;
  isLocked?: boolean;
}

export function Cursor({
  isDebug = false,
  isAtSpace = false,
  isInvalidCursor = false,
  isLocked = false,
}: CursorProps): ReactElement {
  return (
    <span className='z-10 relative'>
      <span
        className={cs(
          'absolute h-full w-[20px] top-[0.5px]',
          {
            'left-[-0.5px]': !isAtSpace,
            'left-[0.5px]': isAtSpace,
            'bg-primary-30 bg-opacity-60': isDebug,
            'animate-cursor-blink': !isLocked,
          },
          'py-[0.075em]',
        )}>
        {isLocked && (
          <div
            className={cs(
              'absolute -left-[.35em] top-0 w-full h-full flex items-center justify-center',
              'scale-150',
            )}>
            <LockIcon
              className={cs(
                'w-5 h-5 p-[0.085em]',
                'bg-surface rounded-full',
                'border border-neutral-90',
              )}
            />
          </div>
        )}
        <div
          className={cs('h-full w-[2.5px] rounded-full', {
            'bg-error-50': isInvalidCursor,
            'bg-neutral-90': !isInvalidCursor,
          })}
        />
      </span>
    </span>
  );
}
