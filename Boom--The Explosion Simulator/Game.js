/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Game.js
 *
 * Game object
 * The highest level object representing entire game
 *
 * Based on code provided by Nathan Whitehead at:
 * http://nathansuniversity.com/cmps179/presentations/demo/tex9.html
 * http://nathansuniversity.com/cmps179/presentations/demo/transition3.html
 *
 */

/**
 * Constructs a new game
 */
var Game = function() {

	// Initialize game state

	// Create the clock the game will run on
	this.clock = new THREE.Clock();

	// Container div
	this.container = document.getElementById('gameArea');
	this.container.style.position = 'relative';

	// Set up the renderer as we should only do this on creation
	this.renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	this.renderer.setSize(800, 600);
	this.renderer.shadowMapEnabled = true;
	this.renderer.setClearColor(0xeeeeee, 1.0);
	this.renderer.shadowMapSoft = true;
	document.body.appendChild(this.renderer.domElement);

	// Visible canvas area on top of 3D rendering area
	this.canvas = document.createElement('canvas');
	this.canvas.style.position = 'absolute';
	this.canvas.style.top = 0;
	this.canvas.style.left = 0;
	this.canvas.width = 800;
	this.canvas.height = 600;
	this.container.appendChild(this.canvas);
	this.ctx = this.canvas.getContext('2d');

	// Start with blank stack of panes
	this.panes = [];

	// Setup input handlers
	this.keyboard = new Keyboard();
};

/**
 * Reset the game state
 */
Game.prototype.reset = function() {
	this.init();
	this.start();
}
/**
 * Initialize game state
 */
Game.prototype.init = function() {
	var that = this;

};

/**
 * Add pane to Game object
 * Any existing panes are push down on stack
 */
Game.prototype.pushPane = function(pane) {
  this.panes.push(pane);
};

/**
 * Pop off top pane
 * Reveals lower panes on stack
 */
Game.prototype.popPane = function() {
  this.panes.pop();
};

/**
 * Update the game state
 */
Game.prototype.update = function() {
	
};

/**
 * Render game view for time t
 */
Game.prototype.render = function(t) {
  // If there is no active pane do nothing
  if(this.panes.length > 0) {
    var pane = this.panes[this.panes.length - 1];
    // Handle player input
    pane.handleInput(this.keyboard, this);
    // Update pane
    // Pass renderer so it can do cubemaps for reflections
    pane.update(t, this.renderer);
    // Pass canvas so it can decide on its own overlay
    // Render the pane
    this.renderer.render(pane.scene, pane.camera);
    // Clear pane overlay
    // Touching width of a canvas always clears it
    this.canvas.width = this.canvas.width;
    // Render pane overlay
    pane.overlay(this.ctx);
  }
};

/**
 * Start main game loop
 */
Game.prototype.start = function() {
	var that = this;
	var loop = function() {
		// Render our scene
		that.render(that.clock.getDelta());
		requestAnimationFrame(loop, that.renderer.domElement);
	};
	loop();
};
