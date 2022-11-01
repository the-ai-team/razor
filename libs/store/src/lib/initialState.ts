import {
  AppPlayerState,
  AppPlayerStatus,
  AppStateModel,
  AppTournamentState,
} from '@razor/models';

export const initialState: AppStateModel = {
  tournamentsModel: {
    '1': {
      state: AppTournamentState.Lobby,
      raceIds: [],
      playerIds: ['1', '2'],
    },
    '2': {
      state: AppTournamentState.Empty,
      raceIds: [],
      playerIds: [],
    },
  },
  playersModel: {
    '1': {
      name: 'Player 1',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/5VG9nXvA.svg"',
      state: AppPlayerState.Idle,
      tournamentId: '1',
    },
    '2': {
      name: 'Player 2',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/i_63M7YJ.svg',
      state: AppPlayerState.Racing,
      tournamentId: '1',
    },
  },
  racesModel: {
    'Ta_pB5pc-01': {
      text: 'Enim aliquip consequat enim sint mollit mollit amet ex anim et labore. Amet ad Lorem sit fugiat cillum aute. Ut eu commodo dolor qui enim nisi incididunt quis. Officia reprehenderit magna magna in ut ad minim aute. Id et duis cillum cillum.',
      timeoutDuration: 10000,
      startedTimestamp: 139838219,
      players: {
        '1': {
          name: 'Player 1',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/i_62M7YJ.svg',
        },
        '2': {
          name: 'Player 2',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/i_96M7YJ.svg',
        },
      },
      isOnGoing: true,
    },
  },
  leaderboardsModel: {
    '001-556-555': [
      {
        playerId: '2',
        position: 2,
        status: AppPlayerStatus.Complete,
        values: {
          wpm: 100,
          elpasedTime: 100,
          typos: 2,
          score: 100,
        },
      },
      {
        playerId: '3',
        position: 3,
        status: AppPlayerStatus.Complete,
        values: {
          wpm: 100,
          elpasedTime: 100,
          typos: 2,
          score: 100,
        },
      },
      {
        playerId: '1',
        position: 1,
        status: AppPlayerStatus.Timeout,
        values: {
          distance: 100,
          typos: 2,
          score: 100,
        },
      },
    ],
  },
  playerLogsModel: {
    's556-123-s422': [
      {
        timestamp: 139838219,
        textLength: 100,
      },
      {
        timestamp: 139838219,
        textLength: 100,
      },
    ],
    's444-123-s422': [
      {
        timestamp: 139838219,
        textLength: 100,
      },
      {
        timestamp: 139838219,
        textLength: 100,
      },
    ],
  },
  errorLogsModel: {},
};
