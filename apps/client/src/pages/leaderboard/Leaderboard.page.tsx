import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import { Text } from '../../components/atoms/text/Text.component';

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
      <Text type='Heading' size='Large'>
        Leaderboard
      </Text>
    </div>
  );
}