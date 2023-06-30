import { PlayerState } from '../sockets';
import { AppPlayerState } from '../state';

export function playerStateToAppPlayerState(
  state: PlayerState,
): AppPlayerState {
  return state as unknown as AppPlayerState;
}
