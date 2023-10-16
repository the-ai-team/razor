import { cloneElement, ReactElement, useEffect, useState } from 'react';
import cs from 'classnames';
import { ReactComponent as CloseIcon } from 'pixelarticons/svg/close.svg';

import { Time } from '../../../constants';
import { TextSize, TextType } from '../../../models';
import { Text } from '../../atoms';

export enum ToastType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export interface ToastProps {
  id: string;
  title: string;
  type: ToastType;
  isImmortal?: boolean;
  toastHideDelay?: number;
  icon?: ReactElement;
  children?: string;
  onClose?: (id: string) => void;
}

/**
 * Toast component
 * @param id - Id of the toast
 * @param title - Title of the toast
 * @param type - Type of the toast (success, error, warning, info)
 * @param [isImmortal] - If true, toast will not disappear after a timeout (optional)
 * @param [toastHideDelay] - Time in milliseconds after which the toast will disappear (milliseconds) (optional)
 * @param [icon] - Icon to be displayed in the toast (optional)
 * @param [message] - Message to be displayed in the toast (optional)
 * @param [onClose] - Callback to be called when the toast is closed (optional)
 */
export function Toast({
  id,
  title,
  type = ToastType.Info,
  icon,
  isImmortal = false,
  toastHideDelay = Time.TOAST_HIDE_DELAY,
  children = '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = (_): void => {},
}: ToastProps): ReactElement {
  const [isOpen, toggleToast] = useState(false);
  const [timerPercentage, setTimerPercentage] = useState(100);

  useEffect(() => {
    toggleToast(true);
    setTimerPercentage(100);

    if (isImmortal) {
      return;
    }

    // Remove toast from context after timeout
    const timeout = setTimeout(() => {
      onClose(id);

      // toastHideDelay => Time period which toast is visible on screen
      // Time.TOAST_ANIMATION_DURATION => Time period for toast close animation
    }, toastHideDelay + Time.TOAST_ANIMATION_DURATION);

    // Decrement toast progress bar over time
    let time = toastHideDelay;
    const timer = setInterval(() => {
      time -= 10;
      setTimerPercentage(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          toggleToast(false);
        }
        return (time / toastHideDelay) * 100;
      });
    }, 10);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
      toggleToast(false);
    };
  }, [toastHideDelay, isImmortal, onClose, id]);

  // Force close toast when clicked
  const forceClose = (): void => {
    toggleToast(false);

    // Remove toast from context after closing animation
    const timeout = setTimeout(() => {
      onClose(id);
      clearTimeout(timeout);
    }, Time.TOAST_ANIMATION_DURATION);
  };

  const Icon = ({ ...props }): ReactElement => {
    if (!icon) {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <></>;
    }
    return cloneElement(icon, props);
  };

  return (
    <div
      className={cs(
        'w-1/3 min-w-[600px]',
        'absolute bottom-5',
        {
          'bg-neutral-20 border-neutral-40 ring-neutral-40':
            type === ToastType.Info,
          'bg-primary-20 border-primary-40 ring-primary-40':
            type === ToastType.Error,
          'bg-secondary-20 border-secondary-40 ring-secondary-40':
            type === ToastType.Warning,
        },
        'border rounded-md overflow-hidden',
        'z-40',
        {
          'right-5': isOpen,
          '-right-full': !isOpen,
        },
        'transition-all duration-1000',
      )}>
      <div className='p-8 flex flex-col items-start justify-between'>
        <div
          className={cs(
            'flex items-center justify-between gap-4  w-full',
            'text-neutral-90',
          )}>
          <div className='flex items-center gap-4'>
            {icon ? <Icon className='w-12 h-12 flex-none' /> : null}
            <Text
              type={TextType.Label}
              size={TextSize.Small}
              className='flex-none'>
              {title}
            </Text>
          </div>
          <CloseIcon
            className={cs(
              'w-8 h-8 text-neutral-90 p-2',
              {
                'bg-neutral-40 bg-opacity-40': type === ToastType.Info,
              },
              {
                'bg-primary-70 bg-opacity-40': type === ToastType.Error,
              },
              {
                'bg-secondary-70 bg-opacity-40': type === ToastType.Warning,
              },
              ' rounded-full cursor-pointer',
            )}
            onClick={(): void => forceClose()}
          />
        </div>
        <div
          className={cs('h-[2px] w-full opacity-40', 'my-5', {
            'bg-neutral-40': type === ToastType.Info,
            'bg-primary-40 ': type === ToastType.Error,
            'bg-secondary-40': type === ToastType.Warning,
          })}
        />
        <Text type={TextType.Paragraph} size={TextSize.Small}>
          {children}
        </Text>
      </div>
      <div
        className={cs(
          'h-2',
          'absolute left-0 bottom-0',
          'bg-neutral-90 opacity-30',
        )}
        style={{
          width: `${timerPercentage}%`,
        }}
      />
    </div>
  );
}
