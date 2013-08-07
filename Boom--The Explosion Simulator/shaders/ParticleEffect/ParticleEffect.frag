uniform sampler2D texture;
varying vec3 vColor; // colors associated to vertices; assigned by vertex shader
void main() 
{
	// calculates a color for the particle
	gl_FragColor = vec4( vColor, 1.0 );
	// sets a white particle texture to desired color
	gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
}