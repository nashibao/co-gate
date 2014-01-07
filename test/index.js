var co = require('co');
var Gate = require('..');
var fs = require('fs');
var assert = require('assert');

describe('co-gate', function(){
  it('file', function(done){
    co(function *(){
      var gate = new Gate();
      fs.readFile("test/test1.txt", "utf-8", gate.in());
      fs.readFile("test/test2.txt", "utf-8", gate.in());
      var val = yield gate.out();
      assert.equal(val[0], 'test1');
      assert.equal(val[1], 'test2');
      done();
    })();
  });
});