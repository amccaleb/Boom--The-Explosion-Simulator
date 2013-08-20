/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * CHExplodium.js
 *
 * The fake chemical: Explodium, in Boom!
 *
 * Explodium has the following properties:
 * Sensitivity: 	10
 * Stability: 		1
 * Visual Appeal: 	10
 * Performance:		10
 * Strength:		10
 * Velocity:		10
 *
 */

/**
 * Default Constructor
 * @param {Object} mix - true if we want to create this chemical as part of our chemical mixture
 */
var CHExplodium = function(mix) {

	// Set the stats for this chemical
	this.stats = {
		sensitivity : 10,
		stability : 1,
		visualAppeal : 10,
		perf : 10,
		strength : 10,
		velocity : 10
	};

	var perlinText = loadFile('util/perlin.glsl');
	var vertexShaderText = loadFile('shaders/PerlinNoise/PerlinNoise.vert');
	var fragmentShaderText = loadFile('shaders/PerlinNoise/PerlinNoise.frag');

	if (mix) {
		this.geometry = new THREE.CylinderGeometry(136, 136, 50, 20, 4);
	} else {
		this.geometry = new THREE.SphereGeometry(20, 20, 20);
	}
	this.material = new THREE.ShaderMaterial({
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
	this.object = new THREE.Mesh(this.geometry, this.material);
	//this.object.position.set(-500, -140, 0);
};

CHExplodium.prototype.update = function(t) {
	this.material.uniforms['uTime'].value = t;
};
