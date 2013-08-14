/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * CHDisactualliworksol.js
 *
 * The fake chemical: Disactualliworksol, in Boom!
 *
 * Bathtubic has the following properties:
 * Sensitivity: 	0
 * Stability: 		8
 * Visual Appeal: 	1
 * Performance:		7
 * Strength:		4
 * Velocity:		4
 * 
 */

/**
 * Default Constructor
 */
var CHDisactualliworksol = function(){
	
	// Set the stats for this chemical
	this.stats = {
		sensitivity : 0,
		stability : 8,
		visualAppeal : 1,
		perf : 7,
		strength : 4,
		velocity : 4
	};
	
	this.geometry = new THREE.SphereGeometry( 30, 50, 20, 0, 2 * Math.PI, 0, Math.PI / 2 );
	var disTexture = THREE.ImageUtils.loadTexture( 'images/sugar.jpg' );
	this.material = new THREE.MeshBasicMaterial({
		map : disTexture
	});
	
	
	this.object = new THREE.Mesh(this.geometry, this.material);
	//disactualliworksol.position.set(-200, -190, -150);
	
};

CHDisactualliworksol.prototype.update = function(t){
};

