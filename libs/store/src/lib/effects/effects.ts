/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppMessageLog } from '@razor/models';
import {
  clearPlayerPayload,
  endCountdownPayload,
  endRacePayload,
  joinPlayerPayload,
  sendTypeLogPlayload,
  setTournamentStatePayload,
  startCountdownPayload,
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
  joinPlayer: (payload: joinPlayerPayload, state: RootState) =>
    joinPlayer(dispatch, payload, state),
  clearPlayer: (payload: clearPlayerPayload, state: RootState) =>
    clearPlayer(dispatch, payload, state),
  setStateTournament: (payload: setTournamentStatePayload, state: RootState) =>
    setStateTournament(dispatch, payload, state),
  startCountdown: (payload: startCountdownPayload, state: RootState) =>
    startCountdown(dispatch, payload, state),
  endCoundown: (payload: endCountdownPayload, state: RootState) =>
    endCoundown(dispatch, payload, state),
  endRace: (payload: endRacePayload, state: RootState) =>
    endRace(dispatch, payload, state),
  sendTypeLog: (payload: sendTypeLogPlayload, state: RootState) =>
    sendTypeLog(dispatch, payload, state),
  sendLogMessage: (payload: AppMessageLog) => sendLogMessage(dispatch, payload),
});
