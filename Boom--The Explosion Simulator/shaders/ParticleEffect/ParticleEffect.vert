varying vec3 vColor;
void main() 
{
	vColor = vec3(1.0, 1.0, 1.0); // set RGB color associated to vertex; use later in fragment shader.
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	// option (1): draw particles at constant size on screen
	// gl_PointSize = size;
    // option (2): scale particles as objects in 3D space
	gl_PointSize = 20.0 * ( 300.0 / length( mvPosition.xyz ) );
	gl_Position = projectionMatrix * mvPosition;
}