import assert from 'assert';
import compare from '../compare';

const A = {pattern: '/a'};
const B = {pattern: '/a/b'};

describe('compare', () => {
  it('compares by the amount of forward slashes by default', () => {
    assert(compare(A, B) === 1, 'A -> B');
    assert(compare(A, A) === 0, 'A -> A');
    assert(compare(B, A) === -1, 'B -> A');
  });
});
