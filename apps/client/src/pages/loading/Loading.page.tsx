import { ReactElement } from 'react';
import LoaderIcon from 'pixelarticons/svg/loader.svg';

export function Loading(): ReactElement {
  return (
    <div className='flex h-full'>
      <div className='m-auto flex gap-2'>
        <img src={LoaderIcon} alt='' width='200px' height='200px' />
        <div className='text-5xl m-auto'>Loading</div>
      </div>
    </div>
  );
}
