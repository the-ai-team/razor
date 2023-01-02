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
        ExtractIdType.Race,
        ExtractIdType.Tournament,
      );
      expect(tournamentId).toBe(M_TOURNAMENT_ID0);
    });
    it('(player log id) => tournament id', () => {
      const tournamentId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        ExtractIdType.PlayerLog,
        ExtractIdType.Tournament,
      );
      expect(tournamentId).toBe(M_TOURNAMENT_ID0);
    });
    it('(player log id) => player id', () => {
      const playerId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        ExtractIdType.PlayerLog,
        ExtractIdType.Player,
      );
      expect(playerId).toBe(M_PLAYER_ID0);
    });
    it('(player log id) => race id', () => {
      const raceId = extractId(
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        ExtractIdType.PlayerLog,
        ExtractIdType.Race,
      );
      expect(raceId).toBe(M_TR0_RACE_ID0);
    });
    it('(invalid input id) => raise error', () => {
      try {
        extractId(
          'invalid' as AppTournamentId,
          ExtractIdType.PlayerLog,
          ExtractIdType.Tournament,
        );
      } catch (e) {
        expect((e as Error).message).toBe('Invalid input value');
      }
    });
    it.each([
      [ExtractIdType.Player, M_PLAYER_ID0, ExtractIdType.Player],
      [ExtractIdType.Tournament, M_TOURNAMENT_ID0, ExtractIdType.Tournament],
      [ExtractIdType.Race, M_TR0_RACE_ID0, ExtractIdType.Race],
      [
        ExtractIdType.PlayerLog,
        mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0),
        ExtractIdType.PlayerLog,
      ],
    ])(
      '(both request and input id are same, %s) => return same id',
      (outputIdType, inputId, inputIdType) => {
        const requestingId = extractId(inputId, inputIdType, outputIdType);
        expect(requestingId).toBe(inputId);
      },
    );
    it.each([
      [ExtractIdType.Tournament, M_PLAYER_ID0, ExtractIdType.Player],
      [ExtractIdType.Player, M_TOURNAMENT_ID0, ExtractIdType.Tournament],
      [ExtractIdType.Player, M_TR0_RACE_ID0, ExtractIdType.Race],
      [ExtractIdType.Race, M_PLAYER_ID0, ExtractIdType.Player],
      [ExtractIdType.Race, M_TOURNAMENT_ID0, ExtractIdType.Tournament],
      [ExtractIdType.PlayerLog, M_PLAYER_ID0, ExtractIdType.Player],
      [ExtractIdType.PlayerLog, M_TOURNAMENT_ID0, ExtractIdType.Tournament],
      [ExtractIdType.PlayerLog, M_TR0_RACE_ID0, ExtractIdType.Race],
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
