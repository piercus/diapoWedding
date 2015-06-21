define(function() {
  
  Array.prototype.remove = function(v) {
    for (var i = this.length; i--; ) {
      if (this[i] === v) this.splice(i, 1);
    }
    return this;
  };
  
});