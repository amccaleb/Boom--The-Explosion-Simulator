// Alexander McCaleb
// CMPS 179 - Summer 2013
// Prototype2 - Thumper
// 
// PulseToBPM.frag
// 
// A Fragment Shader used to make an object pulse at some BPM
// 
// Based on code provided by Nathan Whitehead at:
// http://nathansuniversity.com/cmps179/presentations/demo/beat2.html

varying vec3 vNormal;
uniform float uTime;
uniform float uBeatTime;

void main() {
  vec3 light = vec3(1.0, 1.0, 1.0);
  light = normalize(light);
  vec3 nvNormal = normalize(vNormal);
  float prod = max(0.0, dot(nvNormal, light));
  float tval = abs(cos(uBeatTime * 3.14159));
  gl_FragColor = vec4(tval, prod, 0.0, 1.0);
}