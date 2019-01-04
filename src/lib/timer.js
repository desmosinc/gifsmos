// A simple replacement for `setInterval` (that fires immediately)
let raf;

export const startTimer = (fn, interval = 1000) => {
  fn();
  let lastFired = Date.now();
  const tick = () => {
    const now = Date.now();
    if (now - lastFired > interval) {
      fn();
      lastFired = now;
    }
    raf = requestAnimationFrame(tick);
  };
  tick();
};

export const clearTimer = () => {
  cancelAnimationFrame(raf);
};
