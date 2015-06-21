import defaultCompare from './compare';
import Route from 'houkou';

export default class RLookup {
  constructor({patterns=[], compare=defaultCompare}={}) {
    this.compare = compare;
    this.patterns = {};
    patterns.forEach(pattern => this.patterns[pattern] = new Route(pattern));
  }

  add(pattern) {
    this.patterns[pattern] = new Route(pattern);
  }

  remove(pattern) {
    delete this.patterns[pattern];
  }

  match(path) {
    return toArray(this.patterns)
      .filter(({route}) => route.match(path))
      .sort(this.compare)
      .map(({pattern, route}) => ({pattern, params: route.match(path)}))[0];
  }
}

function toArray(obj) {
  return Object.keys(obj).map(pattern => ({pattern, route: obj[pattern]}));
}
