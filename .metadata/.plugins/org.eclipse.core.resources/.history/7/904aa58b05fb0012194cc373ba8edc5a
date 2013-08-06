// Alexander McCaleb
// CMPS 179 - Summer 2013
// Prototype2 - Thumper
// 
// PulseToBPMSize.vert
// 
// A Vertex Shader used to make an object pulse its size at some BPM
// 
// Based on code provided by Nathan Whitehead at:
// http://nathansuniversity.com/cmps179/presentations/demo/beat3.html

varying vec3 vNormal;
uniform float uTime;
uniform float uBeatTime;
uniform float uBeat;

void main() {
  vNormal = normalMatrix * vec3(normal);
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4((0.8 + 0.2 * uBeat) * position, 1.0);
}