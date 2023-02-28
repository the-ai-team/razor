import { ReactElement, useEffect, useState } from 'react';
import { Description, Text } from '../..';
import { ReactComponent as ArrowHeadTopIcon } from 'pixelarticons/svg/chevron-up.svg';
import cs from 'classnames';

interface PanelProps {
  title: string;
  children: ReactElement<typeof Description>[];
}

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
        { 'h-40 pt-6': isCollapse },
        { 'h-2/3 pt-20 pb-24': !isCollapse },
        'flex flex-col',
        'absolute top-5 right-5',
        'px-10',
        'w-1/3 max-w-xl max-h-[1200px] rounded-md bg-bg-brown',
        'border-4 border-bg-brown-100',
        'transition-all duration-300',
      )}
      onClick={(): void => setCollapse(preValue => !preValue)}>
      <div
        className={cs(
          { 'gap-20 overflow-y-hidden': isCollapse },
          { 'overflow-y-scroll scrollbar': !isCollapse },
          'flex flex-col pr-5',
          'transition-all duration-300',
          'gap-5',
        )}
        id='scrollPanel'>
        <Text type='Heading' size={isCollapse ? 'Medium' : 'Large'}>
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
        <div className='flex flex-row justify-center items-center absolute bottom-0 left-0 p-5 w-full text-text-light'>
          <ArrowHeadTopIcon
            className={cs('w-10 h-10 transition-all duration-300', {
              'rotate-180': isCollapse,
            })}
          />
          {isCollapse ? (
            <Text type='Title' size='Small'>
              Show Panel
            </Text>
          ) : (
            <Text type='Title' size='Small'>
              Hide Panel
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
