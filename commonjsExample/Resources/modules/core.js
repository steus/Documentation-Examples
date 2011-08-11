/**
 * Core functionality for the app
 */

/** 
 * Private methods, variables, & dependencies 
 **/
var primitives   = require('modules/helpers/primitives'),
    properties   = {},    // Any app-wide properties
	plugins      = {},    // Any plugins added to the app
	currentPage  = null,  // Reference to the current page module
	models       = {};    // Holds the Joli models

/*
 * Setup and init SQLite / data models
 * @private
 */
function setupModels() {
	models.users = new plugins.joli.model({
		table: 'users',
  		columns:  {
  			id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
			Name: 'TEXT'
	 	}
	});	
	
	plugins.joli.models.initialize();
};

/***************************
 * Public methods & variables 
 ***************************/

/**
 * Set properties for app
 * @param {String} name Name of property
 * @param {String} value Value of property	
 */
exports.addProperty = function(name, value) {
	properties[name] = value;
};

/**
 * Get a page
 * @param {String} name Name of page
 * @param {Object} params Parameters to pass to the page module
 */	
exports.loadPage = function(name, params) {
	// Here we're overwriting the currentPage with the new one called
	currentPage = require(properties.pages + '/' + name);
	// load() is expected for all page modules in this app.
	// First arg is the app context in case we need it, second arg is an object
	// for the module params
	currentPage.load(exports, params);
};

/**
 * Register a plugin with the core app
 * @param {String} name Name of plugin
 * @param {Object} object The object namespace the plugin uses
 */	
exports.register = function(name, object) {
	plugins[name] = object;
};

/**
 * Helper method to show all properties in the core app
 */
exports.properties = function() { 
	return properties; 
};

/**
 * Helper method to show one property in the core app
 * @param {String} name
 */
exports.property = function(name) { 
	return properties[name]; 
};

/**
 * Initialize SQLite database
 * @param {String} name
 */
exports.databaseSetup = function(name) {
	// Setup a connection to the database through Joli plugin
	plugins.joli.connection = new plugins.joli.Connection(name);
	
	// Initialize the data models
	setupModels();	
};

/**
 * Database proxy
 */
exports.db = function(type, name) {
	// Use either the query helpers or the object model helpers
	if(type === 'query') {
		return new plugins.joli.query();
	} else if(type === 'model') {
		return models[name];
	}
};

/**
 * Change layout based on orientation
 * @param {Object} _event
 */
exports.orientationObserverUpdate = function(_event) {
	// Example of how you can control the current page with global events
	var type = (_event.source.isLandscape()) ? 'landscape' : 'portrait' ;
	
	if(currentPage && currentPage.orientationUpdate) {
		currentPage.orientationUpdate(type);
	}
};

/**
 * Get orientation in a sane way
 * @param {String} o
 */
exports.getOrientation = function(o) {
	switch (o) {
		case Titanium.UI.PORTRAIT: {
			return 'portrait';
		}
		case Titanium.UI.UPSIDE_PORTRAIT: {
			return 'upside portrait';
		}
		case Titanium.UI.LANDSCAPE_LEFT: {
			return 'landscape left';
		}
		case Titanium.UI.LANDSCAPE_RIGHT: {
			return 'landscape right';
		}
		case Titanium.UI.FACE_UP: {
			return 'face up';
		}
		case Titanium.UI.FACE_DOWN: {
			return 'face down';
		}
		case Titanium.UI.UNKNOWN: {
			return 'unknown';
		}
	}
};