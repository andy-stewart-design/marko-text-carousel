type UpdaterFunction = (
  char: HTMLElement,
  charIndex: number,
  slideProgress: number,
  isActive: boolean,
  charCount: number,
) => void;

export type { UpdaterFunction };
