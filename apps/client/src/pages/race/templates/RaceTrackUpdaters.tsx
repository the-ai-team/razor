import { AppPlayerId, AppRaceId } from '@razor/models';
import { Dispatch, RootState } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';
import { ReactComponent as ChevronRight } from 'pixelarticons/svg/chevron-right.svg';
import { ButtonWithInput, Button, Text } from '../../../components';

import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, clearLastPlayer } from './data/test-race';
import { TextSize, TextType } from '../../../models';

export function RaceTrackUpdaters(): ReactElement | null {
  const game = useSelector((store: RootState) => store.game);
  const dispatch: Dispatch = useDispatch();
  const [raceId, setRaceId] = useState<AppRaceId | null>(null);
  const [count, setCount] = useState(0);
  const [playerIds, setPlayerIds] = useState<AppPlayerId[]>([]);

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

  const updateHandler = (playerId: AppPlayerId, value: string): void => {
    const recivedValue = parseInt(value, 10);
    if (!recivedValue) {
      return;
    }
    const playerLog = game.playerLogsModel[`${raceId}-${playerId}`];
    const lastPlayerLog = playerLog[playerLog.length - 1];
    dispatch.game.sendTypeLog({
      raceId,
      playerId,
      playerLog: {
        timestamp: Date.now(),
        textLength: lastPlayerLog.textLength + recivedValue,
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
            <div>
              <ButtonWithInput
                onClick={(value: string): void =>
                  updateHandler(playerId, value)
                }
                inputSize={3}
                maxInputLength={3}
                icon={<ChevronRight className='w-10 h-10 text-neutral-90' />}>
                {`${index}`}
              </ButtonWithInput>
            </div>
          );
        })}
      </div>
    </div>
  );
}
