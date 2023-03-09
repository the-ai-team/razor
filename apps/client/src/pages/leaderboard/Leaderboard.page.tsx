import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import { Text } from '../../components/atoms/text/Text.component';
import { TextSize, TextType } from '../../models';

export function Leaderboard(): ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    // after 2 seconds redirect to room
    const timeoutId = setTimeout(() => {
      navigate('../room');
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div>
      <Text type={TextType.Heading} size={TextSize.Large}>
        Leaderboard
      </Text>
    </div>
  );
}
