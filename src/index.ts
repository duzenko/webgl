import { getFPS } from './fps';
import { createProgramFromScripts } from './shaders'

export var gl: WebGL2RenderingContext
var paused = true
var size = 2
const uniforms: {
    slices?: WebGLUniformLocation
} = {}

window.onload = async () => {
    document.addEventListener('keydown', onKeyDown)
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement
    gl = canvas!.getContext("webgl2")!
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.")
        return
    }
    const prog = await createProgramFromScripts('shader')
    gl.useProgram(prog)
    uniforms.slices = gl.getUniformLocation(prog, 'slices')!
    var image = new Image();
    image.crossOrigin = 'anonymous'
    image.src = "https://upload.wikimedia.org/wikipedia/commons/9/9a/512x512_Dissolve_Noise_Texture.png"
    image.addEventListener('load', function () {
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        window.requestAnimationFrame(step);
    });
}

function step() {
    const fps = document.querySelector("#fps") as HTMLSpanElement;
    fps.textContent = getFPS()
    const sizeSpan = document.querySelector("#size") as HTMLSpanElement;
    sizeSpan.textContent = 'Size: ' + size
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    resizeCanvasToDisplaySize(canvas)
    gl.clearColor(0.0, 0.3+0*new Date().getMilliseconds() / 1000, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    //for (var i = 0; i < size; i++) {
        gl.uniform1f(uniforms.slices!, size)
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, size)
    //}
    if (paused) return
    window.requestAnimationFrame(step);
}

function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
        case ' ':
            paused = !paused
            const checkbox = document.querySelector("#paused") as HTMLInputElement
            checkbox.checked = paused
            if (!paused) window.requestAnimationFrame(step)
            break
        case 'ArrowUp':
            //size *= 2
            size++
            break
        case 'ArrowDown':
            //if (size>1) size /= 2
            if (size>1) size--
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