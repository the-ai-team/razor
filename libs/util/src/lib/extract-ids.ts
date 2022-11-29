import {
  AppPlayerId,
  AppPlayerLogId,
  AppRaceId,
  AppTournamentId,
} from '@razor/models';

//TODO: change to pascal case
export enum extractIdType {
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

export const extractId = <T extends extractIdType>(
  inputId: IdType,
  inputIdType: extractIdType,
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
    case extractIdType.tournament:
      if (inputIdType === extractIdType.race) {
        return splitedId[0] as TypeMap[T];
      } else if (inputIdType === extractIdType.playerLog) {
        return splitedId[0] as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    case extractIdType.player:
      if (inputIdType === extractIdType.playerLog) {
        return splitedId[2] as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    case extractIdType.race:
      if (inputIdType === extractIdType.playerLog) {
        return `${splitedId[0]}-${splitedId[1]}` as TypeMap[T];
      } else {
        throw new Error('Invalid type');
      }
    default:
      throw new Error('Invalid type');
  }
};

export const checkValidityOfId = (
  type: extractIdType,
  id: string,
): RegExpMatchArray | null => {
  switch (type) {
    case extractIdType.tournament:
      return id.match(/^T:[a-zA-Z0-9]{8}$/);
    case extractIdType.player:
      return id.match(/^P:[a-zA-Z0-9]{8}$/);
    case extractIdType.race:
      return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}$/);
    case extractIdType.playerLog:
      return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}-P:[a-zA-Z0-9]{8}$/);
  }
};
