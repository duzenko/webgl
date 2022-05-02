#version 300 es
precision highp float;

uniform float slices;
uniform int torusDetail;
uniform float rotation;
uniform float aspectRatio;

out vec2 texCoord;
out vec3 positionLocal;
out vec3 positionViewer;
out vec3 normal;
out vec3 dbg;
out float height;

const float furHeight = 0.1;
const float torusRad2 = 0.2;
const float twopi = 2.0 * 3.14159265358979323846;

void main(void) {
    mat4 modelMatrix = mat4(1);
    modelMatrix[1].y = cos(rotation);
    modelMatrix[1].z = -sin(rotation);
    modelMatrix[2].y = sin(rotation);
    modelMatrix[2].z = cos(rotation);
    modelMatrix[2].w = 2.1;

#if 1
    height = float(int(slices)-gl_InstanceID)/max(slices, 1.0);
#else
    height = float(gl_InstanceID)/max(slices, 1.0);
#endif

    if (height > 0.0) {
        height = sqrt(height); // try to sample more near the end
    }

#if 0
    texCoord.x = float(gl_VertexID % 2);
    texCoord.y = float(gl_VertexID / 2);
    gl_Position.xy = texCoord - vec2(0.5);
    gl_Position.z = -height * furHeight;
    gl_Position.w = 1.0;
#else
    int numc = torusDetail, numt = torusDetail*3;
    int i = gl_VertexID / (numt*2);
    int j = gl_VertexID % (numt*2) / 2;
    int k = gl_VertexID % 2;
    float s = float(i + k);
    float t = float(j);
    texCoord.x = s / float(numc);
    texCoord.y = t / float(numt-1);
    normal.x = cos(texCoord.y*twopi)*cos(texCoord.x*twopi);
    normal.y = sin(texCoord.y*twopi)*cos(texCoord.x*twopi);
    normal.z = sin(texCoord.x*twopi);

    vec4 viewPosInLocalSpace = vec4(0,0,0,1)*inverse(modelMatrix);

    float innerRadius = torusRad2 + height * furHeight;
    float xyBase = 0.7+innerRadius*cos(texCoord.x*twopi);
    positionLocal.x = xyBase*cos(texCoord.y*twopi);
    positionLocal.y = xyBase*sin(texCoord.y*twopi);
    positionLocal.z = innerRadius * sin(texCoord.x * twopi);

    texCoord.y *= 3.0;

    vec3 toViewerInLocalSpace = normalize(viewPosInLocalSpace.xyz-1.0*positionLocal);
    float NdotV = dot(normal, toViewerInLocalSpace );
    dbg.x = clamp(5e0*(3e-1-NdotV), 0.0, 1.0);
#endif

    // model transformation
    gl_Position = vec4(positionLocal, 1)*modelMatrix;
    normal = normal*mat3(modelMatrix);
    positionViewer = gl_Position.xyz;
    // perspective projection
    gl_Position.zw = vec2((gl_Position.z-1.0), gl_Position.z);
    gl_Position.xy *= 2.0;
    gl_Position.x /= aspectRatio;
}