require('lib/require').monkeypatch(this);

//add a single variable to the global scope to which we may choose to
//intentionally add items to
var win, globals = {}, //
ui = require('lib/ui');

// create window
win = new ui.AppWindow({
    title : 'Home',
    backgroundColor : 'white',
    layout : 'vertical'
});

// open window
win.open();


