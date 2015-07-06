define(['angular', 'models/models', 'config'], function(angular,m,config){
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
		scope.parentTag = models.Tag.indexes[route.current.params.parentTagId];
		scope.config = config;
		
		var images = scope.parentTag.getImages();

		scope.reload = function(){	
			//transform
			scope.tagInfos = images[scope.indexImage-1].getTagInfos().map(function(tI){
				return {
					tag : tI.tag,
					imgTag : tI.imgTag
				};
			});

			//console.log("reload", scope.indexImage, scope.tagInfos);
		}

		var length = images.length;

		var loop = function(){
			scope.indexImage = (scope.indexImage)%length + 1;
			console.log(loop,scope.indexImage, new Date());
			scope.reload();
			scope.$apply();
		};

		scope.play = function(){
			if(!scope.interval){
				scope.interval = setInterval(loop,7000);
			}
		};

		scope.indexImage = images.map(function(img){
			return img.id
		}).indexOf(scope.image.id)+1;

		if(scope.indexImage === -1){
			scope.indexImage = 1;
			console.log("url does not match");
		}

		scope.reload(scope.indexImage);

		//console.log("tag infos are : ", scope.tagInfos, scope.image.width);
	}]);

	return ctrlModule;
});