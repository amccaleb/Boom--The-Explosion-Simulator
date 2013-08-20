uniform samplerCube envMap;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 cameraToVertex = normalize(vPosition - cameraPosition);
  vec3 reflectVec = refract(cameraToVertex, normal, 1.0);
  gl_FragColor = textureCube(envMap, reflectVec);
}