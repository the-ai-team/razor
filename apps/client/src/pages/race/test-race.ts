import { AppPlayerId } from '@razor/models';
import { store } from '@razor/store';

const loadRacingText = async (): Promise<string> => {
  const url = 'http://www.metaphorpsum.com/paragraphs/1/8';

  return await fetch(url)
    .then(response => response.text())
    .then(data => {
      return data;
    });
};

store.dispatch.game.joinPlayer({
  receivedTournamentId: '',
  playerName: 'Player1',
});

let game = store.getState().game;
const playersModel = game.playersModel;
const players = Object.keys(playersModel);
const player1Id = players[0] as AppPlayerId;
const tournamentId = playersModel[player1Id].tournamentId;

store.dispatch.game.joinPlayer({
  receivedTournamentId: tournamentId,
  playerName: 'Player2',
});

(async (): Promise<void> => {
  store.dispatch.game.startCountdown({
    tournamentId: tournamentId,
    playerId: player1Id,
    raceText: await loadRacingText(),
  });

  game = store.getState().game;
  const playerIds = game.tournamentsModel[tournamentId].playerIds;

  playerIds.forEach(playerId => {
    store.dispatch.game.sendTypeLog({
      raceId: `${tournamentId}-R:000`,
      playerId: playerId,
      playerLog: {
        timestamp: Date.now(),
        textLength: 0,
      },
    });
  });

  game = store.getState().game;
})();

export const addPlayer = (count: number): void => {
  console.log('addPlayer', count);
  store.dispatch.game.joinPlayer({
    receivedTournamentId: tournamentId,
    playerName: `Player${count}`,
  });
  game = store.getState().game;
  const playerIds = game.tournamentsModel[tournamentId].playerIds;
  console.log('playerIds', playerIds);
  const playerId = playerIds[playerIds.length - 1];

  store.dispatch.game.sendTypeLog({
    raceId: `${tournamentId}-R:000`,
    playerId: playerId,
    playerLog: {
      timestamp: Date.now(),
      textLength: 0,
    },
  });
};
