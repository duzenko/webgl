var gl: WebGLRenderingContext
var paused = false

window.onload = () => {
    document.getElementById('paused')!.addEventListener('click', checkFluency)
    const canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    // Initialize the GL context
    gl = canvas!.getContext("webgl")!;

    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    window.requestAnimationFrame(step);
}

function step() {
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, new Date().getMilliseconds() / 1000, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (paused) return
    window.requestAnimationFrame(step);
}

function checkFluency() {
    var checkbox = document.getElementById('paused') as HTMLInputElement
    paused = checkbox.checked
    if (paused) return
    window.requestAnimationFrame(step);
}