import {
  AppPlayerId,
  AppPlayerLogId,
  AppRaceId,
  AppTournamentId,
} from '@razor/models';

export enum extractIdType {
  tournament = 'tournament',
  player = 'player',
  race = 'race',
  playerLog = 'playerLog',
}

export const extractId = (
  inputId: string,
  inputIdType: extractIdType,
  outputIdType: extractIdType,
): string | AppTournamentId | AppPlayerId | AppRaceId | AppPlayerLogId => {
  let outputId = '';
  if (inputIdType === outputIdType) {
    return inputId;
  }

  const validInput = checkValidityOfId(inputIdType, inputId);
  if (!validInput) {
    return 'invalidInput';
  }

  const splitedId = inputId.split('-');
  switch (outputIdType) {
    case extractIdType.tournament:
      outputId =
        inputIdType === extractIdType.race
          ? splitedId[0]
          : inputIdType === extractIdType.playerLog
          ? splitedId[0]
          : 'error';
      break;
    case extractIdType.player:
      outputId =
        inputIdType === extractIdType.playerLog ? splitedId[2] : 'error';
      break;
    case extractIdType.race:
      outputId =
        inputIdType === extractIdType.playerLog
          ? `${splitedId[0]}-${splitedId[1]}`
          : 'error';
      break;
    default:
      outputId = 'error';
  }

  if (outputId === 'error') {
    return 'invalidType';
  }

  return outputId;
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
