define(['angular'], function(angular){
	'use strict';
	return angular.module('directives', []).directive('taggedImage',[function(){
		return {
			restrict : 'E',
			scope: {
				img : "=",
				tagInfos : "=list",
				width : "@width"
			},
			templateUrl : 'views/directives/taggedImage.html',
			link : function(scope) {
			    scope.getStyle = function(rect, imgWidth, width){
			    	//console.log(rect,imgWidth,width);
					var r = parseInt(width)/imgWidth;
					var res = {};
					for (var i in rect) {
						if(rect.hasOwnProperty(i)){
							res[i] = rect[i]*r + "px";
						}
					}
					return res;
				};
			}
		};
	}]);
});