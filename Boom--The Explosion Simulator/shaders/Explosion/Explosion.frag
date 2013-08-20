// Alexander McCaleb & Jonah Nobleza
// CMPS 179 - Summer 2013
// Boom -- The Explosion Simulator
// 
// Explosion.frag
// 
// A Fragment Shader used to make a surface explode
// 
// Based on code provided by Nathan Whitehead at:
// http://www.clicktorelease.com/code/perlin/explosion.html

varying vec2 vUv;
			uniform sampler2D tExplosion;
			uniform float sensitivity;
			uniform float stability;
			uniform float visualAppeal;
			uniform float performance;
			uniform float strength;
			uniform float velocity;
			varying vec3 pos;
			varying float ao;
			varying float d;
			float PI = 3.14159265358979323846264;

			float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*visualAppeal*43758.5453+seed);}

			void main() {

			vec3 color = texture2D( tExplosion, vec2( 0, 1.0 - 1.3 * ao + .01 * random(performance * vec3(12.9898,78.233,151.7182),stability) ) ).rgb;
			gl_FragColor = vec4( color.rgb, 1.0 );

			}