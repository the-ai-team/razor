import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export function Race(): ReactElement {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Race</h1>
      <button
        className='bg-blue-500'
        type='button'
        onClick={(): void => navigate('../leaderboard')}>
        End Race
      </button>
    </div>
  );
}
