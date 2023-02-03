import { ReactElement } from 'react';
// Assets
import logo from '../assets/images/logo.png';

export function Layout(): ReactElement {
  return (
    <div className='px-10 py-5 h-full'>
      <img src={logo} alt='' />
    </div>
  );
}
