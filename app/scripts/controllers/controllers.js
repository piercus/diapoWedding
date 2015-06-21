define(['angular', 'models/models'], function(angular){
	'use strict';
	//console.log("controllers");
	var ctrlModule = angular.module('controllers', ['models']);

	ctrlModule.controller("HomeCtrl", [function(){
	}]);

	ctrlModule.controller("ViewTagCtrl", ['$scope', 'models', '$route', function(scope, models, route){
		scope.tag = models.Tag.indexes[route.current.params.id];
		console.log(scope.tag);
	}]);

	ctrlModule.controller("ViewImageCtrl", ['$scope', 'models', '$route', function(scope, models, route){
		scope.image = models.Img.indexes[route.current.params.id];

		//transform
		scope.tagInfos = scope.image.getTagInfos().map(function(tI){
			return {
				tag : tI.tag,
				imgTag : tI.imgTag
			};
		});

		console.log("tag infos are : ", scope.tagInfos, scope.image.width);
	}]);

	return ctrlModule;
});