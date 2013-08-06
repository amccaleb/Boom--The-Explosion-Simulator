/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * DiscoBall.js
 *
 * Represents a disco ball in Thumper
 *
 * Reflection code courtesy of:
 * http://stemkoski.github.io/Three.js/Reflection.html
 * 
 */


var DiscoBall = function(position) {
	//// A DiscoBall is a game object
	// Default position if unspecified is at square 0, 0
	this.boardPosition = position || {
		x : 0,
		y : 0
	};
	this.boardPosition.z = 250;
	this.type = 'discoball';
	
	this.geometry =  new THREE.SphereGeometry( 50, 32, 16 ); // radius, segmentsWidth, segmentsHeight
	// Geometry should always be around origin
		
	this.camera = new THREE.CubeCamera( 0.1, 5000, 512 );
	this.material = new THREE.MeshBasicMaterial( { envMap: this.camera.renderTarget } );
	this.object = new THREE.Mesh(this.geometry, this.material);
	
	// A mesh is an Object3D, change its position to move
	this.object.position = board_to_world(this.boardPosition);
	
	this.camera.position = this.object.position;
};

