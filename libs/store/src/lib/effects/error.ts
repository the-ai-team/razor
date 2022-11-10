import { AppErrorLog } from '@razor/models';
import { Dispatch } from '../store';

export const sendErrorLog = async (
  dispatch: Dispatch,
  payload: AppErrorLog,
): Promise<void> => {
  const errorTimestamp: number = new Date().getTime();
  const errorLog = payload;
  dispatch.game.logErrorReducer({
    errorLog,
    errorTimestamp,
  });
};
