// Alexander McCaleb
// CMPS 179 - Summer 2013
// Prototype2 - Thumper
// 
// PulseToBPM.vert
// 
// A Vertex Shader used to make an object pulse at some BPM
// 
// Based on code provided by Nathan Whitehead at:
// http://nathansuniversity.com/cmps179/presentations/demo/beat2.html
 
varying vec3 vNormal;

void main() {
  vNormal = normalMatrix * vec3(normal);
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}