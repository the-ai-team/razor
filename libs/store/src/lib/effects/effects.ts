/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppMessageLog } from '@razor/models';

import {
  AddPlayerPayload,
  ClearPlayerPayload,
  EndCountdownPayload,
  EndRacePayload,
  JoinPlayerPayload,
  ReplaceFullStatePayload,
  SendTypeLogPayload,
  SetTournamentStatePayload,
  StartCountdownPayload,
} from '../payloads';
import { Dispatch, RootState } from '../store';

import { sendLogMessage } from './logger';
import { addPlayer, clearPlayer, joinPlayer, sendTypeLog } from './player';
import { endCountdown, endRace, startCountdown } from './race';
import { replaceFullState } from './replacers';
import { setTournamentState } from './tournament';

/** Effects functions of the store
 *
 * Effects are calculating and generating operations which will pass the data to the reducers to dispatch to the store.
 */
export const effects = (dispatch: Dispatch) => ({
  joinPlayer: (payload: JoinPlayerPayload, state: RootState) =>
    joinPlayer(dispatch, payload, state),
  addPlayer: (payload: AddPlayerPayload, state: RootState) =>
    addPlayer(dispatch, payload, state),
  clearPlayer: (payload: ClearPlayerPayload, state: RootState) =>
    clearPlayer(dispatch, payload, state),
  setTournamentState: (payload: SetTournamentStatePayload, state: RootState) =>
    setTournamentState(dispatch, payload, state),
  startCountdown: (payload: StartCountdownPayload, state: RootState) =>
    startCountdown(dispatch, payload, state),
  endCountdown: (payload: EndCountdownPayload, state: RootState) =>
    endCountdown(dispatch, payload, state),
  endRace: (payload: EndRacePayload, state: RootState) =>
    endRace(dispatch, payload, state),
  sendTypeLog: (payload: SendTypeLogPayload, state: RootState) =>
    sendTypeLog(dispatch, payload, state),
  sendLogMessage: (payload: AppMessageLog) => sendLogMessage(dispatch, payload),
  replaceFullState: (payload: ReplaceFullStatePayload) =>
    replaceFullState(dispatch, payload),
});
