import { PlayerLog, PlayerState } from '../sockets';
import { AppPlayerLog, AppPlayerState } from '../state';
export declare function appPlayerStateToPlayerState(state: AppPlayerState): PlayerState;
export declare function playerStateToAppPlayerState(state: PlayerState): AppPlayerState;
export declare function playerLogsToAppPlayerLogs(logs: PlayerLog[]): AppPlayerLog[];
