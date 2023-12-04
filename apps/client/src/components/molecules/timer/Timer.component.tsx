import { ReactElement, useEffect, useRef, useState } from 'react';
import { TextSize, TextType } from 'apps/client/src/models';
import cs from 'classnames';

import { Text } from '../../atoms';

export interface TimerProps {
  time: number; // in seconds
  showSpeed?: boolean;
  speedValue?: string;
  speedometerPercentage?: number;
  onTimeEnd?: () => void;
}

/**
 *
 * @param time - Time in seconds
 * @param showSpeed - Whether to show speedometer or not
 * @param speedValue - Speed value in wpm
 * @param speedometerPercentage - Percentage of speedometer (0-1)
 * @param [onTimeEnd] - Callback function to be called when time ends (optional)
 */
export function Timer({
  time,
  showSpeed = false,
  speedValue = '0 wpm',
  speedometerPercentage = 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTimeEnd = (): void => {},
}: TimerProps): ReactElement {
  const startTimestamp = useRef(Date.now());
  const previousTimestamp = useRef(0);
  const [seconds, setSeconds] = useState(time);
  const [milliseconds, setMilliseconds] = useState(0);
  const circleIndicator = useRef<SVGCircleElement>(null);
  const timerEnded = useRef(false);

  useEffect(() => {
    startTimestamp.current = Date.now();
    previousTimestamp.current = 0;
    setSeconds(Math.trunc(time));
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

      // TODO: Check possibility of removing previousTimestamp
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
      <div className='text-center flex flex-col justify-center items-center mb-10 z-20'>
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
      {showSpeed && (
        <div
          className={cs(
            'h-1/2 w-2 bg-neutral-30 absolute bottom-1/2',
            'z-10 origin-bottom',
            'rounded-full',
            'transition-all duration-300',
          )}
          style={{
            rotate: `${speedometerPercentage * 180 - 90}deg`,
          }}>
          <div className='h-1/2 w-2 bg-primary-70 outline outline-neutral-50 outline-offset-2 outline-1 rounded-full'></div>
          <Text
            type={TextType.Title}
            size={TextSize.Small}
            className='absolute -top-8 left-0 right-0 flex justify-center whitespace-nowrap'>
            {speedValue || '0'}
          </Text>
        </div>
      )}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 300 300'
        preserveAspectRatio='none'
        className='absolute top-0 left-0 w-full h-full'>
        {showSpeed && (
          <circle
            cx='50%'
            cy='50%'
            r='45%'
            fill='none'
            strokeWidth='26'
            transform='rotate(-180,150,150)'
            stroke={`url(#gradient)`}
            strokeDasharray='140%, 20000'
            className={cs('transition-all duration-300')}
          />
        )}

        {/* Circle below time indicator */}
        <circle
          cx='50%'
          cy='50%'
          r='38%'
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
          r='38%'
          fill='none'
          strokeWidth='15'
          strokeLinecap='round'
          transform='rotate(-90,150,150)'
          className='stroke-neutral-90'
        />

        <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' style={{ stopColor: '#D34446', stopOpacity: 1 }} />
          <stop
            offset='100%'
            style={{ stopColor: '#534342', stopOpacity: 1 }}
          />
        </linearGradient>
      </svg>
    </div>
  );
}
