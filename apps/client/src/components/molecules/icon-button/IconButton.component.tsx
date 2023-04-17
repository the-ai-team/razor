import React, { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import cs from 'classnames';
import { ReactComponent as ArrowLeft } from 'pixelarticons/svg/arrow-left.svg';

import { TextSize, TextTag, TextType } from '../../../models';
import { Text } from '../../atoms';

export interface IconButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  icon: ReactElement;
  children: string;
  label: string;
}

export function IconButton({
  onClick,
  icon,
  children,
  label,
}: IconButtonProps): ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);

  useLayoutEffect(() => {
    if (elementRef.current) {
      setElementWidth(elementRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      className='group flex relative w-fit'
      onMouseEnter={(): void => setIsHovered(true)}
      onMouseLeave={(): void => setIsHovered(false)}
      onClick={onClick}
      ref={elementRef}>
      {/* Pseudo element for avoid flickering */}
      <div
        className={cs('absolute top-0 left-0 h-full w-0')}
        style={{ width: elementWidth }}></div>
      <div
        className={cs(
          'w-20 h-20 border border-neutral-40 rounded-full p-4',
          'group-hover:bg-neutral-20',
          'group-hover:ring-[4px] ring-neutral-40',
          'z-20',
          'transition-all duration-300',
        )}>
        {icon}
      </div>
      <div
        className={cs(
          'flex items-center gap-2',
          'group-hover:bg-neutral-20',
          'rounded-tr-md rounded-br-md',
          'pl-10 pr-8',
          'group-hover:-translate-x-8',
          'z-10',
          'cursor-pointer',
          'transition-all duration-300',
        )}>
        <ArrowLeft
          className={cs(
            'w-10 h-10 text-neutral-90',
            { 'w-0 h-0 opacity-0': isHovered },
            'transition-all duration-300',
          )}
        />
        <Text
          type={isHovered ? TextType.Title : TextType.Label}
          size={TextSize.Medium}
          isAnimatable={true}
          as={TextTag.Div}
          className={cs(
            'text-neutral-90',
            'whitespace-nowrap',
            'transition-all duration-300',
          )}>
          {isHovered ? children : label}
        </Text>
      </div>
    </div>
  );
}
