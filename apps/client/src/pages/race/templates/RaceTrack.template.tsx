import { AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { RaceBackground } from './race-background';

import cs from 'classnames';

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

  return (
    <div>
      <RaceBackground
        count={playerIds.length}
        className={cs('mx-auto my-10')}
      />
    </div>
  );
}
