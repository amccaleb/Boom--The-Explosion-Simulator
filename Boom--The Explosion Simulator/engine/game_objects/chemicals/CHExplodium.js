/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Explodium.js
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

var CHExplodium = function(){
	var perlinText = loadFile('util/perlin.glsl');
	var vertexShaderText = loadFile('shaders/PerlinNoise/PerlinNoise.vert');
	var fragmentShaderText = loadFile('shaders/PerlinNoise/PerlinNoise.frag');
	
	this.geometry = new THREE.SphereGeometry(20, 20, 20);
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

CHExplodium.prototype.render = function(t){
	this.material.uniforms['uTime'].value = t;
};
