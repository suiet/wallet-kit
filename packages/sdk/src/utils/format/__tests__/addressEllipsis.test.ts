import { addressEllipsis } from '../index';

describe('addressEllipsis', function () {
  test('correct scenario', function () {
    const suiAddress =
      '0x0000000000000000000000000000000000000000000000000000000000000000';
    expect(addressEllipsis(suiAddress)).toEqual('0x00000....0000');
  });
});
