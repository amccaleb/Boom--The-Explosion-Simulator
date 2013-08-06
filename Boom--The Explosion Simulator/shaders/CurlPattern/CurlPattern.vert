// Alexander McCaleb
// CMPS 179 - Summer 2013
// Boom -- The Explosion Simulator
// 
// CurlPattern.vert
// 
// A Vertex Shader used to make a curl pattern on a surface
// 
// Based on code provided by Nathan Whitehead at:
// http://nathansuniversity.com/cmps179/presentations/demo/beat6.html

varying vec2 vUv;

void main() {
  vUv = vec2(uv.x - 0.5, uv.y - 0.5); // center vUv
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}