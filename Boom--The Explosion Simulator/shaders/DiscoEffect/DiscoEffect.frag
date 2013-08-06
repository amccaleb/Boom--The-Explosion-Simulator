// Alexander McCaleb
// CMPS 179 - Summer 2013
// Boom -- The Explosion Simulator
// 
// DiscoEffect.frag
// 
// A Fragment Shader that creates a disco ball effect on a mesh
//
// Based on code provided by Nathan Whitehead at:
// http://nathansuniversity.com/cmps179/presentations/demo/disco.html



// Surface normal vector in view space
varying vec3 vNormal;

// Direction vector to disco ball in view space
varying vec4 vDiscoDir;

// Disco Ball uniforms
uniform float uTime;
uniform vec3 uColor;

void main() {

  vec3 norm = normalize(vNormal);
  vec3 disco = normalize(vDiscoDir.xyz);
  
  // Calculate rotations of disco vector
  // Altitude is up/down angle
  float altitude = atan(disco.y, length(disco.xz));
  
  // Azimuth is around angle
  float azimuth = atan(-disco.x, disco.z);
  
  // Create grid of spots
  float pattern = abs(
    sin(altitude * 4.0 * 3.14159265) * 
    sin((azimuth + 0.4 * uTime) * 4.0 * 3.14159265));
    
  // Tighten up each spot
  float intensity = 0.9 * pow(pattern, 10.0);
  
  // Lighting model is ambient + diffuse + disco light
  float prod = max(0.0, dot(norm, disco));
  vec3 lightColor = vec3(1.0, 1.0, 1.0);
  gl_FragColor = vec4(0.2 * uColor + 0.8 * prod * uColor + prod * intensity * lightColor, 1.0);
}