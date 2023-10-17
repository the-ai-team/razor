import { ReactElement, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppRaceId, AppTournamentId, PlayerId } from '@razor/models';
import { RootState } from '@razor/store';
import cs from 'classnames';
import { ReactComponent as CarIcon } from 'pixelarticons/svg/car.svg';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { Text, ToastType } from '../../components';
import { Timer } from '../../components/molecules/timer';
import { useToastContext } from '../../hooks/useToastContext';
import { TextSize, TextType } from '../../models';
import {
  sendInitialTypeLog,
  sendTypeLog,
  typeLogPusher,
} from '../../services/handlers/send-type-log';
import { getSavedPlayerId } from '../../utils/save-player-id';

import { RaceText } from './templates/race-text/RaceText.template';
import { RaceTrack } from './templates/race-view/RaceTrack.template';

export function Race(): ReactElement {
  const { roomId } = useParams();
  const { t } = useTranslation(['race']);
  const addToast = useToastContext();
  const game = useSelector((store: RootState) => store.game);
  const [raceId, setRaceId] = useState<AppRaceId | null>(null);
  const [raceReadyTime, setRaceReadyTime] = useState<number>(5);
  const [raceTime, setRaceTime] = useState<number>(0);
  const selfPlayerId = useRef<PlayerId>(getSavedPlayerId());

  useEffect(() => {
    const tournamentId: AppTournamentId = `T:${roomId}`;
    const raceIds = game.tournamentsModel[tournamentId]?.raceIds;
    const racesModel = game.racesModel;
    const raceId = raceIds ? raceIds[raceIds.length - 1] : null;

    // Looking for race in races model
    if (raceId && racesModel[raceId]) {
      setRaceId(raceId);
    } else {
      setRaceId(null);
    }

    // Race ready timer
    const timer = setInterval(() => {
      setRaceReadyTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          prev = 0;
        }
        return prev - 1;
      });
    }, 1000);

    let gameStartedPlayerId: PlayerId | null = null;

    // Type log pusher
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let clearPusher = (): void => {};

    if (raceId) {
      clearPusher = typeLogPusher(raceId);
      gameStartedPlayerId = game.racesModel[raceId]?.raceStartedBy;
    }

    // Get player who started the race
    if (gameStartedPlayerId) {
      const gameStartedPlayerName =
        selfPlayerId.current !== gameStartedPlayerId
          ? game.playersModel[gameStartedPlayerId]?.name
          : 'You';

      if (gameStartedPlayerName) {
        addToast({
          title: t('toasts.race_start.title'),
          type: ToastType.Info,
          message: (
            <Trans
              i18nKey='race:toasts.race_start.message'
              playerName={gameStartedPlayerName}>
              {{ player_name: gameStartedPlayerName }} has started the race.
              Good luck!
            </Trans>
          ) as unknown as string,
          icon: <CarIcon />,
        });
      }
    }

    return () => {
      clearInterval(timer);
      clearPusher();
    };
  }, []);

  useEffect((): void => {
    if (raceId && raceReadyTime <= 0) {
      const raceTime = game.racesModel[raceId]?.timeoutDuration;
      setRaceTime(raceTime);
      sendInitialTypeLog(raceId);
    }
  }, [raceReadyTime, raceId]);

  return (
    <div
      className={cs(
        'flex flex-col justify-center items-center',
        'w-full h-full',
      )}>
      <Logo className='absolute top-0 left-10 w-[150px] h-[150px]' />
      {raceId ? (
        <div className='flex flex-col items-center justify-center relative'>
          {raceReadyTime > 0 ? (
            <div
              className={cs(
                'absolute inset-0 m-auto w-40 h-40 bg-neutral-20 rounded-full z-40',
                'flex items-center justify-center',
              )}>
              <Text type={TextType.Heading} size={TextSize.ExtraLarge}>
                {raceReadyTime.toString()}
              </Text>
            </div>
          ) : null}
          <div
            className={cs('relative', {
              'opacity-20': raceReadyTime > 0,
            })}>
            <div className='scale-75'>
              <RaceTrack raceId={raceId} />
            </div>
            <div className='grid grid-cols-4'>
              <div
                className={cs(
                  'scale-50',
                  'm-auto',
                  'fixed right-0 -top-12 2xl:static 2xl:scale-75',
                )}>
                <Timer
                  time={raceTime}
                  onTimeEnd={(): void => console.log('time end')}
                />
              </div>
              <div className='col-span-4 2xl:col-span-3 max-w-6xl m-auto'>
                <RaceText
                  raceId={raceId}
                  onValidType={(charIndex: number): void =>
                    sendTypeLog(charIndex + 1, raceId)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className='text-2xl text-neutral-90'>Race not found</h4>
      )}
    </div>
  );
}
