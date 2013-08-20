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
var ExplosionPane = function(stats, game) {
	var that = this;

	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera(75, 4.0 / 3.0, 1, 10000);
	this.camera.position.z = -500;
	this.camera.position.x = 0;
	this.camera.position.y = 200;

	this.scene.add(this.camera);

	// Create the explosion object
	this.explosion = new Explosion(stats);
	this.explosion.object.position.z = -400;
	this.explosion.object.position.y = 160;

	this.scene.add(this.explosion.object);
	
	// Create the Skybox
	this.skybox = new Skybox();
	this.scene.add(this.skybox.object);
	
	// Spotlight
	var spotlight = new THREE.PointLight(0xffffff, 1, 1000);
	spotlight.position.set(0, -100, 300);
	this.scene.add(spotlight);
	// Ambient light
	var ambient_light = new THREE.AmbientLight(0x202020);
	this.scene.add(ambient_light);
	
	// Add the orbital controls to further enjoy the explosion
	this.controls = new THREE.OrbitControls(this.camera, game.renderer.domElement);

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
	this.controls.update();

	// Now perge the keyboard
	/*if (keyboard.pressed('enter', true)) {
	 game.pushPane(new CubePane());
	 }*/
};

/**
 * Handles input to the 2D canvas inside ExplosionPane
 */
ExplosionPane.prototype.handleCanvasInput = function(game) {

	// See if our click hit a canvas element
	if (curMousePos.x >= 20 && curMousePos.x <= 140 
		&& curMousePos.y >= 0 && curMousePos.y <= 100) {
			// We're clicking the reset button
			// Pop all panes and put a new LabPane on
			game.popPane();
			game.popPane();
			game.pushPane(new LabPane());
		}
};

/**
 * Draw overlay for ExplosionPane
 * HUD Elements for the score
 */
ExplosionPane.prototype.overlay = function(ctx) {
	
	// Score bar
	ctx.fillStyle = '#ff0000';
	ctx.fillRect(0, 500, 800, 100);
	ctx.font = '30pt Calibri';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'blue';
	ctx.fillText('Score: ' + this.explosion.score, 400, 550);
	
	// Reset button
	ctx.fillStyle = '#ff0000';
	ctx.fillRect(20, 0, 120, 100);
	ctx.font = '12pt Calibri';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'blue';
	ctx.fillText('Reset', 80, 50);
};
