import { getFPS } from './fps';
import {frame, getVertexCount, init, params} from "./3d";

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
    const fpsText = getFPS()
    const fpsElement = document.querySelector("#fps") as HTMLSpanElement
    fpsElement.textContent = params.paused ? 'Paused' : fpsText
    const passesElement = document.querySelector("#size") as HTMLSpanElement;
    passesElement.textContent = 'Passes: ' + params.passes
    const trianglesElement = document.querySelector("#triangles") as HTMLSpanElement;
    trianglesElement.textContent = 'Triangles: ' + nFormatter(getVertexCount()/3)
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

function nFormatter(num: number, digits: number = 0) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.\d*[1-9])0+$/;
    const item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}