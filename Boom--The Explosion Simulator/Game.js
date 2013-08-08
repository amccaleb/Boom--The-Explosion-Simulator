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
 *
 */

/**
 * Constructs a new game
 */
var Game = function() {
	
	// Create the clock the game will run on
	this.clock = new THREE.Clock();
	
	// Set up the renderer as we should only do this on creation
	this.renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	this.renderer.setSize(800, 600);
	this.renderer.shadowMapEnabled = true;
	this.renderer.setClearColor(0xeeeeee, 1.0);
	this.renderer.shadowMapSoft = true;
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
	this.camera.position.z = -500;
	this.camera.position.x = 0;
	this.camera.position.y = 200;

	// Ability to rotate/look around with mouse.
	this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

	this.scene = new THREE.Scene();

	// Create the table for chemicals to sit on
	this.table = new Table();
	this.table.object.rotation.x = 300;
	this.table.object.translateZ(-190);
	this.scene.add(this.table.object);

	// Create all our chemicals
	this.initChemicals();

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

	this.initGUI();

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
Game.prototype.initSim = function() {
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
		that.sim.factors.push(new SDFactor(element, (Math.random())));
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

	// Lastly, attach all levels to factors to form a solid feedback loop
	// Room Temperature
	var curFactor = this.sim.factors[sdfRoomTemp];
	curFactor.attachLevel(this.sim.levels[sdlSensitivity], (Math.random() * 0.25));
	curFactor.attachLevel(this.sim.levels[sdlStability], (Math.random() * 0.25));

	// Fluid Friction
	curFactor = this.sim.factors[sdfFluidFric];
	curFactor.attachLevel(this.sim.levels[sdlSensitivity], (Math.random() * 0.25));

	// Lubrication Friction
	curFactor = this.sim.factors[sdfLubeFric];
	curFactor.attachLevel(this.sim.levels[sdlSensitivity], (Math.random() * 0.25));

	// Storage Location
	curFactor = this.sim.factors[sdfStorageLoc];
	curFactor.attachLevel(this.sim.levels[sdlStability], (Math.random() * 0.25));

	// Weather
	curFactor = this.sim.factors[sdfWeather];
	curFactor.attachLevel(this.sim.levels[sdlStability], (Math.random() * 0.25));

	// Conversation Rate
	curFactor = this.sim.factors[sdfConvRate];
	curFactor.attachLevel(this.sim.levels[sdlStability], (Math.random() * 0.25));
	curFactor.attachLevel(this.sim.levels[sdlVisualAppeal], (Math.random() * 0.25));
	curFactor.attachLevel(this.sim.levels[sdlVelocity], (Math.random() * 0.25));

	// Number of Chemicals
	curFactor = this.sim.factors[sdfNumChemicals];
	curFactor.attachLevel(this.sim.levels[sdlStability], (Math.random() * 0.25));
	curFactor.attachLevel(this.sim.levels[sdlVisualAppeal], (Math.random() * 0.25));

	// Gravity
	curFactor = this.sim.factors[sdfGravity];
	curFactor.attachLevel(this.sim.levels[sdlStrength], (Math.random() * 0.25));
	curFactor.attachLevel(this.sim.levels[sdlVelocity], (Math.random() * 0.25));

	// Pouring Force
	curFactor = this.sim.factors[sdfPouringForce];
	curFactor.attachLevel(this.sim.levels[sdlSensitivity], (Math.random() * 0.25));
	curFactor.attachLevel(this.sim.levels[sdlStrength], (Math.random() * 0.25));
	curFactor.attachLevel(this.sim.levels[sdlVelocity], (Math.random() * 0.25));

	// Beaker Size
	curFactor = this.sim.factors[sdfBeakerSize];
	curFactor.attachLevel(this.sim.levels[sdlVisualAppeal], (Math.random() * 0.25));
	curFactor.attachLevel(this.sim.levels[sdlVelocity], (Math.random() * 0.25));
};

/**
 * Initializes all the chemicals in the game
 */
Game.prototype.initChemicals = function() {
	var that = this;
	// Create the list of chemicals and begin pushing each chemical
	this.chemicals = [];
	
	// Bathtubic
	var bathtubic = new CHBathtubic();
	bathtubic.object.position.set(0, -140, 0);
	this.chemicals.push(bathtubic);
	
	// Ceilingdroptum
	var ceilingdroptum = new CHCeilingdroptum();
	ceilingdroptum.object.position.set(200, -140, 0);
	this.chemicals.push(ceilingdroptum);
	
	// Annoyinsectamine
	var annoyinsectamine = new CHAnnoyinsectamine();
	annoyinsectamine.object.position.set(-200, -184, 0);
	this.chemicals.push(annoyinsectamine);
	
	// Disactualliworksol
	var disactualliworksol = new CHDisactualliworksol();
	disactualliworksol.object.position.set(-325, -190, 0);
	this.chemicals.push(disactualliworksol);
	
	// Explodium
	var explodium = new CHExplodium();
	explodium.object.position.set(500, -140, 0);
	this.chemicals.push(explodium);
	
	// Add each chemical to our scene
	_.each(this.chemicals, function(element, index) {
		that.scene.add(element.object);
	});
};

/**
 * Initializes the GUI for the game
 * GUI code based on tutorials at: http://workshop.chromeexperiments.com/examples/gui/
 */
Game.prototype.initGUI = function() {
	var that = this;

	// Setup GUI
	this.gui = new dat.GUI();

	this.guiParameters = {
		sensitivity : that.sim.levels[sdlSensitivity].value,
		stability : that.sim.levels[sdlStability].value,
		visualAppeal : that.sim.levels[sdlVisualAppeal].value,
		perf : that.sim.levels[sdlPerf].value,
		strength : that.sim.levels[sdlStrength].value,
		velocity : that.sim.levels[sdlVelocity].value
	};

	var lSensitivity = this.gui.add(this.guiParameters, 'sensitivity').min(0).max(10).step(0.01).name('Sensitivity').listen();
	lSensitivity.onChange(function(value) {
		that.sim.levels[sdlSensitivity].value = value;
	});

	var lStability = this.gui.add(this.guiParameters, 'stability').min(0).max(10).step(0.01).name('Stability').listen();
	lStability.onChange(function(value) {
		that.sim.levels[sdlStability].value = value;
	});

	var lVisualAppeal = this.gui.add(this.guiParameters, 'visualAppeal').min(0).max(10).step(0.01).name('Visual Appeal').listen();
	lVisualAppeal.onChange(function(value) {
		that.sim.levels[sdlVisualAppeal].value = value;
	});

	var lPerf = this.gui.add(this.guiParameters, 'perf').min(0).max(10).step(0.01).name('Performance').listen();
	lPerf.onChange(function(value) {
		that.sim.levels[sdlPerf].value = value;
	});

	var lStrength = this.gui.add(this.guiParameters, 'strength').min(0).max(10).step(0.01).name('Strength').listen();
	lStrength.onChange(function(value) {
		that.sim.levels[sdlStrength].value = value;
	});

	var lVelocity = this.gui.add(this.guiParameters, 'velocity').min(0).max(10).step(0.01).name('Velocity').listen();
	lVelocity.onChange(function(value) {
		that.sim.levels[sdlVelocity].value = value;
	});

	this.gui.open();
};

/**
 * Update the game state as well as the GUI's display
 */
Game.prototype.update = function() {
	this.sim.update();

	// Update the GUI with the new results from the simulation update
	this.guiParameters.sensitivity = this.sim.levels[sdlSensitivity].value;
	this.guiParameters.stability = this.sim.levels[sdlStability].value;
	this.guiParameters.visualAppeal = this.sim.levels[sdlVisualAppeal].value;
	this.guiParameters.perf = this.sim.levels[sdlPerf].value;
	this.guiParameters.strength = this.sim.levels[sdlStrength].value;
	this.guiParameters.velocity = this.sim.levels[sdlVelocity].value;

	// Perform the manual update
	// Iterate over all controllers
	for (var i in this.gui.__controllers) {
		this.gui.__controllers[i].updateDisplay();
	}
};

/**
 * Render game view for time t
 * Anything that isn't explicitly rendered here, is implicitly rendered by THREE.js
 */
Game.prototype.render = function(t) {

	var that = this;

	// Render all our chemicals
	var curTime = new Date().getTime();
	_.each(this.chemicals, function(element, index) {
		element.render((curTime - that.startTime) * 0.001);
	});

	// Look at the scene and render
	this.camera.lookAt(this.scene.position);
	this.renderer.render(this.scene, this.camera);
};

/**
 * Allows the game to respond to user input
 */
Game.prototype.handleInput = function() {
	// First update the orbit controls
	this.orbitControls.update();

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
	this.startTime = new Date().getTime();
	this.lastUpdateTime = new Date().getTime();
	// milliseconds since 1970
	var loop = function() {
		var time = new Date().getTime();
		// Respond to user input
		that.handleInput();
		// Update the game state every second
		if ((time - that.lastUpdateTime) > 1000) {
			that.update();
			that.lastUpdateTime = time;
		}
		// Render our scene
		that.render(that.clock.getDelta());
		requestAnimationFrame(loop, that.renderer.domElement);
	};
	loop();
};
