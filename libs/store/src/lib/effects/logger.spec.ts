import { AppErrorCode, AppMessageLogType } from '@razor/models';
import { initialState } from '../initialState';
import { initializeStore } from '../store';

describe('[Effects] Logger', () => {
  describe('Send log message', () => {
    it('(error provided) => Send error to state, Log to console', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      const code = AppErrorCode.PlayerNotExists;
      const message = 'Player with id P:notExist does not exist.';
      const related = 'While removing player';
      await store.dispatch.game.sendLogMessage({
        message: message,
        code: code,
        related: related,
        type: AppMessageLogType.Error,
      });
      expect(consoleSpy).toBeCalledTimes(1);
    });
    it('(warn provided) => Log to console', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      const code = AppErrorCode.PlayerNotExists;
      const message = 'Player with id P:notExist does not exist.';
      const related = 'While removing player';
      await store.dispatch.game.sendLogMessage({
        message: message,
        code: code,
        related: related,
        type: AppMessageLogType.Warn,
      });
      expect(consoleSpy).toBeCalledTimes(1);
    });
    it('(info provided) => Log to console', async () => {
      const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      const code = AppErrorCode.PlayerNotExists;
      const message = 'Player with id P:notExist does not exist.';
      const related = 'While removing player';
      await store.dispatch.game.sendLogMessage({
        message: message,
        code: code,
        related: related,
        type: AppMessageLogType.Info,
      });
      expect(consoleSpy).toBeCalledTimes(1);
    });
  });
});
