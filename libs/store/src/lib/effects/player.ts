import {
  AppIdNumberType,
  AppPlayerId,
  AppPlayerLog,
  AppPlayerLogId,
  AppPlayerState,
  AppRaceId,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';
import { generateAvatarLink, generateUid } from '@razor/util';
import {
  invalidPlayerName,
  invalidPlayerNameLength,
  payloadNotProvided,
  playerNotFound,
  raceNotFound,
  tournamentNotFound,
} from '../raisers';
import {
  clearPlayerPayload,
  joinPlayerPayload,
  sendTypeLogPlayload,
} from '../payloads';
import { Dispatch, RootState } from '../store';

export const joinPlayer = async (
  dispatch: Dispatch,
  payload: joinPlayerPayload,
  state: RootState,
): Promise<void> => {
  const { tid, playerName }: { tid: string; playerName: string } = payload;
  let tournamentId: string;
  if (!playerName) {
    payloadNotProvided(joinPlayer.name, dispatch, 'playerName');
    return;
  }

  if (playerName.length < 2 || playerName.length > 10) {
    invalidPlayerNameLength(dispatch);
    return;
  }
  if (!playerName.match(/^[a-zA-Z0-9]+$/)) {
    invalidPlayerName(dispatch);
    return;
  }

  if (tid) {
    if (!state.game.tournamentsModel[tid as AppTournamentId]) {
      tournamentNotFound(dispatch, tid);
      return;
    }
    tournamentId = tid;
  } else {
    tournamentId = await generateUid(AppIdNumberType.Tournament);
  }

  const formattedTournamentId: AppTournamentId =
    tournamentId as AppTournamentId;
  const formattedPlayerId: AppPlayerId = (await generateUid(
    AppIdNumberType.Player,
  )) as AppPlayerId;

  if (!tid) {
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
      avatarLink: await generateAvatarLink(playerName),
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
  if (playerId) {
    payloadNotProvided(clearPlayer.name, dispatch, 'playerId');
    return;
  }
  if (!(playerId in state.game.playersModel)) {
    playerNotFound(dispatch, playerId);
    return;
  }

  const tournamentId = state.game.playersModel[playerId].tournamentId;
  dispatch.game.removePlayerReducer({
    tournamentId,
    playerId,
  });
};

export const sendTypeLog = async (
  dispatch: Dispatch,
  payload: sendTypeLogPlayload,
  state: RootState,
): Promise<void> => {
  const {
    raceId,
    playerId,
    playerLog,
  }: { raceId: AppRaceId; playerId: AppPlayerId; playerLog: AppPlayerLog } =
    payload;

  if (!raceId) {
    payloadNotProvided(sendTypeLog.name, dispatch, 'raceId');
    return;
  }
  if (!playerId) {
    payloadNotProvided(sendTypeLog.name, dispatch, 'playerId');
    return;
  }

  if (!(playerId in state.game.playersModel)) {
    playerNotFound(dispatch, playerId);
    return;
  }
  if (!(raceId in state.game.racesModel)) {
    console.log('notrace');
    raceNotFound(dispatch, raceId);
    return;
  }

  const playerLogId: AppPlayerLogId = `${raceId}-${playerId}`;
  dispatch.game.updatePlayerLogReducer({
    playerLogId,
    playerLog,
  });
};

// TODO: update documentaion
// TODO: check every log raiser return void
// TODO: send func name with every raisers
// TODO: When adding player if tournament state was empty then change it to lobby
