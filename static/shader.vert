uniform float slices;

out vec2 texCoord;
out float height;

const float furHeight = 0.1;

void main(void) {
    height = float(gl_InstanceID)/slices;
    texCoord.x = float(gl_VertexID % 2);
    texCoord.y = float(gl_VertexID / 2);
    gl_Position.xy = texCoord - vec2(0.5);
    gl_Position.z = 1.0 - height * furHeight;
    gl_Position.zw = vec2(gl_Position.z-1.0, gl_Position.z);
}