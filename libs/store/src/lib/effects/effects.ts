import { AppMessageLog } from '@razor/models';
import {
  ClearPlayerPayload,
  EndCountdownPayload,
  EndRacePayload,
  JoinPlayerPayload,
  SendTypeLogPlayload,
  SetReadyTournamentPayload,
  StartCountdownPayload,
} from '../payloads';
import { Dispatch, RootState } from '../store';
import { sendLogMessage } from './logger';
import { clearPlayer, joinPlayer, sendTypeLog } from './player';
import { endCoundown, endRace, startCountdown } from './race';
import { setReadyTournament } from './tournament';

export const effects = (dispatch: Dispatch) => ({
  joinPlayer: (payload: JoinPlayerPayload, state: RootState) =>
    joinPlayer(dispatch, payload, state),
  clearPlayer: (payload: ClearPlayerPayload, state: RootState) =>
    clearPlayer(dispatch, payload, state),
  setReadyTournament: (payload: SetReadyTournamentPayload, state: RootState) =>
    setReadyTournament(dispatch, payload, state),
  startCountdown: (payload: StartCountdownPayload, state: RootState) =>
    startCountdown(dispatch, payload, state),
  endCoundown: (payload: EndCountdownPayload, state: RootState) =>
    endCoundown(dispatch, payload, state),
  endRace: (payload: EndRacePayload, state: RootState) =>
    endRace(dispatch, payload, state),
  sendTypeLog: (payload: SendTypeLogPlayload) => sendTypeLog(dispatch, payload),
  sendLogMessage: (payload: AppMessageLog) => sendLogMessage(dispatch, payload),
});
