import {
  AppPlayerId,
  AppPlayerLogId,
  AppRaceId,
  AppTournamentId,
} from '@razor/models';

export enum ExtractIdType {
  Tournament = 'tournament',
  Player = 'player',
  Race = 'race',
  PlayerLog = 'playerLog',
}

type IdType = AppTournamentId | AppPlayerId | AppRaceId | AppPlayerLogId;

type TypeMap = {
  tournament: AppTournamentId;
  player: AppPlayerId;
  race: AppRaceId;
  playerLog: AppPlayerLogId;
};

/** Extract an id from a compound id
 *
 * @param inputId - Compound id to extract from.
 * @param inputIdType - Type of id to input id.
 * @param outputIdType - Type of id to extract.
 * @returns - Extracted id.
 */
export const extractId = <T extends ExtractIdType>(
  inputId: IdType,
  inputIdType: ExtractIdType,
  outputIdType: T,
): TypeMap[T] => {
  if (inputIdType === outputIdType) {
    return inputId as TypeMap[T];
  }

  // Check the validity of the input id.
  const validInput = checkValidityOfId(inputIdType, inputId);
  if (!validInput) {
    throw new Error('Invalid input value');
  }
  const splitedId = inputId.split('-');

  switch (outputIdType) {
    case ExtractIdType.Tournament:
      // Extract the first part of the id if the input id type is "race" or "playerLog".
      if (inputIdType === ExtractIdType.Race) {
        return splitedId[0] as TypeMap[T];
      } else if (inputIdType === ExtractIdType.PlayerLog) {
        return splitedId[0] as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    case ExtractIdType.Player:
      // Extract the second part of the id if the input id type is "playerLog".
      if (inputIdType === ExtractIdType.PlayerLog) {
        return splitedId[2] as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    case ExtractIdType.Race:
      // Extract the first two parts of the id if the input id type is "playerLog".
      if (inputIdType === ExtractIdType.PlayerLog) {
        return `${splitedId[0]}-${splitedId[1]}` as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    default:
      throw new Error('Invalid type');
  }
};

/** Checking validity of an id
 *
 * @param type - Type of id to check.
 * @param id - Id to check.
 */
export const checkValidityOfId = (
  type: ExtractIdType,
  id: IdType,
): RegExpMatchArray | null => {
  switch (type) {
    case ExtractIdType.Tournament:
      return id.match(/^T:[a-zA-Z0-9]{8}$/);
    case ExtractIdType.Player:
      return id.match(/^P:[a-zA-Z0-9]{8}$/);
    case ExtractIdType.Race:
      return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}$/);
    case ExtractIdType.PlayerLog:
      return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}-P:[a-zA-Z0-9]{8}$/);
  }
};
