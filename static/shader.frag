#version 300 es

precision highp float;

in vec2 texCoord;
in float height;
in vec3 position;
in vec3 dbg;
in vec3 normal;

out vec4 outColor;

uniform sampler2D u_texture;
uniform float slices;

float formula(vec2 tc) {
    tc = fract(tc);
    return 1.0-9.0*distance(tc, vec2(0.5));
    float center = tc.x - 0.5;
    float dist = 1.0 - 16.0*center*center;
    return tc.y < dist ? 1.0 : 0.0;
}

uint baseHash(uvec2 p)
{
    p = 1103515245U*((p >> 1U)^(p.yx));
    uint h32 = 1103515245U*((p.x)^(p.y>>3U));
    return h32^(h32 >> 16);
}

float rand(vec2 co) {
    if(int(round(co.x)) % 2 == 0) {
        co.y += 0.5;
    }
    vec2 s = round(co);
    float cell = 1.0;//step(distance(s, co), 0.4);
#if 0
    float random = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
    random = dot(s, vec2(12.9898, 78.233));
    random = fract(fract(random) * 43758.5453);
#else
    uint n = baseHash(floatBitsToUint(round(co*9e0)));
    float random = float(n >> 1)/float(0x7fffffff);
#endif
    float height = pow(random + 1e-4, 0.2);
//    height = random;
    return cell * height;
}

void main(void) {
//    float hairLength = texture(u_texture, texCoord).r;
    float hairLength = rand(texCoord*1e2);
    outColor = vec4(1.0);
//    outColor.a = step(height, sqrt(hairLength+1e-4));
    outColor.a = step(height, hairLength);
    if(outColor.a<=0.0) {
        discard;
    }
    if(hairLength<0.0) {
        outColor = vec4(1.0, 0, 0, 1.0);
        return;
    }
#if 1
        outColor.rgb *= height*0.5+0.5;
#else
        outColor.rgb *= sqrt(height)*0.5+0.5;
#endif
    float lit = dot(normalize(normal), normalize(vec3(0.5, -1, -0.5)));
    outColor.rgb *= mix( max(0.0, lit), 1.0, 0.5);
}