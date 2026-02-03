const AUTO_PROGRESS_DELAY = 4000; // ms between slides

class AutoProgressor {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  start() {
    this.stop();
    this.timeoutId = setTimeout(() => {
      const itemWidth = this.el.clientWidth;
      const maxScroll = this.el.scrollWidth - itemWidth;

      // Loop back to start if at end, otherwise advance
      if (this.el.scrollLeft >= maxScroll - 10) {
        this.el.scrollTo({ left: 0, behavior: "auto" });
      } else {
        this.el.scrollBy({ left: itemWidth, behavior: "smooth" });
      }

      this.start(); // Schedule next
    }, AUTO_PROGRESS_DELAY);
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  reset() {
    this.start(); // stop + restart
  }
}

const creatAutoProgressor = (target: HTMLElement) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const start = () => {
    stop();
    timeoutId = setTimeout(() => {
      const itemWidth = target.clientWidth;
      const maxScroll = target.scrollWidth - itemWidth;

      // Loop back to start if at end, otherwise advance
      if (target.scrollLeft >= maxScroll - 10) {
        target.scrollTo({ left: 0, behavior: "auto" });
      } else {
        target.scrollBy({ left: itemWidth, behavior: "smooth" });
      }

      start(); // Schedule next
    }, AUTO_PROGRESS_DELAY);
  };

  const stop = () => {
    if (!timeoutId) return;
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  const reset = () => start();

  return { start, stop, reset };
};

export default AutoProgressor;
export { creatAutoProgressor };
