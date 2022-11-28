/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppMessageLog } from '@razor/models';
import {
  ClearPlayerPayload,
  EndCountdownPayload,
  EndRacePayload,
  JoinPlayerPayload,
  SendTypeLogPlayload,
  SetTournamentStatePayload,
  StartCountdownPayload,
} from '../payloads';
import { Dispatch, RootState } from '../store';
import { sendLogMessage } from './logger';
import { clearPlayer, joinPlayer, sendTypeLog } from './player';
import { endCoundown, endRace, startCountdown } from './race';
import { setStateTournament } from './tournament';

/** Effects functions of the store
 *
 * Effects are async calculating and generating operations which will pass the data to the reducers to dispatch to the store.
 */
export const effects = (dispatch: Dispatch) => ({
  joinPlayer: (payload: JoinPlayerPayload, state: RootState) =>
    joinPlayer(dispatch, payload, state),
  clearPlayer: (payload: ClearPlayerPayload, state: RootState) =>
    clearPlayer(dispatch, payload, state),
  setStateTournament: (payload: SetTournamentStatePayload, state: RootState) =>
    setStateTournament(dispatch, payload, state),
  startCountdown: (payload: StartCountdownPayload, state: RootState) =>
    startCountdown(dispatch, payload, state),
  endCoundown: (payload: EndCountdownPayload, state: RootState) =>
    endCoundown(dispatch, payload, state),
  endRace: (payload: EndRacePayload, state: RootState) =>
    endRace(dispatch, payload, state),
  sendTypeLog: (payload: SendTypeLogPlayload, state: RootState) =>
    sendTypeLog(dispatch, payload, state),
  sendLogMessage: (payload: AppMessageLog) => sendLogMessage(dispatch, payload),
});
