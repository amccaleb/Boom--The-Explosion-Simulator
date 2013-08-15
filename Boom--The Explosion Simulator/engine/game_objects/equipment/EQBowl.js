/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * EQBowl.js
 *
 * The chemical equipment: Bowl, in Boom!
 * 
 * Has top and bottom.
 */

var EQBowl = function(){

	this.material = new THREE.MeshBasicMaterial( { color: 0x999999 } );
	
	// y for bottom is +10 than top (I think?)
	this.geomBot = new THREE.CylinderGeometry( 27, 27, 5, 20, 4 );
	this.objectBottom = new THREE.Mesh( this.geomBot, this.material );
	
	this.geomInner = new THREE.CylinderGeometry( 40, 27, 30, 20, 4 );
	this.geomOuter= new THREE.CylinderGeometry( 50, 27, 30, 20, 4 );
	this.objectInner = new THREE.Mesh(this.geomInner);
	this.objectOuter = new THREE.Mesh(this.geomOuter);

	this.bspInner = new ThreeBSP(this.objectInner);
	this.bspOuter = new ThreeBSP(this.objectOuter);
	this.bspIntersection = this.bspOuter.subtract(this.bspInner);   
	this.object = this.bspIntersection.toMesh( this.material );
}

EQBowl.prototype.update = function(t){
};