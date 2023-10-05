import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Meta } from '@storybook/react';
import { ToastContextProvider } from 'apps/client/src/providers';

import {
  addSampleRaceLogs,
  RaceLogUpdaters,
  store,
  testTournamentId,
} from '../../story-common-utils';

import { RaceText, RaceTextProps } from './RaceText.template';

export default {
  title: 'Templates/RaceText',
  component: RaceText,
  args: {
    raceId: `${testTournamentId}-R:000`,
    debug: {
      enableLetterCount: false,
      enableSpaceCount: false,
      highlightRightMostWords: false,
      highlightLeftMostWords: false,
    },
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
