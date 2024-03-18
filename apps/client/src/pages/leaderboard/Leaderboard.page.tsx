import { ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRaceId, AppTournamentId, AppTournamentState } from '@razor/models';
import { RootState } from '@razor/store';
import cs from 'classnames';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { Description, Panel } from '../../components';
import { Timer } from '../../components/molecules/timer';

import { LeaderboardList } from './templates/leaderboard_list/LeaderboardList.template';
export function Leaderboard(): ReactElement {
  const { t } = useTranslation(['leaderboard']);
  const navigate = useNavigate();
  const game = useSelector((store: RootState) => store.game);
  const { roomId, raceIndex } = useParams();
  const [raceId, setRaceId] = useState<AppRaceId>(
    `T:${roomId}-R:${raceIndex}` as AppRaceId,
  );

  const timeout = useRef(10);

  const panelImages: Array<string> = [
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150',
    'https://via.placeholder.com/300x150',
  ];

  const handleTimeEnd = (): void => {
    navigate(`/${roomId}/room`);
  };

  // If the tournament state is changed to Race while user in the leaderboard navigate to the race page directly.
  useEffect((): void => {
    const tournamentId: AppTournamentId = `T:${roomId}`;
    const tournament = game.tournamentsModel[tournamentId];

    if (tournament.state === AppTournamentState.Race) {
      navigate(`/${roomId}/race`);
    }
  }, [game, roomId]);

  return (
    <div className='h-full w-full relative'>
      <Logo className='absolute top-0 left-10 w-[150px] h-[150px]' />
      <Panel title={t('panel.title')}>
        <Description
          title={t('panel.descriptions.0.title')}
          image={panelImages[0]}>
          {t('panel.descriptions.0.content') as string}
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

      <div
        className={cs(
          'flex flex-col justify-center py-20 items-center',
          'w-full h-full',
        )}>
        <div className='flex grow flex-col w-full h-1/2 justify-around items-center'>
          <div
            className={cs(
              'max-w-[1000px] w-10/12 h-full',
              'my-32',
              'overflow-hidden flex flex-col justify-center items-center',
            )}>
            {raceId ? <LeaderboardList raceId={raceId as AppRaceId} /> : null}
          </div>
        </div>
      </div>

      <div className='absolute right-0 bottom-0 scale-50 origin-bottom-right'>
        <Timer time={timeout.current} onTimeEnd={handleTimeEnd} />
      </div>
    </div>
  );
}
