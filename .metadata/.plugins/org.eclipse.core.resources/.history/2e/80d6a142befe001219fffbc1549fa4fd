/**
 * Alexander McCaleb
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
 *
 */

/**
 * Constructs a new game
 */
var Game = function() {
	// Set up the renderer as we should only do this on creation
	this.renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	this.renderer.setSize(800, 600);
	this.renderer.setClearColor(0xeeeeee, 1.0);
	document.body.appendChild(this.renderer.domElement);
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

	this.initSim();

	// Initialize the camera
	this.camera = new THREE.PerspectiveCamera(75, 4.0 / 3.0, 1, 10000);
	this.camera.position.y = -500;
	this.camera.position.z = 500;

	this.scene = new THREE.Scene();

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

	// Setup keyboard events
	this.keys = {};
	$('body').keydown(function(e) {
		if (e.which) {
			if (that.keys[e.which] !== 'triggered') {
				that.keys[e.which] = true;
			}
		}
	});
	$('body').keyup(function(e) {
		if (e.which) {
			that.keys[e.which] = false;
		}
	});

};

/**
 * Initializes the simulation for the game 
 */
Game.prototype.initSim = function()
{
	var that = this;
	
	// Initialize the system dynamics model
	this.sim = new SDModel("Explosion Simulation");

	// Create each component of the simulation
	_.each(sdlevelNames, function(element, index) {
		that.sim.levels.push(new SDLevel(element));
	});

	_.each(sdvalveNames, function(element, index) {
		that.sim.valves.push(new SDValve(element));
	});

	// Each factor has a random influence.
	// This is to loosely mimic the quantum nature of the chemicals
	// TODO: Actually balance this to something more consistent
	_.each(sdfactorNames, function(element, index) {
		that.sim.factors.push(new SDFactor(element, (Math.random() * 11)));
	});

	// Attach all valves to levels.
	// TODO: Make this more modular so everything can be addressed by string... not hard-coded enums
	// Start with valves shared by all levels
	_.each(this.sim.levels, function(element, index) {
		element.valves.push(that.sim.valves[sdvChemCom]);
	});

	// Now do the individual cases
	// Sensitivity
	var curLevel = this.sim.levels[sdlSensitivity];
	curLevel.valves.push(this.sim.valves[sdvImpact], this.sim.valves[sdvFriction], this.sim.valves[sdvHeat]);

	// Stability
	curLevel = this.sim.levels[sdlStability];
	curLevel.valves.push(this.sim.valves[sdvStorageTemp], this.sim.valves[sdvSunlight], this.sim.valves[sdvDischarge]);

	// Visual Appeal
	curLevel = this.sim.levels[sdlVisualAppeal];
	curLevel.valves.push(this.sim.valves[sdvImpact], this.sim.valves[sdvColorVariety], this.sim.valves[sdvSize]);
	
	// Perf
	curLevel = this.sim.levels[sdlPerf];
	curLevel.valves.push(this.sim.valves[sdvHeat], this.sim.valves[sdvSize]);

	// Strength
	curLevel = this.sim.levels[sdlStrength];
	curLevel.valves.push(this.sim.valves[sdvHeat], this.sim.valves[sdvPressure], this.sim.valves[sdvAcceleration]);
	
	// Velocity
	curLevel = this.sim.levels[sdlVelocity];
	curLevel.valves.push(this.sim.valves[sdvDischarge], this.sim.valves[sdvPressure], this.sim.valves[sdvAcceleration]);
	
	// Now attach all factors to valves with the desired polarity
	// Impact
	var curValve = this.sim.valves[sdvImpact];
	curValve.attachFactor(this.sim.factors[sdfRoomTemp], -1);
	curValve.attachFactor(this.sim.factors[sdfPouringForce], 1);
	
	// Friction
	curValve = this.sim.valves[sdvFriction];
	curValve.attachFactor(this.sim.factors[sdfFluidFric], 1);
	curValve.attachFactor(this.sim.factors[sdfLubeFric], -1);
	
	// Heat
	curValve = this.sim.valves[sdvHeat];
	curValve.attachFactor(this.sim.factors[sdfRoomTemp], 1);
	curValve.attachFactor(this.sim.factors[sdfNumChemicals], -1);
	
	// Chemical Composition
	curValve = this.sim.valves[sdvChemCom];
	curValve.attachFactor(this.sim.factors[sdfNumChemicals], 1);
	curValve.attachFactor(this.sim.factors[sdfConvRate], -1);
	
	// Storage Temperature
	curValve = this.sim.valves[sdvStorageTemp];
	curValve.attachFactor(this.sim.factors[sdfRoomTemp], 1);
	curValve.attachFactor(this.sim.factors[sdfStorageLoc], 1);
	
	// Exposure To Sunlight
	curValve = this.sim.valves[sdvSunlight];
	curValve.attachFactor(this.sim.factors[sdfWeather], 1);
	curValve.attachFactor(this.sim.factors[sdfStorageLoc], -1);
	
	// Electric Discharge
	curValve = this.sim.valves[sdvDischarge];
	curValve.attachFactor(this.sim.factors[sdfWeather], 1);
	curValve.attachFactor(this.sim.factors[sdfConvRate], -1);
	
	// Color Variety
	curValve = this.sim.valves[sdvColorVariety];
	curValve.attachFactor(this.sim.factors[sdfNumChemicals], 1);
	
	// Size
	curValve = this.sim.valves[sdvSize];
	curValve.attachFactor(this.sim.factors[sdfNumChemicals], 1);
	curValve.attachFactor(this.sim.factors[sdfConvRate], -1);
	curValve.attachFactor(this.sim.factors[sdfBeakerSize], 1);
	
	// Acceleration
	curValve = this.sim.valves[sdvAcceleration];
	curValve.attachFactor(this.sim.factors[sdfGravity], 1);
	curValve.attachFactor(this.sim.factors[sdfPouringForce], -1);
	
	// Pressure
	curValve = this.sim.valves[sdvPressure];
	curValve.attachFactor(this.sim.factors[sdfPouringForce], 1);
	curValve.attachFactor(this.sim.factors[sdfBeakerSize], -1);
};

/**
 * Render game view for time t
 */
Game.prototype.render = function(t) {

	var that = this;

	// Look at the scene and render
	this.camera.lookAt(this.scene.position);
	this.renderer.render(this.scene, this.camera);
};

/**
 * Allows the game to respond to user input
 */
Game.prototype.handleInput = function() {
	// Spacebar
	if (this.keys[32] === true) {
		this.keys[32] = 'triggered';

	}
};

/**
 * Start main game loop
 */
Game.prototype.start = function() {
	var that = this;
	this.time0 = new Date().getTime();
	// milliseconds since 1970
	var loop = function() {
		var time = new Date().getTime();
		that.render((time - this.time0) * 0.001);
		// Respond to user input
		that.handleInput();
		requestAnimationFrame(loop, that.renderer.domElement);
	};
	loop();
};
