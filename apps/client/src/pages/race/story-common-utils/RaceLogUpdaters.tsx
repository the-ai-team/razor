import { ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppPlayerId, AppRaceId } from '@razor/models';
import { Dispatch, RootState } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';
import { getSavedPlayerId } from 'apps/client/src/utils/save-player-id';
import { ReactComponent as ChevronRight } from 'pixelarticons/svg/chevron-right.svg';

import { Button, ButtonWithInput, Text } from '../../../components';
import { TextSize, TextType } from '../../../models';

interface RaceTrackUpdatersProps {
  addPlayer: (count: number) => void;
  clearLastPlayer: () => void;
  isEnableSelfPlayer?: boolean;
}

export function RaceLogUpdaters({
  addPlayer,
  clearLastPlayer,
  isEnableSelfPlayer = true,
}: RaceTrackUpdatersProps): ReactElement | null {
  const game = useSelector((store: RootState) => store.game);
  const dispatch: Dispatch = useDispatch();
  const [raceId, setRaceId] = useState<AppRaceId | null>(null);
  const [count, setCount] = useState(0);
  const [playerIds, setPlayerIds] = useState<AppPlayerId[]>([]);
  const selfPlayerId = useRef<AppPlayerId | null>(getSavedPlayerId());

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

  const updateHandler = (playerId: AppPlayerId, value: number): void => {
    if (!value) {
      return;
    }
    const playerLog = game.playerLogsModel[`${raceId}-${playerId}`];
    const lastPlayerLog = playerLog[playerLog.length - 1];
    dispatch.game.sendTypeLog({
      raceId,
      playerId,
      playerLog: {
        timestamp: Date.now(),
        textLength: lastPlayerLog.textLength + value,
      },
    });
  };

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
              updateHandler={updateHandler}
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
  updateHandler: (playerId: AppPlayerId, value: number) => void;
  isDisabled?: boolean;
}

function PlayerPositionUpdater({
  playerId,
  index,
  updateHandler,
  isDisabled = false,
}: PlayerPositionUpdaterProps): ReactElement {
  const [position, updatePosition] = useState(0);
  const updatePositionHandler = (value: string): void => {
    updatePosition(Number(value));
  };

  return (
    <ButtonWithInput
      onClick={(value: number): void => updateHandler(playerId, value)}
      inputSize={3}
      maxInputLength={3}
      inputValue={position}
      onInputChange={(e): void => {
        updatePositionHandler(e.target.value);
      }}
      isDisabled={isDisabled}
      icon={<ChevronRight className='w-10 h-10 text-neutral-90' />}>
      {`${index} ${isDisabled ? ' (Self)' : ''}`}
    </ButtonWithInput>
  );
}
