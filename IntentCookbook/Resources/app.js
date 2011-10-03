// Move all local 'toExternal' files to external storage, if available
var externalFiles = {};
var isExternalStoragePresent = Ti.Filesystem.isExternalStoragePresent();
var imageCaptureFile = undefined;
if (isExternalStoragePresent) {
	imageCaptureFile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory + '/image_capture.jpg');
	(function() {
		var listing = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'toExternal').getDirectoryListing();
		for (var i in listing) {
			var localFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + '/toExternal', listing[i]);
			var externalFile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, listing[i]);
			externalFile.write(localFile.read());
			externalFiles[listing[i]] = externalFile;
		}
	})();
}

// Create the list of Intent recipes. This is where you'll find the necessary
// configurations to perform common actions with your Android Intents.
var recipes = [
	{
		title: 'View a URL',
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			data: 'http://www.appcelerator.com'
		})
	},
	{
		title: 'View image',
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			type: 'image/jpeg',
			data: externalFiles['titanium.jpg'].nativePath
		})
	},
	{
		title: 'View location',
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			data: 'geo:37.389084,-122.050189?z=14'
		})
	},
	{
		title: 'Query location',
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			data: 'geo:0,0?q=Mountain%20View'
		})
	},
	{
		title: 'View contacts',
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			data: 'content://contacts/people/'
		})
	},
	{
		title: 'Edit contact',
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_EDIT,
			data: 'content://contacts/people/2'
		})
	},
	{
		title: 'Capture and view image',
		external: true,
		intent: (function() {
			var intent = Ti.Android.createIntent({
				action: "android.media.action.IMAGE_CAPTURE"
			});	
			intent.putExtraUri('output', imageCaptureFile.nativePath);
			return intent;
		})(),
		callback: function(e) {
			if (imageCaptureFile.exists) {
				var intent = Ti.Android.createIntent({
					action: Ti.Android.ACTION_VIEW,
					type: 'image/jpeg',
					data: imageCaptureFile.nativePath
				});
				Ti.Android.currentActivity.startActivity(intent);
			} else {
				alert('Unable to save captured image!');
			}
		}
	},
	{
		title: 'View a PDF',
		external: true,
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			type: 'application/pdf',
			data: externalFiles['w4.pdf'].nativePath
		})
	},
	{
		title: 'Send an image',
		external: true,
		intent: (function() {
			var intent = Ti.Android.createIntent({
				action: Ti.Android.ACTION_SEND,
				type: 'image/jpeg'
			});
			intent.putExtraUri(Ti.Android.EXTRA_STREAM, externalFiles['titanium.jpg'].nativePath);
			return intent;
		})()
	},
	{
		title: 'Send some text',
		intent: (function() {
			var intent = Ti.Android.createIntent({
				action: Ti.Android.ACTION_SEND,
				type: 'text/plain'	
			});
			intent.putExtra(Ti.Android.EXTRA_TEXT, 'Here\'s a chunk of text to send to an Intent');
			return intent;
		})()
	},
	{
		title: 'Dial a phone number',
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_DIAL,
			data: 'tel:5555555'
		})
	},
	{
		title: 'Call a phone number',
		intent: Ti.Android.createIntent({
			action: Ti.Android.ACTION_CALL,
			data: 'tel:5555555'
		})
	}
];

var startActivity = function(e) {
	try {
		if (e.row.callback) {
			Ti.Android.currentActivity.startActivityForResult(e.row.intent, e.row.callback);
		} else {
			Ti.Android.currentActivity.startActivity(e.row.intent);
		}
	} catch(e) {
		Ti.API.error(e);
		alert('No apps installed that handle this Intent!');
	}
}

// Create the rows for the Intent TableView
var tableData = [];
(function() {
	for (var i in recipes) {
		var recipe = recipes[i];
		var label = Ti.UI.createLabel({
			text: recipe.title,
			left: '20dp',
			font: {
				fontWeight: 'bold',
				fontSize: '18dp'
			},
			color: '#eee',
			touchEnabled: false
		});
		var row = Ti.UI.createTableViewRow({
			height: '50dp',
			backgroundColor: '#222',
			backgroundSelectedColor: '#ddd',
			intent: recipe.intent,
			callback: recipe.callback
		});
		
		
		row.add(label);
		if (recipe.external && !isExternalStoragePresent) {
			row.enabled = false;	
		}	
		row.addEventListener('click', startActivity);
		
		tableData.push(row);
	}
})();

// Create UI for Intent Cookbook
Ti.UI.setBackgroundColor('#222');

var win = Ti.UI.createWindow({
	exitOnClose: true,
	navBarHidden: true
});
var tableview = Ti.UI.createTableView({
	headerTitle: 'Intents',
	separatorColor: '#aaa',
	data: tableData
});

// Cleanup our external files when the app exits
win.addEventListener('close', function(e) {
	if (isExternalStoragePresent) {
		var dir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory);
		if (dir.exists()) { 
	    	dir.deleteDirectory(true);
	   	}
	}	
});

win.add(tableview);
win.open();

if (!isExternalStoragePresent) {
	alert('No external storage available. Some Intents will be disabled.');	
}
