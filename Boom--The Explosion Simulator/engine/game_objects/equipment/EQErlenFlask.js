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
	
	this.geomBot = new THREE.CylinderGeometry( 30, 100, 150, 20, 4 );
	this.geomTop = new THREE.CylinderGeometry( 30, 30, 100, 20, 4 );
	this.geomTop.applyMatrix(new THREE.Matrix4().makeTranslation(0.0, 100.0, 0.0));
	this.objectBot = new THREE.Mesh(this.geomBot);
	this.objectTop = new THREE.Mesh(this.geomTop);

	this.bspTop = new ThreeBSP(this.objectTop);
	this.bspBot = new ThreeBSP(this.objectBot);
	this.bspIntersection = this.bspTop.union(this.bspBot);   
	this.object = this.bspIntersection.toMesh( this.material );
	

};

EQErlenFlask.prototype.update = function(t){
};