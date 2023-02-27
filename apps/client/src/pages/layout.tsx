import { ReactElement } from 'react';
import { Outlet } from 'react-router';
// Assets
import logo from '../assets/images/logo.png';

export function Layout(): ReactElement {
  return (
    <div className='px-10 py-5 h-screen bg-gradient-to-br from-[#201A1A] to-[#2B2221]'>
      <img src={logo} alt='' />
      <Outlet />
    </div>
  );
}
