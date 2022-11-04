import {
  AppErrorCode,
  AppErrorLog,
  AppIdNumberType,
  AppPlayerId,
  AppPlayerLog,
  AppPlayerLogId,
  AppPlayerProfiles,
  AppPlayerState,
  AppRace,
  AppRaceId,
  AppTournament,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';
import { nanoid } from 'nanoid';
import {
  clearPlayerPayload,
  endCountdownPayload,
  endRacePayload,
  joinPlayerPayload,
  sendTypeLogPlayload,
  setReadyTournamentPayload,
  startCountdownPayload,
} from './payloadTypes';
import { Dispatch, RootState } from './store';

const tournamentIdLength = 8;
const playerIdLength = 8;
const generalIdLength = 8;
const averageWPM = 50;

const createUniqueId = async (type: AppIdNumberType): Promise<string> => {
  switch (type) {
    case AppIdNumberType.Tournament:
      return `T:${nanoid(tournamentIdLength)}`;
    case AppIdNumberType.Player:
      return `P:${nanoid(playerIdLength)}`;
    case AppIdNumberType.General:
      return nanoid(generalIdLength);
  }
};

const loadAvatarLink = async (): Promise<string> => {
  const randomSeed = await createUniqueId(AppIdNumberType.General);
  const image = `https://avatars.dicebear.com/api/open-peeps/${randomSeed}.svg`;
  return image;
};

const loadRacingText = async (): Promise<string> => {
  const url = 'http://www.metaphorpsum.com/paragraphs/1/10';

  return fetch(url)
    .then(response => response.text())
    .then(data => {
      return data;
    });
};

//give zero padding to a number
const zeroPadding = (num: number, size: number): string => {
  const s = num + '';
  s.padStart(size, '0');
  return s;
};

//TODO: Add logger methods for warns and errors
export const joinPlayer = async (
  dispatch: Dispatch,
  payload: joinPlayerPayload,
  state: RootState,
): Promise<void> => {
  const { id, playerName }: { id: string; playerName: string } = payload;
  let tournamentId: string;
  if (id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!state.game.tournamentsModel[id as any]) {
      dispatch.game.sendErrorLog({
        message: `Tournament with id ${id} does not exist`,
        code: AppErrorCode.TournamentNotExists,
        relatedId: '',
      });
      return;
    }
    tournamentId = id;
  } else {
    tournamentId = await createUniqueId(AppIdNumberType.Tournament);
  }

  const formattedTournamentId: AppTournamentId = `T:${tournamentId}`;
  const formattedPlayerId: AppPlayerId = `P:${await createUniqueId(
    AppIdNumberType.Player,
  )}`;

  if (!id) {
    //Creating new tournament
    dispatch.game.addTournamentReducer({
      tournamentId: formattedTournamentId,
      tournament: {
        state: AppTournamentState.Lobby,
        raceIds: [],
        playerIds: [],
      },
    });
  }
  //Joining tournament
  dispatch.game.addPlayerReducer({
    tournamentId: formattedTournamentId,
    playerId: formattedPlayerId,
    player: {
      name: playerName,
      avatarLink: await loadAvatarLink(),
      state: AppPlayerState.Idle,
      tournamentId: formattedTournamentId,
    },
  });
};

export const clearPlayer = async (
  dispatch: Dispatch,
  payload: clearPlayerPayload,
  state: RootState,
): Promise<void> => {
  const { playerId }: { playerId: AppPlayerId } = payload;
  const tournamentId = state.game.playersModel[playerId].tournamentId;
  dispatch.game.removePlayerReducer({
    tournamentId,
    playerId,
  });
};

