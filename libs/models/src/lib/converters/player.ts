import { PlayerState } from '../sockets';
import { AppPlayerState } from '../state';

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
