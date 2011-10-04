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
var categories = [
	{
		title: 'Contacts',
		recipes: [
			{
				title: 'View contacts',
				intent: Ti.Android.createIntent({
					action: Ti.Android.ACTION_VIEW,
					data: 'content://contacts/people/'
				})
			},
			{
				title: 'Pick a contact',
				intent: Ti.Android.createIntent({
					action: Ti.Android.ACTION_PICK,
					type: 'vnd.android.cursor.dir/person'
				}),
				callback: function(e) {
					setTimeout(function() { alert('Contact ID: ' + e.intent.data); }, 100);
				}
			},
			{
				title: 'Edit contact',
				intent: (function() {
					var contacts = Ti.Contacts.getAllPeople();
					var contactId = parseInt(contacts[0].id) + '';
					var contactUrl = 'content://com.android.contacts/raw_contacts/' + contactId;
					var intent = Ti.Android.createIntent({
						action: Ti.Android.ACTION_EDIT,
						data: contactUrl
					});
					return intent;
				})()
			},
			{
				title: 'Add contact',
				intent: (function() {
					var intent = Ti.Android.createIntent({
						action: 'com.android.contacts.action.SHOW_OR_CREATE_CONTACT',
						data: 'mailto:intentcookbook@appcelerator.com'
					});
					
					// more options for extras in Android docs: http://developer.android.com/reference/android/provider/Contacts.Intents.Insert.html
					intent.putExtra('email', 'intentcookbook@appcelerator.com');
					intent.putExtra('email_type', 'Work');
					intent.putExtra('phone', '5555555');
					intent.putExtra('phone_type', 'Work');
					intent.putExtra('name', 'Intent Cookbook');
					intent.putExtra('company', 'Appcelerator');
					return intent;
				})()
			}
		]
	},
	{
		title: 'Images, Video, & Sound',
		recipes: [
			{
				title: 'View image',
				intent: Ti.Android.createIntent({
					action: Ti.Android.ACTION_VIEW,
					type: 'image/jpeg',
					data: externalFiles['titanium.jpg'].nativePath
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
			}
		]	
	},
	{
		title: 'Locations',
		recipes: [
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
			}
		]
	},
	{
		title: 'Misc. Viewing',
		recipes: [
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
				title: 'View a URL',
				intent: Ti.Android.createIntent({
					action: Ti.Android.ACTION_VIEW,
					data: 'http://www.appcelerator.com'
				})
			}
		]
	},
	{
		title: 'Phone',
		recipes: [
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
		]	
	},
	{
		title: 'Text',
		recipes: [
			{
				title: 'Send text',
				intent: (function() {
					var intent = Ti.Android.createIntent({
						action: Ti.Android.ACTION_SEND,
						type: 'text/plain'	
					});
					intent.putExtra(Ti.Android.EXTRA_TEXT, 'Here is a chunk of text to send to an Intent');
					return intent;
				})()
			},
			{
				title: 'View Text',
				intent: Ti.Android.createIntent({
					action: Ti.Android.ACTION_VIEW,
					type: 'text/plain',
					data: 'Here is some text to view'	
				})	
			}
		]	
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

var createIntentLabel = function(text) {
	return Ti.UI.createLabel({
		text: text,
		left: '20dp',
		font: {
			fontWeight: 'bold',
			fontSize: '18dp'
		},
		color: '#eee',
		touchEnabled: false
	});
}

var createIntentRow = function() {
	return 	Ti.UI.createTableViewRow({
		height: '60dp',
		backgroundColor: '#222',
		backgroundSelectedColor: '#ddd'
	});
}

// Create the rows for the main Intent table
var tableData = [];
	(function() {
	for (var i in categories) {
		var category = categories[i];
		var label = createIntentLabel(category.title);
		var row = createIntentRow();
		
		row.recipes = category.recipes;
		row.add(label);
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

// Open category specific window for intent testing
tableview.addEventListener('click', function(e) {
	var newWin = Ti.UI.createWindow({
		navBarHidden: true	
	});
	var tv = Ti.UI.createTableView();
	var data = [];
	
	for (var i in e.row.recipes) {
		var recipe = e.row.recipes[i];
		var label = createIntentLabel(recipe.title);
		var row = createIntentRow();
		
		row.intent = recipe.intent;
		row.callback = recipe.callback;
		row.add(label);
		if (recipe.external && !isExternalStoragePresent) {
			row.enabled = false;	
		}	
		row.addEventListener('click', startActivity);
		
		data.push(row);
	}
	
	tv.setData(data);
	newWin.add(tv);
	newWin.open();
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
