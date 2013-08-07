uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 nvNormal = normalize(vNormal);
  vec3 lookup = vPosition * 0.002 + (uTime*0.3)* vec3(1.0, 0.0, 0.0);
  gl_FragColor = vec4(cnoise(lookup), 0.0, 0.0, 1.0);
}