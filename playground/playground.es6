import RLookup from '../index';

const rlookup = new RLookup({patterns: ['/:path', '/another/:path']});

window.Playground = {
  rlookup,
  RLookup
};

console.log('Welcome to rlookup playground.');
console.log('https://github.com/UXtemple/rlookup');
console.log('Playground module', Playground);
