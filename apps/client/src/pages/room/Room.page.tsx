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
      {/*TODO: Implement PlayerList*/}
      {/*<div className={cs('my-12')}>*/}
      {/*  <ListItem*/}
      {/*    title='JohnDoe'*/}
      {/*    imgURL='https://avatars.dicebear.com/api/open-peeps/737373.svg'*/}
      {/*    number={1}*/}
      {/*    rightText='64 wpm'*/}
      {/*  />*/}
      {/*</div>*/}
      <Button onClick={(): void => startRace()}>Start Race</Button>
    </div>
  );
}
