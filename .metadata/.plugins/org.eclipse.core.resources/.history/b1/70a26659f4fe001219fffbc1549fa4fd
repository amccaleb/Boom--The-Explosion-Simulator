uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalMatrix * vec3(normal);
  vPosition = position;
  vec3 lookup = 1.0 * position + 7.0 * uTime * vec3(0.0, 1.0, 0.0);
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0) + 100.0 * vec4(normal, 1.0) * (1.0 + cnoise(lookup));
}