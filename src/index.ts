var gl: WebGLRenderingContext
var paused = false

window.onload = () => {
    document.getElementById('paused')!.addEventListener('click', checkPaused)
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    // Initialize the GL context
    gl = canvas!.getContext("webgl")!;

    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    const prog = createProgramFromScripts(['my_vertex_shader', 'my_fragment_shader'])
    gl.useProgram(prog)
    window.requestAnimationFrame(step);
}

function step() {
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, new Date().getMilliseconds() / 1000, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1)
    if (paused) return
    window.requestAnimationFrame(step);
}

function checkPaused() {
    var checkbox = document.getElementById('paused') as HTMLInputElement
    paused = checkbox.checked
    if (paused) return
    window.requestAnimationFrame(step);
}

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

function createProgramFromScripts(shaderScriptIds: string[]) {
    var vertexShader = createShaderFromScript(shaderScriptIds[0], gl.VERTEX_SHADER);
    var fragmentShader = createShaderFromScript(shaderScriptIds[1], gl.FRAGMENT_SHADER);
    return createProgram(vertexShader, fragmentShader);
}