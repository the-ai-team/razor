import { giveZeroPadding } from './give-zero-padding';

describe('[Utils] giveZeroPadding', () => {
  it('Add requested padding', () => {
    expect(giveZeroPadding('1', 2)).toEqual('01');
    expect(giveZeroPadding('01', 2)).toEqual('01');
    expect(giveZeroPadding('1', 3)).toEqual('001');
    expect(giveZeroPadding('01', 3)).toEqual('001');
    expect(giveZeroPadding('001', 3)).toEqual('001');
  });
});
