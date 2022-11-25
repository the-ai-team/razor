/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  mockPlayerLogId,
  M_PLAYER_ID0,
  M_TOURNAMENT_ID0,
  M_TR0_RACE_ID0,
} from '@razor/mocks';
import { extractId, extractIdType } from './extract-ids';

describe('[Utils] extractIds', () => {
  describe('Extract specifc id from compound ids', () => {
    it('(race id) => tournament id', () => {
      const tournamentId = extractId(
        M_TR0_RACE_ID0,
        extractIdType.race,
        extractIdType.tournament,
      );
      expect(tournamentId).toBe(M_TOURNAMENT_ID0);
    });
    it('(player log id) => tournament id', () => {
      const tournamentId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        extractIdType.playerLog,
        extractIdType.tournament,
      );
      expect(tournamentId).toBe(M_TOURNAMENT_ID0);
    });
    it('(player log id) => player id', () => {
      const playerId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        extractIdType.playerLog,
        extractIdType.player,
      );
      expect(playerId).toBe(M_PLAYER_ID0);
    });
    it('(player log id) => race id', () => {
      const raceId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        extractIdType.playerLog,
        extractIdType.race,
      );
      expect(raceId).toBe(M_TR0_RACE_ID0);
    });
    it('(invalid input id) => raise error', () => {
      const tournamentId = extractId(
        'invalid',
        extractIdType.playerLog,
        extractIdType.tournament,
      );
      expect(tournamentId).toBe('invalidInput');
    });
    it.each([
      [extractIdType.player, M_PLAYER_ID0, extractIdType.player],
      [extractIdType.tournament, M_TOURNAMENT_ID0, extractIdType.tournament],
      [extractIdType.race, M_TR0_RACE_ID0, extractIdType.race],
      [
        extractIdType.playerLog,
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        extractIdType.playerLog,
      ],
    ])(
      '(both request and input id are same, %s) => return same id',
      (outputIdType, inputId, inputIdType) => {
        const requestingId = extractId(inputId, inputIdType, outputIdType);
        expect(requestingId).toBe(inputId);
      },
    );
    it.each([
      [extractIdType.tournament, M_PLAYER_ID0, extractIdType.player],
      [extractIdType.player, M_TOURNAMENT_ID0, extractIdType.tournament],
      [extractIdType.player, M_TR0_RACE_ID0, extractIdType.race],
      [extractIdType.race, M_PLAYER_ID0, extractIdType.player],
      [extractIdType.race, M_TOURNAMENT_ID0, extractIdType.tournament],
      [extractIdType.playerLog, M_PLAYER_ID0, extractIdType.player],
      [extractIdType.playerLog, M_TOURNAMENT_ID0, extractIdType.tournament],
      [extractIdType.playerLog, M_TR0_RACE_ID0, extractIdType.race],
    ])(
      '(invalid input type but requesting %s) => raise error',
      (outputIdType, inputId, inputIdType) => {
        const requestingId = extractId(inputId, inputIdType, outputIdType);
        expect(requestingId).toBe('invalidType');
      },
    );
  });
});
