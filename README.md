# rlookup

A route lookup built on top of Houkou.

[![Build Status](https://travis-ci.org/UXtemple/rlookup.svg)](https://travis-ci.org/UXtemple/rlookup)

## Usage

```
const rlookup = new RLookup();

rlookup.add('/some-:path');
rlookup.add({
  name: '/some-:path/:more',
  requirements: {
    'more': '[0-9]+' // only match numbers in more
  }
});

const { pattern, params } = rlookup.match('/some-thing/else');
```

See [Houkou](https://github.com/deoxxa/houkou) for more info on routes and
[the example](https://github.com/deoxxa/houkou#example-usage) for more advanced stuff like
setting up requirements for routes' parameters.

MIT license.
