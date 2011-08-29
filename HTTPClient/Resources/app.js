Ti.UI.backgroundColor = '#dddddd';

var url = "http://savagelook.com/knucklehead/ff.php?firstname=kazu"
var win = Ti.UI.createWindow();
var table = Ti.UI.createTableView();
var xhr = Ti.Network.createHTTPClient({
	onload: function() {
		alert('success');
	},
	onerror: function() {
		alert('error');
	}
});

xhr.setTimeout(5000);
xhr.open("GET", url);
//loadingView.show();
xhr.send();

win.open();
