import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppPlayerId, AppPlayerLogId, AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';

// PlayerId: [last recorded char index, timestamp]
type PlayerCursorPos = Record<AppPlayerId, [number, number]>;
type PlayerRank = Record<AppPlayerId, number>;

export function useComputePlayerRanks(raceId: AppRaceId): PlayerRank[] {
  const [initialRaceId] = useState<AppRaceId>(raceId);
  const game = useSelector((store: RootState) => store.game);
  const race = game.racesModel[initialRaceId];
  const playerLogsModel = game.playerLogsModel;

  const [playerRanks, setPlayerRanks] = useState<PlayerRank>({});

  useEffect(() => {
    const playersIds = Object.keys(race.players) as AppPlayerId[];
    const playerCursorPos: PlayerCursorPos = {};
    // Extract last recorded char index with timestamp for each player
    playersIds.forEach(playerId => {
      const playerLogsId: AppPlayerLogId = `${initialRaceId}-${playerId}`;
      const playerLogs = playerLogsModel[playerLogsId];
      const lastRecordedCharIndex = playerLogs?.length
        ? playerLogs[playerLogs.length - 1].textLength
        : 0;
      const lastRecordedTimestamp = playerLogs?.length
        ? playerLogs[playerLogs.length - 1].timestamp
        : 0;
      playerCursorPos[playerId] = [
        lastRecordedCharIndex,
        lastRecordedTimestamp,
      ];
    });

    // Sort players by their last recorded char index and lowest timestamp
    const sortedPlayersIds = playersIds.sort((playerIdA, playerIdB) => {
      const [charIndexA, timestampA] = playerCursorPos[playerIdA];
      const [charIndexB, timestampB] = playerCursorPos[playerIdB];
      if (charIndexA !== charIndexB) {
        return charIndexB - charIndexA;
      }
      return timestampA - timestampB;
    });

    // Assign ranks to players, same rank for players in the same position
    const playerRanks: PlayerRank = {};
    let rank = 1;
    let prevPlayerCursorPos = playerCursorPos[sortedPlayersIds[0]];
    sortedPlayersIds.forEach(playerId => {
      const cursorPos = playerCursorPos[playerId];
      if (
        cursorPos[0] !== prevPlayerCursorPos[0] ||
        cursorPos[1] !== prevPlayerCursorPos[1]
      ) {
        rank++;
      }
      playerRanks[playerId] = rank;
      prevPlayerCursorPos = cursorPos;
    });

    setPlayerRanks(playerRanks);
  }, [playerLogsModel]);

  return [playerRanks];
}
