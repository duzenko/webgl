import { getFPS } from './fps';
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
    const fps = document.querySelector("#fps") as HTMLSpanElement;
    fps.textContent = getFPS()
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    resizeCanvasToDisplaySize(canvas)
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

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio;
    const { width, height } = canvas.getBoundingClientRect();
    const displayWidth = Math.round(width * dpr);
    const displayHeight = Math.round(height * dpr);

    // Check if the canvas is not the same size.
    const needResize = canvas.width != displayWidth ||
        canvas.height != displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight)
    }

    return needResize;
}