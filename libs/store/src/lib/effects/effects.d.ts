import { AppMessageLog } from '@razor/models';
import { AddPlayerPayload, ClearPlayerPayload, EndRacePayload, JoinPlayerPayload, ReplaceFullStatePayload, SendTypeLogPayload, SetTournamentStatePayload, StartRacePayload } from '../payloads';
import { Dispatch, RootState } from '../store';
/** Effects functions of the store
 *
 * Effects are calculating and generating operations which will pass the data to the reducers to dispatch to the store.
 */
export declare const effects: (dispatch: Dispatch) => {
    joinPlayer: (payload: JoinPlayerPayload, state: RootState) => `P:${string}` | null;
    addPlayer: (payload: AddPlayerPayload, state: RootState) => void;
    clearPlayer: (payload: ClearPlayerPayload, state: RootState) => void;
    setTournamentState: (payload: SetTournamentStatePayload, state: RootState) => void;
    startRace: (payload: StartRacePayload, state: RootState) => void;
    endRace: (payload: EndRacePayload, state: RootState) => void;
    sendTypeLog: (payload: SendTypeLogPayload, state: RootState) => void;
    sendLogMessage: (payload: AppMessageLog) => void;
    replaceFullState: (payload: ReplaceFullStatePayload) => void;
};
