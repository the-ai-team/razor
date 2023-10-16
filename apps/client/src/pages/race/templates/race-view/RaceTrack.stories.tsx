import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Meta } from '@storybook/react';

import {
  RaceLogUpdaters,
  store,
  testTournamentId,
} from '../../story-common-utils';

import { RaceTrack, RaceTrackProps } from './RaceTrack.template';

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
    <RaceLogUpdaters />
  </Provider>
);

export const Default = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any): ReactElement => <Mockstore>{story()}</Mockstore>],
};
