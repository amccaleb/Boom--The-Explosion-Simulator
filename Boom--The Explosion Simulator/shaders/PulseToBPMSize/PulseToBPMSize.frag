// Alexander McCaleb
// CMPS 179 - Summer 2013
// Prototype2 - Thumper
// 
// PulseToBPMSize.frag
// 
// A Fragment Shader used to make an object pulse its size at some BPM
// 
// Based on code provided by Nathan Whitehead at:
// http://nathansuniversity.com/cmps179/presentations/demo/beat3.html

varying vec3 vNormal;
uniform float uTime;
uniform float uBeatTime;
uniform float uBeat;

void main() {
  vec3 light = vec3(1.0, 1.0, 1.0);
  light = normalize(light);
  vec3 nvNormal = normalize(vNormal);
  float prod = max(0.0, dot(nvNormal, light));
  gl_FragColor = vec4(0.0, prod, 0.0, 1.0);
}