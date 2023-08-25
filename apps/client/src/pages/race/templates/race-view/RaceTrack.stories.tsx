import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Meta } from '@storybook/react';

import { store, testTournamentId } from './data/test-race';
import { RaceTrack, RaceTrackProps } from './RaceTrack.template';
import { RaceTrackUpdaters } from './RaceTrackUpdaters';

export default {
  title: 'Templates/RaceTrack',
  component: RaceTrack,
  args: {
    raceId: `${testTournamentId}-R:000`,
  },
} as Meta<RaceTrackProps>;

interface MockstoreProps {
  children: ReactElement;
}

const Mockstore = ({ children }: MockstoreProps): ReactElement => (
  <Provider store={store}>
    {children}
    <RaceTrackUpdaters />
  </Provider>
);

export const Default = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any): ReactElement => <Mockstore>{story()}</Mockstore>],
};
