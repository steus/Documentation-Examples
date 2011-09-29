Ti.UI.setBackgroundColor('#222');

var win = Ti.UI.createWindow({
	navBarHidden: true,
	exitOnClose: true
});
var button = Ti.UI.createButton({
	title: 'open pdf',
	height: '60dp',
	width: '120dp',
	top: '140dp'
});

var appFilePath = Ti.Filesystem.resourcesDirectory + 'w4.pdf';
var appFile = Ti.Filesystem.getFile(appFilePath);
var tmpFile = undefined,
    newPath = undefined;

if (Ti.Filesystem.isExternalStoragePresent()) {
	tmpFile = Ti.Filesystem.createTempFile();
	newPath = tmpFile.nativePath + '.pdf';
	tmpFile.move(newPath);
	tmpFile = Ti.Filesystem.getFile(newPath);
	tmpFile.write(appFile.read());
} else {
	Ti.API.error('No external storage present');
}

button.addEventListener('click', function(e) {
	if (tmpFile) {
		var intent = Ti.Android.createIntent({
			action: Ti.Android.ACTION_VIEW,
			type: "application/pdf",
			data: tmpFile.nativePath
		});
		
		try {
			Ti.Android.currentActivity.startActivity(intent);
		} catch(e) {
			Ti.API.debug(e);
			alert('No apps PDF apps installed!');
		}
	}
});

win.addEventListener('close', function(e) {
	tmpFile.deleteFile();
});

win.add(button);
win.open();