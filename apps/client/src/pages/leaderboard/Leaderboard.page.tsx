import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Leaderboard(): ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    // after 2 seconds redirect to room
    setTimeout(() => {
      navigate('../room');
    }, 2000);
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
    </div>
  );
}
