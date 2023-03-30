import { AppPlayerId, AppPlayerLogId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { CarComponent } from './CarComponent';
import {
  getCarComponentSize,
  getRaceTrackRowColumnSizes,
  raceTrackWidth,
} from '../data/race-data';

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
  console.log('RaceLine', raceId, playerId, raceTextLength, carColor);
  const playerLogId: AppPlayerLogId = `${raceId}-${playerId}`;
  const game = useSelector((store: RootState) => store.game);

  const playerLogs = game.playerLogsModel[playerLogId];
  console.log('playerLogs', playerLogs);
  if (!playerLogs) {
    return null;
  }
  const playerTypedLength = playerLogs[playerLogs.length - 1].textLength;
  const lineHeight = getRaceTrackRowColumnSizes();
  const { carSizeFactor, carWidth } = getCarComponentSize();
  // console.log('carWidth', carWidth);
  let playerPos;
  if (playerTypedLength < raceTextLength) {
    playerPos =
      (playerTypedLength / raceTextLength) * (raceTrackWidth - carWidth);
  } else {
    playerPos = raceTrackWidth - carWidth;
  }

  return (
    <div
      key={playerId}
      className='relative mx-auto'
      style={{ width: `${raceTrackWidth}px`, height: `${lineHeight}px` }}>
      <img src='' alt='' />
      <div
        className='absolute transition-all duration-300'
        style={{
          left: `${playerPos}px`,
          top: `${lineHeight / 4}px`,
          transform: `scale(${carSizeFactor})`,
        }}>
        <CarComponent overlay={carColor} />
      </div>
    </div>
  );
}
