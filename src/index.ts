import { createProgramFromScripts } from './shaders'

export var gl: WebGLRenderingContext
var paused = false

window.onload = () => {
    document.addEventListener('keydown', onKeyDown);
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    gl = canvas!.getContext("webgl")!;
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

function onKeyDown(e: KeyboardEvent) {
    if (e.key === ' ') paused = !paused
    if (!paused) window.requestAnimationFrame(step);
    const checkbox = document.querySelector("#paused") as HTMLInputElement
    checkbox.checked = paused
}