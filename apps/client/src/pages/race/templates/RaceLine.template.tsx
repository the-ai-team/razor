import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppPlayerId, AppPlayerLogId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';

interface RaceLineProps {
  raceId: AppRaceId;
  playerId: AppPlayerId;
  raceTextLength: number;
}

export function RaceLine({
  raceId,
  playerId,
  raceTextLength,
}: RaceLineProps): ReactElement | null {
  const playerLogId: AppPlayerLogId = `${raceId}-${playerId}`;
  const game = useSelector((store: RootState) => store.game);
  const playerLogs = game.playerLogsModel[playerLogId];
  if (!playerLogs) {
    return null;
  }
  const playerTypedLength = playerLogs[playerLogs.length - 1].textLength;
  const playerPos = (playerTypedLength / raceTextLength) * 500;
  return (
    <div key={playerId} className='h-[25px] w-[500px] mb-5 bg-white relative'>
      <div
        className='w-5 h-5 rounded-3xl bg-error-60 absolute top-0 transition-all duration-300 '
        style={{ left: `${playerPos}px` }}></div>
    </div>
  );
}
