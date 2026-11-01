/**
 * Timer kecil untuk auto-slide.
 * `enabled: false` (mis. prefers-reduced-motion) membuat autoplay tidak pernah jalan.
 */
export function createAutoplay(callback, delay, { enabled = true } = {}) {
  let timer = null;

  const start = () => {
    if (!enabled || timer) return;
    timer = setInterval(callback, delay);
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  const restart = () => {
    stop();
    start();
  };

  return { start, stop, restart };
}
