'use strict';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  // Register the Babel require hook
	require("babel-polyfill");
	require("babel-core/register")({
			presets: ['es2015-node5', 'stage-3', 'react']
	});
}

// Export the application
exports = module.exports = require('./app');
