/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * EQBeaker.js
 *
 * The chemical equipment: Beaker, in Boom!
 * 
 * Has two parts - top, and bottom.
 */

var EQBeaker = function() {
	
	this.material = new THREE.MeshBasicMaterial( { color: 0xeeeeee, transparent: true, opacity: 0.50 } );
	
	// y value is +70 more than the y value of objectTop
	this.geomBot = new THREE.CylinderGeometry( 140, 140, 10, 20, 4 );
	this.objectBottom = new THREE.Mesh( this.geomBot, this.material );
		
	this.geomInner = new THREE.CylinderGeometry( 136, 136, 1000, 20, 4 );
	this.geomOuter= new THREE.CylinderGeometry( 140, 140, 1000, 20, 4 );
	
	this.objectInner = new THREE.Mesh(this.geomInner);
	this.objectOuter = new THREE.Mesh(this.geomOuter);

	this.bspInner = new ThreeBSP(this.objectInner);
	this.bspOuter = new ThreeBSP(this.objectOuter);
	
	this.bspIntersection = this.bspOuter.subtract(this.bspInner);   
	this.object = this.bspIntersection.toMesh( this.material );
	
};

EQBeaker.prototype.update = function(t){
};