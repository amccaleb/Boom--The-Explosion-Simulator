/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * EQGraduatedCylinder.js
 *
 * The chemical equipment: Graduated Cylinder, in Boom!
 * 
 * Has two parts - top, and bottom.
 */


var EQGraduatedCylinder = function(){
	
	this.material = new THREE.MeshBasicMaterial( { color: 0xeeeeee, transparent: true, opacity: 0.50 } );
	this.blackMetalTexture = THREE.ImageUtils.loadTexture( 'images/blackmetal.jpg' );
	this.blackMetalTexture.wrapS = this.blackMetalTexture.wrapT = THREE.RepeatWrapping;
	this.blackMetalMaterial = new THREE.MeshBasicMaterial( { map: this.blackMetalTexture } );
	
	// y value is +125 more than the y value of objectTop
	this.geomBot = new THREE.CylinderGeometry( 57, 57, 8, 10 );
	this.objectBottom = new THREE.Mesh( this.geomBot, this.blackMetalMaterial );
	
	this.geomInner = new THREE.CylinderGeometry( 26, 26, 250, 20, 4 );
	this.geomOuter= new THREE.CylinderGeometry( 32, 32, 250, 20, 4 );
	this.objectInner = new THREE.Mesh(this.geomInner);
	this.objectOuter = new THREE.Mesh(this.geomOuter);

	this.bspInner = new ThreeBSP(this.objectInner);
	this.bspOuter = new ThreeBSP(this.objectOuter);
	this.bspIntersection = this.bspOuter.subtract(this.bspInner);   
	this.object = this.bspIntersection.toMesh( this.material );

};

EQGraduatedCylinder.prototype.update = function(t){
};