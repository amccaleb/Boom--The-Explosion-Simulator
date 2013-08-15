/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Explosion.js
 *
 * Represents a explosion object for Boom
 *
 * Based on code provided by Nathan Whitehead at:
 * http://www.clicktorelease.com/code/perlin/explosion.html
 *
 */

/**
 * Default Constructor
 */
var Explosion = function(stats) {
	var that = this;
	this.startTime = new Date().getTime();
	this.stats = stats;
	this.geometry = new THREE.IcosahedronGeometry(20, 5);
	this.material = new THREE.ShaderMaterial({

		uniforms : {
			tExplosion : {
				type : "t",
				value : THREE.ImageUtils.loadTexture('images/explosion.png')
			},
			time : {
				type : "f",
				value : 0.0
			},
			weight : {
				type : "f",
				value : 10.0
			},
			sensitivity : {
				type : "f",
				value : that.stats.sensitivity
			},
			stability : {
				type : "f",
				value : that.stats.stability
			},
			visualAppeal : {
				type : "f",
				value : that.stats.visualAppeal
			},
			performance : {
				type : "f",
				value : that.stats.perf
			},
			strength : {
				type : "f",
				value : that.stats.strength
			},
			velocity : {
				type : "f",
				value : that.stats.velocity
			}
		},
		vertexShader : loadFile('shaders/Explosion/Explosion.vert'),
		fragmentShader : loadFile('shaders/Explosion/Explosion.frag')

	});

	this.object = new THREE.Mesh(this.geometry, this.material);
};

Explosion.prototype.update = function(t) {
	var time = new Date().getTime();
	this.material.uniforms['time'].value = .00025 * (time - this.startTime);
}; 