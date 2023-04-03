import { AppIdNumberType } from '@razor/models';

import { generateUid } from './generate-uid';

describe('[Utils] generateUid', () => {
  it.each([
    [AppIdNumberType.Tournament, /^T:[0-9a-zA-Z]{8}$/],
    [AppIdNumberType.Player, /^P:[0-9a-zA-Z]{8}$/],
    [AppIdNumberType.General, /^[0-9a-zA-Z]{8}$/],
  ])('Generate %s id', (type, expected) => {
    const id = generateUid(type);
    expect(id).toMatch(expected);
  });
});
