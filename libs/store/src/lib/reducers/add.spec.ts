import { AppPlayerState, AppTournamentState } from '@razor/models';
import { store } from '../store';

describe('[Reducers] Add operations', () => {
  // ====== Add Tournament ====== //
  const initialState = store.getState().game;
  it('Add new tournament', () => {
    store.dispatch.game.addTournamentReducer({
      tournamentId: 'T:rGl0zHJk',
      tournament: {
        playerIds: ['P:WrVeLanq'],
        raceIds: [],
        state: AppTournamentState.Lobby,
      },
    });

    const expectedResult = {
      ...initialState,
      tournamentsModel: {
        ...initialState.tournamentsModel,
        'T:rGl0zHJk': {
          playerIds: ['P:WrVeLanq'],
          raceIds: [],
          state: AppTournamentState.Lobby,
        },
      },
    };
    const gameState = store.getState().game;
    expect(gameState).toEqual(expectedResult);
  });

  // ====== Add Race ====== //
  it('Add new race', () => {
    const initialState = store.getState().game;
    // const initialState = {
    //   ...gameState,
    //   tournamentsModel: {
    //     ...gameState.tournamentsModel,
    //     'T:rGl0zHJk': {
    //       playerIds: ['P:WrVeLanq'],
    //       raceIds: [],
    //       state: AppTournamentState.Lobby,
    //     },
    //   },
    // };

    store.dispatch.game.addRaceReducer({
      raceId: 'T:rGl0zHJk-R:000',
      race: {
        text: 'Esse pariatur cillum esse Lorem adipisicing ullamco anim sit tempor duis sunt. Voluptate occaecat laborum nisi nostrud.',
        timeoutDuration: 250,
        startedTimestamp: 1668422625,
        players: {
          'P:WrVeLanq': {
            name: 'Player1',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          },
          'P:WrweLanq': {
            name: 'Player2',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657232.svg',
          },
        },
        isOnGoing: true,
        raceStartedBy: 'P:12345678',
      },
    });

    const expectedResult = {
      ...initialState,
      tournamentsModel: {
        ...initialState.tournamentsModel,
        'T:rGl0zHJk': {
          ...initialState.tournamentsModel['T:rGl0zHJk'],
          raceIds: [
            ...initialState.tournamentsModel['T:rGl0zHJk'].raceIds,
            'T:rGl0zHJk-R:000',
          ],
        },
      },

      racesModel: {
        ...initialState.racesModel,
        'T:rGl0zHJk-R:000': {
          text: 'Esse pariatur cillum esse Lorem adipisicing ullamco anim sit tempor duis sunt. Voluptate occaecat laborum nisi nostrud.',
          timeoutDuration: 250,
          startedTimestamp: 1668422625,
          players: {
            'P:WrVeLanq': {
              name: 'Player1',
              avatarLink:
                'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
            },
            'P:WrweLanq': {
              name: 'Player2',
              avatarLink:
                'https://avatars.dicebear.com/api/open-peeps/506c6179657232.svg',
            },
          },
          isOnGoing: true,
          raceStartedBy: 'P:12345678',
        },
      },
    };
    const gameState = store.getState().game;
    expect(gameState).toEqual(expectedResult);
  });

  // ====== Add Player ====== //
  it('Add new player', () => {
    const initialState = store.getState().game;

    store.dispatch.game.addPlayerReducer({
      tournamentId: 'T:rGl0zHJk',
      playerId: 'P:W4VeL2nq',
      player: {
        name: 'Player2',
        avatarLink:
          'https://avatars.dicebear.com/api/open-peeps/506c6179657256.svg',
        state: AppPlayerState.Idle,
        tournamentId: 'T:rGl0zHJk',
      },
    });

    const expectedResult = {
      ...initialState,
      tournamentsModel: {
        ...initialState.tournamentsModel,
        'T:rGl0zHJk': {
          ...initialState.tournamentsModel['T:rGl0zHJk'],
          playerIds: [
            ...initialState.tournamentsModel['T:rGl0zHJk'].playerIds,
            'P:W4VeL2nq',
          ],
        },
      },
      playersModel: {
        ...initialState.playersModel,
        'P:W4VeL2nq': {
          name: 'Player2',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657256.svg',
          state: AppPlayerState.Idle,
          tournamentId: 'T:rGl0zHJk',
        },
      },
    };
    const gameState = store.getState().game;
    expect(gameState).toEqual(expectedResult);
  });
});

//TODO: Add tests for check already exisitng data return the same state
