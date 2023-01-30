import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router';
// Components
import { Text } from '../../components/atoms/text/Text.component';

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
      <Text type='Heading' size='Large'>
        Home
      </Text>
      {id && <p className='text-white'>(id: {id})</p>}
      {id ? (
        <button className='bg-white' type='button' onClick={routeToRoom}>
          Join
        </button>
      ) : (
        <button className='bg-white' type='button' onClick={routeToRoom}>
          Create
        </button>
      )}
    </div>
  );
}
