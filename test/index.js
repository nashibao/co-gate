var co = require('co');
var Gate = require('..');
var fs = require('fs');
var assert = require('assert');

describe('co-gate', function(){
  it('file', function(done){
    co(function *(){
      var gate = new Gate();
      fs.readFile("test/test.txt", "utf-8", gate.in());
      var val = yield gate.out();
      assert.equal(val, 'test');
      done();
    })();
  });
});