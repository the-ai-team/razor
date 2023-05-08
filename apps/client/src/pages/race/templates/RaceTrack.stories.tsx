import { Meta, Story } from '@storybook/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store, testTournamentId } from './data/test-race';
import { RaceTrackUpdaters } from './RaceTrackUpdaters';
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
    <RaceTrackUpdaters />
  </Provider>
);

const Template: Story<RaceTrackProps> = args => <RaceTrack {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  (story): ReactElement => <Mockstore>{story()}</Mockstore>,
];