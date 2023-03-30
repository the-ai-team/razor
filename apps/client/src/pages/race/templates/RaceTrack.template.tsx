import { AppPlayerId, AppRaceId } from '@razor/models';
import { Dispatch, RootState } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RaceBackground } from './race-background';
import { RaceLine } from './race-line';

import cs from 'classnames';
import {
  getRaceTrackPavementRows,
  getRaceTrackRowColumnSizes,
} from './data/race-data';
import { addPlayer } from './data/test-race';

interface RaceTrackProps {
  raceId: AppRaceId;
}

export function RaceTrack({ raceId }: RaceTrackProps): ReactElement {
  const game = useSelector((store: RootState) => store.game);
  const dispatch: Dispatch = useDispatch();
  const tournamentId = extractId(
    raceId,
    ExtractIdType.Race,
    ExtractIdType.Tournament,
  );
  const playerIds = game.tournamentsModel[tournamentId].playerIds;
  const [count, setCount] = useState(playerIds.length);

  const colors = [
    '#C03E41',
    '#4AA0F0',
    '#5AE179',
    '#FFBB3D',
    '#CF5CF5',
    '#8C5CF5',
    '#5CF5D9',
    '#D6F55C',
    '#F49F4F',
    '#5F5CF5',
    '#F5DD5C',
    '#F55CDC',
  ];

  const updateHandler = useCallback(
    (playerId: AppPlayerId): void => {
      const playerLog = game.playerLogsModel[`${raceId}-${playerId}`];
      const lastPlayerLog = playerLog[playerLog.length - 1];
      dispatch.game.sendTypeLog({
        raceId,
        playerId,
        playerLog: {
          timestamp: Date.now(),
          textLength: lastPlayerLog.textLength + 10,
        },
      });
    },
    [dispatch.game, game.playerLogsModel, raceId],
  );

  const countHandler = (): void => {
    setCount(count => count + 1);
    addPlayer(count + 1);
  };

  useEffect(() => {
    console.log(count);
  }, [count]);

  const textLength = game.racesModel[raceId].text.length;
  const lineHeight = getRaceTrackRowColumnSizes();
  const pavementHeight =
    getRaceTrackPavementRows(playerIds.length) * lineHeight;

  return (
    <div className=''>
      <button
        type='button'
        className='btn bg-neutral-40'
        onClick={countHandler}>
        {' '}
        Click met to add
      </button>
      <div className={cs('relative w-full')}>
        <div className='mx-auto'>
          <RaceBackground count={playerIds.length} className={cs('my-10')} />
        </div>
        <div
          className={cs('absolute mx-auto')}
          style={{ top: `${pavementHeight}px` }}>
          <div className='mx-auto'>
            {playerIds.map((playerId: AppPlayerId) => {
              const color = colors[playerIds.indexOf(playerId)];
              return (
                <div
                  key={playerId}
                  style={{
                    marginBottom: `${lineHeight}px`,
                  }}>
                  <RaceLine
                    raceId={raceId}
                    playerId={playerId}
                    raceTextLength={textLength}
                    carColor={color}
                  />
                </div>
              );
            })}
            {playerIds.map((playerId: AppPlayerId) => {
              return (
                <button
                  key={playerId}
                  type='button'
                  className='bg-neutral-40 p-4 mr-2'
                  onClick={(): void => updateHandler(playerId)}>
                  +
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
