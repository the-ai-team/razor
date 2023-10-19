import { ReactElement, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppPlayerId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { useComputeMaxRaceTracks } from 'apps/client/src/utils/custom-hooks/compute-max-race-tracks';
import { getSavedPlayerId } from 'apps/client/src/utils/save-player-id';
import cs from 'classnames';

import {
  carColors,
  getRaceTrackPavementRows,
  getRaceTrackRowColumnSizes,
} from './data/race-data';
import { RaceBackground } from './race-background';
import { RaceLine } from './race-line';

export interface RaceTrackProps {
  raceId: AppRaceId;
  className?: string;
}

export function RaceTrack({ raceId, className }: RaceTrackProps): ReactElement {
  const game = useSelector((store: RootState) => store.game);
  const selfPlayerId = useRef<AppPlayerId>(getSavedPlayerId());

  const racePlayers = game.racesModel[raceId]?.players;
  const playerIds = (Object.keys(racePlayers) || []) as AppPlayerId[];

  const textLength = game.racesModel[raceId].text.length;
  const lineHeight = getRaceTrackRowColumnSizes();

  const maxRaceTracksCount = useComputeMaxRaceTracks();

  const pavementHeight =
    getRaceTrackPavementRows(maxRaceTracksCount) * lineHeight;

  return (
    <div className={className}>
      <div className={cs('relative w-full')}>
        <RaceBackground
          count={Math.min(maxRaceTracksCount, playerIds.length)}
          className={cs('my-10 mx-auto', 'rounded-md overflow-hidden')}
        />
        <div
          className={cs('w-full absolute mx-auto')}
          style={{ top: `${pavementHeight}px` }}>
          <div className='mx-auto'>
            {playerIds.map((playerId: AppPlayerId) => {
              const color =
                carColors[playerIds.indexOf(playerId) % carColors.length];

              // Skip self player
              if (playerId === selfPlayerId.current) {
                return null;
              }

              // Skip overflowing player lines
              if (playerIds.indexOf(playerId) >= maxRaceTracksCount - 1) {
                return null;
              }

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
            {/* Self player line at top */}
            {selfPlayerId.current ? (
              <RaceLine
                raceId={raceId}
                playerId={selfPlayerId.current}
                raceTextLength={textLength}
                carColor={
                  carColors[
                    playerIds.indexOf(selfPlayerId.current) % carColors.length
                  ]
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
