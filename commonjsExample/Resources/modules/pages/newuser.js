/**
 * New User Form Module
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
	win.title = 'Create a User';
	
	// Setup the model
	model.initialize(app);
	
	// Build the layout and assign it here
	var layout = exports.layout();
	
	// Deal with the close button
	var closeBtn = Ti.UI.createButton({ title: 'Close' });
	closeBtn.addEventListener('click', function() {
		win.close();
	});
	
	win.rightNavButton = closeBtn;
	win.add(layout);
	win.open({ modal: true, fullscreen: false });		
};

/**
 * List layout manager
 * @param {Array} data
 */
exports.layout = function(data) {
	var wrapper  = Ti.UI.createView(styles.newuser.wrapper),
		username = Ti.UI.createTextField(styles.newuser.username),
		submit   = Ti.UI.createButton(styles.newuser.submit);
	
	submit.addEventListener('click', function() {
		model.createUser(username.value);
		win.close();
	});
	
	wrapper.add(username);
	wrapper.add(submit);
	
	return wrapper;
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