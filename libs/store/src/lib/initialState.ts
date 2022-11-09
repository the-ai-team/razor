import {
  AppPlayerState,
  AppPlayerStatus,
  AppStateModel,
  AppTournamentState,
} from '@razor/models';

export const initialState: AppStateModel = {
  tournamentsModel: {
    'T:rGl0zHJk': {
      state: AppTournamentState.Lobby,
      raceIds: ['T:rGl0zHJk-R:000', 'T:rGl0zHJk-R:001'],
      playerIds: ['P:ktaVbCYO', 'P:C4eggywb', 'P:9whQ38wK', 'P:ZsLoqIPI'],
    },
    'T:jrdfphU0': {
      state: AppTournamentState.Lobby,
      raceIds: [],
      playerIds: ['P:XBnckiWq'],
    },
    'T:iTIY6NnA': {
      state: AppTournamentState.Lobby,
      raceIds: [],
      playerIds: ['P:4BGJ6bnC'],
    },
    'T:65wY6NnA': {
      state: AppTournamentState.Empty,
      raceIds: ['T:65wY6NnA-R:000'],
      playerIds: [],
    },
  },
  playersModel: {
    'P:ktaVbCYO': {
      name: 'Player 1',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_1.svg',
      state: AppPlayerState.Idle,
      tournamentId: 'T:rGl0zHJk',
    },
    'P:C4eggywb': {
      name: 'Player 2',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_2.svg',
      state: AppPlayerState.Idle,
      tournamentId: 'T:rGl0zHJk',
    },
    'P:9whQ38wK': {
      name: 'Player 3',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_3.svg',
      state: AppPlayerState.Idle,
      tournamentId: 'T:rGl0zHJk',
    },
    'P:ZsLoqIPI': {
      name: 'Player 4',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_4.svg',
      state: AppPlayerState.Idle,
      tournamentId: 'T:rGl0zHJk',
    },
    'P:XBnckiWq': {
      name: 'Player 5',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_5.svg',
      state: AppPlayerState.Idle,
      tournamentId: 'T:jrdfphU0',
    },
    'P:4BGJ6bnC': {
      name: 'Player 6',
      avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_6.svg',
      state: AppPlayerState.Idle,
      tournamentId: 'T:iTIY6NnA',
    },
  },
  racesModel: {
    'T:rGl0zHJk-R:000': {
      text: "A thecal process is a wolf of the mind. Few can name a meshed bonsai that isn't a bootless beauty. This is not to discredit the idea that those mornings are nothing more than trunks. This is not to discredit the idea that their indonesia was, in this moment, an uncharmed beet. The first furcate gender is, in its own way, a sphynx. A wrist is a nappy watchmaker. A christmas is a front's church. A toast of the pheasant is assumed to be an unrimed patch.",
      timeoutDuration: 110,
      startedTimestamp: 1667983738913,
      players: {
        'P:ktaVbCYO': {
          name: 'Player 1',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/Player_1.svg',
        },
        'P:C4eggywb': {
          name: 'Player 2',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/Player_2.svg',
        },
      },
      isOnGoing: false,
      raceStartedBy: 'P:ktaVbCYO',
    },
    'T:rGl0zHJk-R:001': {
      text: "They were lost without the lento stem that composed their battle. A crop is a top from the right perspective. Far from the truth, authors often misinterpret the piccolo as a loonies oboe, when in actuality it feels more like a carpal dibble. The fleeceless team comes from a napping anger. Nowhere is it disputed that few can name a warming break that isn't an unmarked stomach. Their kangaroo was, in this moment, an itchy sampan. A shovel of the cast is assumed to be an acred shape. However, the crosses could be said to resemble dateless comics.",
      timeoutDuration: 132,
      startedTimestamp: 1667983804343,
      players: {
        'P:ktaVbCYO': {
          name: 'Player 1',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/Player_1.svg',
        },
        'P:C4eggywb': {
          name: 'Player 2',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/Player_2.svg',
        },
        'P:9whQ38wK': {
          name: 'Player 3',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/Player_3.svg',
        },
        'P:ZsLoqIPI': {
          name: 'Player 4',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/Player_4.svg',
        },
      },
      isOnGoing: true,
      raceStartedBy: 'P:ktaVbCYO',
    },
    'T:65wY6NnA-R:000': {
      text: "The zeitgeist contends that the manful step-sister comes from a bootless loss. If this was somewhat unclear, a desmoid bill without months is truly a air of lengthwise lands. Before chains, whites were only tempers. Recent controversy aside, some boundless deletes are thought of simply as damages. A poland is an attempt from the right perspective. They were lost without the clayish macaroni that composed their peripheral. A warded index without churches is truly a friend of sedate adapters. A cerise pollution's purpose comes with it the thought that the felon antelope is a step-grandmother.",
      timeoutDuration: 144,
      startedTimestamp: 1667983943198,
      players: {},
      isOnGoing: false,
      raceStartedBy: 'P:lxnckiWq',
    },
  },
  leaderboardsModel: {},
  playerLogsModel: {
    'T:rGl0zHJk-R:000-P:ktaVbCYO': [
      {
        timestamp: 1667983738920,
        textLength: 0,
      },
      {
        timestamp: 1667983738922,
        textLength: 2,
      },
      {
        timestamp: 1667983738924,
        textLength: 5,
      },
      {
        timestamp: 1667983738926,
        textLength: 8,
      },
      {
        timestamp: 1667983738929,
        textLength: 11,
      },
      {
        timestamp: 1667983738932,
        textLength: 15,
      },
    ],
    'T:rGl0zHJk-R:000-P:C4eggywb': [
      {
        timestamp: 1667983739002,
        textLength: 0,
      },
      {
        timestamp: 1667983739004,
        textLength: 1,
      },
      {
        timestamp: 1667983739007,
        textLength: 3,
      },
      {
        timestamp: 1667983739010,
        textLength: 4,
      },
      {
        timestamp: 1667983739013,
        textLength: 5,
      },
      {
        timestamp: 1667983739016,
        textLength: 6,
      },
      {
        timestamp: 1667983739018,
        textLength: 8,
      },
      {
        timestamp: 1667983739020,
        textLength: 10,
      },
      {
        timestamp: 1667983739022,
        textLength: 11,
      },
      {
        timestamp: 1667983739025,
        textLength: 12,
      },
      {
        timestamp: 1667983739027,
        textLength: 14,
      },
      {
        timestamp: 1667983739029,
        textLength: 16,
      },
      {
        timestamp: 1667983739031,
        textLength: 18,
      },
      {
        timestamp: 1667983739033,
        textLength: 20,
      },
      {
        timestamp: 1667983739036,
        textLength: 21,
      },
      {
        timestamp: 1667983739038,
        textLength: 22,
      },
      {
        timestamp: 1667983739040,
        textLength: 23,
      },
      {
        timestamp: 1667983739042,
        textLength: 24,
      },
      {
        timestamp: 1667983739045,
        textLength: 26,
      },
      {
        timestamp: 1667983739048,
        textLength: 28,
      },
      {
        timestamp: 1667983739050,
        textLength: 29,
      },
      {
        timestamp: 1667983739053,
        textLength: 31,
      },
      {
        timestamp: 1667983739056,
        textLength: 32,
      },
      {
        timestamp: 1667983739058,
        textLength: 33,
      },
      {
        timestamp: 1667983739060,
        textLength: 35,
      },
      {
        timestamp: 1667983739062,
        textLength: 36,
      },
      {
        timestamp: 1667983739064,
        textLength: 38,
      },
      {
        timestamp: 1667983739066,
        textLength: 40,
      },
      {
        timestamp: 1667983739069,
        textLength: 42,
      },
      {
        timestamp: 1667983739071,
        textLength: 43,
      },
      {
        timestamp: 1667983739073,
        textLength: 44,
      },
      {
        timestamp: 1667983739076,
        textLength: 46,
      },
      {
        timestamp: 1667983739079,
        textLength: 48,
      },
      {
        timestamp: 1667983739081,
        textLength: 49,
      },
      {
        timestamp: 1667983739083,
        textLength: 50,
      },
      {
        timestamp: 1667983739085,
        textLength: 52,
      },
      {
        timestamp: 1667983739088,
        textLength: 53,
      },
      {
        timestamp: 1667983739090,
        textLength: 55,
      },
      {
        timestamp: 1667983739092,
        textLength: 57,
      },
      {
        timestamp: 1667983739094,
        textLength: 58,
      },
      {
        timestamp: 1667983739097,
        textLength: 60,
      },
      {
        timestamp: 1667983739099,
        textLength: 61,
      },
      {
        timestamp: 1667983739102,
        textLength: 62,
      },
      {
        timestamp: 1667983739104,
        textLength: 63,
      },
      {
        timestamp: 1667983739106,
        textLength: 65,
      },
      {
        timestamp: 1667983739108,
        textLength: 66,
      },
      {
        timestamp: 1667983739111,
        textLength: 68,
      },
      {
        timestamp: 1667983739114,
        textLength: 70,
      },
      {
        timestamp: 1667983739116,
        textLength: 72,
      },
      {
        timestamp: 1667983739118,
        textLength: 74,
      },
      {
        timestamp: 1667983739120,
        textLength: 75,
      },
      {
        timestamp: 1667983739123,
        textLength: 76,
      },
      {
        timestamp: 1667983739126,
        textLength: 77,
      },
      {
        timestamp: 1667983739128,
        textLength: 79,
      },
      {
        timestamp: 1667983739130,
        textLength: 81,
      },
      {
        timestamp: 1667983739132,
        textLength: 82,
      },
      {
        timestamp: 1667983739135,
        textLength: 84,
      },
      {
        timestamp: 1667983739138,
        textLength: 86,
      },
      {
        timestamp: 1667983739141,
        textLength: 87,
      },
      {
        timestamp: 1667983739143,
        textLength: 88,
      },
      {
        timestamp: 1667983739146,
        textLength: 89,
      },
      {
        timestamp: 1667983739149,
        textLength: 91,
      },
      {
        timestamp: 1667983739152,
        textLength: 92,
      },
      {
        timestamp: 1667983739154,
        textLength: 93,
      },
      {
        timestamp: 1667983739156,
        textLength: 95,
      },
      {
        timestamp: 1667983739159,
        textLength: 97,
      },
      {
        timestamp: 1667983739162,
        textLength: 98,
      },
      {
        timestamp: 1667983739165,
        textLength: 100,
      },
      {
        timestamp: 1667983739167,
        textLength: 101,
      },
      {
        timestamp: 1667983739169,
        textLength: 103,
      },
      {
        timestamp: 1667983739171,
        textLength: 105,
      },
      {
        timestamp: 1667983739173,
        textLength: 106,
      },
      {
        timestamp: 1667983739175,
        textLength: 107,
      },
      {
        timestamp: 1667983739178,
        textLength: 108,
      },
      {
        timestamp: 1667983739180,
        textLength: 109,
      },
      {
        timestamp: 1667983739182,
        textLength: 110,
      },
      {
        timestamp: 1667983739184,
        textLength: 111,
      },
      {
        timestamp: 1667983739186,
        textLength: 112,
      },
      {
        timestamp: 1667983739189,
        textLength: 113,
      },
      {
        timestamp: 1667983739192,
        textLength: 114,
      },
      {
        timestamp: 1667983739194,
        textLength: 116,
      },
      {
        timestamp: 1667983739197,
        textLength: 117,
      },
      {
        timestamp: 1667983739199,
        textLength: 119,
      },
      {
        timestamp: 1667983739201,
        textLength: 121,
      },
      {
        timestamp: 1667983739204,
        textLength: 123,
      },
      {
        timestamp: 1667983739207,
        textLength: 125,
      },
      {
        timestamp: 1667983739210,
        textLength: 127,
      },
      {
        timestamp: 1667983739213,
        textLength: 128,
      },
      {
        timestamp: 1667983739215,
        textLength: 130,
      },
      {
        timestamp: 1667983739218,
        textLength: 131,
      },
      {
        timestamp: 1667983739221,
        textLength: 132,
      },
      {
        timestamp: 1667983739223,
        textLength: 133,
      },
      {
        timestamp: 1667983739225,
        textLength: 134,
      },
      {
        timestamp: 1667983739227,
        textLength: 135,
      },
      {
        timestamp: 1667983739230,
        textLength: 137,
      },
      {
        timestamp: 1667983739232,
        textLength: 139,
      },
      {
        timestamp: 1667983739234,
        textLength: 140,
      },
      {
        timestamp: 1667983739237,
        textLength: 142,
      },
      {
        timestamp: 1667983739240,
        textLength: 144,
      },
      {
        timestamp: 1667983739243,
        textLength: 146,
      },
      {
        timestamp: 1667983739246,
        textLength: 147,
      },
      {
        timestamp: 1667983739248,
        textLength: 149,
      },
      {
        timestamp: 1667983739250,
        textLength: 150,
      },
      {
        timestamp: 1667983739253,
        textLength: 152,
      },
      {
        timestamp: 1667983739255,
        textLength: 154,
      },
      {
        timestamp: 1667983739258,
        textLength: 155,
      },
      {
        timestamp: 1667983739260,
        textLength: 156,
      },
      {
        timestamp: 1667983739262,
        textLength: 157,
      },
      {
        timestamp: 1667983739264,
        textLength: 158,
      },
      {
        timestamp: 1667983739266,
        textLength: 160,
      },
      {
        timestamp: 1667983739269,
        textLength: 161,
      },
      {
        timestamp: 1667983739272,
        textLength: 162,
      },
      {
        timestamp: 1667983739275,
        textLength: 164,
      },
      {
        timestamp: 1667983739277,
        textLength: 165,
      },
      {
        timestamp: 1667983739280,
        textLength: 166,
      },
      {
        timestamp: 1667983739283,
        textLength: 167,
      },
      {
        timestamp: 1667983739286,
        textLength: 168,
      },
      {
        timestamp: 1667983739288,
        textLength: 170,
      },
      {
        timestamp: 1667983739290,
        textLength: 171,
      },
      {
        timestamp: 1667983739292,
        textLength: 172,
      },
      {
        timestamp: 1667983739294,
        textLength: 173,
      },
      {
        timestamp: 1667983739297,
        textLength: 174,
      },
      {
        timestamp: 1667983739300,
        textLength: 176,
      },
      {
        timestamp: 1667983739302,
        textLength: 178,
      },
      {
        timestamp: 1667983739304,
        textLength: 179,
      },
      {
        timestamp: 1667983739306,
        textLength: 180,
      },
      {
        timestamp: 1667983739309,
        textLength: 181,
      },
      {
        timestamp: 1667983739311,
        textLength: 182,
      },
      {
        timestamp: 1667983739314,
        textLength: 184,
      },
      {
        timestamp: 1667983739317,
        textLength: 186,
      },
      {
        timestamp: 1667983739319,
        textLength: 187,
      },
      {
        timestamp: 1667983739322,
        textLength: 189,
      },
      {
        timestamp: 1667983739325,
        textLength: 190,
      },
      {
        timestamp: 1667983739327,
        textLength: 191,
      },
      {
        timestamp: 1667983739329,
        textLength: 193,
      },
      {
        timestamp: 1667983739331,
        textLength: 194,
      },
      {
        timestamp: 1667983739334,
        textLength: 195,
      },
      {
        timestamp: 1667983739336,
        textLength: 196,
      },
      {
        timestamp: 1667983739338,
        textLength: 197,
      },
      {
        timestamp: 1667983739340,
        textLength: 199,
      },
      {
        timestamp: 1667983739342,
        textLength: 201,
      },
      {
        timestamp: 1667983739344,
        textLength: 203,
      },
      {
        timestamp: 1667983739347,
        textLength: 205,
      },
      {
        timestamp: 1667983739349,
        textLength: 207,
      },
      {
        timestamp: 1667983739351,
        textLength: 208,
      },
      {
        timestamp: 1667983739354,
        textLength: 209,
      },
      {
        timestamp: 1667983739356,
        textLength: 211,
      },
      {
        timestamp: 1667983739358,
        textLength: 213,
      },
      {
        timestamp: 1667983739360,
        textLength: 215,
      },
      {
        timestamp: 1667983739362,
        textLength: 217,
      },
      {
        timestamp: 1667983739365,
        textLength: 218,
      },
      {
        timestamp: 1667983739367,
        textLength: 219,
      },
      {
        timestamp: 1667983739369,
        textLength: 221,
      },
      {
        timestamp: 1667983739371,
        textLength: 223,
      },
      {
        timestamp: 1667983739374,
        textLength: 224,
      },
      {
        timestamp: 1667983739377,
        textLength: 226,
      },
      {
        timestamp: 1667983739379,
        textLength: 227,
      },
      {
        timestamp: 1667983739381,
        textLength: 229,
      },
      {
        timestamp: 1667983739384,
        textLength: 231,
      },
      {
        timestamp: 1667983739386,
        textLength: 232,
      },
      {
        timestamp: 1667983739388,
        textLength: 233,
      },
      {
        timestamp: 1667983739390,
        textLength: 234,
      },
      {
        timestamp: 1667983739393,
        textLength: 235,
      },
      {
        timestamp: 1667983739396,
        textLength: 236,
      },
      {
        timestamp: 1667983739398,
        textLength: 238,
      },
      {
        timestamp: 1667983739400,
        textLength: 240,
      },
      {
        timestamp: 1667983739403,
        textLength: 242,
      },
      {
        timestamp: 1667983739405,
        textLength: 244,
      },
      {
        timestamp: 1667983739408,
        textLength: 245,
      },
      {
        timestamp: 1667983739411,
        textLength: 246,
      },
      {
        timestamp: 1667983739413,
        textLength: 247,
      },
      {
        timestamp: 1667983739416,
        textLength: 248,
      },
      {
        timestamp: 1667983739418,
        textLength: 250,
      },
      {
        timestamp: 1667983739420,
        textLength: 252,
      },
      {
        timestamp: 1667983739422,
        textLength: 254,
      },
      {
        timestamp: 1667983739425,
        textLength: 256,
      },
      {
        timestamp: 1667983739427,
        textLength: 257,
      },
      {
        timestamp: 1667983739429,
        textLength: 259,
      },
      {
        timestamp: 1667983739431,
        textLength: 260,
      },
      {
        timestamp: 1667983739433,
        textLength: 262,
      },
      {
        timestamp: 1667983739436,
        textLength: 263,
      },
      {
        timestamp: 1667983739438,
        textLength: 265,
      },
      {
        timestamp: 1667983739440,
        textLength: 266,
      },
      {
        timestamp: 1667983739443,
        textLength: 267,
      },
      {
        timestamp: 1667983739446,
        textLength: 269,
      },
      {
        timestamp: 1667983739449,
        textLength: 271,
      },
      {
        timestamp: 1667983739451,
        textLength: 272,
      },
      {
        timestamp: 1667983739453,
        textLength: 273,
      },
      {
        timestamp: 1667983739456,
        textLength: 274,
      },
      {
        timestamp: 1667983739459,
        textLength: 276,
      },
      {
        timestamp: 1667983739461,
        textLength: 277,
      },
      {
        timestamp: 1667983739463,
        textLength: 279,
      },
      {
        timestamp: 1667983739465,
        textLength: 281,
      },
      {
        timestamp: 1667983739468,
        textLength: 283,
      },
      {
        timestamp: 1667983739471,
        textLength: 285,
      },
      {
        timestamp: 1667983739474,
        textLength: 286,
      },
      {
        timestamp: 1667983739477,
        textLength: 287,
      },
      {
        timestamp: 1667983739479,
        textLength: 289,
      },
      {
        timestamp: 1667983739482,
        textLength: 290,
      },
      {
        timestamp: 1667983739484,
        textLength: 291,
      },
      {
        timestamp: 1667983739487,
        textLength: 292,
      },
      {
        timestamp: 1667983739490,
        textLength: 293,
      },
      {
        timestamp: 1667983739492,
        textLength: 295,
      },
      {
        timestamp: 1667983739494,
        textLength: 297,
      },
      {
        timestamp: 1667983739497,
        textLength: 298,
      },
      {
        timestamp: 1667983739500,
        textLength: 300,
      },
      {
        timestamp: 1667983739503,
        textLength: 301,
      },
      {
        timestamp: 1667983739505,
        textLength: 302,
      },
      {
        timestamp: 1667983739508,
        textLength: 303,
      },
      {
        timestamp: 1667983739510,
        textLength: 305,
      },
      {
        timestamp: 1667983739512,
        textLength: 306,
      },
      {
        timestamp: 1667983739514,
        textLength: 308,
      },
      {
        timestamp: 1667983739517,
        textLength: 309,
      },
      {
        timestamp: 1667983739520,
        textLength: 310,
      },
      {
        timestamp: 1667983739523,
        textLength: 311,
      },
      {
        timestamp: 1667983739526,
        textLength: 313,
      },
      {
        timestamp: 1667983739528,
        textLength: 314,
      },
      {
        timestamp: 1667983739530,
        textLength: 315,
      },
      {
        timestamp: 1667983739533,
        textLength: 317,
      },
      {
        timestamp: 1667983739536,
        textLength: 319,
      },
      {
        timestamp: 1667983739539,
        textLength: 321,
      },
      {
        timestamp: 1667983739541,
        textLength: 323,
      },
      {
        timestamp: 1667983739543,
        textLength: 325,
      },
      {
        timestamp: 1667983739545,
        textLength: 326,
      },
      {
        timestamp: 1667983739548,
        textLength: 328,
      },
      {
        timestamp: 1667983739551,
        textLength: 330,
      },
      {
        timestamp: 1667983739553,
        textLength: 331,
      },
      {
        timestamp: 1667983739556,
        textLength: 333,
      },
      {
        timestamp: 1667983739558,
        textLength: 335,
      },
      {
        timestamp: 1667983739560,
        textLength: 336,
      },
      {
        timestamp: 1667983739563,
        textLength: 337,
      },
      {
        timestamp: 1667983739565,
        textLength: 338,
      },
      {
        timestamp: 1667983739568,
        textLength: 339,
      },
      {
        timestamp: 1667983739570,
        textLength: 341,
      },
      {
        timestamp: 1667983739572,
        textLength: 342,
      },
      {
        timestamp: 1667983739575,
        textLength: 343,
      },
      {
        timestamp: 1667983739578,
        textLength: 344,
      },
      {
        timestamp: 1667983739581,
        textLength: 345,
      },
      {
        timestamp: 1667983739584,
        textLength: 346,
      },
      {
        timestamp: 1667983739587,
        textLength: 348,
      },
      {
        timestamp: 1667983739589,
        textLength: 350,
      },
      {
        timestamp: 1667983739592,
        textLength: 352,
      },
      {
        timestamp: 1667983739595,
        textLength: 353,
      },
      {
        timestamp: 1667983739597,
        textLength: 355,
      },
      {
        timestamp: 1667983739599,
        textLength: 357,
      },
      {
        timestamp: 1667983739602,
        textLength: 359,
      },
      {
        timestamp: 1667983739605,
        textLength: 361,
      },
      {
        timestamp: 1667983739608,
        textLength: 362,
      },
      {
        timestamp: 1667983739610,
        textLength: 364,
      },
      {
        timestamp: 1667983739612,
        textLength: 365,
      },
      {
        timestamp: 1667983739614,
        textLength: 367,
      },
      {
        timestamp: 1667983739617,
        textLength: 369,
      },
      {
        timestamp: 1667983739619,
        textLength: 370,
      },
      {
        timestamp: 1667983739622,
        textLength: 371,
      },
      {
        timestamp: 1667983739625,
        textLength: 372,
      },
      {
        timestamp: 1667983739628,
        textLength: 373,
      },
      {
        timestamp: 1667983739630,
        textLength: 375,
      },
      {
        timestamp: 1667983739633,
        textLength: 376,
      },
      {
        timestamp: 1667983739635,
        textLength: 378,
      },
      {
        timestamp: 1667983739638,
        textLength: 380,
      },
      {
        timestamp: 1667983739640,
        textLength: 382,
      },
      {
        timestamp: 1667983739642,
        textLength: 384,
      },
      {
        timestamp: 1667983739644,
        textLength: 385,
      },
      {
        timestamp: 1667983739647,
        textLength: 387,
      },
      {
        timestamp: 1667983739650,
        textLength: 389,
      },
      {
        timestamp: 1667983739653,
        textLength: 391,
      },
      {
        timestamp: 1667983739656,
        textLength: 393,
      },
      {
        timestamp: 1667983739658,
        textLength: 394,
      },
      {
        timestamp: 1667983739661,
        textLength: 395,
      },
      {
        timestamp: 1667983739664,
        textLength: 396,
      },
      {
        timestamp: 1667983739666,
        textLength: 398,
      },
      {
        timestamp: 1667983739668,
        textLength: 399,
      },
      {
        timestamp: 1667983739670,
        textLength: 401,
      },
      {
        timestamp: 1667983739672,
        textLength: 402,
      },
      {
        timestamp: 1667983739675,
        textLength: 404,
      },
      {
        timestamp: 1667983739678,
        textLength: 405,
      },
      {
        timestamp: 1667983739681,
        textLength: 407,
      },
      {
        timestamp: 1667983739683,
        textLength: 409,
      },
      {
        timestamp: 1667983739685,
        textLength: 411,
      },
      {
        timestamp: 1667983739687,
        textLength: 413,
      },
      {
        timestamp: 1667983739690,
        textLength: 414,
      },
      {
        timestamp: 1667983739693,
        textLength: 415,
      },
      {
        timestamp: 1667983739696,
        textLength: 417,
      },
      {
        timestamp: 1667983739698,
        textLength: 419,
      },
      {
        timestamp: 1667983739700,
        textLength: 420,
      },
      {
        timestamp: 1667983739703,
        textLength: 422,
      },
      {
        timestamp: 1667983739706,
        textLength: 424,
      },
      {
        timestamp: 1667983739709,
        textLength: 425,
      },
      {
        timestamp: 1667983739711,
        textLength: 427,
      },
      {
        timestamp: 1667983739737,
        textLength: 429,
      },
      {
        timestamp: 1667983739739,
        textLength: 431,
      },
      {
        timestamp: 1667983739741,
        textLength: 433,
      },
      {
        timestamp: 1667983739743,
        textLength: 434,
      },
      {
        timestamp: 1667983739745,
        textLength: 436,
      },
      {
        timestamp: 1667983739748,
        textLength: 437,
      },
      {
        timestamp: 1667983739750,
        textLength: 439,
      },
      {
        timestamp: 1667983739753,
        textLength: 441,
      },
      {
        timestamp: 1667983739756,
        textLength: 443,
      },
      {
        timestamp: 1667983739759,
        textLength: 444,
      },
      {
        timestamp: 1667983739762,
        textLength: 446,
      },
      {
        timestamp: 1667983739765,
        textLength: 447,
      },
      {
        timestamp: 1667983739767,
        textLength: 449,
      },
      {
        timestamp: 1667983739769,
        textLength: 451,
      },
      {
        timestamp: 1667983739771,
        textLength: 453,
      },
      {
        timestamp: 1667983739774,
        textLength: 455,
      },
    ],
  },
  errorLogsModel: {},
};
