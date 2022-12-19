/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  mockPlayerLogId,
  M_PLAYER_ID0,
  M_TOURNAMENT_ID0,
  M_TR0_RACE_ID0,
} from '@razor/mocks';
import { AppTournamentId } from '@razor/models';
import { extractId, ExtractIdType } from './extract-ids';

describe('[Utils] extractIds', () => {
  describe('Extract specifc id from compound ids', () => {
    it('(race id) => tournament id', () => {
      const tournamentId = extractId(
        M_TR0_RACE_ID0,
        ExtractIdType.race,
        ExtractIdType.tournament,
      );
      expect(tournamentId).toBe(M_TOURNAMENT_ID0);
    });
    it('(player log id) => tournament id', () => {
      const tournamentId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        ExtractIdType.playerLog,
        ExtractIdType.tournament,
      );
      expect(tournamentId).toBe(M_TOURNAMENT_ID0);
    });
    it('(player log id) => player id', () => {
      const playerId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        ExtractIdType.playerLog,
        ExtractIdType.player,
      );
      expect(playerId).toBe(M_PLAYER_ID0);
    });
    it('(player log id) => race id', () => {
      const raceId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        ExtractIdType.playerLog,
        ExtractIdType.race,
      );
      expect(raceId).toBe(M_TR0_RACE_ID0);
    });
    it('(invalid input id) => raise error', () => {
      try {
        extractId(
          'invalid' as AppTournamentId,
          ExtractIdType.playerLog,
          ExtractIdType.tournament,
        );
      } catch (e) {
        expect((e as Error).message).toBe('Invalid input value');
      }
    });
    it.each([
      [ExtractIdType.player, M_PLAYER_ID0, ExtractIdType.player],
      [ExtractIdType.tournament, M_TOURNAMENT_ID0, ExtractIdType.tournament],
      [ExtractIdType.race, M_TR0_RACE_ID0, ExtractIdType.race],
      [
        ExtractIdType.playerLog,
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        ExtractIdType.playerLog,
      ],
    ])(
      '(both request and input id are same, %s) => return same id',
      (outputIdType, inputId, inputIdType) => {
        const requestingId = extractId(inputId, inputIdType, outputIdType);
        expect(requestingId).toBe(inputId);
      },
    );
    it.each([
      [ExtractIdType.tournament, M_PLAYER_ID0, ExtractIdType.player],
      [ExtractIdType.player, M_TOURNAMENT_ID0, ExtractIdType.tournament],
      [ExtractIdType.player, M_TR0_RACE_ID0, ExtractIdType.race],
      [ExtractIdType.race, M_PLAYER_ID0, ExtractIdType.player],
      [ExtractIdType.race, M_TOURNAMENT_ID0, ExtractIdType.tournament],
      [ExtractIdType.playerLog, M_PLAYER_ID0, ExtractIdType.player],
      [ExtractIdType.playerLog, M_TOURNAMENT_ID0, ExtractIdType.tournament],
      [ExtractIdType.playerLog, M_TR0_RACE_ID0, ExtractIdType.race],
    ])(
      '(invalid input type but requesting %s) => raise error',
      (outputIdType, inputId, inputIdType) => {
        expect(() => extractId(inputId, inputIdType, outputIdType)).toThrow(
          new Error('Invalid type'),
        );
      },
    );
  });
});
