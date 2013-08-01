/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Prototype2 - Thumper
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

	// Create the beat that the game will be played at
	this.beat = new Beat(100.0);

	// Initialize the camera
	this.camera = new THREE.PerspectiveCamera(75, 4.0 / 3.0, 1, 10000);
	this.camera.position.y = -500;
	this.camera.position.z = 500;

	this.scene = new THREE.Scene();

	// Create the grid to represent the dance floor
	this.grid = new Grid(8, this.beat);

	_.each(this.grid.cells, function(element, index) {
		that.scene.add(element.object);
	});

	// Make speakers surrounding the dance floor
	this.speakers = [];
	var positions = [{
		x : 0,
		y : 0
	}, {
		x : 7,
		y : 0
	}, {
		x : 7,
		y : 7
	}, {
		x : 0,
		y : 7
	}];
	for (var posI = 0; posI < positions.length; posI++) {
		var speaker = new Speaker(positions[posI], this.beat);
		that.speakers.push(speaker);
		that.scene.add(speaker.object);
	}

	// Create a dancer
	var dancerPos = {
		x : 3,
		y : 0
	};
	this.dancer = new Dancer(dancerPos);

	// Create a Disco Ball
	this.discoBall = new DiscoBall({
		x : 4,
		y : 3
	});
	this.scene.add(this.discoBall.camera);
	this.scene.add(this.discoBall.object);

	// Create the surrounding walls
	// TODO: Make this code look like not shit
	this.walls = [];
	var backWall = new Wall();
	backWall.object.rotation.x = Math.PI * 0.5;
	backWall.object.position.x = 50;
	backWall.object.position.y = 350;
	backWall.object.position.z = -100;
	this.walls.push(backWall);
	this.scene.add(backWall.object);
	var leftWall = new Wall();
	leftWall.object.rotation.x = Math.PI * 0.5;
	leftWall.object.rotation.y = Math.PI * 0.5;
	leftWall.object.position.x = -350;
	leftWall.object.position.y = -50;
	leftWall.object.position.z = -100;
	this.walls.push(leftWall);
	this.scene.add(leftWall.object);
	var rightWall = new Wall();
	rightWall.object.rotation.x = Math.PI * 0.5;
	rightWall.object.rotation.y = -Math.PI * 0.5;
	rightWall.object.position.x = 450;
	rightWall.object.position.y = -50;
	rightWall.object.position.z = -100;
	this.walls.push(rightWall);
	this.scene.add(rightWall.object);

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

	// Add post-process shaders for Gaussian Blur
	this.composer = new THREE.EffectComposer(this.renderer);
	this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

	var ppVertexShaderText = loadFile('shaders/PPGaussBlurToBeat/PPGaussBlurToBeat.ppvert');
	var ppFragmentShaderText = loadFile('shaders/PPGaussBlurToBeat/PPGaussBlurToBeat.ppfrag');

	this.PPShader = {
		uniforms : {
			'tDiffuse' : {
				type : 't',
				value : null
			},
			'uBeat' : {
				type : 'f',
				value : 0.0
			}
		},
		vertexShader : ppVertexShaderText,
		fragmentShader : ppFragmentShaderText
	};
	this.effect = new THREE.ShaderPass(this.PPShader);
	this.effect.renderToScreen = true;
	this.composer.addPass(this.effect);

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
 * Render game view for time t
 */
Game.prototype.render = function(t) {

	var that = this;

	// Save the elapsed time
	this.elapsedTime = t;

	// Add our dancer to the scene if possible
	if (this.dancer.isLoaded) {
		if (this.dancer.isLive) {
			this.dancer.animate();
		} else// Make it live
		{
			this.scene.add(this.dancer.object);
			this.dancer.isLive = true;
		}
	}

	// Render our dance floor
	this.grid.render(t);

	// Render all our speakers
	_.each(this.speakers, function(element, index) {
		element.render(t);
	});

	// Render our walls
	_.each(this.walls, function(element, index) {
		element.render(t);
	});

	// Pass updated uniform variables to post process shaders
	this.PPShader.uniforms['uBeat'].value = this.beat.toBeat(t);
	this.effect.renderToScreen = false;
	this.effect = new THREE.ShaderPass(this.PPShader);
	this.effect.renderToScreen = true;
	this.composer.insertPass(this.effect, 1);

	// Look at the scene and render
	this.camera.lookAt(this.scene.position);
	//this.renderer.render(this.scene, this.camera);
	this.composer.render();
};

/**
 * Allows the game to respond to user input 
 */
Game.prototype.handleInput = function() {
	// Spacebar
	if (this.keys[32] === true) {
		this.keys[32] = 'triggered';
		
		// Detect whether input is on beat or not
		var time = new Date().getTime();
		//this.beat.onBeat(this.elapsedTime, (time - this.time0) * 0.001);
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
