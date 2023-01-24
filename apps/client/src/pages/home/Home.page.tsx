import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router';

export function Home(): ReactElement {
  const { id } = useParams();

  const navigate = useNavigate();

  const getTournamentId = (): string => {
    return '123';
  };

  const routeToRoom = (): void => {
    if (id) {
      navigate(`/${id}/room`);
    } else {
      const tournamentId = getTournamentId();
      navigate(`/${tournamentId}/room`);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {id && <p>(id: {id})</p>}
      {id ? (
        <button className='bg-blue-500' type='button' onClick={routeToRoom}>
          Join
        </button>
      ) : (
        <button className='bg-blue-500' type='button' onClick={routeToRoom}>
          Create
        </button>
      )}
    </div>
  );
}
