import { ReactElement, useEffect, useState } from 'react';
import cs from 'classnames';
import { ReactComponent as ArrowHeadTopIcon } from 'pixelarticons/svg/chevron-up.svg';

import { TextSize, TextTag, TextType } from '../../../models';
import { Description, Text } from '../..';

export interface PanelProps {
  title: string;
  children:
    | ReactElement<typeof Description>
    | ReactElement<typeof Description>[];
}

/**
 *
 * @param title - Title of the panel
 * @param children - Content of the panel (Description components)
 */
export function Panel({ title, children }: PanelProps): ReactElement {
  const [isCollapse, setCollapse] = useState(true);
  useEffect(() => {
    const element = document.getElementById('scrollPanel');
    const handleScroll = (): void => {
      element?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCollapse]);

  return (
    <div
      className={cs(
        { 'lg:h-32 h-20 w-96 lg:pt-4 pt-3 px-6': isCollapse },
        { 'h-2/3 lg:pt-8 pt-2 pb-16 lg:px-10 px-8': !isCollapse },
        'flex flex-col',
        'absolute top-5 right-5 z-50',
        'w-1/3 max-w-lg max-h-[1200px] min-w-[350px] rounded-md bg-neutral-20',
        'border border-neutral-40',
        'hover:ring-4 hover:ring-neutral-40',
        'transition-all duration-300',
      )}
      onClick={(): void => setCollapse(preValue => !preValue)}>
      <div
        className={cs(
          { 'gap-20 overflow-y-hidden': isCollapse },
          {
            'overflow-y-auto scrollbar py-4 overflow-mask top-overflowing bottom-overflowing':
              !isCollapse,
          },
          'flex flex-col pr-5',
          'transition-all duration-300',
          'gap-5',
        )}
        // FIXME: Use React ref
        id='scrollPanel'>
        <Text
          type={TextType.Heading}
          isAnimatable={true}
          as={TextTag.HeadingMedium}
          size={isCollapse ? TextSize.Medium : TextSize.Large}>
          {title}
        </Text>
        <div
          className={cs(
            'flex flex-col justify-between items-center gap-8 w-full transition-all duration-300',
            { 'opacity-0 invisible': isCollapse },
            { 'opacity-100 visible': !isCollapse },
          )}>
          {children}
        </div>
      </div>
      <div>
        <div
          className={cs(
            'flex flex-row items-center absolute bottom-0 left-0 p-5 w-full text-neutral-90',
            { 'lg:justify-center justify-end': isCollapse },
            { 'justify-center': !isCollapse },
          )}>
          <ArrowHeadTopIcon
            className={cs('w-10 h-10 transition-all duration-300', {
              'rotate-180': isCollapse,
            })}
          />
          <Text type={TextType.Title} size={TextSize.Small}>
            {isCollapse ? 'Show Panel' : 'Hide Panel'}
          </Text>
        </div>
      </div>
    </div>
  );
}
