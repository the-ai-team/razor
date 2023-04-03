import { ReactElement } from 'react';
import cs from 'classnames';

import { ReactComponent as CarIcon } from '../../../assets/cars/pixelCar.svg';
import { TextSize, TextType } from '../../../models';
import { Text } from '../../';

export interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
  input?: ReactElement;
  icon?: ReactElement;
  isCarVisible?: boolean;
  isDisabled?: boolean;
  isButtonDanger?: boolean;
  isFullWidth?: boolean;
}

/**
 *
 * @param onClick - Button click handler; (e: React.MouseEvent<HTMLButtonElement>) => void;
 * @param children - Text content
 * @param icon - Icon to be displayed on the left side of the button (optional)
 * @param input - Input element to be displayed on the left side of the button (optional); this property is used in ButtonWithInput component
 * @param [isDisabled=false] - Disables the button (optional)
 * @param [isCarVisible=false] - Displays the interactive car icon on the button (optional)
 * @param [isButtonDanger=false] - Changes the button color to red (optional)
 * @param [isFullWidth=false] - Enabling this will expand the button inside parent (optional)
 */
export function Button({
  onClick,
  children,
  icon,
  input,
  isDisabled = false,
  isCarVisible = false,
  isButtonDanger = false,
  isFullWidth = false,
}: ButtonProps): ReactElement {
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
              { 'w-full': isFullWidth },
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
              { 'w-full': isFullWidth },
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
        {input}
        <Text type={TextType.Label} size={TextSize.Medium} className='truncate'>
          {children}
        </Text>
        {icon}
      </div>
    </button>
  );
}
