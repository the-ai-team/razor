import { ReactElement, useEffect, useState } from 'react';
import cs from 'classnames';

import { Time } from '../../../constants';
import { TextSize, TextType } from '../../../models';
import { Text } from '../../atoms';

export enum ToastType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export interface ToastProps {
  title: string;
  type: ToastType;
  isImmortal?: boolean;
  toastHideDelay?: number;
  icon?: ReactElement;
  children?: string;
}

/**
 * Toast component
 * @param title - Title of the toast
 * @param type - Type of the toast (success, error, warning, info)
 * @param [isImmortal] - If true, toast will not disappear after a timeout (optional)
 * @param [toastHideDelay] - Time in milliseconds after which the toast will disappear (milliseconds) (optional)
 * @param [icon] - Icon to be displayed in the toast (optional)
 * @param [message] - Message to be displayed in the toast (optional)
 */
export function Toast({
  title,
  type = ToastType.Info,
  icon,
  isImmortal = false,
  toastHideDelay = Time.TOAST_HIDE_DELAY,
  children = '',
}: ToastProps): ReactElement {
  const [isOpen, toggleToast] = useState(false);
  const [timerPercentage, setTimerPercentage] = useState(100);
  useEffect(() => {
    toggleToast(true);
    setTimerPercentage(100);

    if (isImmortal) {
      return;
    }

    const timeout = setTimeout(() => {
      toggleToast(false);
    }, toastHideDelay);

    let time = toastHideDelay;
    const timer = setInterval(() => {
      time -= 10;
      setTimerPercentage(prev => {
        if (prev <= 0) {
          clearInterval(timer);
        }
        return (time / toastHideDelay) * 100;
      });
    }, 10);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
      toggleToast(false);
    };
  }, [toastHideDelay, isImmortal]);

  return (
    <div
      className={cs(
        'w-1/3 min-w-[600px]',
        'absolute bottom-5',
        {
          'bg-neutral-20 border-neutral-40 ring-neutral-40':
            type === ToastType.Info,
        },
        {
          'bg-primary-50 border-primary-70 ring-primary-70':
            type === ToastType.Error,
        },
        {
          'bg-secondary-50 border-secondary-70 ring-secondary-70':
            type === ToastType.Warning,
        },
        'rounded-md overflow-hidden',
        'border',
        {
          'right-5': isOpen,
        },
        {
          '-right-full': !isOpen,
        },
        'transition-all duration-1000',
      )}>
      <div className='p-8 flex flex-col items-start justify-between'>
        <div
          className={cs(
            'flex items-center justify-center gap-4',
            'text-neutral-90',
          )}>
          {icon}
          <Text type={TextType.Label} size={TextSize.Small}>
            {title}
          </Text>
        </div>
        <div
          className={cs(
            'h-[2px] w-full',
            'my-5',
            {
              'bg-neutral-40 opacity-40': type === ToastType.Info,
            },
            {
              'bg-primary-70 opacity-40': type === ToastType.Error,
            },
            {
              'bg-secondary-70 opacity-40': type === ToastType.Warning,
            },
          )}
        />
        <Text type={TextType.Paragraph} size={TextSize.Small}>
          {children}
        </Text>
      </div>
      <div
        className={cs(
          'h-2',
          'absolute left-0 bottom-0',
          'bg-neutral-90 opacity-40',
        )}
        style={{
          width: `${timerPercentage}%`,
        }}
      />
    </div>
  );
}
