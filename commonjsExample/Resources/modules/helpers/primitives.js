/**
 * Primitive Type Helper Module
 * @author   Rick Blalock
 * @version  0.1 
 */
exports = {
	array: {
		max: function(_array) {
			return Math.max.apply( Math, _array );	
		},
		min: function(_array) {
			return Math.min.apply( Math, _array );
		},
		remove: function(array, from, to) {
			var rest = array.slice((to || from) + 1 || array.length);
			array.length = from < 0 ? array.length + from : from;
			return array.push.apply(array, rest);
		}
	}
};
