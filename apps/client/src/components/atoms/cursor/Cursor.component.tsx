import { ReactElement } from 'react';
import cs from 'classnames';

export interface CursorProps {
  isDebug?: boolean;
  isAtSpace?: boolean;
  isInvalidCursor?: boolean;
}

export function Cursor({
  isDebug = false,
  isAtSpace = false,
  isInvalidCursor = false,
}: CursorProps): ReactElement {
  return (
    <span
      className={cs(
        'absolute h-full w-[20px] top-[0.5px]',
        {
          'left-[-0.5px]': !isAtSpace,
          'left-[0.5px]': isAtSpace,
          'bg-primary-30 bg-opacity-60': isDebug,
        },
        'animate-cursor-blink',
      )}>
      <div
        className={cs('h-full w-[2.5px] rounded-full', {
          'bg-error-50': isInvalidCursor,
          'bg-neutral-90': !isInvalidCursor,
        })}
      />
    </span>
  );
}
