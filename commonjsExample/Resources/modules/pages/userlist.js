/**
 * User List Page Module
 * @version      0.1
 * @author       Rick Blalock
 */

// Private vars & layouts
var styles = require('modules/styles'),
	win    = Ti.UI.createWindow(styles.defaultWindow),
	model  = require('modules/models/users');

/**
 * Load the module
 * @param {Object} app The core app module
 */
exports.load = function(app, params) {
	win.title = 'User List';
	
	// Setup the model
	model.initialize(app);
	
	// Build the layout and assign it here
	var layout = exports.layout();
	
	// Assign a delete event to the layout
	layout.addEventListener('delete', function(e) {
		model.deleteUser(e.row.id);
	});

	// Handle the new user button
	var newUserBtn = Ti.UI.createButton(styles.list.newUserBtn);
	newUserBtn.addEventListener('click', function() { app.loadPage('newuser') });
	
	// Setting the initial data since focus isn't working for Android right now
	if(Ti.Platform.osname === 'android') { layout.setData( exports.loadRows(model.list()) ); }
	
	// Handle what happens when the window is focused (Currently broke on Android 1.8 CI as of August 11th)
	win.addEventListener('focus', function() {
		layout.setData( exports.loadRows(model.list()) );
	});
	
	win.add(newUserBtn);
	win.add(layout);
	win.open();		
};

/**
 * List layout manager
 * @param {Array} data
 */
exports.layout = function() {
	var table  = Ti.UI.createTableView(styles.list.table);
	return table;		
};

/**
 * Load table rows from data set
 * @param {Array} data
 */
exports.loadRows = function(data) {
	var rows = [];
	
	for (var i = 0, length = data.length; i < length; i++) {
		var row = Ti.UI.createTableViewRow({ title: data[i].Name, id: data[i].id });
		rows.push(row);
	};	
	
	return rows;	
};

/*
 * Update layout based on orientation
 * @param {String} type
 */
exports.orientationUpdate = function(type) {
	if(type === 'landscape') {

	} else {

	}
};