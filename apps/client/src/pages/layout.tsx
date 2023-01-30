import { ReactElement } from 'react';
import { Outlet } from 'react-router';
// Assets
import logo from '../assets/images/logo.png';

export function Layout(): ReactElement {
  return (
    <div className='px-10 py-5 h-screen'>
      <img src={logo} alt='' />
      <Outlet />
    </div>
  );
}
