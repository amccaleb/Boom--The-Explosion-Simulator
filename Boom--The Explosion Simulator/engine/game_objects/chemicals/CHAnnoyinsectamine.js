/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Annoyinginsectamine.js
 *
 * The fake chemical: Annoyinsectamine, in Boom!
 *
 * Annoyinginsectamine has the following properties:
 * Sensitivity: 	0
 * Stability: 		10
 * Visual Appeal: 	6
 * Performance:		1
 * Strength:		5
 * Velocity:		5
 *
 */

/**
 * Default Constructor
 * @param {Object} mix - true if we want to create this chemical as part of our chemical mixture
 */
var CHAnnoyinsectamine = function(mix) {

	// Set the stats for this chemical
	this.stats = {
		sensitivity : 0,
		stability : 10,
		visualAppeal : 6,
		perf : 1,
		strength : 5,
		velocity : 5
	};
	if (mix) {
		this.geometry = new THREE.CylinderGeometry(136, 136, 50, 20, 4);
	} else {
		this.geometry = new THREE.SphereGeometry(40, 35, 10, 0, 2 * Math.PI, 0, Math.PI / 2);
	}
	var insectTexture = THREE.ImageUtils.loadTexture('images/maggot.png');
	var insectUniforms = {
		texture : {
			type : "t",
			value : insectTexture
		},
	};

	this.material = new THREE.ShaderMaterial({
		uniforms : insectUniforms,
		vertexShader : loadFile('shaders/ParticleEffect/ParticleEffect.vert'),
		fragmentShader : loadFile('shaders/ParticleEffect/ParticleEffect.frag'),
		transparent : true,
		alphaTest : 0.5,
	});

	this.object = new THREE.ParticleSystem(this.geometry, this.material);
	this.object.dynamic = true;
	this.object.sortParticles = true;
	//particleDome.position.set(-200, -184, 0);
};

CHAnnoyinsectamine.prototype.update = function(t) {
}; 