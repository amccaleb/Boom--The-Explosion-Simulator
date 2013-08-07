/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Wall.js
 *
 * Represents a wall for Boom!
 *
 */

var Wall = function() {
	//// A Wall is a game object
	this.type = 'wall';
	this.geometry = new THREE.PlaneGeometry(800, 1200);
	// Geometry should always be around origin

	// Load in our disco shaders and apply them
	var vertexShaderText = loadFile('shaders/DiscoEffect/DiscoEffect.vert');
	var fragmentShaderText = loadFile('shaders/DiscoEffect/DiscoEffect.frag');

	this.material = new THREE.ShaderMaterial({
		uniforms : {
			'uTime': {type: 'f', value: 0.0},
      		'uColor': {type: 'c', value: 0xffffff}
		},
		vertexShader : vertexShaderText,
		fragmentShader : fragmentShaderText
	});

	this.object = new THREE.Mesh(this.geometry, this.material);
	
};

/**
 * Interacts with shaders and provides a general update to walls to be rendered
 */
Wall.prototype.render = function(t)
{
	// Pass our uniform variables to the shaders
	this.material.uniforms['uTime'].value = t;
};