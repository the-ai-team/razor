// ### [Effects] Race operations ### //

import { RACE_ID_LENGTH } from '@razor/constants';
import {
  AppPlayer,
  AppPlayerProfiles,
  AppPlayerState,
  AppRace,
  AppRaceId,
  AppTournament,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';
import {
  computeRaceDuration,
  extractId,
  ExtractIdType,
  generateLeaderboard,
  giveZeroPadding,
} from '@razor/util';

import {
  EndCountdownPayload,
  EndRacePayload,
  StartCountdownPayload,
} from '../payloads';
import { playerNotFound, raceNotFound, tournamentNotFound } from '../raisers';
import { Dispatch, RootState } from '../store';

/** Effect function for starting the countdown of the race.
 * Run the validation for the received payload.
 * If the player who pressed the start button and the relevant tournament are found, then the countdown will be started.
 * Tournament state will be changed to "Countdown".
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for starting the countdown of the
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - updatePlayerReducer
 * - updateRaceReducer
 *
 * ### Related raisers
 * - tournamentNotFound
 * - playerNotFound
 */
export const startCountdown = (
  dispatch: Dispatch,
  payload: StartCountdownPayload,
  state: RootState,
): void => {
  const { tournamentId, playerId, raceText } = payload;

  // If the tournament is not found, call the raiser.
  if (!(tournamentId in state.game.tournamentsModel)) {
    tournamentNotFound(dispatch, tournamentId, `Started by: ${playerId}`);
    return;
  }
  // If the player who started the tournament is not found, call the raiser.
  if (!(playerId in state.game.playersModel)) {
    playerNotFound(
      dispatch,
      playerId,
      `While tournament starting: ${tournamentId}`,
    );
    return;
  }

  // Number of races played in the past in this tournament.
  const numberOfRacesBefore =
    state.game.tournamentsModel[tournamentId].raceIds.length || 0;
  // Race index for next tournament with zero padding. (e.g. 001, 002, 003...)
  const raceIndex = giveZeroPadding(
    numberOfRacesBefore.toString(),
    RACE_ID_LENGTH,
  );
  // Compound race id.
  const raceId: AppRaceId = `${tournamentId}-R:${raceIndex}`;
  // Player profiles which need to add for the race details.
  const players: AppPlayerProfiles = {};

  // Adding players in the tournament at this moment to the race.
  for (const id of state.game.tournamentsModel[tournamentId].playerIds) {
    // If the player is not found, call the raiser.
    if (!(id in state.game.playersModel)) {
      playerNotFound(
        dispatch,
        id,
        `While players are being added to: ${tournamentId}`,
      );
      return;
    } else {
      // Take the player in players model.
      const player = state.game.playersModel[id];
      players[id] = {
        name: player.name,
        avatarLink: player.avatarLink,
      };

      // Updating player state in playersModel. ("Idle" -> "Racing")
      const playerData: AppPlayer = {
        ...player,
        state: AppPlayerState.Racing,
      };
      dispatch.game.updatePlayerReducer({
        playerId: id,
        player: playerData,
      });
    }
  }

  // Timeout duration for recived race text.
  const timeoutDuration = computeRaceDuration(raceText);

  // Race details.
  const race: AppRace = {
    text: raceText,
    timeoutDuration: timeoutDuration,
    startedTimestamp: new Date().getTime(),
    players: players,
    isOnGoing: true,
    raceStartedBy: playerId,
  };

  // Updating tournament state in tournamentsModel. ("Ready" -> "Countdown")
  dispatch.game.setTournamentState({
    tournamentId,
    tournamentState: AppTournamentState.Countdown,
  });

  // Add race to races model.
  dispatch.game.addRaceReducer({
    raceId,
    race,
  });
};

/** Effect function for ending countdown of the race.
 * Run the validation for the received payload.
 * If the tournament is found, then the countdown will be ended.
 * Tournament state will be updated to "Race".
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - updateTournamentReducer
 *
 * ### Related raisers
 * - tournamentNotFound
 */
export const endCountdown = (
  dispatch: Dispatch,
  payload: EndCountdownPayload,
  state: RootState,
): void => {
  const { tournamentId } = payload;

  // If the tournament is not found, call the raiser.
  if (!state.game.tournamentsModel[tournamentId]) {
    tournamentNotFound(dispatch, tournamentId, `While countdown ending`);
    return;
  }

  // Use setTournamentState instead
  // Updating tournament state to Race
  const tournament: AppTournament = {
    ...state.game.tournamentsModel[tournamentId],
    state: AppTournamentState.Race,
  };
  dispatch.game.updateTournamentReducer({
    tournamentId,
    tournament,
  });
};

/** Effect function for ending race of the tournament.
 * Run the validation for the received payload.
 * If the race is found, then the race will be ended.
 * Leaderboard will be generated.
 * Tournament state will be updated to "Leaderboard".
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - updateTournamentReducer
 * - updateRaceReducer
 * - addLeaderboardReducer
 * - updatePlayerReducer
 *
 * ### Related raisers
 * - raceNotFound
 */
export const endRace = (
  dispatch: Dispatch,
  payload: EndRacePayload,
  state: RootState,
): void => {
  const { raceId } = payload;

  // If the race is not found, call the raiser.
  if (!(raceId in state.game.racesModel)) {
    raceNotFound(dispatch, raceId, 'While race ending');
    return;
  }

  // Extract tournament id from race id.
  const tournamentId: AppTournamentId = extractId(
    raceId,
    ExtractIdType.Race,
    ExtractIdType.Tournament,
  ) as AppTournamentId;

  // Set tournament state to Leaderboard.
  dispatch.game.setTournamentState({
    tournamentId,
    tournamentState: AppTournamentState.Leaderboard,
  });

  // Get received race text length.
  const raceTextLength = state.game.racesModel[raceId].text.length;

  // Get leaderboard from player logs and add leaderboard.
  const leaderboard = generateLeaderboard(
    state.game.playerLogsModel,
    raceId,
    raceTextLength,
  );
  dispatch.game.addLeaderboardReducer({
    leaderboardId: raceId,
    leaderboard,
  });

  // End race.
  const race: AppRace = {
    ...state.game.racesModel[raceId],
    isOnGoing: false,
  };
  dispatch.game.updateRaceReducer({
    raceId,
    race,
  });

  // Set player state to "Idle" of all players in the tournament.
  for (const id of state.game.tournamentsModel[tournamentId].playerIds) {
    if (
      id in state.game.playersModel &&
      state.game.playersModel[id].state != AppPlayerState.Idle
    ) {
      const player: AppPlayer = {
        ...state.game.playersModel[id],
        state: AppPlayerState.Idle,
      };

      dispatch.game.updatePlayerReducer({
        playerId: id,
        player,
      });
    }
  }
};
