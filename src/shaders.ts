import { gl } from "./index";

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
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }

    return shader;
}

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

function createShaderFromScript(scriptId: string, opt_shaderType: GLuint) {
    // look up the script tag by id.
    var shaderScript = document.getElementById(scriptId) as HTMLScriptElement
    if (!shaderScript) {
        throw ("*** Error: unknown script element" + scriptId);
    }

    // extract the contents of the script tag.
    var shaderSource = shaderScript.text;

    // If we didn't pass in a type, use the 'type' from
    // the script tag.
    if (!opt_shaderType) {
        if (shaderScript.type == "x-shader/x-vertex") {
            opt_shaderType = gl.VERTEX_SHADER;
        } else if (shaderScript.type == "x-shader/x-fragment") {
            opt_shaderType = gl.FRAGMENT_SHADER;
        } else if (!opt_shaderType) {
            throw ("*** Error: shader type not set");
        }
    }

    return compileShader(shaderSource, opt_shaderType);
};

export function createProgramFromScripts(shaderScriptIds: string[]) {
    var vertexShader = createShaderFromScript(shaderScriptIds[0], gl.VERTEX_SHADER);
    var fragmentShader = createShaderFromScript(shaderScriptIds[1], gl.FRAGMENT_SHADER);
    return createProgram(vertexShader, fragmentShader);
}