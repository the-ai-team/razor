import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRaceId, AppTournamentId } from '@razor/models';
import { RootState } from '@razor/store';

import { Text } from '../../components';
import { TextSize, TextType } from '../../models';

import { RaceTrack } from './templates/race-view/RaceTrack.template';

export function Race(): ReactElement {
  // FIXME: convert id to roomId
  const { id } = useParams();

  const navigate = useNavigate();

  const game = useSelector((store: RootState) => store.game);
  const [raceId, setRaceId] = useState<AppRaceId | null>(null);

  useEffect(() => {
    const tournamentId: AppTournamentId = `T:${id}`;
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
  }, [game, id]);

  return (
    <div>
      <Text type={TextType.Heading} size={TextSize.Large}>
        Race
      </Text>
      {raceId ? <RaceTrack raceId={raceId} /> : null}
      <button
        className='bg-white'
        type='button'
        onClick={(): void => navigate('../leaderboard')}>
        End Race
      </button>
    </div>
  );
}
