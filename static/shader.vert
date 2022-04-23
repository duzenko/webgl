uniform float slices;
uniform int torusDetail;

out vec2 texCoord;
out vec3 position;
out vec3 dbg;
out float height;

const float furHeight = 0.1;

void main(void) {
#if 0
    height = float(gl_InstanceID)/slices;
    texCoord.x = float(gl_VertexID % 2);
    texCoord.y = float(gl_VertexID / 2);
    gl_Position.xy = texCoord - vec2(0.5);
    gl_Position.z = -height * furHeight;
#else
#define PI_ 3.14159265358979323846
    float twopi = 2.0 * PI_;
    int numc = torusDetail, numt = torusDetail*3;
    int i = gl_VertexID / (numt*2);
    int j = gl_VertexID % (numt*2) / 2;
    int k = gl_VertexID % 2;
    float s = float((i + k) % numc) + 0.5;
    float t = float(j % numt);
    gl_Position.x = (0.7+0.2*cos(s*twopi/float(numc)))*cos(t*twopi/float(numt));
    gl_Position.y = (0.7+0.2*cos(s*twopi/float(numc)))*sin(t*twopi/float(numt));
    gl_Position.z = 0.2 * sin(s * twopi / float(numc));
    dbg = vec3(t/float(numt), 0, s / float(numc));
#endif
    position = gl_Position.xyz;
    gl_Position.z = 1.0 + gl_Position.z;
    gl_Position.zw = vec2(gl_Position.z-1.0, gl_Position.z);
}