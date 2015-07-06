define(['angular'], function(angular){
	'use strict';
	//console.log("controllers");
	var filters = angular.module('filters', []);

	filters.filter('ceil', function () {
	    return function (input) {
	        if (isNaN(input)) return input;
	        return Math.ceil(input);
	    };
	});
});