/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * GridCell.js
 *
 * Represents a generic cell of a grid that can have several applications
 *
 * Used as the dance floor in Thumper
 *
 * Based on code from Shift Escape
 *
 */

var GridCell = function(position, beat) {
	//// A GridCell is a game object
	// Default position if unspecified is at square 0, 0
	this.boardPosition = position || {
		x : 0,
		y : 0
	};
	this.boardPosition.z = -100;
	this.type = 'gridcell';
	this.isHighlighted = false;
	this.standardColor = 0xE9E9E9;
	// steady grey from colourlovers.com
	this.highlightColor = 0xC9FF0B;
	// mims candy green from colourlovers.com
	this.geometry = new THREE.CubeGeometry(100, 100, 100);
	// Geometry should always be around origin

	// Assign the beat that the grid cell will pulse at
	this.beat = beat;

	// Load in our pulsing shaders and apply them
	var vertexShaderText = loadFile('shaders/PulseToBPMColor/PulseToBPM.vert');
	var fragmentShaderText = loadFile('shaders/PulseToBPMColor/PulseToBPM.frag');

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
		vertexShader : vertexShaderText,
		fragmentShader : fragmentShaderText
	});

	this.object = new THREE.Mesh(this.geometry, this.material);
	// A mesh is an Object3D, change its position to move
	this.object.position = board_to_world(this.boardPosition);
};
