import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Meta } from '@storybook/react';

import { store, testTournamentId } from './data/test-race';
import { RaceText, RaceTextProps } from './RaceText.template';

export default {
  title: 'Templates/RaceText',
  component: RaceText,
  args: {
    raceId: `${testTournamentId}-R:000`,
    debug: {
      enableLetterCount: false,
      enableSpaceCount: false,
    },
  },
} as Meta<RaceTextProps>;

interface MockstoreProps {
  children: ReactElement;
}

const Mockstore = ({ children }: MockstoreProps): ReactElement => (
  <Provider store={store}>
    {children}
    {/* <RaceTrackUpdaters /> */}
  </Provider>
);

export const Default = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any): ReactElement => <Mockstore>{story()}</Mockstore>],
};
