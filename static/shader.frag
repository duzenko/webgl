#version 300 es
precision highp float;

in vec2 texCoord;
in float height;
in vec3 positionLocal;
in vec3 positionViewer;
in vec3 dbg;
in vec3 normal;
in vec3 tangent;
in vec3 bitangent;
in vec3 toViewerInLocalSpace;

out vec4 outColor;

uniform sampler2D u_texture;
uniform float slices;

vec3 toLight = normalize(vec3(0.5, 1, -0.5));

uint baseHash(uvec2 p) {
    p = 1103515245U*((p >> 1U)^(p.yx));
    uint h32 = 1103515245U*((p.x)^(p.y>>3U));
    return h32^(h32 >> 16);
}

float rand(vec2 co) {
    if(int(round(co.x)) % 2 == 0) {
        co.y += 0.5;
    }
    uint n = baseHash(floatBitsToUint(round(co*1e0)));
    float random = float(n >> 1)/float(0x7fffffff);
//    random = pow(random + 1e-4, 0.2);
    return random;
}

float sampledHeight;
float textureCoordScale = 6e1;

float sampleAt(vec3 offset) {
    float hairLength = rand((texCoord+offset.xy)*textureCoordScale);
    sampledHeight = height-length(offset)*-offset.z;
    return step(sampledHeight, hairLength);
}

void main(void) {
    outColor = vec4(1.0);
    vec3 toViewerInTextureSpace = (normalize(toViewerInLocalSpace)*(mat3(tangent, bitangent, normal))).xyz;
    if(height==0.0) {
        outColor.rgb = vec3(0.5);
//        return;
    }
    float NdotV = dot(normalize(normal), normalize(-positionViewer));
    outColor.a = sampleAt(vec3(0));
//    outColor = vec4(0.0, 0.0, 0.0, 1.0);
//    outColor.xyz = toViewerInTextureSpace;
    for(int i=0;i<32;i++) {
        if(outColor.a>0.0)
            break;
//        outColor.rgb = vec3(0.5, 1, 0);
        outColor.a = sampleAt(-toViewerInTextureSpace*float(i)/textureCoordScale*1e-1);
    }
    if(outColor.a<=0.0) {
        discard;
    }
//    outColor.xyz = toViewerInLocalSpace.xyz;
//    return;
#if 1
    outColor.rgb *= sampledHeight*0.5+0.5;
#else
    outColor.rgb *= height;
#endif
    float lit = dot(normalize(normal), toLight);
//    outColor.rgb *= mix( max(0.0, lit), 1.0, 0.5);
}