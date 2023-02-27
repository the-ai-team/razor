import { ReactElement } from 'react';
import { useNavigate } from 'react-router';

export function Room(): ReactElement {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Room</h1>
      <button
        className='bg-blue-500'
        type='button'
        onClick={(): void => navigate('../race')}>
        Start Race
      </button>
    </div>
  );
}
