import { ReactElement } from 'react';
import { useNavigate } from 'react-router';

import { Text } from '../../components/atoms/text/Text.component';
import { TextSize, TextType } from '../../models';

export function Room(): ReactElement {
  const navigate = useNavigate();
  return (
    <div>
      <Text type={TextType.Heading} size={TextSize.Large}>
        Room
      </Text>
      <button
        className='bg-white'
        type='button'
        onClick={(): void => navigate('../race')}>
        Start Race
      </button>
    </div>
  );
}
