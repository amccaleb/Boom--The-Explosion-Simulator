/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * EQErlenFlask.js
 *
 * The chemical equipment: Erlenmeyer Flask, in Boom!
 * 
 * 
 */

var EQErlenFlask = function(){
	
	this.material = new THREE.MeshBasicMaterial( { color: 0xeeeeee, transparent: true, opacity: 0.50 } );
	
	//this.geomBot = new THREE.CylinderGeometry( 50, 120, 150, 20, 4 );
	//this.geomTop = new THREE.CylinderGeometry( 50, 50, 200, 20, 4 );
	this.geomBot = new THREE.CylinderGeometry( 30, 100, 150, 20, 4 );
	this.geomTop = new THREE.CylinderGeometry( 30, 30, 200, 20, 4 );
	this.objectBot = new THREE.Mesh(this.geomBot);
	this.objectTop = new THREE.Mesh(this.geomTop);

	this.bspTop = new ThreeBSP(this.objectTop);
	this.bspBot = new ThreeBSP(this.objectBot);
	this.bspIntersection = this.bspTop.union(this.bspBot);   
	this.object = this.bspIntersection.toMesh( this.material );
	
	//erlenNewMesh.position.set(0, -120, 0);

};

EQErlenFlask.prototype.update = function(t){
};