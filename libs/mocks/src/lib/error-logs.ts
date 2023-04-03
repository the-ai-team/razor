import { AppErrorCode, AppErrorLogs } from '@razor/models';

import { giveZeroPadding } from './give-zero-padding';

/** Generate sample error logs.
 * Return error log with the given length.
 *
 * @param count - Log length
 * @returns Mock error logs
 */
export const errorLogsGenerator = (count: number): AppErrorLogs => {
  const codes = [
    AppErrorCode.TournamentNotExists,
    AppErrorCode.PlayerNotExists,
    AppErrorCode.RaceNotExists,
    AppErrorCode.InvalidPlayerName,
  ];
  const messages = [
    'Tournament with id T:testTOUR does not exist',
    'Player with id P:testPLAYER does not exist',
    'Race with id R:testRACE does not exist',
    'Player name is invalid',
  ];

  const errorLogs: AppErrorLogs = {};
  for (let i = 0; i < count; i++) {
    const id = `1234567890-test${giveZeroPadding(i.toString(), 4)}`;
    const randomNum = Math.floor(Math.random() * 4);
    errorLogs[id] = {
      message: messages[randomNum],
      code: codes[randomNum],
      related: '',
    };
  }
  return errorLogs;
};
