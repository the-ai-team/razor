import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from '../../components/atoms/text/Text.component';
import { TextSize, TextType } from '../../models';

export function Race(): ReactElement {
  const navigate = useNavigate();
  return (
    <div>
      <Text type={TextType.Heading} size={TextSize.Large}>
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
