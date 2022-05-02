#version 300 es
precision highp float;

in vec2 texCoord;
in float height;
in vec3 positionLocal;
in vec3 positionViewer;
in vec3 dbg;
in vec3 normal;

out vec4 outColor;

uniform sampler2D u_texture;
uniform float slices;

vec3 toLight = normalize(vec3(0.5, 1, -0.5));

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
    uint n = baseHash(floatBitsToUint(round(co*6e0)));
    float random = float(n >> 1)/float(0x7fffffff);
#endif
    float height = pow(random + 1e-4, 0.2);
    return cell * height;
}

void main(void) {
    float hairLength = rand(texCoord*1e2);
    outColor = vec4(1.0);
    if(height==0.0) {
        return;
    }
    float NdotV = dot(normalize(normal), normalize(-positionViewer));
    if(height-NdotV>8e-1) {
        discard;
    }
    float lit = dot(normalize(normal), toLight);
    outColor.rgb *= mix( max(0.0, lit), 1.0, 0.5);
    outColor.a = step(height, hairLength);
    if(outColor.a<=0.0) {
        discard;
    }
#if 1
    outColor.rgb *= height*0.5+0.5;
#else
    outColor.rgb *= sqrt(height)*0.5+0.5;
#endif
}