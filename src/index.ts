import { getFPS } from './fps';
import {frame, init, params} from "./3d";

export var gl: WebGL2RenderingContext

window.onload = async () => {
    document.addEventListener('keydown', onKeyDown)
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement
    gl = canvas!.getContext("webgl2")!
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.")
        return
    }
    await init()
    window.requestAnimationFrame(step)
}

function step() {
    const fps = document.querySelector("#fps") as HTMLSpanElement
    const fpsText = getFPS()
    fps.textContent = params.paused ? 'Paused' : fpsText
    const sizeSpan = document.querySelector("#size") as HTMLSpanElement;
    sizeSpan.textContent = 'Passes: ' + params.passes
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    resizeCanvasToDisplaySize(canvas)
    frame(canvas.width / canvas.height)
    if (params.paused) return
    window.requestAnimationFrame(step);
}

function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
        case ' ':
            params.paused = !params.paused
            if (!params.paused) window.requestAnimationFrame(step)
            break
        case 'w':
            params.wireframe = !params.wireframe;
            break
        case 'ArrowUp':
            if(params.passes>0)
                params.passes *= 2
            else
                params.passes=1
            break
        case 'ArrowDown':
            if (params.passes > 1)
                params.passes /= 2
            else
                params.passes=0
            break
        case 'ArrowLeft':
            params.rotation++
            break
        case 'ArrowRight':
            params.rotation--
            break
        case 'F1':
            alert(`Press SPACE to toggle FPS benchmark
W to toggle wireframe
Arrow UP/DOWN to change number of passes
Arrow LEFT/RIGHT to rotate
`)
            break
        default:
            //console.log(e)
    }
    if (params.paused) window.requestAnimationFrame(step);
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