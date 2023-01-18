import React, { ReactElement } from 'react';
// Assets
import logo from '../assets/images/logo.png';

export const Layout: React.FC = (): ReactElement => {
  return (
    <div className='px-10 py-5 h-full'>
      <img src={logo} alt='' />
    </div>
  );
};
