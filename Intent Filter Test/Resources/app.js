Ti.UI.backgroundColor = '#fff';

var win = Ti.UI.createWindow();
var label = Ti.UI.createLabel({
	text:"I'll bet you just clicked on a link to http://www.appcelerator.com",
	color:'#000',
	font: {
		fontSize:32
	},
	width:'80%'
});
win.add(label);

win.open();
