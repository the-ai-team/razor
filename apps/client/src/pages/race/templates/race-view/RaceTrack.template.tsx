import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppPlayerId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';
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
  const tournamentId = extractId(
    raceId,
    ExtractIdType.Race,
    ExtractIdType.Tournament,
  );

  // FIXME: should take player ids from the race not the tournament
  const playerIds = game.tournamentsModel[tournamentId]?.playerIds;

  const textLength = game.racesModel[raceId].text.length;
  const lineHeight = getRaceTrackRowColumnSizes();
  const pavementHeight =
    getRaceTrackPavementRows(playerIds.length) * lineHeight;

  return (
    <div className={className}>
      <div className={cs('relative w-full')}>
        <RaceBackground
          count={playerIds.length}
          className={cs('my-10 mx-auto', 'rounded-md overflow-hidden')}
        />
        <div
          className={cs('w-full absolute mx-auto')}
          style={{ top: `${pavementHeight}px` }}>
          <div className='mx-auto'>
            {playerIds.map((playerId: AppPlayerId) => {
              const color =
                carColors[playerIds.indexOf(playerId) % carColors.length];
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
