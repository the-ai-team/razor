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
  playerNotFound,
  tournamentNotFound,
} from '../loggers';
import { raceNotFound } from '../loggers/race';
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

  if (playerName.length > 2 && playerName.length < 10)
    invalidPlayerNameLength(dispatch);
  if (playerName.match(/^[a-zA-Z0-9]+$/)) invalidPlayerName(dispatch);

  if (tid) {
    if (!state.game.tournamentsModel[tid as AppTournamentId])
      tournamentNotFound(dispatch, tid);
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

  if (playerId) playerNotFound(dispatch, playerId);

  const tournamentId = state.game.playersModel[playerId].tournamentId;
  dispatch.game.removePlayerReducer({
    tournamentId,
    playerId,
  });
};

export const sendTypeLog = async (
  dispatch: Dispatch,
  payload: sendTypeLogPlayload,
): Promise<void> => {
  const {
    raceId,
    playerId,
    playerLog,
  }: { raceId: AppRaceId; playerId: AppPlayerId; playerLog: AppPlayerLog } =
    payload;

  const playerLogId: AppPlayerLogId = `${raceId}-${playerId}`;

  if (playerId) playerNotFound(dispatch, playerId);
  if (raceId) raceNotFound(dispatch, raceId);

  dispatch.game.updatePlayerLogReducer({
    playerLogId,
    playerLog,
  });
};
