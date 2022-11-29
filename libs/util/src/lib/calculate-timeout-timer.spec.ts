// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { M_RACE_TEXT0, M_RACE_TEXT1 } from '@razor/mocks';
import { calculateTimeoutTimer } from './calculate-timeout-timer';

describe('[Utils] calculateTimeoutTimer', () => {
  it.each([[M_RACE_TEXT0], [M_RACE_TEXT1]])('Calculate timeout timer', text => {
    const timeoutDuration = calculateTimeoutTimer(text);
    expect(timeoutDuration).toBeGreaterThanOrEqual(60);
    expect(timeoutDuration).toBeLessThanOrEqual(240);
  });
});
