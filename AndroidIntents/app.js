Ti.UI.backgroundColor = '#000000';

var win = Ti.UI.createWindow();
var label = Ti.UI.createLabel({
	text: 'Say Something!',
	color:'#eeeeee',
	font: {
		fontSize:'20dp',
		fontWeight:'bold'
	},
	height:'auto',
	top:'5dp'
});
var textarea = Ti.UI.createTextArea({
	width:'90%',
	top:'44dp',
	bottom: '70dp',
	left:10,
	right:10
});
var button = Ti.UI.createButton({
	title:'Share',
	height:'auto',
	width:'auto',
	font: {
		fontSize:'24dp'
	},
	bottom:'10dp',
	right:10
});
button.addEventListener('click', function(e) {
	var intent = Ti.Android.createIntent({
		action: Ti.Android.ACTION_SEND,
		type: "text/plain" 
	});

	intent.putExtra(Ti.Android.EXTRA_TEXT, textarea.value);
	intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
	Ti.Android.currentActivity.startActivity(intent);
});

win.add(label);
win.add(textarea);
win.add(button);

win.open();