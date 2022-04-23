#version 300 es

precision highp float;

in vec2 texCoord;
in float height;
in vec3 position;
in vec3 dbg;

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

void main(void) {
    float hairLength = texture(u_texture, texCoord).r;
    outColor = vec4(1.0);
    if(height==0.0) {
        return;
    }
    outColor.a = step(height, sqrt(hairLength+1e-3));
    outColor.rgb *= sqrt(height)*0.5+0.5;
}