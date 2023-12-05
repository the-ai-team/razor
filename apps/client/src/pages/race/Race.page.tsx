import { ReactElement, useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RACE_READY_COUNTDOWN } from '@razor/constants';
import {
  AppPlayerState,
  AppRaceId,
  AppTournamentId,
  AppTournamentState,
  PlayerId,
} from '@razor/models';
import { RootState } from '@razor/store';
import cs from 'classnames';
import { ReactComponent as CarIcon } from 'pixelarticons/svg/car.svg';
import { ReactComponent as EyeIcon } from 'pixelarticons/svg/eye.svg';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { Text, ToastType } from '../../components';
import { useToastContext } from '../../hooks';
import { TextSize, TextType } from '../../models';
import { raceTimeout } from '../../services/handlers/race-timeout';
import {
  sendInitialTypeLog,
  sendTypeLog,
  typeLogPusher,
} from '../../services/handlers/send-type-log';
import { savedData } from '../../utils/save-player-data';

import { RaceText } from './templates/race-text/RaceText.template';
import { RaceTimer } from './templates/race-timer/RaceTimer.template';
import { RaceTrack } from './templates/race-view/RaceTrack.template';

export function Race(): ReactElement {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['race']);
  const addToast = useToastContext();
  const game = useSelector((store: RootState) => store.game);
  const [raceId, setRaceId] = useState<AppRaceId | null>(null);
  const [raceReadyTime, setRaceReadyTime] =
    useState<number>(RACE_READY_COUNTDOWN);
  const selfPlayerId = useRef<PlayerId>(savedData.savedPlayerId);
  const [isTypeLocked, setIsTypeLocked] = useState<boolean>(true);
  const [isSpectator, setIsSpectator] = useState<boolean>(false);
  const prevAuthToken = useRef<string | null>(savedData.authToken);

  useEffect(() => {
    const handleAuthTokenChange = (): void =>
      savedData.addEventListener(() => {
        const authToken = savedData.authToken;
        if (prevAuthToken.current === null || authToken === null) {
          return;
        }

        if (prevAuthToken.current !== authToken) {
          prevAuthToken.current = authToken;
          setIsSpectator(true);
        }
        addToast({
          title: t('toasts.reconnected_as_new.title'),
          type: ToastType.Info,
          message: t('toasts.reconnected_as_new.message') as string,
        });
      });
    handleAuthTokenChange();

    return () => {
      savedData.removeEventListener(handleAuthTokenChange);
    };
  }, []);

  // If the tournament state changed to leaderboard navigate to the leaderboard page.
  useEffect((): void => {
    const tournamentId: AppTournamentId = `T:${roomId}`;
    const tournament = game.tournamentsModel[tournamentId];

    // raceId = `T:${roomId}-R:${raceIndex}`
    const raceIndex = raceId ? raceId.split('-')[1].slice(2) : null;
    if (tournament.state === AppTournamentState.Leaderboard) {
      navigate(`/${roomId}/leaderboards/${raceIndex}`);
    }
  }, [game, raceId]);

  useEffect(() => {
    const tournamentId: AppTournamentId = `T:${roomId}`;
    const raceIds = game.tournamentsModel[tournamentId]?.raceIds;
    const racesModel = game.racesModel;
    const raceId = raceIds ? raceIds[raceIds.length - 1] : null;

    const selfPlayer = selfPlayerId.current
      ? game.playersModel[selfPlayerId.current]
      : null;
    if (selfPlayer) {
      const isIdle = selfPlayer.state === AppPlayerState.Idle;
      setIsSpectator(isIdle);
      if (isIdle) {
        setRaceReadyTime(0);
      }
    }

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
      if (!isSpectator) {
        clearPusher = typeLogPusher(raceId);
      }
      gameStartedPlayerId = game.racesModel[raceId]?.raceStartedBy;
    }

    // Get player who started the race
    if (gameStartedPlayerId) {
      const gameStartedPlayerName =
        selfPlayerId.current !== gameStartedPlayerId
          ? game.playersModel[gameStartedPlayerId]?.name
          : 'You';

      if (gameStartedPlayerName && !isSpectator) {
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
          toastHideDelay: 3000,
        });
      }
    }

    return () => {
      clearInterval(timer);
      clearPusher();
    };
  }, []);

  useEffect((): void => {
    if (raceId && raceReadyTime <= 0 && !isSpectator) {
      sendInitialTypeLog(raceId);
      setIsTypeLocked(false);
    }
  }, [raceReadyTime, raceId]);

  const raceEndHandler = (): void => {
    setIsTypeLocked(true);
    if (raceId) {
      raceTimeout(raceId);
    }
  };

  return (
    <div
      className={cs(
        'flex flex-col justify-center items-center',
        'w-full h-full',
      )}>
      <Logo className='absolute top-0 left-10 w-[150px] h-[150px]' />
      {raceId ? (
        <>
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
            className={cs(
              'flex flex-col items-center justify-center gap-4',
              'scale-50 lg:scale-75 xl:scale-90 2xl:scale-95 ',
              {
                'opacity-20': raceReadyTime > 0,
              },
            )}>
            <div className={cs('flex items-center justify-center')}>
              <RaceTrack
                raceId={raceId}
                className='scale-95'
                isSpectator={isSpectator}
              />
            </div>
            {!isSpectator ? (
              <div className='flex gap-12'>
                <div
                  className={cs(
                    'm-auto 2xl:static',
                    'scale-50 2xl:scale-90 origin-top-right 2xl:origin-center',
                    'fixed -top-40 right-8 z-10',
                  )}>
                  <RaceTimer
                    raceId={raceId}
                    isRaceStarted={raceReadyTime <= 0}
                    onTimeEnd={raceEndHandler}
                  />
                </div>

                <div className='col-span-4 2xl:col-span-3 max-w-6xl m-auto'>
                  <RaceText
                    raceId={raceId}
                    isLocked={isTypeLocked}
                    onValidType={(charIndex: number): void =>
                      sendTypeLog(charIndex + 1, raceId)
                    }
                  />
                </div>
              </div>
            ) : null}

            {isSpectator ? (
              <div className='flex m-4 items-center gap-6 justify-center'>
                <EyeIcon className='w-12 h-12 text-neutral-90' />
                <Text type={TextType.Label} size={TextSize.Medium}>
                  You are spectating!
                </Text>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <h4 className='text-2xl text-neutral-90'>Race not found</h4>
      )}
    </div>
  );
}
