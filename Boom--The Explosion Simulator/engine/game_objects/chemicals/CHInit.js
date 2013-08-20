/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * CHInit.js
 *
 * The initial chemical mixture in Boom!
 * 
 * The properties of this mixture match whatever the simulation starts as.
 *
 */

var CHInit = function(){
	
	this.geometry = new THREE.CylinderGeometry( 136, 136, 50, 20, 4 );
	this.material = new THREE.ShaderMaterial({
		uniforms : {
			'uTime' : {
				type : 'f',
				value : 0.0
			}
		},
		vertexShader : loadFile('shaders/CurlPattern/CurlPattern.vert'),
		fragmentShader : loadFile('shaders/CurlPattern/CurlPattern.frag')
	});
	this.object = new THREE.Mesh(this.geometry, this.material);
};

CHInit.prototype.update = function(t){
	this.material.uniforms['uTime'].value = t;
};
