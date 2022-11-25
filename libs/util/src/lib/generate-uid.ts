import {
  GENERAL_ID_LENGTH,
  NANOID_ALPHABET,
  PLAYER_ID_LENGTH,
  TOURNAMENT_ID_LENGTH,
} from '@razor/constants';
import { AppIdNumberType } from '@razor/models';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(NANOID_ALPHABET, GENERAL_ID_LENGTH);

export const generateUid = async (type: AppIdNumberType): Promise<string> => {
  switch (type) {
    case AppIdNumberType.Tournament:
      return `T:${nanoid(TOURNAMENT_ID_LENGTH)}`;
    case AppIdNumberType.Player:
      return `P:${nanoid(PLAYER_ID_LENGTH)}`;
    case AppIdNumberType.General:
      return nanoid(GENERAL_ID_LENGTH);
  }
};
