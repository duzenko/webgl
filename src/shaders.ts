import { gl } from "./index"

function compileShader(shaderSource: string, shaderType: GLuint) {
    // Create the shader object
    var shader = gl.createShader(shaderType)!;

    // Set the shader source code.
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check if it compiled
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        // Something went wrong during compilation; get the error
        throw gl.getShaderInfoLog(shader);
    }

    return shader;
}

async function createShaderFromScript(scriptId: string, opt_shaderType: GLuint) {
    var x = await fetch(scriptId)
    var shaderSource = await x.text()
    try {
        return compileShader(shaderSource, opt_shaderType)
    } catch (e) {
        console.log('compile error', scriptId)
        throw e
    }
};

function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    // create a program.
    var program = gl.createProgram()!;

    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // link the program.
    gl.linkProgram(program);

    // Check if it linked.
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // something went wrong with the link
        throw ("program failed to link:" + gl.getProgramInfoLog(program));
    }

    return program;
};

export async function createProgramFromScripts(shaderScriptId: string) {
    var vertexShader = await createShaderFromScript(shaderScriptId+'.vert', gl.VERTEX_SHADER);
    var fragmentShader = await createShaderFromScript(shaderScriptId+'.frag', gl.FRAGMENT_SHADER);
    return createProgram(vertexShader, fragmentShader);
}