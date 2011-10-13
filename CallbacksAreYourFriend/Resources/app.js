/*
add a monkey-patched "require" function to the global scope (global object).
It is smarter in two ways:
- It only loads a module once
- If the exports object contains a function matching the module base name, return that
  value from "require" - this is a bit of sugar added because Titanium's require implementation
  does not allow you to replace the "exports" object directly
*/
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


