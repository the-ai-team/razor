import {
  AppErrorCode,
  AppIdNumberType,
  AppMessageLogType,
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
  if (tid) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!state.game.tournamentsModel[tid as any]) {
      dispatch.game.sendLogMessage({
        message: `Tournament with id ${tid} does not exist`,
        code: AppErrorCode.TournamentNotExists,
        relatedId: '',
        type: AppMessageLogType.Error,
      });
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

  dispatch.game.updatePlayerLogReducer({
    playerLogId,
    playerLog,
  });
};
