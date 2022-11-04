import { AppIdNumberType } from '@razor/models';
import { nanoid } from 'nanoid';

const tournamentIdLength = 8;
const playerIdLength = 8;
const generalIdLength = 8;

export const generateUid = async (type: AppIdNumberType): Promise<string> => {
  switch (type) {
    case AppIdNumberType.Tournament:
      return `T:${nanoid(tournamentIdLength)}`;
    case AppIdNumberType.Player:
      return `P:${nanoid(playerIdLength)}`;
    case AppIdNumberType.General:
      return nanoid(generalIdLength);
  }
};
