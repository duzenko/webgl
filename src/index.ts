import { createProgramFromScripts } from './shaders'

export var gl: WebGLRenderingContext
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
    gl.clearColor(0.0, new Date().getMilliseconds() / 1000, 0.0, 1.0);
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
