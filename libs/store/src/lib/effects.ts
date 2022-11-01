import {
  AppErrorCode,
  AppErrorLog,
  AppIdNumberType,
  AppPlayerState,
  AppTournament,
  AppTournamentState,
} from '@razor/models';
import { nanoid } from 'nanoid';

import {
  clearPlayerPayload,
  joinPlayerPayload,
  setReadyTournamentPayload,
} from './payloadTypes';
import { Dispatch, RootState } from './store';

const tournamentIdLength = 8;
const playerIdLength = 8;
const generalIdLength = 8;

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

//TODO: Add logger methods for warns and errors
export const joinPlayer = async (
  dispatch: Dispatch,
  payload: joinPlayerPayload,
  state: RootState,
): Promise<void> => {
  const { id, playerName } = payload;
  let tournamentId;
  if (id) {
    if (!state.game.tournamentsModel[id]) {
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

  if (!id) {
    //Creating new tournament
    dispatch.game.addTournamentReducer({
      tournamentId,
      tournament: {
        state: AppTournamentState.Lobby,
        raceIds: [],
        playerIds: [],
      },
    });
  }
  //Joining tournament
  dispatch.game.addPlayerReducer({
    tournamentId: tournamentId,
    playerId: await createUniqueId(AppIdNumberType.Player),
    player: {
      name: playerName,
      avatarLink: await loadAvatarLink(),
      state: AppPlayerState.Idle,
      tournamentId: tournamentId,
    },
  });
};

export const clearPlayer = async (
  dispatch: Dispatch,
  payload: clearPlayerPayload,
  state: RootState,
): Promise<void> => {
  const { playerId } = payload;
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
  const { tournamentId } = payload;
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
