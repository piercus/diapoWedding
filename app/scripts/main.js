require.config({
	paths: {
		angular: '../../bower_components/angular/angular',
		'angular-route': '../../bower_components/angular-route/angular-route',
		'seed-js/Seed': 'vendor/Seed-min',
		domReady: 'vendor/domReady',
		async: '../../bower_components/requirejs-plugins/src/async',
		font: '../../bower_components/requirejs-plugins/src/font',
		goog: '../../bower_components/requirejs-plugins/src/goog',
		image: '../../bower_components/requirejs-plugins/src/image',
		text: '../../bower_components/requirejs-plugins/lib/text',
		json: '../../bower_components/requirejs-plugins/src/json',
		noext: '../../bower_components/requirejs-plugins/src/noext',
		mdown: '../../bower_components/requirejs-plugins/src/mdown',
		propertyParser: '../../bower_components/requirejs-plugins/src/propertyParser',
		'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
		depend: '../../bower_components/requirejs-plugins/src/depend',
		'Markdown.Converter': '../../bower_components/requirejs-plugins/lib/Markdown.Converter'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		'angular-route': {
			deps: [
				'angular'
			]
		}
	},
	packages: [

	]
});



require(['angular', 'angular-route', 'controllers/controllers', 'directives/directives'],function(ng){
	'use strict';
	//console.log("here");

	ng.module('diapoWedding', ["ngRoute", 'controllers', 'directives']);


	ng.module('diapoWedding').run(["$rootScope", "models", function(rScope, models) {
    	rScope.allTags = models.Tag.where(function(t){
    		return t.pid === 23;
    	}).sort(function(a,b){
		    if(a.name < b.name) return -1;
		    if(a.name > b.name) return 1;
		    return 0;
    	});
	}]).config(['$routeProvider',function(rProvider){

		//console.log("config");
		
		rProvider
			.when('/', {controller: 'HelloCtrl', templateUrl: 'views/hello.html'})
			.when('/tag/:id', {controller: 'ViewTagCtrl', templateUrl: 'views/viewTag.html'})
			.when('/image/:id', {controller: 'ViewImageCtrl', templateUrl: 'views/viewImage.html'})
			.otherwise({redirectTo: '/'});

	}]);

	ng.bootstrap(document.body, ['diapoWedding']);

});

//console.log(ng);

// app.config(['$routeProvider', function(){
// 	//route definition 

// }]);
