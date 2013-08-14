/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Keyboard.js
 *
 * Keyboard object keeps track of keyboard state
 * Inspired by code at:
 * http://learningthreejs.com/data/THREEx/docs/THREEx.KeyboardState.html
 *
 * Based on code provided by Nathan Whitehead at:
 * http://nathansuniversity.com/cmps179/presentations/demo/transition3.html
 *
 */

/**
 * Default Constructor
 */
var Keyboard = function() {
	var that = this;
	this.ALIAS = {
		'left' : 37,
		'up' : 38,
		'right' : 39,
		'down' : 40,
		'space' : 32,
		'enter' : 13,
		'pageup' : 33,
		'pagedown' : 34,
		'tab' : 9,
		'esc' : 27
	};
	this.keys = {};
	this.modifiers = {};
	var onChange = function(event, down) {
		if (that.keys[event.keyCode] === 'triggered' && down === true)
			return;
		that.keys[event.keyCode] = down;
	};
	document.addEventListener('keydown', function(event) {
		onChange(event, true);
	}, false);
	document.addEventListener('keyup', function(event) {
		onChange(event, false);
	}, false);
};

/**
 * See if key is pressed
 * key may be single character, or alias like 'left'
 * singleRepeat is optional argument, if true will only say key
 * was pressed once
 */
Keyboard.prototype.pressed = function(key, singleRepeat) {
	var k = '';
	var pressed = false;
	// See if key is an alias
	if (Object.keys(this.ALIAS).indexOf(key) != -1) {
		k = this.ALIAS[key];
	} else {
		k = key.toUpperCase().charCodeAt(0);
	}
	pressed = this.keys[k];
	if (singleRepeat) {
		if (pressed === true) {
			// Turn off repeat
			this.keys[k] = 'triggered';
			return true;
		}
		if (pressed === 'triggered') {
			return false;
		}
		return false;
	} else {
		if (!pressed)
			return false;
		return true;
	}
}; 