import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Meta, Story } from '@storybook/react';

import { PlayerListUpdaters } from './storybook_helpers/PlayerListUpdaters';
import { store, testTournamentId } from './storybook_helpers/test-race';
import { PlayerList, PlayerListProps } from './PlayerList.template';

export default {
  title: 'Templates/PlayerList',
  component: PlayerList,
  args: {
    tournamentId: `${testTournamentId}`,
  },
} as Meta<PlayerListProps>;

interface MockstoreProps {
  children: ReactElement;
}

const Mockstore = ({ children }: MockstoreProps): ReactElement => (
  <Provider store={store}>
    <div className='w-[100vw] h-[100vh]'>
      <div className='max-w-[1000px] w-10/12 h-1/2 flex flex-col justify-center items-center'>
        {children}
      </div>
      <PlayerListUpdaters />
    </div>
  </Provider>
);

const Template: Story<PlayerListProps> = args => <PlayerList {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  (story): ReactElement => <Mockstore>{story()}</Mockstore>,
];
