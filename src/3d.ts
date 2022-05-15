import {createProgramFromScripts} from "./shaders";
import {gl} from "./index";

const torusDetail = 160;

const uniforms: {
    slices?: WebGLUniformLocation
    torusDetail?: WebGLUniformLocation
    rotation?: WebGLUniformLocation
    aspectRatio?: WebGLUniformLocation
} = {}

export const params = {
    paused: true,
    wireframe: false,
    passes: 32*1,
    rotation: 99*1
}

export async function init() {
    // const image = new Image();
    // image.crossOrigin = 'anonymous'
    // image.src = "https://upload.wikimedia.org/wikipedia/commons/9/9a/512x512_Dissolve_Noise_Texture.png"
    // image.addEventListener('load', function () {
    //     const texture = gl.createTexture()
    //     gl.bindTexture(gl.TEXTURE_2D, texture)
    //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    //     gl.generateMipmap(gl.TEXTURE_2D);
    //     window.requestAnimationFrame(step)
    // });
    gl.clearColor(0.3, 0.3, 0.5, 1.0)
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    const program = await createProgramFromScripts('shader')
    if (!program) return
    gl.useProgram(program)
    uniforms.slices = gl.getUniformLocation(program, 'slices')!
    uniforms.torusDetail = gl.getUniformLocation(program, 'torusDetail')!
    uniforms.rotation = gl.getUniformLocation(program, 'rotation')!
    uniforms.aspectRatio = gl.getUniformLocation(program, 'aspectRatio')!
}

export function frame(aspectRatio: number) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.uniform1f(uniforms.slices!, params.passes)
    gl.uniform1i(uniforms.torusDetail!, torusDetail)
    gl.uniform1f(uniforms.rotation!, params.rotation * 1e-2)
    gl.uniform1f(uniforms.aspectRatio!, aspectRatio)
    gl.drawArraysInstanced(params.wireframe ? gl.LINE_STRIP : gl.TRIANGLE_STRIP, 0, getVertexCount(), params.passes + 1)
}

export function getVertexCount() {
    return torusDetail * torusDetail * 6
}