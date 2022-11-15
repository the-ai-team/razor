import { AppIdNumberType } from '@razor/models';
import { store } from '../store';

const mockTournamentId1 = 'T:rGl0zHJk';
const mockPlayerId1 = 'P:WrVeLanq';
const mockGenralId1 = 'GGl0zoLk';

jest.mock('@razor/util', () => ({
  ...jest.requireActual('@razor/util'),
  generateUid: jest.fn().mockImplementation((type: AppIdNumberType) => {
    switch (type) {
      case AppIdNumberType.Tournament:
        return mockTournamentId1;
      case AppIdNumberType.Player:
        return mockPlayerId1;
      case AppIdNumberType.General:
        return mockGenralId1;
    }
  }),
  generateAvatarLink: jest.fn(
    () => 'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
  ),
}));

describe('[Effects] Player', () => {
  it('Player join and create a lobby', async () => {
    await store.dispatch.game.joinPlayer({
      tid: '',
      playerName: 'Player1',
    });

    const gameState = store.getState().game;
    const expectedResult = {
      ...gameState,
      tournamentsModel: {
        [mockTournamentId1]: {
          playerIds: [mockPlayerId1],
          raceIds: [],
          state: 'lobby',
        },
      },
      playersModel: {
        [mockPlayerId1]: {
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          name: 'Player1',
          state: 'idle',
          tournamentId: mockTournamentId1,
        },
      },
    };
    expect(gameState).toEqual(expectedResult);
  });
});
