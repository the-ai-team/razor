import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppPlayerId, AppPlayerLogId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { Text } from 'apps/client/src/components';
import { TextSize, TextType } from 'apps/client/src/models';
import { useComputePlayerRanks } from 'apps/client/src/utils/custom-hooks/compute-player-rank';
import cs from 'classnames';

import {
  getCarComponentSize,
  getRaceTrackRowColumnSizes,
  raceFreeParkingWidth,
  raceLineWidth,
  raceTrackWidth,
} from '../data/race-data';

import { CarComponent } from './CarComponent';

interface RaceLineProps {
  raceId: AppRaceId;
  playerId: AppPlayerId;
  raceTextLength: number;
  carColor: string;
}

export function RaceLine({
  raceId,
  playerId,
  raceTextLength,
  carColor,
}: RaceLineProps): ReactElement | null {
  const playerLogId: AppPlayerLogId = `${raceId}-${playerId}`;
  const game = useSelector((store: RootState) => store.game);
  const playersModel = game.playersModel;
  const playerName = playersModel[playerId]?.name || 'Unknown';
  const [playerRanks] = useComputePlayerRanks(raceId);

  const playerLogs = game.playerLogsModel[playerLogId];
  if (!playerLogs) {
    return null;
  }
  const playerTypedLength = playerLogs[playerLogs.length - 1].textLength;
  const lineHeight = getRaceTrackRowColumnSizes();
  const { carSizeFactor, carWidth } = getCarComponentSize();

  let playerPos;
  if (playerTypedLength < raceTextLength) {
    // total distance to travel = racing line width + car width
    // player position = parking width + race progression ratio * total distance to travel - car width;
    // * reducing car width to take car to the left of the starting line
    playerPos =
      raceFreeParkingWidth +
      (playerTypedLength / raceTextLength) * (raceLineWidth + carWidth) -
      carWidth;
  } else {
    // after player finish the race stop the car at the end of the line
    playerPos = raceFreeParkingWidth + raceLineWidth;
  }

  return (
    <div
      key={playerId}
      className='relative mx-auto'
      style={{ width: `${raceTrackWidth}px`, height: `${lineHeight}px` }}>
      <div
        className={cs('absolute transition-all duration-300')}
        style={{
          left: `${playerPos}px`,
          top: `${lineHeight / 4}px`,
          transform: `scale(${carSizeFactor})`,
        }}>
        <Text
          type={TextType.Title}
          size={TextSize.Small}
          className={cs(
            'px-2 bg-neutral-40 text-neutral-90 rounded-full',
            'absolute -left-6 -top-1',
          )}>
          {`${playerRanks[playerId]}`}
        </Text>
        <div className='flex items-center justify-center'>
          <CarComponent overlay={carColor} />
          <Text
            type={TextType.Title}
            size={TextSize.Small}
            className={cs('px-2 opacity-50 text-neutral-90 rounded-full')}>
            {playerName}
          </Text>
        </div>
      </div>
    </div>
  );
}
