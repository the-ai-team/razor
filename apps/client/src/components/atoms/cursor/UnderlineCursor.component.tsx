import { ReactElement } from 'react';
import cs from 'classnames';

export interface UnderlineCursorProps {
  isDebug?: boolean;
  isAtSpace?: boolean;
}

export function UnderlineCursor({
  isDebug = false,
  isAtSpace = false,
}: UnderlineCursorProps): ReactElement {
  return (
    <span
      className={cs(
        'absolute w-full',
        'bottom-0 left-0',
        {
          'bg-primary-30 bg-opacity-60': isDebug,
        },
        'animate-underline-cursor-blink',
      )}>
      <div
        className={cs(
          'bg-neutral-50 opacity-60',
          'h-[0.2rem] w-full rounded-full',
        )}
      />
    </span>
  );
}
