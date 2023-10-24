import { AppPlayerId, AppPlayerLogId, AppRaceId, AppTournamentId } from '@razor/models';
export declare enum ExtractIdType {
    Tournament = "tournament",
    Player = "player",
    Race = "race",
    PlayerLog = "playerLog"
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
export declare const extractId: <T extends ExtractIdType>(inputId: IdType, inputIdType: ExtractIdType, outputIdType: T) => TypeMap[T];
/** Checking validity of an id
 *
 * @param type - Type of id to check.
 * @param id - Id to check.
 */
export declare const checkValidityOfId: (type: ExtractIdType, id: IdType) => RegExpMatchArray | null;
export {};
