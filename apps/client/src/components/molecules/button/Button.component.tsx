import { ReactElement } from 'react';
import { Text } from '../../';
import { ReactComponent as CarIcon } from '../../../assets/cars/pixelCar.svg';
import cs from 'classnames';

interface ButtonProps {
  onClick: () => void;
  isCarVisible?: boolean;
  isDisable?: boolean;
  isButtonDanger?: boolean;
  children: string;
}

export function Button({
  onClick,
  isCarVisible,
  isDisable,
  isButtonDanger,
  children,
}: ButtonProps): ReactElement {
  isCarVisible ||= false;
  isDisable ||= false;
  isButtonDanger ||= false;

  return (
    <button
      type='button'
      onClick={onClick}
      className={
        isDisable
          ? cs(
              'opacity-40',
              'cursor-not-allowed',
              'bg-transparent',
              'border border-neutral-40',
              'relative py-2 px-4 w-full min-w-min rounded',
            )
          : cs(
              'group',
              {
                'bg-primary-40 hover:bg-primary-30 border-primary-50':
                  isButtonDanger,
              },
              { 'bg-transparent hover:bg-neutral-20': !isButtonDanger },
              'border hover:border-4 border-neutral-40',
              'relative py-2 px-4 w-full min-w-min rounded',
            )
      }
      disabled={isDisable}>
      {isCarVisible && (
        <CarIcon
          className={
            isDisable
              ? cs(
                  'invisible',
                  'absolute -top-1/4 w-full',
                  'left-[calc(-50%+27.5px)]',
                )
              : cs(
                  'absolute -top-1/4 w-full',
                  'left-[calc(-50%+27.5px)] group-hover:translate-x-[calc(100%-55px)]',
                  'transition-all duration-300',
                )
          }
        />
      )}
      <Text type='Label' size='Medium' className='truncate'>
        {children}
      </Text>
    </button>
  );
}
