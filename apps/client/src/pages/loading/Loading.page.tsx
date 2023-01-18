import React, { ReactElement } from 'react';
import Loader from 'pixelarticons/svg/loader.svg';

export const Loading: React.FC = (): ReactElement => {
  return (
    <div className='flex h-full'>
      <div className='m-auto flex gap-2'>
        <img src={Loader} alt='' width='200px' height='200px' />
        <div className='text-5xl m-auto'>Loading</div>
      </div>
    </div>
  );
};
