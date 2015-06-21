# rlookup

A route lookup built on top of Houkou.

```
const rlookup = new RLookup();

rlookup.add('/some-:path');
rlookup.add('/some-:path/:more');

const { pattern, params } = rlookup.match('/some-thing/else');
```

See [Houkou](https://github.com/deoxxa/houkou) for more info on routes.

MIT license.
