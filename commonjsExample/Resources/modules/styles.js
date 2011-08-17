/**
 * General app styles in one place
 */
exports = {	
	defaultWindow: {
		backgroundColor: '#ede8df',
		barColor: '#777'
	},

	// List page styles
	list: {
		table: {
			top: 50,
			editable: true
		},
		newUserBtn: {
			width: 200,
			height: 40,
			top: 5,
			title: 'New User'
		}
	},
	// New user form page
	newuser: {
		wrapper: {
			top: 15, 
			right: 15, 
			bottom: 15, 
			left: 15,
			layout: 'vertical'
		},
		username: {
			height: 70,
			width: '95%',
			top: 15,
			hintText: 'Username',
			backgroundColor: '#fff',
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE
		},
		submit: {
			top: 5,
			width: '95%',
			height: 50,
			title: 'Submit'
		}
	}
};