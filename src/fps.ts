let lastTime = new Date();
let lastFps: string;
let frames = 0;

export function getFPS() {
    frames++
    const thisTime = new Date();
    const diff = thisTime.getTime() - lastTime.getTime()
    if (diff >= 1000) {
        lastFps = Math.round(frames * 1000 / diff) + ' fps'
        lastTime = thisTime
        frames = 0
    }
    return lastFps
}