define(['angular', 'models/models', 'config'], function(angular,m,config){
	'use strict';
	//console.log("controllers");
	var ctrlModule = angular.module('controllers', ['models']);

	ctrlModule.controller("HomeCtrl", [function(){
	}]);
 
	ctrlModule.controller("ViewTagCtrl", ['$scope', 'models', '$route', '$location', function(scope, models, route){
		scope.tag = models.Tag.indexes[route.current.params.id];
		var parentImgId = parseInt(route.current.params.parentImgId);
		
		scope.itemsPerPage = config.itemsPerPage;

		var index = 1, 
			imgIds = scope.tag.getImages().map(function(img){return parseInt(img.id)});

		scope.nPage = Math.ceil(imgIds.length/scope.itemsPerPage);

		if(scope.tag.imageIds.indexOf(parentImgId) !== -1){
			index = imgIds.indexOf(parentImgId);
		}

		scope.indexTagPage = Math.ceil((index+1)/scope.itemsPerPage);

		scope.setCurrentPage = function(newPage){
			scope.indexTagPage = newPage;
		}

		//console.log(scope.indexTagPage, index, scope.itemsPerPage, scope.tag.getImages().map(function(img){return img.id}), parentImgId);
	}]);

	ctrlModule.controller("ViewImageCtrl", ['$scope', 'models', '$route', '$location', '$interval', function(scope, models, route, location, interval){

		//private variables
		var reloadTags = function(){
			scope.tagInfos = images[scope.indexImage-1].getTagInfos().map(function(tI){
				return {
					tag : tI.tag,
					imgTag : tI.imgTag
				};
			});
		}
		var parentTag = models.Tag.indexes[route.current.params.parentTagId];
		var images = parentTag.getImages();

		var length = images.length, image = models.Img.indexes[route.current.params.id];

		var loop = function(){
			scope.indexImage = (scope.indexImage)%length + 1;
			//console.log(scope, new Date());
			//scope.reload();
			//scope.$apply();
		};

		//public variables
		angular.extend(scope,{
			image : image,

			fulfScreen : false,

			nPage : length,

			indexImage : images.map(function(img){
					return img.id
				}).indexOf(image.id)+1,

			parentTag : parentTag,

			config : config,

			onPageChange : function(){
				reloadTags();
				//reload changes the location and breaks the interval by reloading controller's scope
				if(!scope.interval){
					scope.reload()
					//console.log("pageCahnge");
				}
			},

			reload : function(){	
				//console.log("reload");
				var imageId = images[scope.indexImage-1].id;
				location.path("/image/"+imageId+"/"+route.current.params.parentTagId);
				//transform
				//scope.tagInfos = images[scope.indexImage-1].getTagInfos().map(function(tI){
				//	return {
				//		tag : tI.tag,
				//		imgTag : tI.imgTag
				//	};
				//});

				//console.log("reload", scope.indexImage, scope.tagInfos);
			},

			play : function(){
				if(!scope.interval){
					scope.interval = interval(loop,3000);
				}
			},

			pause : function(){
				if(scope.interval){
					interval.cancel(scope.interval);
					scope.reload();
				}
			},
			
			setCurrentPage : function(newPage){
				scope.indexImage = newPage;
				console.log(newPage);
			},

			showFull : function(){
				//console.log(this, scope);
				this.fullScreen = true;
			},

			hideFull : function(){
				this.fullScreen = false;
				this.pause();
			}

		});
		
		reloadTags();

		scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          scope.pause();
        });

		if(scope.indexImage === -1){
			scope.indexImage = 1;
			console.log("url does not match");
		}

		//console.log("tag infos are : ", scope.tagInfos, scope.image.width);
	}]);

	return ctrlModule;
});