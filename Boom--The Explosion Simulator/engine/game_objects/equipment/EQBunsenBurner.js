/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * EQBunsenBurner.js
 *
 * The chemical equipment: Bunsen Burner, in Boom!
 * 
 * Has two parts - top, and bottom.
 */

var EQBunsenBurner = function(){

	this.blackMetalTexture = THREE.ImageUtils.loadTexture( 'images/blackmetal.jpg' );
	this.blackMetalTexture.wrapS = this.blackMetalTexture.wrapT = THREE.RepeatWrapping;
	this.blackMetalMaterial = new THREE.MeshBasicMaterial( { map: this.blackMetalTexture } );
	// y value is +85 more than the y value of objectTop
	this.geomBot = new THREE.CylinderGeometry( 10, 30, 20, 20, 4 );
	this.objectBottom = new THREE.Mesh( this.geomBot, this.blackMetalMaterial );
	
	this.metalTexture = THREE.ImageUtils.loadTexture('images/metal.jpg')
	this.metalMaterial = new THREE.MeshBasicMaterial({map: this.metalTexture});
	this.geometry = new THREE.CylinderGeometry(10, 10, 150, 20, 4);
	this.object = new THREE.Mesh(this.geometry, this.metalMaterial);

	//bunsenBaseMesh.position.set(-300, -175, 200);
	//bunsenPipeMesh.position.set(-300, -90, 200);
}

EQBunsenBurner.prototype.update = function(t){
};