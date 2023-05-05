import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';

import './test-race';

import { Text } from '../../components/atoms/text/Text.component';
import { TextSize, TextType } from '../../models';

import { RaceTrack } from './templates/RaceTrack.template';

export function Race(): ReactElement {
  const navigate = useNavigate();

  const game = useSelector((store: RootState) => store.game);
  const [raceId, setRaceId] = useState<AppRaceId | null>(null);

  useEffect(() => {
    const racesModel = game.racesModel;

    // TODO: Race id should return from the url
    const raceId = Object.keys(racesModel)[0] as AppRaceId;
    setRaceId(raceId);
  }, [game]);

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
