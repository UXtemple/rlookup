import defaultCompare from './compare';
import Route from 'houkou';

export default class RLookup {
  constructor({patterns=[], compare=defaultCompare}={}) {
    this.compare = compare;
    this.patterns = {};
    patterns.forEach(::this.add);
  }

  add(pattern) {
    const { name, ...config } = typeof pattern === 'string' ? {name: pattern} : pattern;
    this.patterns[name] = new Route(name, config);
  }

  remove(name) {
    delete this.patterns[name];
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
