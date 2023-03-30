import { AppPlayerId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { RaceBackground } from './race-background';
import { RaceLine } from './race-line';

import cs from 'classnames';
import {
  getRaceTrackPavementRows,
  getRaceTrackRowColumnSizes,
} from './data/race-data';

interface RaceTrackProps {
  raceId: AppRaceId;
}

export function RaceTrack({ raceId }: RaceTrackProps): ReactElement {
  const game = useSelector((store: RootState) => store.game);
  const tournamentId = extractId(
    raceId,
    ExtractIdType.Race,
    ExtractIdType.Tournament,
  );
  const playerIds = game.tournamentsModel[tournamentId].playerIds;

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

  const textLength = game.racesModel[raceId].text.length;
  const lineHeight = getRaceTrackRowColumnSizes();
  const pavementHeight =
    getRaceTrackPavementRows(playerIds.length) * lineHeight;

  return (
    <div className=''>
      <div className={cs('relative w-full')}>
        <RaceBackground
          count={playerIds.length}
          className={cs('my-10 mx-auto')}
        />
        <div
          className={cs('w-full absolute mx-auto')}
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
          </div>
        </div>
      </div>
    </div>
  );
}
