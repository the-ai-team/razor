import {
  addPlayer,
  store,
  testTournamentId,
  updatePlayerLog,
} from './test-race';

export function addSampleRaceLogs(): void {
  let game = store.getState().game;
  let playerIds = game.tournamentsModel[testTournamentId].playerIds;

  if (playerIds.length > 2) {
    return;
  }

  // Add 10 players from 3
  for (let i = 3; i <= 12; i++) {
    addPlayer(i);
  }

  game = store.getState().game;
  playerIds = game.tournamentsModel[testTournamentId].playerIds;

  // Move cursors to random places on the text by sending logs
  const positions = [40, 46, 48, 100, 120, 290, 294, 296, 296, 296];
  playerIds.forEach((playerId, index) => {
    if (index === 0) {
      return;
    }
    updatePlayerLog(playerId, positions[index - 1]);
  });
}
