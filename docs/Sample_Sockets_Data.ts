import { PlayerStatus } from '../libs/models/src/lib/sockets/leaderboard';
import { PlayerState } from '../libs/models/src/lib/sockets/player';
import {
  Tournament,
  TournamentState,
} from '../libs/models/src/lib/sockets/tournament';

const Tournament1: Tournament = {
  id: '1',
  state: TournamentState.Lobby,
  //races history last index is the current race
  races: [
    {
      id: '1',
      text: 'Tempor in aliqua exercitation ad ex. Sint eiusmod nulla culpa quis enim adipisicing eiusmod qui tempor do tempor fugiat pariatur. Adipisicing occaecat minim labore eiusmod est anim quis quis non eiusmod pariatur minim eiusmod. Consectetur ullamco tempor aute aute incididunt. Esse reprehenderit magna eu cupidatat id eiusmod aliquip cillum pariatur ut labore culpa pariatur qui. Cupidatat anim excepteur elit ad dolore non consequat cupidatat in.',
      timeoutDuration: 60,
      startedTimestamp: 1620000000,
      raceStartedBy: 'P:ss',
      //player logs while racing
      players: [
        {
          id: '1',
          name: 'John Doe',
          avatarLink: 'https://avatars.githubusercontent.com/u/46004116?v=4',
          logs: [
            {
              textLength: 13,
              timestamp: 654654655665,
            },
            {
              textLength: 24,
              timestamp: 654654655665,
            },
            {
              textLength: 34,
              timestamp: 654654655665,
            },
          ],
        },
        {
          id: '2',
          name: 'Jane Doe',
          avatarLink: 'https://avatars.githubusercontent.com/u/46004116?v=4',
          logs: [
            {
              textLength: 13,
              timestamp: 654654655665,
            },
            {
              textLength: 24,
              timestamp: 654654655665,
            },
            {
              textLength: 34,
              timestamp: 654654655665,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      text: 'Tempor in aliqua exercitation ad ex. Sint eiusmod nulla culpa quis enim adipisicing eiusmod qui tempor do tempor fugiat pariatur. Adipisicing occaecat minim labore eiusmod est anim quis quis non eiusmod pariatur minim eiusmod. Consectetur ullamco tempor aute aute incididunt. Esse reprehenderit magna eu cupidatat id eiusmod aliquip cillum pariatur ut labore culpa pariatur qui. Cupidatat anim excepteur elit ad dolore non consequat cupidatat in.',
      timeoutDuration: 60,
      startedTimestamp: 1620000000,
      raceStartedBy: 'P:ss',
      players: [
        {
          id: '1',
          name: 'John Doe',
          avatarLink: 'https://avatars.githubusercontent.com/u/46004116?v=4',
          logs: [
            {
              textLength: 13,
              timestamp: 654654655665,
            },
            {
              textLength: 24,
              timestamp: 654654655665,
            },
          ],
        },
        {
          id: '2',
          name: 'Jane Doe',
          avatarLink: 'https://avatars.githubusercontent.com/u/46004116?v=4',
          logs: [
            {
              textLength: 13,
              timestamp: 654654655665,
            },
            {
              textLength: 24,
              timestamp: 654654655665,
            },
          ],
        },
      ],
    },
  ],
  //lobby active players
  players: [
    {
      id: '1',
      name: 'John Doe',
      avatarLink: 'https://avatars.githubusercontent.com/u/46004116?v=4',
      state: PlayerState.Idle,
    },
    {
      id: '2',
      name: 'Jane Doe',
      avatarLink: 'https://avatars.githubusercontent.com/u/46004116?v=4',
      state: PlayerState.Racing,
    },
    {
      id: '3',
      name: 'John Doe',
      avatarLink: 'https://avatars.githubusercontent.com/u/46004116?v=4',
      state: PlayerState.Racing,
    },
  ],
  //leaderboard entries, array order is the player position
  raceLeaderboards: [
    {
      raceId: '1',
      entries: [
        {
          playerId: '1',
          playerName: 'John Doe',
          playerAvatarLink:
            'https://avatars.githubusercontent.com/u/46004116?v=4',
          status: PlayerStatus.Complete,
          values: {
            wpm: 100,
            elpasedTime: 10,
            typos: 0,
            score: 100,
          },
        },
        {
          playerId: '2',
          playerName: 'Jane Doe',
          playerAvatarLink:
            'https://avatars.githubusercontent.com/u/46004116?v=4',
          status: PlayerStatus.Complete,
          values: {
            wpm: 100,
            elpasedTime: 10,
            typos: 0,
            score: 100,
          },
        },
      ],
    },
    {
      raceId: '2',
      entries: [
        {
          playerId: '1',
          playerName: 'John Doe',
          playerAvatarLink:
            'https://avatars.githubusercontent.com/u/46004116?v=4',
          status: PlayerStatus.Complete,
          values: {
            wpm: 100,
            elpasedTime: 10,
            typos: 0,
            score: 100,
          },
        },
        {
          playerId: '2',
          playerName: 'Jane Doe',
          playerAvatarLink:
            'https://avatars.githubusercontent.com/u/46004116?v=4',
          status: PlayerStatus.Timeout,
          values: {
            distance: 100,
            typos: 0,
            score: 100,
          },
        },
      ],
    },
  ],
};

console.log(Tournament1);
