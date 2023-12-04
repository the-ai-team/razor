import { AppPlayerLog } from '@razor/models';
import { calculateWPM } from '@razor/util';
import { RECENT_WPM_TIME_WINDOW } from 'apps/client/src/constants/race';

export function computeRecentWPM(playerLogs: AppPlayerLog[]): number {
  // get logs for last RECENT_WPM_TIME_WINDOW seconds
  const recentLogs = playerLogs.filter(
    log => log.timestamp > Date.now() - RECENT_WPM_TIME_WINDOW * 1000,
  );

  if (recentLogs.length > 1) {
    return calculateWPM(
      recentLogs[0].timestamp,
      Date.now(),
      recentLogs[0].textLength,
      recentLogs[recentLogs.length - 1].textLength,
    );
  } else {
    return 0;
  }
}
