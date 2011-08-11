/**
 * Users Model
 * @version      0.1
 * @author       Rick Blalock
 */

// Private vars & methods
var core    = null,
	options = null;

/**
 * Initialize model
 * @param {Object} app The core app object
 * @param {Object} params The params for this model
 */
exports.initialize = function(app, params) {
	core    = app;
	options = params;
};

/**
 * List All Users (no filters)
 * @param {Object} params The params for this query
 */
exports.list = function(params) {
	var q = core.db('query')
  		.select('*')
  		.from('users')
  		.execute();

	return q;
};

/**
 * Create User
 * @param {String} username The username to create
 */
exports.createUser = function(username) {
	var q = core.db('model', 'users').newRecord({
  		Name: username,
	});
	q.save();
};

/**
 * Delete User
 * @param {Number} id
 */
exports.deleteUser = function(id) {
	var q = core.db('model', 'users').deleteRecords(id);
};