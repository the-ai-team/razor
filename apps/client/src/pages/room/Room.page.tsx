import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MAX_ALLOWED_PLAYERS, MIN_ALLOWED_PLAYERS } from '@razor/constants';
import { AppTournamentId } from '@razor/models';
import cs from 'classnames';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { Button, Description, Panel } from '../../components';
import { startRace } from '../../services/socket/start-race';

import { PlayerList } from './templates/player-list/PlayerList.template';
import {
  store,
  testTournamentId,
} from './templates/player-list/storybook_helpers/test-race';

export function Room(): ReactElement {
  const { t } = useTranslation(['room']);
  const { roomId } = useParams();
  // const tournamentId: AppTournamentId = `T:${roomId}`;
  const tournamentId: AppTournamentId = testTournamentId;

  // useEffect(() => {
  //   console.log('tournamentId', tournamentId);
  // }, [roomId]);

  const panelImages: Array<string> = [
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150',
  ];

  return (
    <Provider store={store}>
      <div
        className={cs(
          'flex flex-col justify-center items-center',
          'w-full h-full',
        )}>
        <Logo className='absolute top-0 left-10 w-[250px] h-[250px]' />

        <Panel title={t('panel.title')}>
          <Description
            title={t('panel.descriptions.0.title')}
            image={panelImages[0]}>
            {
              t('panel.descriptions.0.content', {
                min: MIN_ALLOWED_PLAYERS,
                max: MAX_ALLOWED_PLAYERS,
              }) as string
            }
          </Description>
          <Description
            title={t('panel.descriptions.1.title')}
            image={panelImages[1]}>
            {t('panel.descriptions.1.content') as string}
          </Description>
          <Description
            title={t('panel.descriptions.2.title')}
            image={panelImages[2]}>
            {t('panel.descriptions.2.content') as string}
          </Description>
        </Panel>

        <div className='flex flex-col w-full h-full py-32 justify-around items-center'>
          <div className='max-w-[1000px] w-10/12 h-1/2 flex flex-col justify-center items-center'>
            <PlayerList tournamentId={tournamentId} />
          </div>
          <div className={cs('relative top-20')}>
            <Button onClick={(): void => startRace()}>
              {t('actions.start') as string}
            </Button>
          </div>
        </div>
      </div>
    </Provider>
  );
}
