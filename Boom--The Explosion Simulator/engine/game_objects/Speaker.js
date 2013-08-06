/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Speaker.js
 *
 * Represents a speaker in Thumper
 *
 * Based on Barrier.js from Shift Escape
 *
 */

var Speaker = function(position, beat) {
	//// A Speaker is a game object
	// Default position if unspecified is at square 0, 0
	this.boardPosition = position || {
		x : 0,
		y : 0
	};
	this.boardPosition.z = 5;
	this.type = 'speaker';
	this.geometry = new THREE.CubeGeometry(100, 100, 200);
	// Geometry should always be around origin

	// Assign the beat that the speakers will pulse at
	this.beat = beat;

	// Load in our pulsing shaders and apply them
	var vertexShaderText = loadFile('shaders/PulseToBPMSize/PulseToBPMSize.vert');
	var fragmentShaderText = loadFile('shaders/PulseToBPMSize/PulseToBPMSize.frag');

	this.material = new THREE.ShaderMaterial({
		uniforms : {
			'uTime' : {
				type : 'f',
				value : 0.0
			},
			'uBeatTime' : {
				type : 'f',
				value : 0.0
			},
			'uBeat' : {
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

/**
 * Interacts with shaders and provides a general update to speakers to be rendered
 */
Speaker.prototype.render = function(t)
{
	// Pass our uniform variables to the shaders
	this.material.uniforms['uTime'].value = t;
	this.material.uniforms['uBeatTime'].value = this.beat.toBeatTime(t);
	this.material.uniforms['uBeat'].value = this.beat.toBeat(t);
	
	// Rotate the speaker
	this.object.rotation.z += 0.007;
};
