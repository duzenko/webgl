#version 300 es

uniform float slices;
uniform int torusDetail;
uniform float rotation;
uniform float aspectRatio;

out vec2 texCoord;
out vec3 position;
out vec3 normal;
out vec3 dbg;
out float height;

const float furHeight = 0.1;
const float torusRad2 = 0.2;
const float twopi = 2.0 * 3.14159265358979323846;

void main(void) {
    height = float(int(slices)-gl_InstanceID)/max(slices, 1.0);
    if (height > 0.0) {
//        height = sqrt(height); // try to sample more near the end
    }
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

    normal.x = cos(texCoord.y*twopi)*cos(texCoord.x*twopi);
    normal.y = -sin(texCoord.y*twopi)*cos(texCoord.x*twopi);
    normal.z = sin(texCoord.x*twopi);

    texCoord.y *= 3.0; 

#endif
    mat3 rotationMatrix = mat3(1);
    rotationMatrix[1].y = cos(rotation);
    rotationMatrix[1].z = -sin(rotation);
    rotationMatrix[2].y = sin(rotation);
    rotationMatrix[2].z = cos(rotation);
    gl_Position.xyz = gl_Position.xyz*rotationMatrix;
    normal = rotationMatrix*normal;
    position = gl_Position.xyz;
    gl_Position.z += 2.0;
    gl_Position.zw = vec2(gl_Position.z-1.0, gl_Position.z);
    gl_Position.xy *= 2.0;
    gl_Position.x /= aspectRatio;
}