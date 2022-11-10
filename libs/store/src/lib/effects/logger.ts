import { AppMessageLog, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const sendLogMessage = async (
  dispatch: Dispatch,
  payload: AppMessageLog,
): Promise<void> => {
  const timestamp: number = new Date().getTime();
  const { message, code, related, type } = payload;

  switch (type) {
    case AppMessageLogType.Error:
      console.error(`[Error ${code}]: ${message} (${related})`);
      dispatch.game.logErrorReducer({
        errorLog: {
          message,
          code,
          related,
        },
        errorTimestamp: timestamp,
      });
      break;
    case AppMessageLogType.Warn:
      console.warn(`[Warn ${code}]: ${message} (${related})`);
      break;
    case AppMessageLogType.Info:
      console.info(`[Info ${code}]: ${message} (${related})`);
      break;
  }
};
