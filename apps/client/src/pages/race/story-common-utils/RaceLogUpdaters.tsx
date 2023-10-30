import { ReactElement, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppPlayerId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';
import { savedData } from 'apps/client/src/utils/save-player-data';
import { ReactComponent as ChevronRight } from 'pixelarticons/svg/chevron-right.svg';

import { Button, ButtonWithInput, Text } from '../../../components';
import { TextSize, TextType } from '../../../models';

import { addPlayer, clearLastPlayer, updatePlayerLog } from './test-race';

interface RaceTrackUpdatersProps {
  isEnableSelfPlayer?: boolean;
}

export function RaceLogUpdaters({
  isEnableSelfPlayer = true,
}: RaceTrackUpdatersProps): ReactElement | null {
  const game = useSelector((store: RootState) => store.game);
  const [raceId, setRaceId] = useState<AppRaceId | null>(null);
  const [count, setCount] = useState(0);
  const [playerIds, setPlayerIds] = useState<AppPlayerId[]>([]);
  const selfPlayerId = useRef<AppPlayerId | null>(savedData.savedPlayerId);

  useEffect(() => {
    const racesModel = game.racesModel;
    const raceId = Object.keys(racesModel)[0] as AppRaceId;
    setRaceId(raceId);

    const tournamentId = extractId(
      raceId,
      ExtractIdType.Race,
      ExtractIdType.Tournament,
    );

    setPlayerIds(game.tournamentsModel[tournamentId]?.playerIds || []);
    setCount(playerIds.length);

    return () => {
      setRaceId(null);
    };
  }, [game, playerIds]);

  if (!raceId) {
    return null;
  }

  enum CountOperation {
    Add = 'add',
    Subtract = 'subtract',
  }

  const countHandler = (operation: CountOperation): void => {
    if (operation === CountOperation.Subtract) {
      setCount(count => count - 1);
      clearLastPlayer();
      return;
    } else {
      setCount(count => count + 1);
      addPlayer(count + 1);
    }
  };

  return (
    <div>
      <div className='my-5 flex gap-5 items-center'>
        <Text type={TextType.Title} size={TextSize.Medium}>
          {`Text Length - ${game.racesModel[raceId].text.length}`}
        </Text>
        <Button onClick={(): void => countHandler(CountOperation.Add)}>
          Add
        </Button>
        <Button onClick={(): void => countHandler(CountOperation.Subtract)}>
          Clear
        </Button>
      </div>

      <div className='mb-5 flex gap-3 flex-wrap'>
        {playerIds.map((playerId: AppPlayerId, index: number) => {
          return (
            <PlayerPositionUpdater
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              playerId={playerId}
              index={index + 1}
              isDisabled={
                !isEnableSelfPlayer && playerId === selfPlayerId.current
              }
            />
          );
        })}
      </div>
    </div>
  );
}

interface PlayerPositionUpdaterProps {
  playerId: AppPlayerId;
  index: number;
  isDisabled?: boolean;
}

function PlayerPositionUpdater({
  playerId,
  index,
  isDisabled = false,
}: PlayerPositionUpdaterProps): ReactElement {
  const [position, updatePosition] = useState(0);

  return (
    <ButtonWithInput
      onClick={(value: number): void => updatePlayerLog(playerId, value)}
      inputSize={3}
      maxInputLength={3}
      inputValue={position}
      onInputChange={(e): void => {
        updatePosition(Number(e.target.value));
      }}
      isDisabled={isDisabled}
      icon={<ChevronRight className='w-10 h-10 text-neutral-90' />}>
      {`${index} ${isDisabled ? ' (Self)' : ''}`}
    </ButtonWithInput>
  );
}
