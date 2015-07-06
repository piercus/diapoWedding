var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    // Removed "Spec" naming from files
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/scripts',

    paths: {
		angular: '../../bower_components/angular/angular',
		'angular-route': '../../bower_components/angular-route/angular-route',
		'seed-js/Seed': 'vendor/Seed-min',
		domReady: 'vendor/domReady',
		async: '../../bower_components/requirejs-plugins/src/async',
		pagination: '../../bower_components/angular-utils-pagination/dirPagination',
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
		'Markdown.Converter': '../../bower_components/requirejs-plugins/lib/Markdown.Converter',
		'angular-utils-pagination': '../../bower_components/angular-utils-pagination/dirPagination'
	},

    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-route': ['angular'],
        'angular-mocks': {
          deps:['angular'],
          'exports':'angular.mock'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
