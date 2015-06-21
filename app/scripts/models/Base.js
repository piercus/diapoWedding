define(["seed-js/Seed"], function(S){
	'use strict';

	var B = S.extend({
		"+init" : function(o){
			for(var i in o){
				if(o.hasOwnProperty(i)){
					this[i] = o[i];
				}
			}
		}
	});

	B.models = {};

	var oldNew = B["new"];

	B["new"] = function(inst, args){
		
		if(args[0] === false){
			return;
		} else {
			oldNew.call(this, inst, args);
			this.indexes[inst.id] = inst;	
		} 
	};

	B.get = function(id){
		return this.indexes[id];
	};

	B.all = function(){
		var l = [];
		for (var i in this.indexes) {
			if(this.indexes.hasOwnProperty(i)){
				l.push(this.indexes[i]);
			}
		}
		return l;
	};

	B.where = function(g){
		var l = [];
		for (var i in this.indexes) {
			if(this.indexes.hasOwnProperty(i) && g(this.indexes[i])){
				l.push(this.indexes[i]);
			}
		}
		return l;
	};

	B.model = function(name, proto){
		var M = this.extend(proto);
		delete M.models;
		M.modelName = name;
		M.indexes = {};
		B.models[name] = M;
		return M;
	};

	return B;
});