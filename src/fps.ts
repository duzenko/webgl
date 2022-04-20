var lastTime = new Date()
var lastFps: string
var frames = 0

export function getFPS() {
    frames++
    var thisTime = new Date()
    const msec = thisTime.getTime() - lastTime.getTime()
    if (msec >= 1000) {
        lastFps = Math.round(frames * 1000 / msec) + ' fps'
        lastTime = thisTime
        frames = 0
    }
    return lastFps
}