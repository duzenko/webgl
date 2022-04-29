import { getFPS } from './fps';
import { createProgramFromScripts } from './shaders'

export var gl: WebGL2RenderingContext

const torusDetail = 16;

const uniforms: {
    slices?: WebGLUniformLocation
    torusDetail?: WebGLUniformLocation
    rotation?: WebGLUniformLocation
    aspectRatio?: WebGLUniformLocation
} = {}

let paused = true
let wireframe = false
let passes = 32*1
let rotation = 99

window.onload = async () => {
    document.addEventListener('keydown', onKeyDown)
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement
    gl = canvas!.getContext("webgl2")!
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.")
        return
    }
    const program = await createProgramFromScripts('shader')
    if (!program) return
    gl.useProgram(program)
    uniforms.slices = gl.getUniformLocation(program, 'slices')!
    uniforms.torusDetail = gl.getUniformLocation(program, 'torusDetail')!
    uniforms.rotation = gl.getUniformLocation(program, 'rotation')!
    uniforms.aspectRatio = gl.getUniformLocation(program, 'aspectRatio')!
    const image = new Image();
    image.crossOrigin = 'anonymous'
    image.src = "https://upload.wikimedia.org/wikipedia/commons/9/9a/512x512_Dissolve_Noise_Texture.png"
    image.addEventListener('load', function () {
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D);
        window.requestAnimationFrame(step)
    });
}

function step() {
    const fps = document.querySelector("#fps") as HTMLSpanElement
    const fpsText = getFPS()
    fps.textContent = paused ? 'Paused' : fpsText
    const sizeSpan = document.querySelector("#size") as HTMLSpanElement;
    sizeSpan.textContent = 'Passes: ' + passes
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    resizeCanvasToDisplaySize(canvas)
    gl.clearColor(0.3, 0.3, 0.5, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    // gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.uniform1f(uniforms.slices!, passes)
    gl.uniform1i(uniforms.torusDetail!, torusDetail)
    gl.uniform1f(uniforms.rotation!, rotation * 1e-2)
    gl.uniform1f(uniforms.aspectRatio!, canvas.width / canvas.height)
    gl.drawArraysInstanced(wireframe ? gl.LINE_STRIP : gl.TRIANGLE_STRIP, 0, torusDetail * torusDetail * 6, passes + 1)
    if (paused) return
    window.requestAnimationFrame(step);
}

function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
        case ' ':
            paused = !paused
            if (!paused) window.requestAnimationFrame(step)
            break
        case 'w':
            wireframe = !wireframe;
            break
        case 'ArrowUp':
            if(passes>0)
                passes *= 2
            else
                passes=1
            break
        case 'ArrowDown':
            if (passes > 1)
                passes /= 2
            else
                passes=0
            break
        case 'ArrowLeft':
            rotation++
            break
        case 'ArrowRight':
            rotation--
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
    if (paused) window.requestAnimationFrame(step);
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