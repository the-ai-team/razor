import cs from 'classnames';
import { ReactElement } from 'react';
import { Text } from '../../';
import { ReactComponent as CarIcon } from '../../../assets/cars/pixelCar.svg';

export interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isCarVisible?: boolean;
  isDisabled?: boolean;
  isButtonDanger?: boolean;
  children: string;
  input?: ReactElement;
  isFillWidth?: boolean;
  icon?: ReactElement;
}

export function Button({
  onClick,
  isCarVisible,
  isDisabled,
  isButtonDanger,
  children,
  input,
  isFillWidth,
  icon,
}: ButtonProps): ReactElement {
  isCarVisible ||= false;
  isDisabled ||= false;
  isButtonDanger ||= false;
  isFillWidth ||= false;

  return (
    <button
      type='button'
      onClick={onClick}
      className={
        isDisabled
          ? cs(
              'opacity-40',
              'cursor-not-allowed',
              'bg-transparent',
              'border border-neutral-40',
              { 'w-full': isFillWidth },
              'relative py-2 px-10 min-w-min rounded',
            )
          : cs(
              'group',
              {
                'bg-primary-40 hover:bg-primary-30 border-primary-50':
                  isButtonDanger,
              },
              { 'bg-transparent hover:bg-neutral-20': !isButtonDanger },
              'border hover:ring-[4px] border-neutral-40 ring-neutral-40',
              // 'm-[4px] hover:m-[1px]',
              'relative py-2 px-10 min-w-min rounded',
              { 'w-full': isFillWidth },
            )
      }
      disabled={isDisabled}>
      {isCarVisible ? (
        <CarIcon
          className={
            isDisabled
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
      ) : null}
      <div className='flex items-center flex-grow justify-center gap-10'>
        {input ? input : null}
        <Text type='Label' size='Medium' className='truncate'>
          {children}
        </Text>
        {icon ? icon : null}
      </div>
    </button>
  );
}
