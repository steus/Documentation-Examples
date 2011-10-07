//
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = .25;
Ti.Geolocation.purpose = "Callbacks Are Your Friend";

exports.currentLocation = function(_callback) {
    Titanium.Geolocation.getCurrentPosition(function(e) {

        if(e.error) {
            alert('error ' + JSON.stringify(e.error));

            // to keep it simple, just returning null, could be
            // error information
            if(_callback) {
                _callback(null);
            }
            return;
        }

        Ti.App.fireEvent('location.updated', e.coords);

        if(_callback) {
            _callback(e.coords);
        }
    });
};
