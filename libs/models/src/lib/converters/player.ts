import { PlayerLog, PlayerState } from '../sockets';
import { AppPlayerLog, AppPlayerState } from '../state';

export function appPlayerStateToPlayerState(
  state: AppPlayerState,
): PlayerState {
  return state as unknown as PlayerState;
}

export function playerStateToAppPlayerState(
  state: PlayerState,
): AppPlayerState {
  return state as unknown as AppPlayerState;
}

export function playerLogsToAppPlayerLogs(logs: PlayerLog[]): AppPlayerLog[] {
  return logs as unknown as AppPlayerLog[];
}
