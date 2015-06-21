const FORWARD_SLASHES_REGEX = /\//g;

export default function compare({pattern: patternA}, {pattern: patternB}) {
  return complexity(patternB) - complexity(patternA);
}

function complexity(pattern) {
  return pattern.match(FORWARD_SLASHES_REGEX).length;
}
