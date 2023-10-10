import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRaceId, AppTournamentId } from '@razor/models';
import { RootState } from '@razor/store';
import cs from 'classnames';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { Text } from '../../components';
import { Timer } from '../../components/molecules/timer';
import { TextSize, TextType } from '../../models';
import {
  sendTypeLog,
  typeLogPusher,
} from '../../services/handlers/send-type-log';

import { RaceText } from './templates/race-text/RaceText.template';
import { RaceTrack } from './templates/race-view/RaceTrack.template';

export function Race(): ReactElement {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const game = useSelector((store: RootState) => store.game);
  const [raceId, setRaceId] = useState<AppRaceId | null>(null);
  const [raceReadyTimer, setRaceReadyTimer] = useState<number>(5);

  useEffect(() => {
    // Race ready timer
    const timer = setInterval(() => {
      setRaceReadyTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          prev = 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Type log pusher
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let clearPusher = (): void => {};

    if (raceId) {
      clearPusher = typeLogPusher(raceId);
    }

    return () => {
      clearInterval(timer);
      clearPusher();
    };
  }, []);

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

    return () => {
      setRaceId(null);
    };
  }, [game, roomId]);

  return (
    <div
      className={cs(
        'flex flex-col justify-center items-center',
        'w-full h-full',
      )}>
      <Logo className='absolute top-0 left-10 w-[250px] h-[250px]' />
      {raceId ? (
        <div className='flex flex-col items-center justify-center'>
          <div className='scale-75 relative'>
            {raceReadyTimer > 0 ? (
              <div
                className={cs(
                  'absolute inset-0 m-auto w-40 h-40 bg-neutral-20 rounded-full z-40',
                  'flex items-center justify-center',
                )}>
                <Text type={TextType.Heading} size={TextSize.ExtraLarge}>
                  {raceReadyTimer.toString()}
                </Text>
              </div>
            ) : null}
            <RaceTrack
              className={cs({ 'opacity-20': raceReadyTimer > 0 })}
              raceId={raceId}
            />
          </div>
          <div className='grid grid-cols-4'>
            <div className={cs('scale-75', 'm-auto', 'hidden 2xl:block')}>
              <Timer
                time={10}
                onTimeEnd={(): void => console.log('time end')}
              />
            </div>
            <div className='col-span-4 2xl:col-span-3 max-w-6xl'>
              <RaceText
                raceId={raceId}
                onType={(charIndex: number): void => sendTypeLog(charIndex)}
              />
            </div>
          </div>
        </div>
      ) : (
        <h4 className='text-2xl text-neutral-90'>Race not found</h4>
      )}
    </div>
  );
}
