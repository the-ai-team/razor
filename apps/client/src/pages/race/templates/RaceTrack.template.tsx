import { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { M_TR0_RACE_ID0 } from '@razor/mocks';
import { AppPlayerId, AppRaceId } from '@razor/models';
import { Dispatch, RootState } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';

import { RaceBackground } from './race-background';
import { RaceLine } from './RaceLine.template';

import cs from 'classnames';

interface RaceTrackProps {
  raceId: AppRaceId;
}

export function RaceTrack({ raceId }: RaceTrackProps): ReactElement {
  const game = useSelector((store: RootState) => store.game);
  const dispatch: Dispatch = useDispatch();

  const updateHandler = useCallback(
    (playerId: AppPlayerId): void => {
      const playerLog = game.playerLogsModel[`${raceId}-${playerId}`];
      const lastPlayerLog = playerLog[playerLog.length - 1];
      dispatch.game.sendTypeLog({
        raceId: M_TR0_RACE_ID0,
        playerId,
        playerLog: {
          timestamp: Date.now(),
          textLength: lastPlayerLog.textLength + 10,
        },
      });
    },
    [dispatch.game, game.playerLogsModel, raceId],
  );

  const tournamentId = extractId(
    raceId,
    ExtractIdType.Race,
    ExtractIdType.Tournament,
  );
  const playerIds = game.tournamentsModel[tournamentId].playerIds;
  const textLength = game.racesModel[raceId].text.length;

  return (
    <div>
      <RaceBackground
        count={playerIds.length}
        className={cs('mx-auto my-10')}
      />
      {playerIds.map((playerId: AppPlayerId) => {
        return (
          <div key={playerId}>
            <RaceLine
              raceId={raceId}
              playerId={playerId}
              raceTextLength={textLength}
            />
            <button
              type='button'
              className='bg-neutral-40 p-2'
              onClick={(): void => updateHandler(playerId)}>
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}
