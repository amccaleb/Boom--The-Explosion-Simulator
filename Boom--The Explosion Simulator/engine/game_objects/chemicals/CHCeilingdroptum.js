/**
 * Alexander McCaleb & Jonah Nobleza
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Ceilingdroptum.js
 *
 * The fake chemical: Ceilingdroptum, in Boom!
 * 
 * Ceilingdroptum has the following properties:
 * Sensitivity: 	8
 * Stability: 		6
 * Visual Appeal: 	3
 * Performance:		5
 * Strength:		10
 * Velocity:		2
 *
 */

var CHCeilingdroptum = function() {
	this.geometry = new THREE.TetrahedronGeometry(75, 1);
	
	var bVertexShaderText = loadFile('shaders/BumpMap/BumpMap.vert');
  	var bFragmentShaderText = loadFile('shaders/BumpMap/BumpMap.frag');
	var bumpTexture = THREE.ImageUtils.loadTexture('images/ceiling.png');
	
	this.material = new THREE.ShaderMaterial({
    	uniforms: {
    	  'tBumpTexture': { type: 't', value: bumpTexture },
   		 },
  	  vertexShader: bVertexShaderText,
   	  fragmentShader: bFragmentShaderText
  	});
	
	this.object = new THREE.Mesh(this.geometry, this.material);
}

CHCeilingdroptum.prototype.render = function(t){
	
};
