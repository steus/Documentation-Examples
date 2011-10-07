// private vars
var mainWindow, callback_label_coords;
var styles = require('styles');
var maps = require('lib/maps');

/**
 * @param {Object} args  properties for the window
 */
exports.AppWindow = function(args) {
    var instance, event_label, callback_label;

    // create window
    instance = Ti.UI.createWindow(args);

    // make callback label
    callback_label = Ti.UI.createLabel(styles.callback_label);
    instance.add(callback_label);
    callback_label_coords = Ti.UI.createLabel(styles.coords_label);
    instance.add(callback_label_coords);

    // make event listener label
    event_label = Ti.UI.createLabel(styles.event_label);
    instance.add(event_label);
    event_label_coords = Ti.UI.createLabel(styles.coords_label);
    instance.add(event_label_coords);

    // create event Listener
    Ti.App.addEventListener('location.updated', function(_coords) {
        event_label_coords.text = String.format("longitude: %s\n latitude: %s ", _coords.longitude + "", _coords.latitude + "");
    });
    // do the callback to get current location
    maps.currentLocation(gspCallback);
    
    // save the window
    mainWindow = instance;
    return instance;
};
/**
 * @param {Object} _coords lat, lon values from locationo
 */
function gspCallback(_coords) {
    callback_label_coords.text = String.format("longitude: %s\n latitude: %s ", _coords.longitude + "", _coords.latitude + "");
}