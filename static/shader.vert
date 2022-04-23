#version 300 es

uniform float slices;
uniform int torusDetail;

out vec2 texCoord;
out vec3 position;
out vec3 dbg;
out float height;

const float furHeight = 0.1;
const float torusRad2 = 0.2;
const float twopi = 2.0 * 3.14159265358979323846;

void main(void) {
    height = float(gl_InstanceID)/max(slices, 1.0);
#if 0
    texCoord.x = float(gl_VertexID % 2);
    texCoord.y = float(gl_VertexID / 2);
    gl_Position.xy = texCoord - vec2(0.5);
    gl_Position.z = -height * furHeight;
#else
    float innerRadius = torusRad2 + height * furHeight;
    int numc = torusDetail, numt = torusDetail*3;
    int i = gl_VertexID / (numt*2);
    int j = gl_VertexID % (numt*2) / 2;
    int k = gl_VertexID % 2;
    float s = float(i + k);
    float t = float(j);
    texCoord.x = s / float(numc);
    texCoord.y = t / float(numt-1);
    float xyBase = 0.7+innerRadius*cos(texCoord.x*twopi);
    gl_Position.x = xyBase*cos(texCoord.y*twopi);
    gl_Position.y = xyBase*sin(texCoord.y*twopi);
    gl_Position.z = innerRadius * sin(texCoord.x * twopi);
    //dbg = vec3(t/float(numt), 0, s / float(numc));
    texCoord.y *= 3.0; 
    //texCoord /= 8.;
#endif
    position = gl_Position.xyz;
    gl_Position.z = gl_Position.z+1.0;
    gl_Position.zw = vec2(gl_Position.z-1., gl_Position.z);
}