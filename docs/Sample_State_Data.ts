// import {
//     AppPlayerState,
//     AppPlayerStatus,
//     AppStateModel,
//     AppTournamentState,
//   } from '@razor/models';

//   export const initialState: AppStateModel = {
//     tournamentsModel: {
//       'T:rGl0zHJk': {
//         state: AppTournamentState.Lobby,
//         raceIds: ['T:rGl0zHJk-R:000', 'T:rGl0zHJk-R:001'],
//         playerIds: ['P:ktaVbCYO', 'P:C4eggywb', 'P:9whQ38wK', 'P:ZsLoqIPI'],
//       },
//       'T:jrdfphU0': {
//         state: AppTournamentState.Lobby,
//         raceIds: [],
//         playerIds: ['P:XBnckiWq'],
//       },
//       'T:iTIY6NnA': {
//         state: AppTournamentState.Lobby,
//         raceIds: [],
//         playerIds: ['P:4BGJ6bnC'],
//       },
//       'T:65wY6NnA': {
//         state: AppTournamentState.Empty,
//         raceIds: ['T:65wY6NnA-R:000'],
//         playerIds: [],
//       },
//     },
//     playersModel: {
//       'P:ktaVbCYO': {
//         name: 'Player 1',
//         avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_1.svg',
//         state: AppPlayerState.Idle,
//         tournamentId: 'T:rGl0zHJk',
//       },
//       'P:C4eggywb': {
//         name: 'Player 2',
//         avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_2.svg',
//         state: AppPlayerState.Idle,
//         tournamentId: 'T:rGl0zHJk',
//       },
//       'P:9whQ38wK': {
//         name: 'Player 3',
//         avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_3.svg',
//         state: AppPlayerState.Idle,
//         tournamentId: 'T:rGl0zHJk',
//       },
//       'P:ZsLoqIPI': {
//         name: 'Player 4',
//         avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_4.svg',
//         state: AppPlayerState.Idle,
//         tournamentId: 'T:rGl0zHJk',
//       },
//       'P:XBnckiWq': {
//         name: 'Player 5',
//         avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_5.svg',
//         state: AppPlayerState.Idle,
//         tournamentId: 'T:jrdfphU0',
//       },
//       'P:4BGJ6bnC': {
//         name: 'Player 6',
//         avatarLink: 'https://avatars.dicebear.com/api/open-peeps/Player_6.svg',
//         state: AppPlayerState.Idle,
//         tournamentId: 'T:iTIY6NnA',
//       },
//     },
//     racesModel: {
//       'T:rGl0zHJk-R:000': {
//         text: "A thecal process is a wolf of the mind. Few can name a meshed bonsai that isn't a bootless beauty. This is not to discredit the idea that those mornings are nothing more than trunks. This is not to discredit the idea that their indonesia was, in this moment, an uncharmed beet. The first furcate gender is, in its own way, a sphynx. A wrist is a nappy watchmaker. A christmas is a front's church. A toast of the pheasant is assumed to be an unrimed patch.",
//         timeoutDuration: 110,
//         startedTimestamp: 1667983738913,
//         players: {
//           'P:ktaVbCYO': {
//             name: 'Player 1',
//             avatarLink:
//               'https://avatars.dicebear.com/api/open-peeps/Player_1.svg',
//           },
//           'P:C4eggywb': {
//             name: 'Player 2',
//             avatarLink:
//               'https://avatars.dicebear.com/api/open-peeps/Player_2.svg',
//           },
//         },
//         isOnGoing: false,
//         raceStartedBy: 'P:ktaVbCYO',
//       },
//       'T:rGl0zHJk-R:001': {
//         text: "They were lost without the lento stem that composed their battle. A crop is a top from the right perspective. Far from the truth, authors often misinterpret the piccolo as a loonies oboe, when in actuality it feels more like a carpal dibble. The fleeceless team comes from a napping anger. Nowhere is it disputed that few can name a warming break that isn't an unmarked stomach. Their kangaroo was, in this moment, an itchy sampan. A shovel of the cast is assumed to be an acred shape. However, the crosses could be said to resemble dateless comics.",
//         timeoutDuration: 132,
//         startedTimestamp: 1667983804343,
//         players: {
//           'P:ktaVbCYO': {
//             name: 'Player 1',
//             avatarLink:
//               'https://avatars.dicebear.com/api/open-peeps/Player_1.svg',
//           },
//           'P:C4eggywb': {
//             name: 'Player 2',
//             avatarLink:
//               'https://avatars.dicebear.com/api/open-peeps/Player_2.svg',
//           },
//           'P:9whQ38wK': {
//             name: 'Player 3',
//             avatarLink:
//               'https://avatars.dicebear.com/api/open-peeps/Player_3.svg',
//           },
//           'P:ZsLoqIPI': {
//             name: 'Player 4',
//             avatarLink:
//               'https://avatars.dicebear.com/api/open-peeps/Player_4.svg',
//           },
//         },
//         isOnGoing: true,
//         raceStartedBy: 'P:ktaVbCYO',
//       },
//       'T:65wY6NnA-R:000': {
//         text: "The zeitgeist contends that the manful step-sister comes from a bootless loss. If this was somewhat unclear, a desmoid bill without months is truly a air of lengthwise lands. Before chains, whites were only tempers. Recent controversy aside, some boundless deletes are thought of simply as damages. A poland is an attempt from the right perspective. They were lost without the clayish macaroni that composed their peripheral. A warded index without churches is truly a friend of sedate adapters. A cerise pollution's purpose comes with it the thought that the felon antelope is a step-grandmother.",
//         timeoutDuration: 144,
//         startedTimestamp: 1667983943198,
//         players: {},
//         isOnGoing: false,
//         raceStartedBy: 'P:lxnckiWq',
//       },
//     },
//     leaderboardsModel: {
//       'T:rGl0zHJk-R:000': [
//         {
//           playerId: 'P:ktaVbCYO',
//           status: AppPlayerStatus.Timeout,
//           values: {
//             distance: 15,
//           },
//         },
//         {
//           playerId: 'P:C4eggywb',
//           status: AppPlayerStatus.Complete,
//           values: {
//             wpm: 34.21,
//             elpasedTime: 161,
//           },
//         },
//       ],
//     },
//     playerLogsModel: {
//       'T:rGl0zHJk-R:000-P:ktaVbCYO': [
//         {
//           timestamp: 1667983738920,
//           textLength: 0,
//         },
//         {
//           timestamp: 1667983738922,
//           textLength: 2,
//         },
//         {
//           timestamp: 1667983738924,
//           textLength: 5,
//         },
//         {
//           timestamp: 1667983738926,
//           textLength: 8,
//         },
//         {
//           timestamp: 1667983738929,
//           textLength: 11,
//         },
//         {
//           timestamp: 1667983738932,
//           textLength: 15,
//         },
//       ],
//       'T:rGl0zHJk-R:000-P:C4eggywb': [
//         {
//           timestamp: 1667983739000,
//           textLength: 0,
//         },
//         {
//           timestamp: 1667983739002,
//           textLength: 7,
//         },
//         {
//           timestamp: 1667983739004,
//           textLength: 12,
//         },
//         {
//           timestamp: 1667983739005,
//           textLength: 15,
//         },
//         {
//           timestamp: 1667983739006,
//           textLength: 17,
//         },
//         {
//           timestamp: 1667983739007,
//           textLength: 20,
//         },
//         {
//           timestamp: 1667983739008,
//           textLength: 27,
//         },
//         {
//           timestamp: 1667983739010,
//           textLength: 32,
//         },
//         {
//           timestamp: 1667983739011,
//           textLength: 35,
//         },
//         {
//           timestamp: 1667983739012,
//           textLength: 42,
//         },
//         {
//           timestamp: 1667983739014,
//           textLength: 49,
//         },
//         {
//           timestamp: 1667983739015,
//           textLength: 55,
//         },
//         {
//           timestamp: 1667983739017,
//           textLength: 61,
//         },
//         {
//           timestamp: 1667983739018,
//           textLength: 67,
//         },
//         {
//           timestamp: 1667983739020,
//           textLength: 70,
//         },
//         {
//           timestamp: 1667983739021,
//           textLength: 74,
//         },
//         {
//           timestamp: 1667983739023,
//           textLength: 79,
//         },
//         {
//           timestamp: 1667983739025,
//           textLength: 83,
//         },
//         {
//           timestamp: 1667983739027,
//           textLength: 88,
//         },
//         {
//           timestamp: 1667983739028,
//           textLength: 95,
//         },
//         {
//           timestamp: 1667983739030,
//           textLength: 101,
//         },
//         {
//           timestamp: 1667983739032,
//           textLength: 103,
//         },
//         {
//           timestamp: 1667983739033,
//           textLength: 109,
//         },
//         {
//           timestamp: 1667983739035,
//           textLength: 111,
//         },
//         {
//           timestamp: 1667983739037,
//           textLength: 117,
//         },
//         {
//           timestamp: 1667983739038,
//           textLength: 122,
//         },
//         {
//           timestamp: 1667983739039,
//           textLength: 124,
//         },
//         {
//           timestamp: 1667983739040,
//           textLength: 129,
//         },
//         {
//           timestamp: 1667983739041,
//           textLength: 133,
//         },
//         {
//           timestamp: 1667983739042,
//           textLength: 140,
//         },
//         {
//           timestamp: 1667983739044,
//           textLength: 144,
//         },
//         {
//           timestamp: 1667983739045,
//           textLength: 151,
//         },
//         {
//           timestamp: 1667983739046,
//           textLength: 156,
//         },
//         {
//           timestamp: 1667983739048,
//           textLength: 161,
//         },
//         {
//           timestamp: 1667983739050,
//           textLength: 163,
//         },
//         {
//           timestamp: 1667983739052,
//           textLength: 165,
//         },
//         {
//           timestamp: 1667983739054,
//           textLength: 172,
//         },
//         {
//           timestamp: 1667983739056,
//           textLength: 177,
//         },
//         {
//           timestamp: 1667983739058,
//           textLength: 183,
//         },
//         {
//           timestamp: 1667983739060,
//           textLength: 189,
//         },
//         {
//           timestamp: 1667983739062,
//           textLength: 194,
//         },
//         {
//           timestamp: 1667983739064,
//           textLength: 197,
//         },
//         {
//           timestamp: 1667983739066,
//           textLength: 201,
//         },
//         {
//           timestamp: 1667983739067,
//           textLength: 203,
//         },
//         {
//           timestamp: 1667983739069,
//           textLength: 206,
//         },
//         {
//           timestamp: 1667983739071,
//           textLength: 210,
//         },
//         {
//           timestamp: 1667983739073,
//           textLength: 212,
//         },
//         {
//           timestamp: 1667983739075,
//           textLength: 219,
//         },
//         {
//           timestamp: 1667983739077,
//           textLength: 222,
//         },
//         {
//           timestamp: 1667983739078,
//           textLength: 224,
//         },
//         {
//           timestamp: 1667983739080,
//           textLength: 227,
//         },
//         {
//           timestamp: 1667983739082,
//           textLength: 229,
//         },
//         {
//           timestamp: 1667983739083,
//           textLength: 235,
//         },
//         {
//           timestamp: 1667983739085,
//           textLength: 238,
//         },
//         {
//           timestamp: 1667983739086,
//           textLength: 243,
//         },
//         {
//           timestamp: 1667983739088,
//           textLength: 249,
//         },
//         {
//           timestamp: 1667983739089,
//           textLength: 251,
//         },
//         {
//           timestamp: 1667983739090,
//           textLength: 255,
//         },
//         {
//           timestamp: 1667983739092,
//           textLength: 258,
//         },
//         {
//           timestamp: 1667983739093,
//           textLength: 260,
//         },
//         {
//           timestamp: 1667983739094,
//           textLength: 264,
//         },
//         {
//           timestamp: 1667983739096,
//           textLength: 270,
//         },
//         {
//           timestamp: 1667983739097,
//           textLength: 272,
//         },
//         {
//           timestamp: 1667983739098,
//           textLength: 276,
//         },
//         {
//           timestamp: 1667983739099,
//           textLength: 281,
//         },
//         {
//           timestamp: 1667983739100,
//           textLength: 288,
//         },
//         {
//           timestamp: 1667983739101,
//           textLength: 293,
//         },
//         {
//           timestamp: 1667983739103,
//           textLength: 299,
//         },
//         {
//           timestamp: 1667983739105,
//           textLength: 305,
//         },
//         {
//           timestamp: 1667983739107,
//           textLength: 311,
//         },
//         {
//           timestamp: 1667983739109,
//           textLength: 317,
//         },
//         {
//           timestamp: 1667983739111,
//           textLength: 319,
//         },
//         {
//           timestamp: 1667983739113,
//           textLength: 326,
//         },
//         {
//           timestamp: 1667983739115,
//           textLength: 333,
//         },
//         {
//           timestamp: 1667983739117,
//           textLength: 337,
//         },
//         {
//           timestamp: 1667983739118,
//           textLength: 342,
//         },
//         {
//           timestamp: 1667983739120,
//           textLength: 345,
//         },
//         {
//           timestamp: 1667983739121,
//           textLength: 349,
//         },
//         {
//           timestamp: 1667983739122,
//           textLength: 351,
//         },
//         {
//           timestamp: 1667983739124,
//           textLength: 353,
//         },
//         {
//           timestamp: 1667983739125,
//           textLength: 356,
//         },
//         {
//           timestamp: 1667983739127,
//           textLength: 363,
//         },
//         {
//           timestamp: 1667983739129,
//           textLength: 367,
//         },
//         {
//           timestamp: 1667983739131,
//           textLength: 369,
//         },
//         {
//           timestamp: 1667983739132,
//           textLength: 372,
//         },
//         {
//           timestamp: 1667983739134,
//           textLength: 377,
//         },
//         {
//           timestamp: 1667983739136,
//           textLength: 380,
//         },
//         {
//           timestamp: 1667983739138,
//           textLength: 385,
//         },
//         {
//           timestamp: 1667983739140,
//           textLength: 389,
//         },
//         {
//           timestamp: 1667983739142,
//           textLength: 394,
//         },
//         {
//           timestamp: 1667983739144,
//           textLength: 399,
//         },
//         {
//           timestamp: 1667983739145,
//           textLength: 401,
//         },
//         {
//           timestamp: 1667983739147,
//           textLength: 404,
//         },
//         {
//           timestamp: 1667983739149,
//           textLength: 410,
//         },
//         {
//           timestamp: 1667983739150,
//           textLength: 416,
//         },
//         {
//           timestamp: 1667983739151,
//           textLength: 419,
//         },
//         {
//           timestamp: 1667983739153,
//           textLength: 422,
//         },
//         {
//           timestamp: 1667983739154,
//           textLength: 424,
//         },
//         {
//           timestamp: 1667983739156,
//           textLength: 431,
//         },
//         {
//           timestamp: 1667983739158,
//           textLength: 437,
//         },
//         {
//           timestamp: 1667983739159,
//           textLength: 442,
//         },
//         {
//           timestamp: 1667983739161,
//           textLength: 455,
//         },
//       ],
//     },
//     errorLogsModel: {},
//   };
