import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import { Text } from '../../components/atoms/text/Text.component';

export function Race(): ReactElement {
  const navigate = useNavigate();
  return (
    <div>
      <Text type='Heading' size='Large'>
        Race
      </Text>
      <button
        className='bg-white'
        type='button'
        onClick={(): void => navigate('../leaderboard')}>
        End Race
      </button>
    </div>
  );
}
