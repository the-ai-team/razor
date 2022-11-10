import { AppErrorLog } from '@razor/models';
import {
  joinPlayerPayload,
  clearPlayerPayload,
  setReadyTournamentPayload,
  startCountdownPayload,
  endCountdownPayload,
  endRacePayload,
  sendTypeLogPlayload,
} from '../payloads';
import { Dispatch, RootState } from '../store';
import { sendErrorLog } from './error';
import { joinPlayer, clearPlayer, sendTypeLog } from './player';
import { startCountdown, endCoundown, endRace } from './race';
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
  sendTypeLog: (payload: sendTypeLogPlayload) => sendTypeLog(dispatch, payload),
  sendErrorLog: (payload: AppErrorLog) => sendErrorLog(dispatch, payload),
});
