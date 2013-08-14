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

$(function() {	
	var game = new Game();
	game.pushPane(new LabPane());
	game.reset();

}); 