export const setReadyTournament = async (
  dispatch: Dispatch,
  payload: setReadyTournamentPayload,
  state: RootState,
): Promise<void> => {
  const { tournamentId }: { tournamentId: AppTournamentId } = payload;
  const tournament: AppTournament = {
    state: AppTournamentState.Ready,
    raceIds: [...state.game.tournamentsModel[tournamentId].raceIds],
    playerIds: [...state.game.tournamentsModel[tournamentId].playerIds],
  };
  dispatch.game.updateTournamentReducer({
    tournamentId,
    tournament,
  });
};

//TODO: Util calculating timeout
//TODO: Util get current timestamp
export const startCountdown = async (
  dispatch: Dispatch,
  payload: startCountdownPayload,
  state: RootState,
): Promise<void> => {
  const {
    tournamentId,
    playerId,
  }: { tournamentId: AppTournamentId; playerId: AppPlayerId } = payload;
  //TODO: Check whether tournament available
  const numberOfRacesBefore =
    state.game.tournamentsModel[tournamentId] &&
    state.game.tournamentsModel[tournamentId].raceIds.length;
  const raceIndex = numberOfRacesBefore
    ? zeroPadding(numberOfRacesBefore + 1, 3)
    : '000';
  const raceId: AppRaceId = `${tournamentId}-R:${raceIndex}`;
  const players: AppPlayerProfiles = {};

  for (const id of state.game.tournamentsModel[tournamentId].playerIds) {
    const player = state.game.playersModel[id];
    players[id] = {
      name: player.name,
      avatarLink: player.avatarLink,
    };
  }

  const race: AppRace = {
    text: await loadRacingText(),
    timeoutDuration: 120,
    startedTimestamp: new Date().getTime(),
    players: players,
    isOnGoing: true,
  };

  const tournament: AppTournament = {
    state: AppTournamentState.Countdown,
    raceIds: [...state.game.tournamentsModel[tournamentId].raceIds],
    playerIds: [...state.game.tournamentsModel[tournamentId].playerIds],
  };

  dispatch.game.updateTournamentReducer({
    tournamentId,
    tournament,
  });

  // TODO: dispatch racedata to start
  console.log(race, raceId, playerId);
};

export const endCoundown = async (
  dispatch: Dispatch,
  payload: endCountdownPayload,
  state: RootState,
): Promise<void> => {
  const { tournamentId }: { tournamentId: AppTournamentId } = payload;
  const tournament: AppTournament = {
    state: AppTournamentState.Race,
    raceIds: [...state.game.tournamentsModel[tournamentId].raceIds],
    playerIds: [...state.game.tournamentsModel[tournamentId].playerIds],
  };
  dispatch.game.updateTournamentReducer({
    tournamentId,
    tournament,
  });
};

export const endRace = async (
  dispatch: Dispatch,
  payload: endRacePayload,
  state: RootState,
): Promise<void> => {
  const { tournamentId }: { tournamentId: AppTournamentId } = payload;
  const tournament: AppTournament = {
    state: AppTournamentState.Leaderboard,
    raceIds: [...state.game.tournamentsModel[tournamentId].raceIds],
    playerIds: [...state.game.tournamentsModel[tournamentId].playerIds],
  };

  dispatch.game.updateTournamentReducer({
    tournamentId,
    tournament,
  });

  //TODO: dipatch leaderboard data
};

export const sendTypeLog = async (
  dispatch: Dispatch,
  payload: sendTypeLogPlayload,
  state: RootState,
): Promise<void> => {
  const {
    raceId,
    playerId,
    typeLog,
  }: { raceId: AppRaceId; playerId: AppPlayerId; typeLog: AppPlayerLog } =
    payload;

  const PlayerLogId: AppPlayerLogId = `${raceId}-${playerId}`;

  //TODO: dispatch typelogs
};

export const sendErrorLog = async (
  dispatch: Dispatch,
  payload: AppErrorLog,
): Promise<void> => {
  const errorTimestamp: number = new Date().getTime();
  const errorLog = payload;
  dispatch.game.logErrorReducer({
    errorLog,
    errorTimestamp,
  });
};

//TODO: order effects
