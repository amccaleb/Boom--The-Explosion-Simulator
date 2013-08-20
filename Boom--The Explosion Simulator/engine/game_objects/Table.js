/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Table.js
 *
 * Represents a table for chemicals to sit on for Boom!
 *
 */

/**
 * Default Constructor
 * Constructs the plane for teh table and puts a wood texture on it
 */
var Table = function() {
	//// A Wall is a game object
	var perlinText = loadFile('util/perlin.glsl');

	this.material = new THREE.ShaderMaterial({
		uniforms : {
			'uTime' : {
				type : 'f',
				value : 0.0
			},
		},
		vertexShader : perlinText + loadFile('shaders/ProceduralWood/ProceduralWood.vert'),
		fragmentShader : perlinText + loadFile('shaders/ProceduralWood/ProceduralWood.frag')
	});

	this.type = 'table';
	this.geometry = new THREE.PlaneGeometry(1500, 1000, 100, 100);
	this.object = new THREE.Mesh(this.geometry, this.material);
	//this.object.receiveShadow = true;
	//this.object.castShadow = true;
};
