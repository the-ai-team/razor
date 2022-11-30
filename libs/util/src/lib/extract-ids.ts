import {
  AppPlayerId,
  AppPlayerLogId,
  AppRaceId,
  AppTournamentId,
} from '@razor/models';

export enum ExtractIdType {
  tournament = 'tournament',
  player = 'player',
  race = 'race',
  playerLog = 'playerLog',
}

type IdType = AppTournamentId | AppPlayerId | AppRaceId | AppPlayerLogId;

type TypeMap = {
  tournament: AppTournamentId;
  player: AppPlayerId;
  race: AppRaceId;
  playerLog: AppPlayerLogId;
};

export const extractId = <T extends ExtractIdType>(
  inputId: IdType,
  inputIdType: ExtractIdType,
  outputIdType: T,
): TypeMap[T] => {
  if (inputIdType === outputIdType) {
    return inputId as TypeMap[T];
  }

  const validInput = checkValidityOfId(inputIdType, inputId);
  if (!validInput) {
    throw new Error('Invalid input value');
  }

  const splitedId = inputId.split('-');
  switch (outputIdType) {
    case ExtractIdType.tournament:
      if (inputIdType === ExtractIdType.race) {
        return splitedId[0] as TypeMap[T];
      } else if (inputIdType === ExtractIdType.playerLog) {
        return splitedId[0] as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    case ExtractIdType.player:
      if (inputIdType === ExtractIdType.playerLog) {
        return splitedId[2] as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    case ExtractIdType.race:
      if (inputIdType === ExtractIdType.playerLog) {
        return `${splitedId[0]}-${splitedId[1]}` as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    default:
      throw new Error('Invalid type');
  }
};

export const checkValidityOfId = (
  type: ExtractIdType,
  id: string,
): RegExpMatchArray | null => {
  switch (type) {
    case ExtractIdType.tournament:
      return id.match(/^T:[a-zA-Z0-9]{8}$/);
    case ExtractIdType.player:
      return id.match(/^P:[a-zA-Z0-9]{8}$/);
    case ExtractIdType.race:
      return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}$/);
    case ExtractIdType.playerLog:
      return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}-P:[a-zA-Z0-9]{8}$/);
  }
};
