define(function(){
	Array.prototype.compact = function() { // same as above but the "not-in-the-return" values are the one where f(el) is true
    	for (var i = this.length; i--; ) if (!this[i]) this.splice(i, 1);
    	return this;
  	};
});

