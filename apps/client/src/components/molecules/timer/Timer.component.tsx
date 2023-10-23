import { ReactElement, useEffect, useRef, useState } from 'react';
import { TextSize, TextType } from 'apps/client/src/models';
import cs from 'classnames';

import { Text } from '../../atoms';

export interface TimerProps {
  time: number; // in seconds
  onTimeEnd?: () => void;
}

/**
 *
 * @param time - Time in seconds
 * @param [onTimeEnd] - Callback function to be called when time ends (optional)
 */
export function Timer({
  time,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTimeEnd = (): void => {},
}: TimerProps): ReactElement {
  const startTimestamp = useRef(Date.now());
  const previousTimestamp = useRef(Date.now());
  const [seconds, setSeconds] = useState(time);
  const [milliseconds, setMilliseconds] = useState(0);
  const circleIndicator = useRef<SVGCircleElement>(null);
  const timerEnded = useRef(false);

  useEffect(() => {
    startTimestamp.current = Date.now();
    previousTimestamp.current = Date.now();
    setSeconds(time);
    setMilliseconds(0);
    timerEnded.current = false;
  }, [time]);

  useEffect(() => {
    const circle = circleIndicator.current;
    let circumference: number;

    if (circle) {
      const radius = circle.r.baseVal.value;
      // C=2πr
      circumference = 2 * Math.PI * radius;
      // Fill circle dash
      circle.setAttribute('stroke-dasharray', `${circumference}, 20000`);
    }

    const updateTimer = (): void => {
      if (timerEnded.current) {
        return;
      }

      const now = Date.now();

      // Optimizing for high refresh rate screens
      if (now - previousTimestamp.current < 10) {
        return;
      }

      previousTimestamp.current = now;
      const delta = now - startTimestamp.current;

      const remainingTime = time * 1000 - delta;
      const remainingSeconds = Math.max(0, Math.floor(remainingTime / 1000));
      const remainingMilliseconds = Math.floor(
        (remainingTime - remainingSeconds * 1000) / 10,
      );
      setSeconds(remainingSeconds);
      setMilliseconds(remainingMilliseconds);

      if (circle) {
        // Dash offset = Fraction of time elapsed * circumference
        let dashOffset = (remainingTime / (time * 1000)) * circumference;
        // Clamp dash offset to the circumference
        dashOffset = Math.min(circumference, dashOffset);

        circle.setAttribute(
          'stroke-dashoffset',
          `${circumference - dashOffset}`,
        );
      }

      // When time is up setting seconds and milliseconds to 0
      if (remainingTime <= 0) {
        clearInterval(interval);
        timerEnded.current = true;
        setSeconds(0);
        setMilliseconds(0);
        if (time > 0) {
          onTimeEnd();
        }
      }

      requestAnimationFrame(updateTimer);
    };

    const interval = setInterval(updateTimer, 10);
    return () => clearInterval(interval);
  }, [onTimeEnd, time]);

  return (
    <div
      className={cs(
        'm-auto',
        'rounded-full bg-neutral-20 inline-block',
        'w-72 aspect-square',
        'flex justify-center items-center',
        'relative',
      )}>
      <div className='text-center flex flex-col justify-center items-center mb-10'>
        <Text type={TextType.Heading} size={TextSize.ExtraLarge}>
          {seconds.toString().padStart(2, '0')}
        </Text>
        <Text
          type={TextType.Heading}
          size={TextSize.Medium}
          className='-m-6 pl-7'>
          {`.${milliseconds.toString().padStart(2, '0')}`}
        </Text>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 300 300'
        preserveAspectRatio='none'
        className='absolute top-0 left-0 w-full h-full'>
        {/* Circle below time indicator */}
        <circle
          cx='50%'
          cy='50%'
          r='40%'
          fill='none'
          strokeWidth='15'
          transform='rotate(-90,150,150)'
          className='stroke-neutral-40'
        />
        {/* Time indicator circle */}
        <circle
          ref={circleIndicator}
          cx='50%'
          cy='50%'
          r='40%'
          fill='none'
          strokeWidth='15'
          strokeLinecap='round'
          transform='rotate(-90,150,150)'
          className='stroke-neutral-90'
        />
      </svg>
    </div>
  );
}
