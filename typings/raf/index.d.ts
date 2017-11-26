
declare module 'raf' {
  type rafType = (callback: FrameRequestCallback) => number;
  let requestAnimationFrame: rafType;
  export = requestAnimationFrame;
}
