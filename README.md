co-gate
=======

Gates to make an async callback to a synchronized syntax. This should be used with co.

[co](https://github.com/visionmedia/co) is a great solution to remove callbacks from your apps.
But you should change async apis to Thunks or Promises.
`co-gate` protects you from complex callback syntax, but also from changing existing apis.

This module is inspired by [chan](https://github.com/brentburgoyne/chan).
A most important difference is handling parallel async apis.
`co-gate` will stop at `yield` before all callback returned and return array with multiple values.

Installation
=======

Usage
=======

```javascript

// require co
var co = require('co')
  , Gate = require('..')
  , fs = require('fs');


co(function *(){
  // create gate
  var gate = new Gate()
    , val = undefined;

  // just call normal apis with gate.in() as callback
  fs.readFile("test/test1.txt", "utf-8", gate.in());
  fs.readFile("test/test2.txt", "utf-8", gate.in());

  try{
    // yielded
    val = yield gate.out();
  }catch(e){
    console.log(e);
  }

  assert.equal(val[0], 'test1');
  assert.equal(val[1], 'test2');

})();


```

License
=======
MIT
