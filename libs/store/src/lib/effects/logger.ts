import { AppMessageLog, AppMessageLogType } from '@razor/models';
import { Dispatch } from '../store';

export const sendLogMessage = async (
  dispatch: Dispatch,
  payload: AppMessageLog,
): Promise<void> => {
  const timestamp: number = new Date().getTime();
  const { message, code, relatedId, type } = payload;

  switch (type) {
    case AppMessageLogType.Error:
      console.error(`[Error ${code}]: ${message} (${relatedId})`);
      dispatch.game.logErrorReducer({
        errorLog: {
          message,
          code,
          relatedId,
        },
        errorTimestamp: timestamp,
      });
      break;
    case AppMessageLogType.Warn:
      console.warn(`[Warn ${code}]: ${message} (${relatedId})`);
      break;
    case AppMessageLogType.Info:
      console.info(`[Info ${code}]: ${message} (${relatedId})`);
      break;
  }
};
