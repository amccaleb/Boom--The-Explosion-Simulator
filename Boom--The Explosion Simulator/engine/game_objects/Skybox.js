/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Skybox.js
 *
 * Represents a skybox for Boom
 *
 * Based on code from Shift Escape
 *
 * Based on examples from:
 * http://stemkoski.github.io/Three.js/Skybox.html
 * http://stackoverflow.com/questions/16310880/comparing-methods-of-creating-skybox-material-in-three-js
 *
 *
 */

var Skybox = function() {
	// Create the box
	this.geometry = new THREE.CubeGeometry(5000, 5000, 5000);

	// Create the skybox with the appropriate texture on each side
	// Textures courtesy of Emil Persson, aka Humus. http://www.humus.name
	var imageURLs = [];
	var imagePrefix = "images/HornstullsStrand/";
	//TODO: Rotate this so the ocean is in the viewport
	var directions = ["posx", "negx", "posy", "negy", "posz", "negz"];
	var imageSuffix = ".jpg";
	for (var i = 0; i < 6; i++)
		imageURLs.push(imagePrefix + directions[i] + imageSuffix);
	var textureCube = THREE.ImageUtils.loadTextureCube(imageURLs);
	var shader = THREE.ShaderLib["cube"];
	shader.uniforms["tCube"].value = textureCube;
	this.material = new THREE.ShaderMaterial({
		fragmentShader : shader.fragmentShader,
		vertexShader : shader.vertexShader,
		uniforms : shader.uniforms,
		depthWrite : false,
		side : THREE.BackSide
	});
	this.object = new THREE.Mesh(this.geometry, this.material);
};