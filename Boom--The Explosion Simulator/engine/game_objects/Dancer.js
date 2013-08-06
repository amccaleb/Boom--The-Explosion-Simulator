/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Dancer.js
 *
 * Represents a dancer in Thumper
 *
 * Animation code courtesy of:
 * http://stemkoski.github.io/Three.js/Model-Animation.html
 *
 * Based on Robot.js from Shift Escape
 * 
 */

var Dancer = function(position) {
	var that = this;
	//// A Dancer is a game object
	// Default position if unspecified is at square 0, 0
	this.boardPosition = position || {
		x : 0,
		y : 0
	};
	this.boardPosition.z = 0;
	this.type = 'dancer';
	this.object = null;

	// Initialize animation properties
	// the following code is from http://catchvar.com/threejs-animating-blender-models
	// starting frame of animation
	this.animOffset = 0;
	this.walking = false;
	// milliseconds to complete animation
	this.duration = 1000;
	// total number of animation frames
	this.keyframes = 20;
	// milliseconds per frame
	this.interpolation = this.duration / this.keyframes;
	// previous keyframe
	this.lastKeyframe = 0;
	this.currentKeyframe = 0;

	// State booleans to maintain the status of this dancer
	this.isLoaded = false;
	// true when the callback following the JSONLoader completes
	this.isLive = false;
	// true when the dancer is part of the active scene

	// Load up the animation for our dancer
	//TODO: Put Zombie model back in
	var jsonLoader = new THREE.JSONLoader();
	jsonLoader.load("models/android/android-animated.js", function(geometry, materials) {
		// for preparing animation
		for (var i = 0; i < materials.length; i++)
			materials[i].morphTargets = true;
		var material = new THREE.MeshFaceMaterial(materials);
		that.object = new THREE.Mesh(geometry, material);
		that.object.scale.set(10, 10, 10);
		that.object.rotation.set(Math.PI / 2, Math.PI, 0);
		// A mesh is an Object3D, change its position to move
		that.object.position = board_to_world(that.boardPosition);
		that.isLoaded = true;
	});
};

/**
 * Makes the dancer dance
 */
Dancer.prototype.animate = function() {
	// Alternate morph targets
	var time = new Date().getTime() % this.duration;
	this.keyframe = Math.floor(time / this.interpolation) + this.animOffset;
	if (this.keyframe != this.currentKeyframe) {
		this.object.morphTargetInfluences[this.lastKeyframe] = 0;
		this.object.morphTargetInfluences[this.currentKeyframe] = 1;
		this.object.morphTargetInfluences[this.keyframe] = 0;
		this.lastKeyframe = this.currentKeyframe;
		this.currentKeyframe = this.keyframe;
	}
	this.object.morphTargetInfluences[this.keyframe] = (time % this.interpolation ) / this.interpolation;
	this.object.morphTargetInfluences[this.lastKeyframe] = 1 - this.object.morphTargetInfluences[this.keyframe];
};
