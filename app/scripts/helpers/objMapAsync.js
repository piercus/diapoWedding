"use strict";

define(["helpers/Function/curry"], function(){

  var eachCb = function(nextCall, key, err, o){
    if (this.stopped) {
      return console.log("result after mapAsync stopped", key, err, o);
    }
    
    this.nExecuted ++;

    this.res[key] = o;

    if(err){
      (this.errors || (this.errors = [])).push({ key : key, err : err });
      this.nErrors++;
      if(this.stopAfterNErrors && this.nErrors >= this.stopAfterNErrors){
        this.f.stop();
        this.stopped = true;
        return this.cb(this.errors, this.res);
      }
    }

    if(this.progressBar && this.progressBar.tick){ 
      this.progressBar.tick();
    }

    if(nextCall){
      return nextCall();
    }

    if(this.nExecuted === this.l){
      this.cb(this.errors, this.res);    
    }

  };


  var groupCb = function(n, scope, keys){
    var each = eachCb.bind(scope),
        l = scope.l, f = scope.f, step;

    if(n === 1){

      step = function(index){
        if(index + 1 < l){
          f(this[keys[index]], keys[index], each.curry(step.curry(index+1), keys[index]));
        } else {
          f(this[keys[index]], keys[index], each.curry(null, keys[index]));
        }
        
      }.bind(this);
      
    } else if(n > 1){
      step = function(index){
        var j = n, i, lim;
        var count = function(){
          var a = --j;
          if(!a){
            step.call(this, index+1);
          }
        };

        if(index + 1 < Math.floor(l/n)){
          for (i = index*n, lim = (index+1)*n; i < lim; i++){
            f(this[keys[i]], i, each.curry(count, i));
          }
        } else {
          for (i = index*n, lim = l; i < lim; i++){
            f(this[keys[i]], i, each.curry(null, i));
          }        
        }
        
      }.bind(this);   

    } else {
      step = function(){
        for (var i = 0, lim = keys.length; i < lim; i++){
          f(this[keys[i]], i, each.curry(null, i));
        }
      }.bind(this);
    }
    step(0);
  };

  var mapAsync = function(f, options, cb) {
    
    if(!cb){
      if(typeof(options) === "function"){
        cb = options;
        options = {};
      } else {
        cb = function(){};
      }
    }

    if(typeof(options) === "undefined"){ 
      (options = {});
    }

    if(options.stopAfterNErrors && typeof(f.stop) !== "function"){
      throw "error : you must define f.stop to use options.stopAfterNErrors";
    }

    var keys = Object.keys(this), 
        scope = {
          nExecuted : 0, 
          errors : null, 
          res : typeof(this.length) !== "undefined" ? [] : {},
          stopped : false,
          nErrors : 0,
          cb : cb,
          f : f,
          l : keys.length,
          stopAfterNErrors : options.stopAfterNErrors || 0,
          progressBar : options.progressBar || false
        }, 
        nParallel = options.nParallel || (options.stepByStep && 1) || false;
    
    // when this is empty Array or Object 
    if(scope.l === 0){
      return cb();
    }
    
    groupCb.call(this, nParallel, scope, keys);

  };

  Array.prototype.mapAsync = mapAsync;

  return function(o, f, options, cb){
    return Array.prototype.mapAsync.call(o, f, options, cb);
  };
});