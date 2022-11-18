import { AppMessageLog } from '@razor/models';
import {
  clearPlayerPayload,
  endCountdownPayload,
  endRacePayload,
  joinPlayerPayload,
  sendTypeLogPlayload,
  setReadyTournamentPayload,
  startCountdownPayload,
} from '../payloads';
import { Dispatch, RootState } from '../store';
import { sendLogMessage } from './logger';
import { clearPlayer, joinPlayer, sendTypeLog } from './player';
import { endCoundown, endRace, startCountdown } from './race';
import { setReadyTournament } from './tournament';

export const effects = (dispatch: Dispatch) => ({
  joinPlayer: (payload: joinPlayerPayload, state: RootState) =>
    joinPlayer(dispatch, payload, state),
  clearPlayer: (payload: clearPlayerPayload, state: RootState) =>
    clearPlayer(dispatch, payload, state),
  setReadyTournament: (payload: setReadyTournamentPayload, state: RootState) =>
    setReadyTournament(dispatch, payload, state),
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
