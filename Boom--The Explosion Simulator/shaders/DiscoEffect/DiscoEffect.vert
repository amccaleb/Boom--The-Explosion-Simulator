// Alexander McCaleb
// CMPS 179 - Summer 2013
// Prototype2 - Thumper
// 
// DiscoEffect.vert
// 
// A Vertex Shader that creates a disco ball effect on a mesh
//
// Based on code provided by Nathan Whitehead at:
// http://nathansuniversity.com/cmps179/presentations/demo/disco.html



// Surface normal vector in view space
varying vec3 vNormal;

// Direction vector to disco ball in view space
varying vec4 vDiscoDir;

void main() {

  // Get surface normal usual way
  vNormal = normalMatrix * normal;
  
  // Fixed position of disco ball (world space)
  vec3 vDiscoPos = vec3(0.0, 0.0, 500.0);
  
  // Get position of vertex in world space
  vec4 vWorldPos = modelMatrix * vec4(position, 1.0);
  
  // Vector to disco ball in world space
  vec4 vDiscoDirW = vec4(vDiscoPos, 1.0) - vWorldPos;
  
  // Vector to disco ball in view space
  vDiscoDir = viewMatrix * vDiscoDirW;
  
  // Perform our normal vertex calculation
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}
