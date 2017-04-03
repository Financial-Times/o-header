/*eslint-env node*/

const BowerPlugin = require('bower-webpack-plugin');
const path = require('path');
const process = require('process');
const cwd = process.cwd();

module.exports = function(config) {

	const customLaunchers = {
		// If browser_version is not set, uses latest stable version

		// Tesing on minimum version for enhanced experience based on
		// https://docs.google.com/document/d/1mByh6sT8zI4XRyPKqWVsC2jUfXHZvhshS5SlHErWjXU

		// Firefox latest
		bs_firefox: {
			base: 'BrowserStack',
			browser: 'firefox',
			os: 'OS X',
			os_version: 'Sierra'
		},

		// Chrome latest
		bs_chrome: {
			base: 'BrowserStack',
			browser: 'chrome',
			os: 'OS X',
			os_version: 'Sierra'
		},

		// Safari 10
		bs_safari: {
			base: 'BrowserStack',
			browser: 'safari',
			os: 'OS X',
			os_version: 'Sierra'
		},

		// IE 11
		bs_ie: {
			base: 'BrowserStack',
			browser: 'ie',
			os: 'Windows',
			os_version: '10'
		},

		// Edge latest
		bs_edge: {
			base: 'BrowserStack',
			browser: 'edge',
			os: 'Windows',
			os_version: '10'
		},

		// iOS 8
		bs_iphone6: {
			base: 'BrowserStack',
			device: 'iPhone 6',
			os: 'ios',
			os_version: '8.3'
		},

		// Android 5
		bs_android5: {
			base: 'BrowserStack',
			os: 'android',
			device: 'Google Nexus 5',
			os_version: '5.0'
		}
	};

	const browsers = process.env.CI ? Object.keys(customLaunchers) : ['PhantomJS'] ;

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'sinon'],


		plugins: [
			'karma-mocha',
			'karma-sinon',
			'karma-phantomjs-launcher',
			'karma-webpack',
			'karma-browserstack-launcher'
		],


		// list of files / patterns to load in the browser
		files: [
			'https://polyfill.io/v2/polyfill.js?flags=gated',
			'test/*.test.js'
		],


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test/*.test.js': ['webpack']
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers,

		browserDisconnectTimeout: 60 * 1000, // default 2000
		browserDisconnectTolerance: 0, // default 0
		browserNoActivityTimeout: 60 * 1000, // default 10000
		captureTimeout: 60 * 1000, // default 60000

		// define browsers
		customLaunchers,


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		webpack: {
			quiet: true,
			module: {
				loaders: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loaders: [
							'babel?optional[]=runtime',
							'imports?define=>false'
						]
					}
				],
				noParse: [
					/\/sinon\.js/,
				]
			},
			resolve: {
				root: [path.join(cwd, 'bower_components')]
			},
			plugins: [
				new BowerPlugin({
					includes:  /\.js$/
				})
			]
		},

		// Hide webpack output logging
		webpackMiddleware: {
			noInfo: true
		}

	});
};
