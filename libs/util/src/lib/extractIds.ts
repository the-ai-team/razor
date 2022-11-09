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
) => {
  let outputId = '';

  const splitedId = inputId.split('-');
  console.log('splitedId', splitedId);
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
    throw new Error('Invalid inputIdType or outputIdType');
  }

  return outputId;
};
