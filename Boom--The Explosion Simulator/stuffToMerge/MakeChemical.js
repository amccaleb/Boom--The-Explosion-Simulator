var makeBathtubic - function(x, y, z){
	var noiseTexture = new THREE.ImageUtils.loadTexture('cloud.png');
	noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

	var waterTexture = new THREE.ImageUtils.loadTexture('dirtywater.jpg');
	waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
	customUniforms3 = {
		baseTexture : {
			type : "t",
			value : waterTexture
		},
		baseSpeed : {
			type : "f",
			value : 0.1
		},
		noiseTexture : {
			type : "t",
			value : noiseTexture
		},
		noiseScale : {
			type : "f",
			value : 0.4
		},
		alpha : {
			type : "f",
			value : 1.0
		},
		time : {
			type : "f",
			value : 1.0
		}
	};

	var waterMaterial = new THREE.ShaderMaterial({
		uniforms : customUniforms3,
		vertexShader : loadFile('WaterVertex.shader'),
		fragmentShader : loadFile('WaterFrag.shader'),
	});
	waterMaterial.side = THREE.DoubleSide;

	var bathtubic = new THREE.Mesh(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry(50, 100, 100, 20, 4), waterMaterial);
	bathtubic.position.set(x, y, z);
	scene.add(bathtubic);
	
	
}