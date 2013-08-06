// Alexander McCaleb
// CMPS 179 - Summer 2013
// Prototype2 - Thumper
// 
// CurlPattern.frag
// 
// A Fragment Shader used to make a curl pattern on a surface
// 
// Based on code provided by Nathan Whitehead at:
// http://nathansuniversity.com/cmps179/presentations/demo/beat6.html

#define CURVE (20.0)
#define SPEED (6.0)
#define DENSITY (2.0)

uniform float uTime;
varying vec2 vUv;

void main() {
  float ang = atan(vUv.y, vUv.x);
  float dist = length(vUv) * CURVE;
  float t = ang * DENSITY + uTime * SPEED;
  gl_FragColor = vec4(abs(sin(t + dist)), 0.0, 1.0, 1.0);
}