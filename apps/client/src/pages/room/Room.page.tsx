import { ReactElement } from 'react';

import { Button, Text } from '../../components';
import { TextSize, TextType } from '../../models';
import { startRace } from '../../services/socket/start-race';

export function Room(): ReactElement {
  return (
    <div>
      <Text type={TextType.Heading} size={TextSize.Large}>
        Room
      </Text>
      <Button onClick={(): void => startRace()}>Start Race</Button>
    </div>
  );
}
