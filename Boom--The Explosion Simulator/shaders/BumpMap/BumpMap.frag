varying vec3 vNormal;
varying vec2 vUV;
uniform sampler2D tBumpTexture;

void main() {
  vec3 light = normalize(vec3(1.0, 1.0, 1.0));
  vec4 bumpColor = texture2D(tBumpTexture, vUV);
  vec3 norm = normalize(vNormal + 1.0 * bumpColor.rgb);
  float prod = max(0.0, dot(light, norm));
  gl_FragColor = vec4(prod*0.6, prod*0.6, prod*0.6, 1.0);
}