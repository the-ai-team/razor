import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Meta } from '@storybook/react';

import { store, testRaceId } from './storybook_helpers/test-race';
import { LeaderboardList, LeaderboardProps } from './LeaderboardList.template';

export default {
  title: 'Templates/Leaderboard',
  component: LeaderboardList,
  args: {
    raceId: `${testRaceId}`,
  },
} as Meta<LeaderboardProps>;

interface MockStoreProps {
  children: ReactElement;
}

const Mockstore = ({ children }: MockStoreProps): ReactElement => (
  <Provider store={store}>
    <div className='w-[100vw] h-[100vh]'>
      <div className='max-w-[1000px] w-10/12 h-1/2 flex flex-col justify-center items-center'>
        {children}
      </div>
    </div>
  </Provider>
);

export const Default = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [(story: any): ReactElement => <Mockstore>{story()}</Mockstore>],
};
