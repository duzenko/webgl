precision highp float;

in vec2 texCoord;
in float height;

out vec4 outColor;

uniform sampler2D u_texture;

float formula(vec2 tc) {
    tc = fract(tc);
    return 1.0-9.0*distance(tc, vec2(0.5));
    float center = tc.x - 0.5;
    float dist = 1.0 - 16.0*center*center;
    return tc.y < dist ? 1.0 : 0.0;
}

void main(void) {
    if(height==0.0) {
        outColor = vec4(0, 0, 0, 1.0);
        return;
    }
    outColor = vec4(1, 0, 1, formula(texCoord.xy*1e2));
    outColor = texture(u_texture, texCoord);
    outColor.a = 0.1*(outColor.r - 0.5);
}