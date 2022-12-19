import {
  GENERAL_ID_LENGTH,
  NANOID_ALPHABET,
  PLAYER_ID_LENGTH,
  TOURNAMENT_ID_LENGTH,
} from '@razor/constants';
import { AppIdNumberType, AppPlayerId, AppTournamentId } from '@razor/models';
import { customAlphabet } from 'nanoid';

/** Nanoid with custom alphabet */
const nanoid = customAlphabet(NANOID_ALPHABET, GENERAL_ID_LENGTH);

type TypeMap = {
  tournament: AppTournamentId;
  player: AppPlayerId;
  general: string;
};

/** Generate an unique id for given id type.
 *
 * @param type - Type of id to generate.
 * @returns - Generated id.
 */
export const generateUid = <T extends AppIdNumberType>(type: T): TypeMap[T] => {
  switch (type) {
    case AppIdNumberType.Tournament:
      return `T:${nanoid(TOURNAMENT_ID_LENGTH)}` as TypeMap[T];
    case AppIdNumberType.Player:
      return `P:${nanoid(PLAYER_ID_LENGTH)}` as TypeMap[T];
    default:
      return nanoid(GENERAL_ID_LENGTH) as TypeMap[T];
  }
};
