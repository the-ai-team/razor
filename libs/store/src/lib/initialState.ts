import {
  AppPlayerState,
  AppPlayerStatus,
  AppStateModel,
  AppTournamentState,
} from '@razor/models';

export const initialState: AppStateModel = {
  tournamentsModel: {
    'T:1': {
      state: AppTournamentState.Lobby,
      raceIds: ['T:a_pB5pc-R:001', 'T:swwe-R:2', 'T:swwe-R:3'],
      playerIds: ['P:1', 'P:2'],
    },
    'T:2': {
      state: AppTournamentState.Empty,
      raceIds: [],
      playerIds: [],
    },
  },
  playersModel: {
    'P:1': {
      name: 'Player 1',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/5VG9nXvA.svg"',
      state: AppPlayerState.Idle,
      tournamentId: 'T:1',
    },
    'P:2': {
      name: 'Player 2',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/i_63M7YJ.svg',
      state: AppPlayerState.Racing,
      tournamentId: 'T:1',
    },
  },
  racesModel: {
    'T:a_pB5pc-R:001': {
      text: 'Enim aliquip consequat enim sint mollit mollit amet ex anim et labore. Amet ad Lorem sit fugiat cillum aute. Ut eu commodo dolor qui enim nisi incididunt quis. Officia reprehenderit magna magna in ut ad minim aute. Id et duis cillum cillum.',
      timeoutDuration: 10000,
      startedTimestamp: 139838219,
      players: {
        'P:1': {
          name: 'Player 1',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/i_62M7YJ.svg',
        },
        'P:2': {
          name: 'Player 2',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/i_96M7YJ.svg',
        },
      },
      isOnGoing: true,
      raceStartedBy: 'P:1',
    },
  },
  leaderboardsModel: {
    'T:s3rr-R:034': [
      {
        playerId: 'P:2',
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
        playerId: 'P:3',
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
        playerId: 'P:1',
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
    'T:a_pB5pc-R:001-P:1': [
      {
        timestamp: 139838219,
        textLength: 100,
      },
      {
        timestamp: 139838219,
        textLength: 100,
      },
    ],
    'T:123-R:2-P:2': [
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
