import { TextSize, TextType } from '../../../models';
import cs from 'classnames';
import { ReactElement } from 'react';
import { Text } from '../../';
import { ReactComponent as CarIcon } from '../../../assets/cars/pixelCar.svg';

export interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
  input?: ReactElement;
  icon?: ReactElement;
  isCarVisible?: boolean;
  isDisable?: boolean;
  isButtonDanger?: boolean;
  isFillWidth?: boolean;
}

export function Button({
  onClick,
  children,
  icon,
  input,
  isDisable = false,
  isCarVisible = false,
  isButtonDanger = false,
  isFillWidth = false,
}: ButtonProps): ReactElement {
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
              'relative py-2 px-10 min-w-min rounded',
              { 'w-full': isFillWidth },
            )
      }
      disabled={isDisable}>
      {isCarVisible ? (
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
      ) : null}
      <div className='flex items-center flex-grow justify-center gap-10'>
        {input ? input : null}
        <Text type={TextType.Label} size={TextSize.Medium} className='truncate'>
          {children}
        </Text>
        {icon ? icon : null}
      </div>
    </button>
  );
}
