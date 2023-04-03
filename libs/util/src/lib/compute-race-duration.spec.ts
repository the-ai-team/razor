// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { M_RACE_TEXT0, M_RACE_TEXT1 } from '@razor/mocks';

import { computeRaceDuration } from './compute-race-duration';

describe('[Utils] computeRaceDuration', () => {
  it.each([
    [M_RACE_TEXT0, 191],
    [M_RACE_TEXT1, 162],
  ])('Calculate timeout timer', (text, time) => {
    const timeoutDuration = computeRaceDuration(text);
    expect(timeoutDuration).toBeGreaterThanOrEqual(time);
  });
});
