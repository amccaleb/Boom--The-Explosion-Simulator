/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * main.js
 *
 * Main entry point for Boom
 *
 * Based on code provided by Nathan Whitehead at:
 * http://nathansuniversity.com/cmps179/presentations/demo/tex9.html
 *
 */

// Globals for the mouse
var curMousePos = null;

/**
 * Gets the mouse coordinates on a 2D canvas
 * From: http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/ 
 * @param {Object} canvas
 * @param {Object} evt
 */
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x : evt.clientX - rect.left,
		y : evt.clientY - rect.top
	};
}

$(function() {
	var game = new Game();
	game.pushPane(new LabPane());
	game.reset();

});
