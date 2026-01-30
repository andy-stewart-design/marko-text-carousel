import { wave } from "./animate";
import type { UpdaterFunction } from "./types";

const update = (el: HTMLElement, updater: UpdaterFunction = wave) => {
  const scrollDriver = el;
  const scrollLeft = scrollDriver.scrollLeft;
  const itemWidth = scrollDriver.clientWidth;

  // Calculate overall progress (0 to slides.length - 1)
  const progress = scrollLeft / itemWidth;
  const activeIndex = Math.round(progress);
  let activeSlideProgress = 0;

  // Update each text item
  document.querySelectorAll(".text-item").forEach((item, i) => {
    const chars = item.querySelectorAll(".char");
    const subtitle = item.querySelector("p");
    if (!(item instanceof HTMLElement) || !subtitle) return;

    // Calculate local progress for this item (-1 to 1, 0 = centered)
    const relativeIndex = progress - i;

    // Determine visibility and animation state
    const isVisible = Math.abs(relativeIndex) < 1.5;
    const isActive = Math.abs(relativeIndex) < 0.5;

    // Convert to 0-1 progress where 1 = fully visible
    const slideProgress = Math.max(0, 1 - Math.abs(relativeIndex));

    // Only show debug for the active slide
    if (isActive) activeSlideProgress = slideProgress;

    if (isVisible) {
      item.style.display = "grid";

      // Animate each character
      chars.forEach((char, charIndex) => {
        if (char instanceof HTMLElement) {
          updater(char, charIndex, slideProgress, isActive, chars.length);
        }
      });

      // Animate subtitle
      const subtitleOpacity = Math.pow(slideProgress, 2);
      const subtitleY = (1 - slideProgress) * 20;
      subtitle.style.opacity = subtitleOpacity.toString();
      subtitle.style.transform = `translateY(${subtitleY}px)`;
    } else {
      item.style.display = "none";
    }
  });

  // Update indicators
  document.querySelectorAll(".indicator").forEach((fill, i) => {
    const fillAmount = Math.max(
      0,
      Math.min(100, (1 - Math.abs(progress - i)) * 100),
    );
    if (fill instanceof HTMLElement) {
      // fill.style.width = `${fillAmount}%`;
      fill.style.setProperty("--progress", `${fillAmount}%`);
    }
  });

  return {
    distance: Math.round(scrollLeft),
    progress,
    activeSlideProgress,
    activeIndex,
  };
};

export { update };
