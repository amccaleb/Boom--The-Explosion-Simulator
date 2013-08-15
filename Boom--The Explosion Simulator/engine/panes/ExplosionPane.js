/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * ExplosionPane.js
 *
 * A Pane object represents a playable view in the game
 *
 * This pane displays the resultant explosion from your mixture
 *
 * Required methods:
 *   update(t, [render])
 *   handleInput(keyboard, [game])
 *   overlay(canvas)
 * Required attributes:
 *   scene
 *   camera
 *
 * Based on code provided by Nathan Whitehead at:
 * http://nathansuniversity.com/cmps179/presentations/demo/transition3.html
 * http://www.clicktorelease.com/code/perlin/explosion.html
 *
 */

/**
 * Default Constructor
 * Sets up all required attributes
 * Takes in the simulation stats to apply to this explosion
 */
var ExplosionPane = function(stats) {
	var that = this;
	//this.stats = stats;

	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
	this.camera.position.z = 100;
	this.camera.target = new THREE.Vector3(0, 0, 0);

	this.scene.add(this.camera);

	// Create the explosion object
	this.explosion = new Explosion(stats);

	this.scene.add(this.explosion.object);

};

/**
 * Update the game state
 */
ExplosionPane.prototype.update = function(t, renderer) {

	this.explosion.update();
	this.camera.lookAt(this.scene.position);

};

/**
 * Handle input inside ExplosionPane
 * keyboard has method 'pressed'
 */
ExplosionPane.prototype.handleInput = function(keyboard, game) {

	// First update the orbit controls
	//this.orbitControls.update();

	// Now perge the keyboard
	/*if (keyboard.pressed('enter', true)) {
	 game.pushPane(new CubePane());
	 }*/
};

/**
 * Draw overlay for ExplosionPane
 * HUD Elements for the score
 */
ExplosionPane.prototype.overlay = function(ctx) {
	ctx.fillStyle = '#ff0000';
	ctx.fillRect(0, 500, 800, 100);

	ctx.font = '30pt Calibri';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'blue';
	ctx.fillText('Score: ' + this.explosion.score, 400, 550);
};
