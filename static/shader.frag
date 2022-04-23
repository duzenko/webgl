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
    if(height==0.0) {
        //outColor = vec4(0.5*abs(cos(position*3e1)), 1.0);
        outColor = vec4(dbg, 1.0);
        return;
    }
    outColor = vec4(1, 0, 1, formula(texCoord.xy*1e2));
    outColor = texture(u_texture, texCoord);
    //outColor.rgb = vec3(1.0);
    outColor.a = (outColor.r - (height-0.5/slices))/slices;
    //outColor.rg = texCoord;
    //outColor.rgb = vec3(1.0);
    //outColor = vec4(1.0*height/slices);
}