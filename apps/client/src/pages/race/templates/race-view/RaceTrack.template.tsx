import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppPlayerId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import cs from 'classnames';

import {
  carColors,
  getRaceTrackPavementRows,
  getRaceTrackRowColumnSizes,
  maxRaceTracks,
} from './data/race-data';
import { RaceBackground } from './race-background';
import { RaceLine } from './race-line';

export interface RaceTrackProps {
  raceId: AppRaceId;
  className?: string;
  maxTracks?: number;
}

export function RaceTrack({
  raceId,
  className,
  maxTracks = maxRaceTracks,
}: RaceTrackProps): ReactElement {
  const game = useSelector((store: RootState) => store.game);

  const racePlayers = game.racesModel[raceId]?.players;
  const playerIds = (Object.keys(racePlayers) || []) as AppPlayerId[];

  if (maxTracks <= 0) {
    maxTracks = playerIds.length;
  } else {
    maxTracks = Math.min(maxTracks, playerIds.length);
  }

  const textLength = game.racesModel[raceId].text.length;
  const lineHeight = getRaceTrackRowColumnSizes();
  const pavementHeight = getRaceTrackPavementRows(maxTracks) * lineHeight;

  return (
    <div className={className}>
      <div className={cs('relative w-full')}>
        <RaceBackground
          count={maxTracks}
          className={cs('my-10 mx-auto', 'rounded-md overflow-hidden')}
        />
        <div
          className={cs('w-full absolute mx-auto')}
          style={{ top: `${pavementHeight}px` }}>
          <div className='mx-auto'>
            {playerIds.map((playerId: AppPlayerId) => {
              const color =
                carColors[playerIds.indexOf(playerId) % carColors.length];

              if (playerIds.indexOf(playerId) >= maxTracks) {
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
          </div>
        </div>
      </div>
    </div>
  );
}
