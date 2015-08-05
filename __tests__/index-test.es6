import { spy } from 'sinon';
import assert from 'assert';
import RLookup from '../index';

const MORE_SPECIFIC_PATTERN = '/:some/:route';
const MORE_SPECIFIC_PATH = '/path/path';
const PATH_PARAM = 'path';
const PATH = `/${PATH_PARAM}`;
const PATTERN_PARAM = 'param';
const PATTERN = `/:${PATTERN_PARAM}`;
const CONFIG = {
  requirements: {
    [PATTERN_PARAM]: '[a-z]+'
  }
}

describe('RLookup', () => {
  it('has a constructor', () => assert(new RLookup() instanceof RLookup));

  it('accepts a list of patterns to start with', () => {
    const rlookup = new RLookup({patterns: [PATTERN]});
    assert(Object.keys(rlookup.patterns)[0] === PATTERN);
  });

  it('accepts an alternative comparator', () => {
    const comparator = spy();
    const rlookup = new RLookup({compare: comparator});
    assert(rlookup.compare === comparator);
  });

  it('#add', () => {
    const rlookup = new RLookup();
    rlookup.add(PATTERN);
    assert(rlookup.patterns.hasOwnProperty(PATTERN));
  });

  describe('with patterns', () => {
    let rlookup;
    beforeEach(() => rlookup = new RLookup({patterns: [PATTERN]}));

    it('#match', () => {
      const {pattern, params} = rlookup.match(PATH);
      assert(pattern === PATTERN, 'has pattern');
      assert(params[PATTERN_PARAM] === PATH_PARAM, 'has the right params');
    });

    it('#remove', () => {
      rlookup.remove(PATTERN);
      assert(!rlookup.patterns.hasOwnProperty(PATTERN));
    });

    it('identifies more specific routes with the default comparator counting forward slashes', () => {
      rlookup.add(MORE_SPECIFIC_PATTERN);
      assert(rlookup.match(MORE_SPECIFIC_PATH).pattern === MORE_SPECIFIC_PATTERN);
    });

    it('can use a different comparator', () => {
      const comparator = spy();
      rlookup.compare = comparator;

      rlookup.add(MORE_SPECIFIC_PATTERN);
      rlookup.match(MORE_SPECIFIC_PATH);

      assert(comparator.called);
    });
  });

  describe('with configurable patterns', () => {
    let rlookup;
    beforeEach(() => rlookup = new RLookup({patterns: [{name: PATTERN, ...CONFIG}]}));

    it('#match: matches a route with requirements', () => {
      const {pattern, params} = rlookup.match(PATH);
      assert(pattern === PATTERN, 'has pattern');
      assert(params[PATTERN_PARAM] === PATH_PARAM, 'has the right params');
    });

    it('#match: doesn\'t match a route that doesn\'t fit the requirements', () =>
      assert(typeof rlookup.match('/123') === 'undefined'));
  });
});
