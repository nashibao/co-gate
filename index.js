/**
 * co-gate.
 * 
 */

var Gate = function(){
  // stack which store callback
  this.stack = [];

  // callback count
  this.count = 0;
}

// create guard
Gate.prototype.in = function(){
  var gate = this;
  var cb = function(err, val){
    // error
    if(err)
      return gate.next(err, null);

    // count up
    gate.count++;

    // bind value to callback
    cb.val = val;

    // check finish
    if(gate.count == gate.stack.length){

      // create array to be yielded
      var vals = [];
      for(var i=0;i<gate.stack.length;i++){
        vals.push(gate.stack[i].val)
      }
      
      if(vals.length == 1)
        vals = vals[0];

      if(gate.next)
        gate.next(null, vals);
    }
  }

  // store callback
  gate.stack.push(cb);
  
  return cb;
}

// get results
Gate.prototype.out = function(){
  var gate = this;
  return function(next){
    gate.next = next;
  }
}

module.exports = Gate;
