/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * CHBathtubic.js
 *
 * The fake chemical: Bathtubic, in Boom!
 *
 * Bathtubic has the following properties:
 * Sensitivity: 	4
 * Stability: 		8
 * Visual Appeal: 	6
 * Performance:		9
 * Strength:		7
 * Velocity:		4
 *
 */

/**
 * Default Constructor
 */
var CHBathtubic = function() {

	// Set the stats for this chemical
	this.stats = {
		sensitivity : 4,
		stability : 8,
		visualAppeal : 6,
		perf : 9,
		strength : 7,
		velocity : 4
	};
	
	// Create geometry for this chemical
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	this.geometry = new THREE.CylinderGeometry(50, 100, 100, 20, 4);

	// Load textures for this chemical
	var noiseTexture = new THREE.ImageUtils.loadTexture('images/cloud.png');
	noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

	var waterTexture = new THREE.ImageUtils.loadTexture('images/dirtywater.jpg');
	waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;

	// Initialize the water effect shaders
	var waterUniforms = {
		uBaseTexture : {
			type : "t",
			value : waterTexture
		},
		uBaseSpeed : {
			type : "f",
			value : 0.1
		},
		uNoiseTexture : {
			type : "t",
			value : noiseTexture
		},
		uNoiseScale : {
			type : "f",
			value : 0.4
		},
		uAlpha : {
			type : "f",
			value : 1.0
		},
		uTime : {
			type : "f",
			value : 1.0
		}
	};

	this.material = new THREE.ShaderMaterial({
		uniforms : waterUniforms,
		vertexShader : loadFile('shaders/WaterEffect/WaterEffect.vert'),
		fragmentShader : loadFile('shaders/WaterEffect/WaterEffect.frag')
	});
	this.material.side = THREE.DoubleSide;

	this.object = new THREE.Mesh(this.geometry, this.material);
};

/**
 * Interacts with shaders and provides a general update to bathtubic chemicals to be rendered
 */
CHBathtubic.prototype.update = function(t)
{
	// Pass our uniform variables to the shaders
	this.material.uniforms['uTime'].value = t;
};
