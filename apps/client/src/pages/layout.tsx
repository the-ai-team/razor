import { ReactElement } from 'react';
import { Outlet } from 'react-router';

export function Layout(): ReactElement {
  return (
    <div className='px-10 py-5 h-screen bg-gradient-to-br from-[#201A1A] to-[#2B2221]'>
      <Outlet />
    </div>
  );
}
