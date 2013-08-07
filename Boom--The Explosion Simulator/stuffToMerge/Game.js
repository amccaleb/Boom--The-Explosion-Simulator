var clock = new THREE.Clock();

var Game = function() {
};
////////////////////////// Initialize Game State //////////////////////////
Game.prototype.init = function() {

	var that = this;
	var perlinText = loadFile('perlin.glsl');
	var vertexShaderText = loadFile('NoiseVertex.shader');
	var fragmentShaderText = loadFile('NoiseFrag.shader');

	var noiseTexture = THREE.ImageUtils.loadTexture('groundpepper.jpg');

	document.body.appendChild(renderer.domElement);

	//this.perlinMaterial = new THREE.ShaderMaterial({
	// 	uniforms: {
	//	  'uTime': { type: 'f', value: 0.0 },
	//	  'tTexture': { type: 't', value: noiseTexture },
	// 	},
	//	vertexShader: perlinText + vertexShaderText,
	//	fragmentShader: perlinText + fragmentShaderText
	//});

	//	this.shape = new THREE.Mesh(
	//	new THREE.SphereGeometry( 100, 92, 16, 0, 2 * Math.PI, 0, Math.PI / 2 ),
	//	this.perlinMaterial);
	//this.shape.position.set(-300, -190, -100);
	//scene.add(this.shape);

	//////////////// Bathtubic //////////////////////////////
	var noiseTexture = new THREE.ImageUtils.loadTexture('cloud.png');
	noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

	var waterTexture = new THREE.ImageUtils.loadTexture('dirtywater.jpg');
	waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
	customUniforms3 = {
		baseTexture : {
			type : "t",
			value : waterTexture
		},
		baseSpeed : {
			type : "f",
			value : 0.1
		},
		noiseTexture : {
			type : "t",
			value : noiseTexture
		},
		noiseScale : {
			type : "f",
			value : 0.4
		},
		alpha : {
			type : "f",
			value : 1.0
		},
		time : {
			type : "f",
			value : 1.0
		}
	};

	var waterMaterial = new THREE.ShaderMaterial({
		uniforms : customUniforms3,
		vertexShader : loadFile('WaterVertex.shader'),
		fragmentShader : loadFile('WaterFrag.shader'),
	});
	waterMaterial.side = THREE.DoubleSide;

	var bathtubic = new THREE.Mesh(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry(50, 100, 100, 20, 4), waterMaterial);
	bathtubic.position.set(0, -140, 0);
	scene.add(bathtubic);

	////// Explodium ///////////////////////////
	this.perlinMaterial = new THREE.ShaderMaterial({
		uniforms : {
			'uTime' : {
				type : 'f',
				value : 0.0
			},
			'uBeatTime' : {
				type : 'f',
				value : 0.0
			}
		},
		vertexShader : perlinText + vertexShaderText,
		fragmentShader : perlinText + fragmentShaderText
	});
	this.explodium = new THREE.Mesh(new THREE.SphereGeometry(20, 20, 20), this.perlinMaterial);
	this.explodium.position.set(300, -140, 0);
	scene.add(this.explodium);

	////// Ceilingdroptum ///////////////////////
	var bVertexShaderText = loadFile('BumpVertex.shader');
	var bFragmentShaderText = loadFile('BumpFrag.shader');
	var bumpTexture = THREE.ImageUtils.loadTexture('normal.png');
	var bumpMaterial = new THREE.ShaderMaterial({
		uniforms : {
			'tBumpTexture' : {
				type : 't',
				value : bumpTexture
			},
		},
		vertexShader : bVertexShaderText,
		fragmentShader : bFragmentShaderText
	});

	var ceilingdroptum = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), bumpMaterial);
	ceilingdroptum.position.set(450, -140, 0);
	scene.add(ceilingdroptum);

	////// Annoyininsectamine /////////////////
	var domeGeometry = new THREE.SphereGeometry(50, 80, 20, 0, 2 * Math.PI, 0, Math.PI / 2);
	var discTexture = THREE.ImageUtils.loadTexture('disc.png');
	var customUniforms = {
		texture : {
			type : "t",
			value : discTexture
		},
	};

	var shaderMaterial = new THREE.ShaderMaterial({
		uniforms : customUniforms,
		vertexShader : loadFile('ParticleVertex.shader'),
		fragmentShader : loadFile('ParticleFrag.shader'),
		transparent : true,
		alphaTest : 0.5,  // if having transparency issues, try including: alphaTest: 0.5,
		// blending: THREE.AdditiveBlending, depthTest: false,
		// I guess you don't need to do a depth test if you are alpha blending?
		//
	});

	var particleDome = new THREE.ParticleSystem(domeGeometry, shaderMaterial);
	particleDome.position.set(-200, -190, 0);
	particleDome.dynamic = true;
	particleDome.sortParticles = true;
	scene.add(particleDome);

	this.renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	this.renderer.setSize(800, 600);
	this.renderer.setClearColor(0xeeeeee, 1.0);
	document.body.appendChild(this.renderer.domElement);

	//var darkMaterial = new THREE.MeshBasicMaterial( { color: 0xffffcc, doubleSided: true } );
	//var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
	//var multiMaterial = [ darkMaterial, wireframeMaterial ];

	//var shape = THREE.SceneUtils.createMultiMaterialObject(
	//	new THREE.SphereGeometry( 100, 92, 16, 0, 2 * Math.PI, 0, Math.PI / 2 ),
	//	multiMaterial );

	// should set material to doubleSided = true so that the
	//   interior view does not appear transparent.
	//shape.position.set(-300, -190, -100);
	//scene.add( shape );

};

///////////////// Render Game View ////////////////////////////
Game.prototype.render = function(t) {
	this.perlinMaterial.uniforms['uTime'].value = t;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
};

////////////////////////// Main Game Loop ////////////////////////////
Game.prototype.start = function() {
	var that = this;
	var time0 = new Date().getTime();
	var loop = function() {
		var time = new Date().getTime();
		that.render((time - time0) * 0.001);
		var delta = clock.getDelta();
		customUniforms3.time.value += delta;
		requestAnimationFrame(loop, renderer.domElement);
		controls.update();
	};
	loop();
};

var game = new Game();
game.init();
game.start();
