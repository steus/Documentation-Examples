/**
 * CommonJS Sample App
 * @version      0.1
 * @author       Rick Blalock
 */

// 'app' is the core namespace we'll use throughout
var app = require('modules/core');

// Setting app defaults.  These are simple properties appended to the app properties object
app.addProperty('pages', 'modules/pages');
app.addProperty('plugins', 'plugins');

// Include plugins
Ti.include('plugins/joli.js'); // Joli ORM library

// Register plugins with the core app
app.register('joli', joli); // Register the lib within the app so we can use it elsewhere

// Setup database
app.databaseSetup('commonjs'); // the database name

// Handle orientation routing
Ti.Gesture.addEventListener('orientationchange', app.orientationObserverUpdate);

// Open inital page
app.loadPage('userlist');