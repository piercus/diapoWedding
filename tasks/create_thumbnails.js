'use strict';

var gm    = require('gm');
var ncp = require('ncp');

var ProgressBar = require('progress');

var rjs = require("requirejs");

var fs = require("fs");

//load mapAsync funtion
var objMapAsync = rjs('helpers/objMapAsync');


module.exports = function(grunt) {
	grunt.registerMultiTask('create_thumbnails', 'easy thumbnail creation', function() {
		var done = this.async();
		var originalOptions = this.options();
		if (originalOptions.height == null && originalOptions.width == null) {
		  return grunt.fail.warn("Neither height nor width defined.");
		}

		ncp.limit = 1;

		//console.log(originalOptions);

		var list = {};
 
		ncp(originalOptions.src, originalOptions.dest, {
			filter : function(name,o){
				//console.log(name,o);
				return (
						(typeof(name.split(".")[1]) === "string") && 
						(name.split(".")[1].toLowerCase() === "jpg")
					) || 
					(name.split(".")[1] === undefined);
			},
			limit : 1,
			transform : function(read, write){
				if(!list[read.path]){
					list[read.path] = write.path;
					//console.log(read.path, write.path);
				} 
				read.close();
				write.close();
				return;

			}
		}, function (err) {
			if (err) {
				return console.error(err);
			}

			var bar = new ProgressBar('  Resizing on going ! [:bar] :percent :etas', {
				complete: '=',
				incomplete: ' ',
				width: 20,
				total: Object.keys(list).length
			});

			//console.log(Object.keys(list).length);

			objMapAsync(list, function(v, k, cb){
					//console.log("reqizing ",k, " to ",v);
					gm(k).resize(originalOptions.width, originalOptions.height).write(v, cb);
				}, {
					progressBar : bar,
					stepByStep : true
				}, function(err, res){
					if(err){
						grunt.fail.warn(err);
					}
					var thumbnails = [];
					for (var key in list) {
					    if (list.hasOwnProperty(key)) {
					        thumbnails.push(list[key]);
					    }
					}

					grunt.config.set('sprite.all.src', thumbnails);
					fs.writeFileSync('thumbnails.json','{"thumbnails" : ["'+thumbnails.join('", "')+'"]}', {'encoding' : "utf8"});
					grunt.task.run('sprite');
					done();
			});
		});
	});
};