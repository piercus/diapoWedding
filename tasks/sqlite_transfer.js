'use strict';

var ProgressBar = require('progress');

var rjs = require("requirejs");

var sqlite3 = require('sqlite3').verbose();

//load mapAsync funtion
var objMapAsync = rjs('helpers/objMapAsync');


module.exports = function(grunt) {
	grunt.registerTask('sqlite_transfer', 'easy sqlite transfer', function() {
		var done = this.async();
		var options = this.options();
		console.log('task');

		var mainTables = [
			"Roots",
			"Albums",
			"Images",
			"ImageHaarMatrix",
			"ImageInformation",
			"ImageMetadata",
			"VideoMetadata",
			"ImagePositions",
			"ImageComments",
			"ImageCopyright",
			"Tags",
			"TagsTree",
			"ImageTags",
			"ImageProperties",
			"Searches",
			"DownloadHistory",
			"Settings",
			"ImageHistory",
			"ImageRelations",
			"TagProperties",
			"ImageTagProperties"
		];

		var thumbTables = [
			"Thumbnails",
			"UniqueHashes",
			"FilePaths",
			"CustomIdentifiers",
			"Settings"
		];

		var db = new sqlite3.Database(":memory:");

		var transfer = function(table, nameIn, nameOut){
			return "INSERT INTO '"+nameIn+"'."+table+" SELECT * FROM '"+nameOut+"'."+table+";\n";
		};

		var clean = function(table, aliasName){
			return "DELETE FROM '"+aliasName+"'."+table+";\n";
		};

		var transferDB = function(fileIn, fileOut, nameIn, nameOut, tables, cb1) {

			var initStr = "ATTACH DATABASE '"+fileOut+"' As '"+nameOut+"';\nATTACH DATABASE '"+fileIn+"' As '"+nameIn+"';\n"

			var str = initStr
			
			tables.map(function(t){
				str += clean(t,nameIn,nameOut)+transfer(t, nameIn, nameOut);
			});

			cb1(err);

			console.log("Copy-paste the following string in a sqlite3 console :",str);

		};

		transferDB(
			options.fileInMain,
			options.fileOutMain,
			"in", 
			"out", 
			mainTables, 
			function(err){
				if(err){
					grunt.fail.warn("error with main tables");
					db.close();
					return;
				}
				
				transferDB(
					options.fileInThumb,
					options.fileOutThumb,
					"thumbIn", 
					"thumbOut", 
					thumbTables, 
					function(err){
						db.close();
						if(err){
							grunt.fail.warn("error with thumb tables");
							return;							
						}
						done();
						return;
					}
				);
			}
		);

	});
}