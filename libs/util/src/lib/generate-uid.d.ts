import { AppIdNumberType, AppPlayerId, AppTournamentId } from '@razor/models';
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
export declare const generateUid: <T extends AppIdNumberType>(type: T) => TypeMap[T];
export {};
