varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Surface normal (world space)
  vNormal = (modelMatrix * vec4(normal, 1.0)).xyz;
  // Position (world space)
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}