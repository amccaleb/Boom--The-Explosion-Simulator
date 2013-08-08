uniform sampler2D uBaseTexture;
uniform float uBaseSpeed;
uniform sampler2D uNoiseTexture;
uniform float uNoiseScale;
uniform float uAlpha;
uniform float uTime;

varying vec2 vUv;

void main() 
{
	vec2 uvTimeShift = vUv + vec2( -0.7, 1.5 ) * uTime * uBaseSpeed;	
	vec4 noiseGeneratorTimeShift = texture2D( uNoiseTexture, uvTimeShift );
	vec2 uvNoiseTimeShift = vUv + uNoiseScale * vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.b );
	vec4 baseColor = texture2D( uBaseTexture, uvNoiseTimeShift );

	baseColor.a = uAlpha;
	gl_FragColor = baseColor;
}  