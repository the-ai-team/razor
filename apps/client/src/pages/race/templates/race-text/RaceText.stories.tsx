import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Meta } from '@storybook/react';
import { ToastContextProvider } from 'apps/client/src/providers';
import { getSavedPlayerId } from 'apps/client/src/utils/save-player-id';

import {
  addSampleRaceLogs,
  RaceLogUpdaters,
  store,
  testRaceId,
} from '../../story-common-utils';

import { RaceText, RaceTextProps } from './RaceText.template';

function sendTypeLog(playerCursorAt: number): void {
  const playerLog = {
    timestamp: Date.now(),
    textLength: playerCursorAt + 1,
  };

  const playerId = getSavedPlayerId();
  if (playerId) {
    store.dispatch.game.sendTypeLog({
      playerLog,
      raceId: testRaceId,
      playerId,
    });
  }
}

export default {
  title: 'Templates/RaceText',
  component: RaceText,
  args: {
    raceId: testRaceId,
    debug: {
      enableLetterCount: false,
      enableSpaceCount: false,
      highlightRightMostWords: false,
      highlightLeftMostWords: false,
    },
    onValidType: sendTypeLog,
  },
} as Meta<RaceTextProps>;

addSampleRaceLogs();

interface MockstoreProps {
  children: ReactElement;
}

const Mockstore = ({ children }: MockstoreProps): ReactElement => (
  <Provider store={store}>
    <ToastContextProvider>{children}</ToastContextProvider>
    <div className='h-60 mt-5 z-50 relative overflow-y-scroll'>
      <RaceLogUpdaters isEnableSelfPlayer={false} />
    </div>
  </Provider>
);

export const Default = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any): ReactElement => <Mockstore>{story()}</Mockstore>],
};
